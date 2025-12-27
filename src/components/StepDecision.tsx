'use client';

import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

interface StepDecisionProps {
    onDecide: (choice: 'stay' | 'leave') => void;
    loading: boolean;
}

export default function StepDecision({ onDecide, loading }: StepDecisionProps) {
    return (
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
                Virtual Blue
            </h2>
            <p className="text-slate-500 mb-8 font-medium">
                As your promotional period is set to conclude in 3 days, would you like to activate your standard monthly management plan?
            </p>

            <div className="grid grid-cols-1 gap-4">
                <button
                    onClick={() => onDecide('stay')}
                    disabled={loading}
                    className={clsx(
                        "group relative flex items-center w-full p-5 rounded-xl border-2 transition-all duration-200",
                        "bg-white border-slate-200 hover:border-indigo-600 hover:shadow-md",
                        "text-left"
                    )}
                >
                    <div className="flex-shrink-0 mr-4">
                        <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-indigo-600 bg-white group-hover:bg-indigo-50 transition-colors" />
                    </div>
                    <div>
                        <span className="block text-xl font-bold text-slate-800 group-hover:text-indigo-900">
                            Yes, Activate Monthly Plan
                        </span>
                    </div>
                </button>

                <button
                    onClick={() => onDecide('leave')}
                    disabled={loading}
                    className={clsx(
                        "group relative flex items-center w-full p-5 rounded-xl border-2 transition-all duration-200",
                        "bg-white border-slate-200 hover:border-indigo-600 hover:shadow-md",
                        "text-left"
                    )}
                >
                    <div className="flex-shrink-0 mr-4">
                        <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-indigo-600 bg-white group-hover:bg-indigo-50 transition-colors" />
                    </div>
                    <div>
                        <span className="block text-xl font-bold text-slate-800 group-hover:text-indigo-900">
                            No, Cancel Subscription
                        </span>
                    </div>
                </button>
            </div>

            {loading && (
                <div className="absolute inset-0 bg-white/80 rounded-[2rem] flex items-center justify-center z-50">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                </div>
            )}
        </div>
    );
}
