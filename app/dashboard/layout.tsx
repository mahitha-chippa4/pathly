import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { checkOnboardingState } from "@/lib/onboarding";
import { ExportButton } from "@/components/ExportButton";
import { Sparkles, LayoutDashboard, Target, BookOpen, Code, Settings, LogOut, Briefcase } from "lucide-react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const state = await checkOnboardingState("/dashboard");
  if (!state) return null;
  const { session } = state;

  const userName = session.user?.name || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-pathly-bg text-pathly-primary flex print:block print:bg-white">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-pathly-primary/10 flex flex-col fixed h-full z-20 print:hidden">
        <div className="h-20 flex items-center px-8 border-b border-pathly-primary/5">
          <Link href="/" className="font-black text-2xl tracking-tighter flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-pathly-primary" />
            PATHLY.
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-8 px-4 flex flex-col gap-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-pathly-lavender/50 text-pathly-primary font-bold">
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </Link>
          <Link href="/dashboard/roadmap" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-pathly-primary/5 text-pathly-primary/70 font-bold transition-colors">
            <Target className="w-5 h-5" />
            Roadmap
          </Link>
          <Link href="/dashboard/courses" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-pathly-primary/5 text-pathly-primary/70 font-bold transition-colors">
            <BookOpen className="w-5 h-5" />
            Courses
          </Link>
          <Link href="/dashboard/projects" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-pathly-primary/5 text-pathly-primary/70 font-bold transition-colors">
            <Briefcase className="w-5 h-5" />
            Projects
          </Link>
          <Link href="/dashboard/practice" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-pathly-primary/5 text-pathly-primary/70 font-bold transition-colors">
            <Code className="w-5 h-5" />
            Practice
          </Link>
        </div>
        <div className="p-4 border-t border-pathly-primary/5 flex flex-col gap-2">
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-pathly-primary/5 text-pathly-primary/70 font-bold transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
          <Link href="/api/auth/signout" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 font-bold transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 flex flex-col print:ml-0 print:block">
        <header className="h-20 bg-white/50 backdrop-blur-md border-b border-pathly-primary/10 flex items-center justify-between px-8 sticky top-0 z-10 print:hidden">
          <div className="font-bold text-lg">Good morning, {userName.split(" ")[0]}! 👋</div>
          <div className="flex items-center gap-4">
            <ExportButton />
            {session.user?.image ? (
              <img src={session.user.image} alt={userName} className="w-10 h-10 rounded-full border-2 border-pathly-primary/10" />
            ) : (
              <div className="w-10 h-10 bg-pathly-mint rounded-full flex items-center justify-center font-black">
                {userInitial}
              </div>
            )}
          </div>
        </header>
        <div className="p-8 print:p-0">
          {children}
        </div>
      </main>
    </div>
  );
}
