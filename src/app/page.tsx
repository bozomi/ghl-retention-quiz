import QuizWrapper from '@/components/QuizWrapper';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[100%] bg-blue-100/50 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-indigo-100/40 rounded-full blur-[150px]" />
      </div>

      <div className="z-10 w-full">
        {/* Main Content is now all inside QuizWrapper which has the Card */}
        <QuizWrapper />
      </div>
    </main>
  );
}
