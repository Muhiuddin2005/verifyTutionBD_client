import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaUser, FaPhone, FaUpload } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../../../../utils/validationSchemas";
import useAuth from "../../../../hooks/useAuth";
import useRole from "../../../../hooks/useRole";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import Badge from "../../../../components/ui/Badge";

const image_hosting_key = import.meta.env.VITE_image_host_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [role] = useRole();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);

  // Fetch full user data from MongoDB
  const { data: dbUser = {}, isLoading: isUserLoading } = useQuery({
    queryKey: ["user-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    }
  });

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm({
    resolver: zodResolver(profileSchema),
    mode: "onChange"
  });

  // Prepopulate form once database user data loads
  useEffect(() => {
    if (dbUser.name) {
      reset({
        name: dbUser.name,
        phone: dbUser.phone || ""
      });
    }
  }, [dbUser, reset]);

  // Profile Update Mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch("/users/profile", updatedData);
      return res.data;
    },
    onSuccess: async (_, variables) => {
      // Update Firebase Profile Name
      await updateUserProfile({ displayName: variables.name });
      
      // Invalidate query
      queryClient.invalidateQueries(["user-profile", user?.email]);
      
      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile information has been successfully updated.",
        showConfirmButton: false,
        timer: 1500
      });
    },
    onError: (error) => {
      console.error("Profile update failed:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Could not update profile. Please try again."
      });
    }
  });

  const handleProfileSubmit = (data) => {
    updateProfileMutation.mutate(data);
  };

  const handleImageUpdate = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(image_hosting_api, formData, {
        headers: { "content-type": "multipart/form-data" }
      });

      if (res.data.success) {
        const newImageUrl = res.data.data.display_url;

        // 1. Update Firebase Photo
        await updateUserProfile({ displayName: user.displayName, photoURL: newImageUrl });

        // 2. Update MongoDB Photo
        await axiosSecure.patch(`/users/update-image/${user.email}`, { image: newImageUrl });

        // 3. Invalidate Query
        queryClient.invalidateQueries(["user-profile", user?.email]);

        Swal.fire({
          icon: "success",
          title: "Image Uploaded!",
          text: "Profile picture updated successfully.",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error.message || "Failed to update profile picture."
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Avatar & Role */}
        <div className="lg:col-span-5">
          <Card className="p-8 text-center flex flex-col items-center shadow-lg border border-base-200">
            <div className="relative group mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary ring-offset-base-100 ring-offset-4 shadow-xl">
                <img
                  src={dbUser.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Overlay for image upload */}
              <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer text-white text-xs font-semibold gap-1">
                <FaUpload />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpdate}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
              
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                  <span className="loading loading-spinner text-white"></span>
                </div>
              )}
            </div>

            <h2 className="text-2xl font-extrabold text-base-content tracking-tight mb-1">
              {dbUser.name}
            </h2>
            <p className="text-sm text-base-content/60 mb-4 font-medium">
              {dbUser.email}
            </p>

            <Badge variant="secondary" size="lg" className="px-6 py-2.5">
              {role}
            </Badge>

            <div className="divider my-6 w-full"></div>
            <p className="text-xs text-base-content/50 leading-relaxed max-w-xs">
              Click the profile image to upload a new avatar. Supported formats: JPG, PNG, WEBP.
            </p>
          </Card>
        </div>

        {/* Right Column: Profile Form */}
        <div className="lg:col-span-7">
          <Card className="p-8 shadow-lg border border-base-200" hoverable>
            <h3 className="text-xl font-bold text-primary mb-6">
              Update Profile Information
            </h3>

            <form onSubmit={handleSubmit(handleProfileSubmit)} className="space-y-5">
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                leftIcon={<FaUser />}
                error={errors.name?.message}
                disabled={updateProfileMutation.isPending}
                required
                {...register("name")}
              />

              <Input
                label="Phone Number"
                type="text"
                placeholder="+880 123 456 7890"
                leftIcon={<FaPhone />}
                error={errors.phone?.message}
                disabled={updateProfileMutation.isPending}
                required
                {...register("phone")}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full"
                  isLoading={updateProfileMutation.isPending}
                  disabled={!isDirty}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Profile;
