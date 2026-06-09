import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getRecommendedProjects } from "@/lib/recommendations";
import { Briefcase, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function ProjectsHubPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const projects = await getRecommendedProjects(session.user.id);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-pathly-primary" />
          Project Hub
        </h1>
        <p className="text-lg opacity-70 font-medium">Build high-impact projects personalized for your target role.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? projects.map((proj) => (
          <div key={proj.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-pathly-primary/10 flex flex-col hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                proj.difficulty === 'Hard' || proj.difficulty === 'Advanced' ? 'bg-red-100 text-red-700' :
                proj.difficulty === 'Medium' || proj.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {proj.difficulty}
              </span>
              <span className="text-xs font-bold text-pathly-primary/50 uppercase tracking-widest">{proj.estimated_duration}</span>
            </div>
            
            <h3 className="font-bold text-xl mb-3 line-clamp-2">{proj.title}</h3>
            <p className="text-sm opacity-70 mb-6 flex-1 line-clamp-3">{proj.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {(proj.tech_stack || "").split(",").slice(0, 3).map((tech, idx) => (
                <span key={idx} className="bg-pathly-bg text-xs font-bold px-2 py-1 rounded text-pathly-primary/70">
                  {tech.trim()}
                </span>
              ))}
              {(proj.tech_stack || "").split(",").length > 3 && (
                <span className="text-xs font-bold text-pathly-primary/40 px-1 py-1">+{proj.tech_stack.split(",").length - 3}</span>
              )}
            </div>

            <Link 
              href={`/dashboard/projects/${proj.id}`}
              className={buttonVariants({ variant: "outline", className: "w-full font-bold border-2 rounded-xl mt-auto" })}
            >
              View Project Details <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border border-pathly-primary/10">
            <h3 className="text-xl font-bold mb-2">No projects found</h3>
            <p className="opacity-70">Check back later for personalized project recommendations.</p>
          </div>
        )}
      </div>
    </div>
  );
}
