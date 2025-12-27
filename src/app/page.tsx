import { Suspense } from 'react';
import QuizWrapper from '@/components/QuizWrapper';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 md:p-6">
      <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
        <QuizWrapper />
      </Suspense>
    </main>
  );
}
