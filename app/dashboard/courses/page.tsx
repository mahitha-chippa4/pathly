import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BookOpen, ExternalLink, PlayCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export default async function CoursesPage() {
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
  
  // Extract all resources from all milestones
  const courses: any[] = [];
  milestones.forEach((m: any) => {
    if (m.resources) {
      m.resources.forEach((r: any) => {
        courses.push({ ...r, milestoneTitle: m.title });
      });
    }
  });

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
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-black mb-2">Recommended Courses</h1>
        <p className="text-lg opacity-70 font-medium">Curated learning materials to bridge your skill gaps.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? courses.map((course, idx) => (
          <div key={idx} className="bg-white rounded-[2rem] p-8 shadow-sm border border-pathly-primary/10 flex flex-col hover:shadow-lg transition-shadow group">
            <div className="w-12 h-12 bg-pathly-lavender rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <PlayCircle className="w-6 h-6 text-pathly-primary" />
            </div>
            <h3 className="font-bold text-xl mb-2 line-clamp-2">{course.title}</h3>
            <p className="text-sm opacity-70 font-medium mb-4">{course.platform || "Online Course"}</p>
            
            <div className="mt-auto pt-6 flex items-center justify-between border-t border-pathly-primary/5">
              <span className="text-xs font-bold uppercase tracking-wider opacity-50 truncate max-w-[150px]">
                {course.milestoneTitle}
              </span>
              <a 
                href={course.url || getSearchUrl(course.title, course.platform || "")} 
                target="_blank" 
                rel="noreferrer"
                className={buttonVariants({ variant: "ghost", className: "hover:bg-pathly-bg px-4 rounded-xl font-bold gap-2" })}
              >
                Start <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-12 text-center bg-white rounded-[2rem] border border-pathly-primary/10">
            <BookOpen className="w-12 h-12 text-pathly-primary/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No courses found</h3>
            <p className="opacity-70">We couldn't find any specific course recommendations for your roadmap.</p>
          </div>
        )}
      </div>
    </div>
  );
}
