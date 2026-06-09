import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, UploadCloud, Activity } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function WelcomeBackPage() {
  const session = await auth();
  const userName = session?.user?.name?.split(" ")[0] || "there";

  async function startNewAnalysis() {
    "use server";
    const sessionAuth = await auth();
    if (!sessionAuth?.user?.id) return;

    await prisma.profile.update({
      where: { user_id: sessionAuth.user.id },
      data: {
        onboarding_complete: false,
        resume_url: null,
        target_role: null,
      }
    });

    await prisma.analysis.deleteMany({
      where: { user_id: sessionAuth.user.id }
    });
    
    // Also reset all project progress so they get a fresh roadmap
    await prisma.userProjectProgress.deleteMany({
      where: { userId: sessionAuth.user.id }
    });

    redirect("/onboarding/upload-resume");
  }

  return (
    <div className="min-h-screen bg-pathly-bg text-pathly-primary flex flex-col p-6 selection:bg-pathly-lavender">
      <header className="h-20 flex items-center px-4">
        <Link href="/" className="font-black text-2xl tracking-tighter flex items-center gap-2">
          pathly.
          <Sparkles className="w-6 h-6 text-pathly-primary" />
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            Welcome back, {userName}.
          </h1>
          <p className="text-xl opacity-70 font-medium max-w-2xl mx-auto">
            Your career roadmap is waiting for you. Would you like to pick up where you left off, or run a new analysis?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Option 1: Continue */}
          <Link 
            href="/dashboard"
            className="group relative bg-white rounded-[3rem] p-10 shadow-sm border border-pathly-primary/10 hover:shadow-2xl hover:border-pathly-primary/20 transition-all flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay rounded-[3rem] pointer-events-none"></div>
            
            <div className="w-20 h-20 bg-pathly-lavender rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Activity className="w-10 h-10 text-pathly-primary" />
            </div>
            
            <h2 className="text-3xl font-black mb-4">Continue Previous Analysis</h2>
            <p className="text-lg opacity-70 font-medium mb-12 flex-1">
              Go straight to your dashboard. View your active roadmap, recommended courses, and project milestones.
            </p>
            
            <div className="flex items-center text-pathly-primary font-black text-xl group-hover:translate-x-2 transition-transform">
              Go to Dashboard <ArrowRight className="ml-3 w-6 h-6" />
            </div>
          </Link>

          {/* Option 2: New Resume */}
          <form action={startNewAnalysis} className="flex flex-col h-full">
            <button 
              type="submit"
              className="group relative bg-pathly-primary text-white rounded-[3rem] p-10 shadow-xl hover:shadow-2xl transition-all flex flex-col overflow-hidden text-left h-full"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-pathly-peach rounded-full blur-3xl opacity-20 -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform backdrop-blur-sm">
                <UploadCloud className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-black mb-4">Run New Analysis</h2>
              <p className="text-lg text-white/70 font-medium mb-12 flex-1 relative z-10">
                Upload a new resume or select a different target role. This will generate a completely fresh roadmap for you.
              </p>
              
              <div className="flex items-center text-white font-black text-xl group-hover:translate-x-2 transition-transform relative z-10">
                Upload New Resume <ArrowRight className="ml-3 w-6 h-6" />
              </div>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
