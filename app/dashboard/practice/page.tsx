import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getRecommendedProblems } from "@/lib/recommendations";
import { Code, Flame, Target, ExternalLink } from "lucide-react";
import { SolveButton } from "@/components/SolveButton";

export default async function PracticePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch Personalized Problems
  const problems = await getRecommendedProblems(session.user.id);

  // Fetch today's progress
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const userProgress = await prisma.userProblemProgress.count({
    where: {
      userId: session.user.id,
      status: "Solved",
      updated_at: { gte: today }
    }
  });

  // Group by topic
  const groupedProblems = problems.reduce((acc: any, p: any) => {
    if (!acc[p.topic]) acc[p.topic] = [];
    acc[p.topic].push(p);
    return acc;
  }, {});

  // Determine Daily Goal
  const dailyGoal = 4;
  const progressCount = userProgress;
  
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2">Practice Hub</h1>
          <p className="text-lg opacity-70 font-medium">Your personalized daily DSA challenges.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-orange-100 text-orange-600 px-6 py-3 rounded-2xl font-bold flex flex-col items-center shadow-sm min-w[100px]">
            <Flame className="w-6 h-6 mb-1" />
            <span className="text-sm">0 Day Streak</span>
          </div>
        </div>
      </div>

      {/* Daily Goal Card */}
      <div className="bg-pathly-primary text-white rounded-[2rem] p-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-pathly-mint" />
            <h2 className="text-2xl font-black">Today's Goal</h2>
          </div>
          
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Complete {dailyGoal} Problems</span>
            <span>{progressCount} / {dailyGoal}</span>
          </div>
          <div className="w-full bg-white/20 h-4 rounded-full overflow-hidden">
            <div 
              className="bg-pathly-mint h-full rounded-full transition-all duration-500" 
              style={{ width: `${Math.min((progressCount / dailyGoal) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Roadmap / Topics */}
      <div className="space-y-8">
        {Object.keys(groupedProblems).map((topic, tIdx) => (
          <div key={tIdx} className="bg-white rounded-[2rem] p-8 shadow-sm border border-pathly-primary/10">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-pathly-primary/5">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <Code className="w-6 h-6 text-pathly-primary" /> {topic}
              </h2>
            </div>
            
            <div className="space-y-4">
              {groupedProblems[topic].map((q: any) => (
                <div key={q.id} className="bg-pathly-bg rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-pathly-primary/20 border border-transparent transition-colors">
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-2 flex items-center gap-3">
                      {q.title}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        q.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                        q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {q.difficulty}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs font-bold opacity-60">
                      <span>Platform: {q.platform}</span>
                      <span>~{q.estimated_time} mins</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 shrink-0 mt-4 md:mt-0">
                    <SolveButton problemId={q.id} />
                    <a href={q.url || `https://www.google.com/search?q=${encodeURIComponent(q.title + ' ' + q.platform)}`} target="_blank" rel="noreferrer" className="bg-white text-pathly-primary px-4 py-2 rounded-xl font-bold shadow-sm border border-pathly-primary/10 hover:bg-pathly-lavender transition-colors flex items-center gap-2 text-sm">
                      Solve <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {problems.length === 0 && (
          <div className="py-20 text-center bg-white rounded-[2rem] border border-pathly-primary/10">
            <h3 className="text-xl font-bold mb-2">You're all caught up!</h3>
            <p className="opacity-70">You have solved all recommended problems for your role.</p>
          </div>
        )}
      </div>

    </div>
  );
}
