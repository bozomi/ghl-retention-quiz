'use client';

import { useState } from 'react';
import { ArrowLeft, Send, Loader2 } from 'lucide-react';

interface StepReasonProps {
    onSubmit: (reason: string) => void;
    onBack: () => void;
    loading: boolean;
}

const REASONS = [
    "Price is too high",
    "Not satisfied with results",
    "Lack of technical support",
    "Using another platform",
    "Temporarily pausing business"
];

export default function StepReason({ onSubmit, onBack, loading }: StepReasonProps) {
    const [selectedReason, setSelectedReason] = useState<string>('');
    const [customReason, setCustomReason] = useState('');

    const handleSubmit = () => {
        const finalReason = selectedReason === 'Other' ? customReason : selectedReason;
        if (finalReason.trim()) {
            onSubmit(finalReason);
        }
    };

    return (
        <div className="relative text-left">
            <button
                onClick={onBack}
                className="mb-4 text-slate-400 hover:text-slate-600 transition-colors flex items-center text-sm font-semibold"
            >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </button>

            <h2 className="text-2xl font-extrabold text-slate-900 mb-6 text-center">
                We&apos;re sorry to see you go.<br />
                <span className="text-lg font-medium text-slate-500">Please tell us why you are leaving:</span>
            </h2>

            <div className="space-y-3 mb-6">
                {REASONS.map((reason) => (
                    <label
                        key={reason}
                        className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedReason === reason
                            ? 'border-indigo-600 bg-indigo-50 shadow-sm'
                            : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'
                            }`}
                    >
                        <input
                            type="radio"
                            name="reason"
                            value={reason}
                            checked={selectedReason === reason}
                            onChange={(e) => setSelectedReason(e.target.value)}
                            className="w-5 h-5 accent-indigo-600 mr-3"
                        />
                        <span className={`text-lg font-medium ${selectedReason === reason ? 'text-indigo-900' : 'text-slate-700'}`}>
                            {reason}
                        </span>
                    </label>
                ))}

                <label
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedReason === 'Other'
                        ? 'border-indigo-600 bg-indigo-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'
                        }`}
                >
                    <input
                        type="radio"
                        name="reason"
                        value="Other"
                        checked={selectedReason === 'Other'}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="w-5 h-5 accent-indigo-600 mr-3"
                    />
                    <span className={`text-lg font-medium ${selectedReason === 'Other' ? 'text-indigo-900' : 'text-slate-700'}`}>
                        Other...
                    </span>
                </label>
            </div>

            {selectedReason === 'Other' && (
                <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Please tell us a bit more..."
                    className="w-full bg-white border-2 border-slate-200 rounded-xl p-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 mb-6 h-32 resize-none"
                />
            )}

            <button
                onClick={handleSubmit}
                disabled={loading || !selectedReason || (selectedReason === 'Other' && !customReason.trim())}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-indigo-200 active:scale-[0.98]"
            >
                {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                    <>
                        Confirm Cancellation <Send className="w-5 h-5 ml-2" />
                    </>
                )}
            </button>

            {loading && (
                <div className="absolute inset-0 bg-white/80 rounded-[2rem] flex items-center justify-center z-50">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                </div>
            )}
        </div>
    );
}
