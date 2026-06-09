import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Target, CheckCircle2, TrendingUp, BookOpen, Code, Clock, ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { DashboardCharts } from "@/components/DashboardCharts"; // Client Component for charts

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch from Prisma
  const profile = await prisma.profile.findUnique({
    where: { user_id: session.user.id }
  });

  const analysis = await prisma.analysis.findUnique({
    where: { user_id: session.user.id }
  });

  // Empty state handling
  if (!profile || !analysis || !analysis.roadmap) {
    redirect("/onboarding");
  }

  const role = profile.target_role || "your target role";
  const matchScore = analysis.role_match_score || 0;
  const readinessScore = analysis.readiness_score || 0;
  
  let roadmap: any = {};
  try {
    roadmap = JSON.parse(analysis.roadmap);
  } catch(e) {}

  let foundSkills: string[] = [];
  let missingSkills: string[] = [];
  try {
    const rawRecs = JSON.parse(analysis.recommendations || "[]");
    // Just extract dummy or real values from DB
    foundSkills = JSON.parse(profile.skills || "[]").map((s: any) => s.name || s).slice(0, 5);
    missingSkills = rawRecs.map((r: any) => r.skill || r).slice(0, 5);
  } catch(e) {}

  if (foundSkills.length === 0) foundSkills = ["Python", "SQL", "Git"];
  if (missingSkills.length === 0) missingSkills = ["System Design", "Cloud Native", "Advanced Algorithms"];

  const skillData = [
    ...foundSkills.slice(0, 3).map((s: string) => ({ subject: s, A: 90, fullMark: 100 })),
    ...missingSkills.slice(0, 3).map((s: string) => ({ subject: s, A: 20, fullMark: 100 })),
  ];
  if (skillData.length < 3) {
      skillData.push({ subject: 'Python', A: 90, fullMark: 100 }, { subject: 'SQL', A: 85, fullMark: 100 });
  }

  const recommendedProjects = roadmap.recommended_projects || [];
  const milestones = roadmap.milestones || [];
  const codingQuestions = roadmap.coding_questions || [];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Welcome Hero / Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 bg-pathly-primary text-white rounded-[2rem] p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="z-10">
            <h2 className="text-4xl font-black mb-4">You're making great progress!</h2>
            <p className="text-lg opacity-80 font-medium max-w-md mb-8">
              Based on your resume, you have a strong foundation in {foundSkills.slice(0, 2).join(" and ")}. Let's focus on {missingSkills[0] || "Advanced Topics"} to get you ready for the {role} role.
            </p>
            <div className="flex gap-4">
              <Link href="/dashboard/roadmap" className={buttonVariants({ className: "bg-pathly-lavender text-pathly-primary hover:bg-white rounded-full px-6 font-bold" })}>
                Continue Roadmap
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-pathly-mint rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-sm">
          <Target className="w-12 h-12 text-pathly-primary mb-4" />
          <div className="text-sm font-bold uppercase tracking-widest opacity-60 mb-2">Role Match</div>
          <div className="text-6xl font-black text-pathly-primary mb-2">{matchScore}%</div>
          <p className="text-sm font-medium opacity-80">{role}</p>
        </div>
      </div>

      {/* Radar Chart & Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-pathly-primary/10 rounded-[2rem] p-8 shadow-sm">
          <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-pathly-primary" />
            Skill Gap Analysis
          </h3>
          <div className="h-[300px] w-full">
             <DashboardCharts skillData={skillData} />
          </div>
        </div>

        <div className="bg-white border border-pathly-primary/10 rounded-[2rem] p-8 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black mb-6">Career Readiness</h3>
            <div className="flex items-end gap-4 mb-8">
              <span className="text-7xl font-black text-pathly-primary">{readinessScore}</span>
              <span className="text-xl font-bold text-pathly-primary/50 mb-2">/ 100</span>
            </div>
            
            <div className="space-y-4">
              <div className="bg-pathly-bg rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">{foundSkills[0] || "Foundational Skills"}</h4>
                  <p className="text-sm opacity-70">Strong match from your resume.</p>
                </div>
              </div>
              <div className="bg-pathly-bg rounded-xl p-4 flex items-center gap-4 border border-pathly-pink/50">
                <div className="w-10 h-10 bg-pathly-pink/50 text-red-600 rounded-full flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">{missingSkills[0] || "Missing Skills"}</h4>
                  <p className="text-sm opacity-70">Critical gap to focus on.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <h3 className="text-3xl font-black mt-12 mb-6">Your Action Plan</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Projects */}
        <div className="bg-pathly-peach rounded-[2rem] p-8 shadow-sm flex flex-col h-full">
          <Code className="w-10 h-10 mb-6" />
          <h4 className="text-xl font-black mb-2">Projects</h4>
          <p className="text-sm font-medium opacity-80 mb-6 flex-1">Build projects to prove your skills.</p>
          {recommendedProjects.map((proj: any, idx: number) => (
             <div key={idx} className="bg-white/50 rounded-xl p-4 mb-4">
               <div className="font-bold text-sm">{proj.title}</div>
               <div className="text-xs opacity-70 mt-1">{(proj.technologies || []).join(", ")}</div>
             </div>
          ))}
          <Link href="/dashboard/roadmap" className={buttonVariants({ variant: "ghost", className: "w-full font-bold justify-between px-0 hover:bg-transparent hover:opacity-70 mt-auto" })}>
            View all projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Courses */}
        <div className="bg-pathly-lavender rounded-[2rem] p-8 shadow-sm flex flex-col h-full">
          <BookOpen className="w-10 h-10 mb-6" />
          <h4 className="text-xl font-black mb-2">Courses</h4>
          <p className="text-sm font-medium opacity-80 mb-6 flex-1">Learn to close your skill gaps.</p>
          {milestones[0] && (
            <div className="bg-white/50 rounded-xl p-4 mb-4">
              <div className="font-bold text-sm">{milestones[0]?.resources[0]?.title || milestones[0]?.title || "Fundamentals"}</div>
              <div className="text-xs opacity-70 mt-1">{milestones[0]?.resources[0]?.platform || "YouTube"}</div>
            </div>
          )}
          <Link href="/dashboard/courses" className={buttonVariants({ variant: "ghost", className: "w-full font-bold justify-between px-0 hover:bg-transparent hover:opacity-70 mt-auto" })}>
            View all courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Practice */}
        <div className="bg-white border border-pathly-primary/10 rounded-[2rem] p-8 shadow-sm flex flex-col h-full">
          <Clock className="w-10 h-10 mb-6 text-pathly-primary" />
          <h4 className="text-xl font-black mb-2">Practice</h4>
          <p className="text-sm font-medium opacity-80 mb-6 flex-1">Daily coding questions to prep.</p>
          {codingQuestions.slice(0,1).map((q: any, idx: number) => (
              <div key={idx} className="bg-pathly-bg rounded-xl p-4 mb-4">
                <div className="font-bold text-sm flex justify-between">
                  {q.title}
                  <span className="text-green-600 bg-green-100 px-2 py-0.5 rounded text-xs">{q.difficulty}</span>
                </div>
                <div className="text-xs opacity-70 mt-1">{q.topic}</div>
              </div>
          ))}
          <Link href="/dashboard/practice" className={buttonVariants({ variant: "ghost", className: "w-full font-bold justify-between px-0 hover:bg-transparent hover:opacity-70 mt-auto" })}>
            View practice plan <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
