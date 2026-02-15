"use client";

import { useState } from "react";
import { GlassButton } from "@/components/ui/GlassButton";
import { Mail, MessageSquare, User, Send, CheckCircle, CheckCircle2, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { AuthSplitLayout } from "@/components/auth/AuthSplitLayout";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    // Marketing Content for Left Panel
    const marketingContent = (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
            >
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Quick Response</h3>
                            <p className="text-sm text-gray-400">Within 24 Hours</p>
                        </div>
                    </div>
                    <p className="text-lg text-gray-300 italic mb-4">
                        "The SkillSync team responded to my university partnership inquiry within hours. Professional and helpful!"
                    </p>
                    <p className="font-bold text-white">— Dr. Silva, University Partner</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
            >
                <div className="flex items-center gap-3 text-white/80">
                    <Mail className="w-5 h-5" />
                    <div>
                        <p className="text-sm text-gray-400">Email us at</p>
                        <p className="font-semibold text-white">contact@skillsync.lk</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                    <Phone className="w-5 h-5" />
                    <div>
                        <p className="text-sm text-gray-400">Support Line</p>
                        <p className="font-semibold text-white">+94 11 234 5678</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );

    return (
        <AuthSplitLayout marketingContent={marketingContent}>
            {isSubmitted ? (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">
                        Message Sent!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for contacting us. We'll get back to you soon.
                    </p>
                    <GlassButton
                        variant="primary"
                        className="bg-blue-600 hover:bg-blue-700 text-white border-none"
                        onClick={() => setIsSubmitted(false)}
                    >
                        Send Another Message
                    </GlassButton>
                </motion.div>
            ) : (
                <>
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Get in Touch</h1>
                        <p className="text-gray-500">
                            Have questions about SkillSync? We'd love to hear from you.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
                                Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full h-11 pl-10 pr-4 py-2.5 bg-gray-50 border-2 border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:outline-none shadow-sm transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full h-11 pl-10 pr-4 py-2.5 bg-gray-50 border-2 border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:outline-none shadow-sm transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Subject */}
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-700">
                                Subject
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MessageSquare className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    placeholder="How can we help?"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full h-11 pl-10 pr-4 py-2.5 bg-gray-50 border-2 border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:outline-none shadow-sm transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                placeholder="Tell us more about your inquiry..."
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:outline-none shadow-sm transition-all resize-none"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <GlassButton
                            type="submit"
                            variant="primary"
                            className="w-full py-4 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 border-none"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                            ) : (
                                "Send Message"
                            )}
                        </GlassButton>
                    </form>
                </>
            )}
        </AuthSplitLayout>
    );
}
