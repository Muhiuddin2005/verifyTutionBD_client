import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import TuitionCard from '../../components/TuitionCard';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import { FaBook, FaMapMarkerAlt, FaClock, FaStar, FaRegStar, FaInfoCircle } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const TuitionDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [role] = useRole();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    // Fetch tuition details
    const { data: tuition = {}, isLoading } = useQuery({
        queryKey: ['tuition', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tuitions/${id}`);
            return res.data;
        }
    });

    // Fetch applications for this tuition (only if logged in)
    const { data: applications = [], refetch: refetchApps } = useQuery({
        queryKey: ['tuition-apps', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/my-tuition-apps/${id}`);
            return res.data;
        },
        enabled: !!user
    });

    // Fetch related tuitions (matching subject)
    const { data: relatedTuitionsData = {} } = useQuery({
        queryKey: ['related-tuitions', tuition?.subject, id],
        enabled: !!tuition?.subject,
        queryFn: async () => {
            const res = await axiosPublic.get(`/tuitions?subject=${tuition.subject}&limit=4`);
            return res.data;
        }
    });

    const relatedTuitions = (relatedTuitionsData.tuitions || []).filter(t => t._id !== id).slice(0, 3);
    const hasApplied = applications.some(app => app.tutorEmail === user?.email);

    // Subject base images for the slider
    const getSubjectImages = (subj) => {
        const s = subj?.toLowerCase() || '';
        if (s.includes('math')) {
            return [
                'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=700&q=75',
                'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=700&q=75',
                'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=700&q=75'
            ];
        }
        if (s.includes('physic') || s.includes('science') || s.includes('chem')) {
            return [
                'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=700&q=75',
                'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=700&q=75',
                'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=700&q=75'
            ];
        }
        return [
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=700&q=75',
            'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=700&q=75',
            'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=700&q=75'
        ];
    };

    const handleApplySubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        const applicationData = {
            tuitionId: tuition._id,
            tutorEmail: user?.email,
            tutorName: user?.displayName,
            tutorImage: user?.photoURL,
            qualifications: form.qualifications.value,
            experience: form.experience.value,
            expectedSalary: parseFloat(form.expectedSalary.value)
        };

        try {
            const res = await axiosSecure.post('/applications', applicationData);
            if (res.data.insertedId) {
                document.getElementById('apply_modal').close();
                Swal.fire({
                    icon: 'success',
                    title: 'Applied Successfully!',
                    text: 'Your application has been submitted to the student.',
                    showConfirmButton: false,
                    timer: 2000
                });
                refetchApps();
            }
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'Failed to apply', 'error');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner text-primary loading-lg"></span>
            </div>
        );
    }

    const sliderImages = getSubjectImages(tuition.subject);

    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Image Slider & Requirements */}
                <div className="lg:col-span-8 space-y-8">
                    
                    {/* Media Section: Image Gallery/Slider */}
                    <div className="rounded-2xl overflow-hidden shadow-lg border border-base-200 h-[300px] sm:h-[400px] relative">
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3500 }}
                            className="h-full w-full"
                        >
                            {sliderImages.map((imgUrl, idx) => (
                                <SwiperSlide key={idx}>
                                    <img 
                                        src={imgUrl} 
                                        alt={`Slide ${idx + 1}`} 
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="absolute top-4 left-4 z-10">
                            <Badge variant="primary" size="lg">
                                {tuition.classLevel}
                            </Badge>
                        </div>
                    </div>

                    {/* Tuition Information Details */}
                    <Card className="p-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-base-200 pb-6 mb-6">
                            <div>
                                <h1 className="text-3xl font-extrabold text-primary mb-2 tracking-tight">
                                    {tuition.title}
                                </h1>
                                <p className="text-sm text-base-content/60 font-medium">
                                    Posted by: <span className="font-bold text-base-content/85">{tuition.studentName || 'Student'}</span>
                                </p>
                            </div>
                            <div className="text-left md:text-right bg-primary/5 p-4 rounded-2xl border border-primary/10 min-w-[150px]">
                                <span className="block text-xs font-bold text-base-content/50 uppercase tracking-wider mb-1">Budget</span>
                                <span className="text-2xl font-extrabold text-primary">৳ {tuition.budget}</span>
                                <span className="text-xs text-base-content/60 font-bold block mt-0.5">/ month</span>
                            </div>
                        </div>

                        {/* Specifications Grid */}
                        <h3 className="text-xl font-bold mb-4 text-base-content tracking-tight">
                            Key Specifications
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-base-200/50 p-4 rounded-xl border border-base-200">
                                <span className="block text-xs font-bold text-base-content/50 uppercase mb-1.5 flex items-center gap-1.5">
                                    <FaBook className="text-secondary" /> Subject
                                </span>
                                <span className="font-bold text-base-content">{tuition.subject}</span>
                            </div>
                            <div className="bg-base-200/50 p-4 rounded-xl border border-base-200">
                                <span className="block text-xs font-bold text-base-content/50 uppercase mb-1.5 flex items-center gap-1.5">
                                    <FaMapMarkerAlt className="text-secondary" /> Location
                                </span>
                                <span className="font-bold text-base-content truncate block" title={tuition.location}>{tuition.location}</span>
                            </div>
                            <div className="bg-base-200/50 p-4 rounded-xl border border-base-200">
                                <span className="block text-xs font-bold text-base-content/50 uppercase mb-1.5 flex items-center gap-1.5">
                                    <FaClock className="text-secondary" /> Timing / Frequency
                                </span>
                                <span className="font-bold text-base-content">{tuition.daysPerWeek || '3'} Days / Week</span>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-3 text-base-content tracking-tight">
                            Description / Overview
                        </h3>
                        <p className="text-base-content/80 whitespace-pre-line text-sm leading-relaxed mb-8">
                            {tuition.description}
                        </p>

                        {/* Public Apply Action Prompt */}
                        <div className="border-t border-base-200 pt-6">
                            {!user ? (
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-primary/5 p-5 rounded-2xl border border-primary/10">
                                    <span className="text-sm text-base-content/80 font-semibold flex items-center gap-2">
                                        <FaInfoCircle className="text-primary text-lg" /> Are you a qualified tutor? Log in to apply for this job.
                                    </span>
                                    <Link to="/auth/login" className="w-full sm:w-auto">
                                        <Button size="md" className="w-full">
                                            Log In to Apply
                                        </Button>
                                    </Link>
                                </div>
                            ) : role === 'tutor' && tuition.status === 'approved' ? (
                                <div className="flex justify-end">
                                    <Button
                                        onClick={() => document.getElementById('apply_modal').showModal()}
                                        disabled={hasApplied}
                                        className="px-10 py-3 text-base"
                                    >
                                        {hasApplied ? 'Already Applied' : 'Apply for this Class'}
                                    </Button>
                                </div>
                            ) : null}
                        </div>
                    </Card>

                    {/* Reviews / Ratings Section */}
                    <Card className="p-8">
                        <h3 className="text-xl font-bold mb-6 text-base-content tracking-tight">
                            Platform Safety & Reviews
                        </h3>
                        
                        <div className="flex items-center gap-6 mb-8 bg-base-200/40 p-5 rounded-2xl border border-base-200">
                            <div className="text-center">
                                <div className="text-4xl font-extrabold text-primary mb-1">4.9</div>
                                <div className="flex justify-center text-accent mb-1.5">
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                </div>
                                <span className="text-xs text-base-content/50 font-bold uppercase">Verified Score</span>
                            </div>
                            <div className="border-l border-base-300 pl-6 text-xs text-base-content/70 leading-relaxed">
                                Our community ensures full identity validation for all posted student requirements. Standard contracts guarantee safe Escrow class payment and dispute moderation for both educators and students.
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-base-100 border border-base-200 rounded-xl space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-sm text-base-content">Tutor K. Rahman</span>
                                    <div className="flex text-accent text-xs">
                                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                    </div>
                                </div>
                                <p className="text-xs text-base-content/75 leading-relaxed">
                                    "I taught this student Math previously. Outstanding response, timely homework support, and a highly cooperative learning environment."
                                </p>
                            </div>
                            <div className="p-4 bg-base-100 border border-base-200 rounded-xl space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-sm text-base-content">Student Parent Sabrina</span>
                                    <div className="flex text-accent text-xs">
                                        <FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar />
                                    </div>
                                </div>
                                <p className="text-xs text-base-content/75 leading-relaxed">
                                    "Using verifyTutionBD has completely automated our process. We found a verified math tutor in just 3 days. Highly secure."
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
                
                {/* Right Column: Related Tuitions */}
                <div className="lg:col-span-4 space-y-6">
                    <h3 className="text-xl font-bold text-base-content tracking-tight">
                        Related Tuitions
                    </h3>
                    {relatedTuitions.length > 0 ? (
                        <div className="flex flex-col gap-6">
                            {relatedTuitions.map(rel => (
                                <TuitionCard key={rel._id} tuition={rel} />
                            ))}
                        </div>
                    ) : (
                        <Card className="p-6 text-center text-sm text-base-content/60 border border-base-200">
                            No related tuition opportunities available at this time.
                        </Card>
                    )}
                </div>

            </div>

            {/* Application Dialog Modal */}
            <dialog id="apply_modal" className="modal">
                <div className="modal-box max-w-lg rounded-2xl bg-base-100 border border-base-200 p-6">
                    <h3 className="font-extrabold text-2xl text-primary mb-4 tracking-tight">Apply for Tuition</h3>
                    <form onSubmit={handleApplySubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Tutor Name"
                                type="text"
                                value={user?.displayName || ''}
                                readOnly
                                disabled
                            />
                            <Input
                                label="Tutor Email"
                                type="email"
                                value={user?.email || ''}
                                readOnly
                                disabled
                            />
                        </div>
                        <Input
                            label="Your Qualifications"
                            name="qualifications"
                            type="text"
                            placeholder="e.g., BSc in CSE from DU"
                            required
                        />
                        <Input
                            label="Teaching Experience"
                            name="experience"
                            type="text"
                            placeholder="e.g., 2+ years tuition experience"
                            required
                        />
                        <Input
                            label="Expected Salary (BDT)"
                            name="expectedSalary"
                            type="number"
                            defaultValue={tuition.budget}
                            required
                        />
                        
                        <div className="modal-action gap-3">
                            <Button type="button" variant="outline" onClick={() => document.getElementById('apply_modal').close()}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                Submit Application
                            </Button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default TuitionDetails;
