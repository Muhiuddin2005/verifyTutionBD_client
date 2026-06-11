import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaPen, FaCommentDots } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../../utils/validationSchemas";
import Swal from "sweetalert2";
import axios from "axios";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onChange"
  });

  const onSubmit = async (data) => {
    try {
      // Connects to backend contacts endpoint
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiBase}/contacts`, data);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thank you for reaching out. We will get back to you shortly.",
          showConfirmButton: false,
          timer: 2000
        });
        reset();
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.response?.data?.message || "Something went wrong. Please try again."
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-tight">Contact Us</h1>
        <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
          Have a question or feedback? Drop us a message, and our team will get in touch with you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact info column */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-primary">Get In Touch</h2>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Whether you are a student looking for a tutor, a tutor seeking opportunities, or just wanted to say hi, we'd love to hear from you.
            </p>
            
            <div className="space-y-4 font-medium text-sm">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-base-200/50 border border-base-200">
                <span className="text-primary text-xl">📧</span>
                <div>
                  <p className="text-xs text-base-content/50 font-bold uppercase">Email Us</p>
                  <p className="text-base-content/90 font-semibold">support@verifytutionbd.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-base-200/50 border border-base-200">
                <span className="text-primary text-xl">📞</span>
                <div>
                  <p className="text-xs text-base-content/50 font-bold uppercase">Call Us</p>
                  <p className="text-base-content/90 font-semibold">+880 1234-567890</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-base-200/50 border border-base-200">
                <span className="text-primary text-xl">📍</span>
                <div>
                  <p className="text-xs text-base-content/50 font-bold uppercase">Our Office</p>
                  <p className="text-base-content/90 font-semibold">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Form column */}
        <div className="lg:col-span-7">
          <Card className="p-8" hoverable>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Your Name"
                type="text"
                placeholder="John Doe"
                leftIcon={<FaUser />}
                error={errors.name?.message}
                disabled={isSubmitting}
                required
                {...register("name")}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="mail@example.com"
                leftIcon={<FaEnvelope />}
                error={errors.email?.message}
                disabled={isSubmitting}
                required
                {...register("email")}
              />

              <Input
                label="Subject"
                type="text"
                placeholder="How can we help?"
                leftIcon={<FaPen />}
                error={errors.subject?.message}
                disabled={isSubmitting}
                required
                {...register("subject")}
              />

              <div className="form-control w-full">
                <label className="label pb-1">
                  <span className="label-text font-bold text-base-content/80 text-sm">
                    Message <span className="text-error font-bold">*</span>
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-base-content/50 pointer-events-none">
                    <FaCommentDots />
                  </span>
                  <textarea
                    placeholder="Write your message here..."
                    className={`textarea w-full pl-11 min-h-[120px] bg-base-200/50 border-base-300 rounded-xl transition-all duration-300 shadow-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 ${errors.message ? 'border-error ring-2 ring-error/10 bg-error/5' : ''}`}
                    disabled={isSubmitting}
                    {...register("message")}
                  />
                </div>
                {errors.message && (
                  <p className="text-error text-xs font-semibold mt-1.5 flex items-center gap-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  Send Message
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
