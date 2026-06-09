import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Target, CheckCircle2 } from "lucide-react";

export default async function RoadmapPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const analysis = await prisma.analysis.findUnique({
    where: { user_id: session.user.id }
  });

  if (!analysis || !analysis.roadmap) {
    redirect("/dashboard");
  }

  let roadmap: any = {};
  try {
    roadmap = JSON.parse(analysis.roadmap);
  } catch(e) {}

  const milestones = roadmap.milestones || [];
  const totalMonths = roadmap.estimated_duration_months || 0;
  const totalWeeks = totalMonths > 0 ? Math.round(totalMonths * 4.3) : milestones.length * 2;

  const getSearchUrl = (title: string, platform: string) => {
    const q = encodeURIComponent(title);
    if (platform.toLowerCase().includes("youtube")) {
      return `https://www.youtube.com/results?search_query=${q}`;
    }
    if (platform.toLowerCase().includes("coursera")) {
      return `https://www.coursera.org/search?query=${q}`;
    }
    if (platform.toLowerCase().includes("udemy")) {
      return `https://www.udemy.com/courses/search/?src=ukw&q=${q}`;
    }
    return `https://www.google.com/search?q=${q}+${encodeURIComponent(platform)}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black mb-2">Your Roadmap</h1>
          <p className="text-lg opacity-70 font-medium">Follow these milestones to reach your target role.</p>
        </div>
        <div className="bg-pathly-mint text-pathly-primary px-6 py-3 rounded-2xl font-bold inline-flex flex-col items-end shadow-sm">
          <span className="text-xs uppercase tracking-wider opacity-60">Estimated Time</span>
          <span className="text-2xl font-black leading-none mt-1">{totalWeeks} Weeks</span>
        </div>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-pathly-primary/20 before:to-transparent">
        {milestones.map((milestone: any, index: number) => (
          <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-pathly-lavender text-pathly-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <span className="font-bold">{index + 1}</span>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-[2rem] shadow-sm border border-pathly-primary/10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-xl">{milestone.title}</h3>
                <span className="text-xs font-bold uppercase tracking-wider text-pathly-primary/50 bg-pathly-bg px-3 py-1 rounded-full whitespace-nowrap">{milestone.duration || milestone.timeframe || "2 weeks"}</span>
              </div>
              <p className="opacity-80 text-sm mb-4 leading-relaxed">{milestone.description}</p>
              
              {milestone.resources && milestone.resources.length > 0 && (
                <div className="bg-pathly-bg rounded-xl p-4 mt-4">
                  <h4 className="font-bold text-sm mb-2 opacity-80 uppercase tracking-wider">Resources</h4>
                  <ul className="space-y-2">
                    {milestone.resources.map((res: any, rIdx: number) => (
                      <li key={rIdx} className="flex items-start gap-2 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <a href={res.url || getSearchUrl(res.title, res.platform || "")} target="_blank" rel="noreferrer" className="text-pathly-primary hover:underline">
                          {res.title} <span className="opacity-50 text-xs">({res.platform || "Link"})</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
