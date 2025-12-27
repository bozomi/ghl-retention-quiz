'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import StepDecision from '@/components/StepDecision';
import StepReason from '@/components/StepReason';
import { CheckCircle2 } from 'lucide-react';

export default function QuizWrapper() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || undefined;

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [decision, setDecision] = useState<'stay' | 'leave' | null>(null);

    const handleDecision = async (choice: 'stay' | 'leave') => {
        setDecision(choice);
        if (choice === 'stay') {
            setLoading(true);
            try {
                await fetch('/api/submit', {
                    method: 'POST',
                    body: JSON.stringify({ decision: 'stay', email }),
                    headers: { 'Content-Type': 'application/json' }
                });
                setCompleted(true);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        } else {
            setStep(2);
        }
    };

    const handleReasonSubmit = async (reason: string) => {
        setLoading(true);
        try {
            await fetch('/api/submit', {
                method: 'POST',
                body: JSON.stringify({ decision: 'leave', reason, email }),
                headers: { 'Content-Type': 'application/json' }
            });
            setCompleted(true);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    if (completed) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 md:p-12 rounded-[2rem] text-center max-w-md w-full shadow-2xl border border-slate-100 mx-auto"
            >
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 p-4 rounded-full">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Thank You!</h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                    {decision === 'stay'
                        ? 'We are thrilled to continue our partnership. Check your email for next steps.'
                        : 'Your subscription has been cancelled. We appreciate your feedback.'}
                </p>
                <div className="mt-8 pt-6 border-t border-slate-100">
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                        Secure & Encrypted
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden relative">
                <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600 top-0 absolute"></div>

                <div className="p-8 md:p-10">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.25 }}
                            >
                                <StepDecision onDecide={handleDecision} loading={loading} />
                            </motion.div>
                        )}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.25 }}
                            >
                                <StepReason onSubmit={handleReasonSubmit} loading={loading} onBack={() => setStep(1)} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Trust Badges */}
                <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-center items-center gap-6">
                    <div className="flex items-center gap-1.5 opacity-70">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        <span className="text-xs font-semibold text-slate-500">Secure & Encrypted</span>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-70">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="text-xs font-semibold text-slate-500">Privacy Protected</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
