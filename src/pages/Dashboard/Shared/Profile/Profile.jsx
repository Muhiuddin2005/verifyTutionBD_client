import { useState } from "react";
import useAuth from '../../../../hooks/useAuth';
import useRole from '../../../../hooks/useRole';
import axios from "axios";
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_image_host_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const [role] = useRole();
    const axiosSecure = useAxiosSecure();
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpdate = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        const imageFile = e.target.image.files[0];

        if (!imageFile) return;

        // 1. Prepare image for ImgBB
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            // 2. Upload to ImgBB
            const res = await axios.post(image_hosting_api, formData, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (res.data.success) {
                const newImageUrl = res.data.data.display_url;

                // 3. Update Firebase Profile
                await updateUserProfile({ displayName: user.displayName, photoURL: newImageUrl });

                // 4. Update MongoDB
                await axiosSecure.patch(`/users/update-image/${user.email}`, { image: newImageUrl });

                Swal.fire({
                    icon: 'success',
                    title: 'Profile picture updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                // Force a reload or state update to reflect the new image
                window.location.reload();
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            Swal.fire({ icon: 'error', title: 'Failed to update profile picture.', text: error.message });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-12 bg-base-100 p-8 rounded-3xl shadow-2xl border border-base-200 text-center">
            <div className="avatar mb-6">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 shadow-xl">
                    <img src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="User Profile" />
                </div>
            </div>
            <h1 className="text-4xl font-bold text-primary mb-2">{user?.displayName}</h1>
            <p className="text-xl text-base-content/70 mb-6">{user?.email}</p>
            <div className="badge badge-secondary badge-lg font-bold px-6 py-4 uppercase tracking-widest text-lg shadow-sm">
                {role}
            </div>
            <div className="divider my-8"></div>

            {/* Update Image Form */}
            <form onSubmit={handleImageUpdate} className="w-full max-w-xs mx-auto mt-6 border-t pt-6">
                <label className="label">
                    <span className="label-text font-semibold">Update Profile Picture</span>
                </label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    required
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                />
                <button
                    type="submit"
                    disabled={isUploading}
                    className="btn btn-primary w-full mt-4"
                >
                    {isUploading ? <span className="loading loading-spinner"></span> : "Upload New Image"}
                </button>
            </form>

            <p className="text-base-content/60 mt-6">Manage your account settings and preferences here. More features coming soon!</p>
        </div>
    );
};

export default Profile;
