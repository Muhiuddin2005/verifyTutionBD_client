import { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Swal from 'sweetalert2';
import { FiMessageSquare, FiAlertCircle } from 'react-icons/fi';

const FAQ_ITEMS = [
    {
        q: "How does the verification system work for tutors?",
        a: "Every tutor registered on verifyTutionBD must submit official proof of identity (NID) and academic certificates. Our backend administration verifies these documents before approving their profile as a verified tutor."
    },
    {
        q: "Is there any charge for posting a tuition requirement?",
        a: "No! Posting a tuition requirement is 100% free for students and parents. You only pay the tutor salary once a tutor has been finalized and verified."
    },
    {
        q: "How do I make a payment?",
        a: "Payments are processed securely via Stripe. In your student dashboard, navigate to the Payments section, choose the pending tuition/application, and complete the checkout session securely using your credit or debit card."
    },
    {
        q: "What should I do if a tutor doesn't show up?",
        a: "Please report any incidents directly through this support page or email support@verifytutionbd.com. We have a strict cancellation and tutor suspension policy to guarantee learning safety."
    }
];

const Support = () => {
    const [faqOpen, setFaqOpen] = useState(null);

    const toggleFaq = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    const handleTicketSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Support Ticket Submitted',
            text: 'Your query has been logged. Our customer support agent will email you within 24 hours.',
            confirmButtonColor: '#3B82F6'
        });
        e.target.reset();
    };

    return (
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 font-inter">
            {/* Header section */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-tight">Help & Support</h1>
                <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                    Find immediate answers to common questions or raise a ticket to contact our operations team.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* FAQs Accordion */}
                <div className="lg:col-span-7 space-y-4">
                    <h2 className="text-2xl font-bold text-base-content mb-6 flex items-center gap-2">
                        <FiAlertCircle className="text-primary" /> Frequently Asked Questions
                    </h2>
                    {FAQ_ITEMS.map((item, idx) => (
                        <div key={idx} className="collapse collapse-plus bg-base-100 rounded-2xl border border-base-200 shadow-sm">
                            <input 
                                type="radio" 
                                name="faq-accordion" 
                                checked={faqOpen === idx} 
                                onChange={() => toggleFaq(idx)} 
                                className="cursor-pointer"
                            /> 
                            <div 
                                className="collapse-title text-base font-bold text-base-content hover:text-primary transition-colors cursor-pointer"
                                onClick={() => toggleFaq(idx)}
                            >
                                {item.q}
                            </div>
                            <div className="collapse-content text-sm text-base-content/70 leading-relaxed"> 
                                <p>{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Raise Ticket Form */}
                <div className="lg:col-span-5">
                    <Card className="p-8 shadow-lg border border-base-200">
                        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                            <FiMessageSquare /> Raise a Ticket
                        </h2>
                        <form onSubmit={handleTicketSubmit} className="space-y-4">
                            <Input 
                                id="support-name"
                                label="Full Name"
                                placeholder="Your Name"
                                required
                            />
                            <Input 
                                id="support-email"
                                type="email"
                                label="Email Address"
                                placeholder="name@domain.com"
                                required
                            />
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-semibold text-base-content">Your Query / Issue</span>
                                </label>
                                <textarea 
                                    className="textarea textarea-bordered w-full h-28 bg-base-100 rounded-xl"
                                    placeholder="Describe your issue or query..."
                                    required
                                ></textarea>
                            </div>
                            <Button type="submit" variant="primary" className="w-full mt-4">
                                Submit Ticket
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Support;
