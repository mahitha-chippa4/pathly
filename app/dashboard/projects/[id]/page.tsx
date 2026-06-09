import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, GitBranch, Book, PlayCircle, ExternalLink, Code2, Target, Network, CheckCircle2, Lock, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TaskCheckbox } from "@/components/TaskCheckbox";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const project = await prisma.projectBank.findUnique({
    where: { id }
  });

  if (!project) {
    redirect("/dashboard/projects");
  }

  // Get user progress for this project
  let progress = await prisma.userProjectProgress.findUnique({
    where: {
      userId_projectId: {
        userId: session.user.id,
        projectId: id
      }
    }
  });

  let completedTasks: string[] = [];
  if (progress?.completed_tasks) {
    try {
      completedTasks = JSON.parse(progress.completed_tasks);
    } catch (e) {}
  }

  const techStack = (project.tech_stack || "").split(",").map(t => t.trim());
  const skills = (project.skills_covered || "").split(",").map(s => s.trim());

  let roadmap = [];
  try {
    roadmap = JSON.parse(project.architecture_guide || "[]");
  } catch(e) {}

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <Link href="/dashboard/projects" className="inline-flex items-center text-sm font-bold opacity-60 hover:opacity-100 transition-opacity">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
      </Link>

      <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-pathly-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pathly-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              project.difficulty === 'Hard' || project.difficulty === 'Advanced' ? 'bg-red-100 text-red-700' :
              project.difficulty === 'Medium' || project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              {project.difficulty}
            </span>
            <span className="text-xs font-bold bg-pathly-mint px-3 py-1 rounded-full text-pathly-primary">
              {project.estimated_duration} Total
            </span>
            <span className="text-xs font-bold bg-pathly-lavender px-3 py-1 rounded-full text-pathly-primary">
              Resume Score: {project.resume_value_score}/100
            </span>
            {/* {currentPhase > roadmap.length && (
               <span className="text-xs font-bold bg-green-100 px-3 py-1 rounded-full text-green-700 flex items-center gap-1">
                 <CheckCircle2 className="w-3 h-3" /> Completed
               </span>
            )} */}
          </div>

          <h1 className="text-4xl font-black mb-4">{project.title}</h1>
          <p className="text-lg opacity-80 leading-relaxed max-w-3xl mb-8">{project.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-pathly-primary/10">
            <h2 className="text-2xl font-black flex items-center gap-2 mb-8">
              <Network className="w-6 h-6 text-pathly-primary" />
              Implementation Roadmap
            </h2>
            
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-7 before:-translate-x-px before:h-[calc(100%-2rem)] before:w-0.5 before:bg-pathly-primary/10">
              {roadmap.map((phase: any, idx: number) => {
                const phaseNum = idx + 1;
                
                const totalTasksInPhase = phase.tasks?.length || 0;
                const completedTasksInPhase = (phase.tasks || []).filter((t: string) => completedTasks.includes(t)).length;
                const isCompleted = totalTasksInPhase > 0 && completedTasksInPhase === totalTasksInPhase;

                return (
                  <div key={idx} className={`relative flex items-start gap-6 transition-all`}>
                    <div className={`w-14 h-14 rounded-2xl border-4 flex items-center justify-center shrink-0 z-10 transition-colors shadow-sm ${
                      isCompleted ? 'bg-pathly-mint border-white text-pathly-primary' :
                      'bg-white border-pathly-primary/10 text-pathly-primary/50'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-black text-lg">{phaseNum}</span>}
                    </div>
                    
                    <div className={`flex-1 pt-1 ${isCompleted ? 'opacity-70' : ''}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-black text-xl">{phase.phase_name}</h3>
                        <div className="flex gap-2">
                          {phase.estimated_hours && (
                            <span className="text-xs font-bold opacity-60 flex items-center gap-1 bg-white px-2 py-1 rounded-md shadow-sm border border-pathly-primary/5">
                              <Clock className="w-3 h-3" /> {phase.estimated_hours}h
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm opacity-80 leading-relaxed mb-6">{phase.description}</p>
                      
                      <div className="space-y-6">
                        <div className="bg-white p-5 rounded-2xl border border-pathly-primary/5 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xs font-black uppercase tracking-widest opacity-50">Tasks to Complete</h4>
                            <span className="text-xs font-bold text-pathly-primary/60">{completedTasksInPhase} / {totalTasksInPhase}</span>
                          </div>
                          
                          <ul className="space-y-3">
                            {(phase.tasks || []).map((task: string, tIdx: number) => {
                              const isTaskCompleted = completedTasks.includes(task);
                              return (
                                <li key={tIdx}>
                                  <TaskCheckbox 
                                    projectId={project.id} 
                                    task={task} 
                                    isCompletedInitial={isTaskCompleted} 
                                  />
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-4 rounded-xl border border-pathly-primary/5 shadow-sm">
                            <h4 className="text-xs font-black uppercase tracking-widest opacity-50 mb-1">Expected Deliverable</h4>
                            <p className="text-sm font-bold">{phase.deliverable}</p>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-pathly-primary/5 shadow-sm">
                            <h4 className="text-xs font-black uppercase tracking-widest opacity-50 mb-1">Resume Impact</h4>
                            <p className="text-sm font-bold text-pathly-primary flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" /> {phase.resume_impact || "Core Skill Acquired"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {roadmap.length === 0 && (
                <div className="p-8 text-center opacity-50 font-bold">
                  Roadmap data is missing for this project.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-pathly-primary/10 sticky top-8">
            <h2 className="text-xl font-black flex items-center gap-2 mb-6">
              <Code2 className="w-5 h-5" /> Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {techStack.map((tech, idx) => (
                <span key={idx} className="bg-pathly-bg px-3 py-1.5 rounded-lg text-sm font-bold">
                  {tech}
                </span>
              ))}
            </div>

            <h2 className="text-xl font-black flex items-center gap-2 mb-6">
              <Target className="w-5 h-5" /> Skills Learned
            </h2>
            <ul className="space-y-2 mb-8">
              {skills.map((skill, idx) => (
                <li key={idx} className="text-sm font-medium opacity-80 flex items-start gap-2">
                  <span className="text-pathly-primary mt-1">•</span> {skill}
                </li>
              ))}
            </ul>

            {project.github_links || project.documentation_links ? (
              <>
                <h2 className="text-xl font-black mb-4 mt-8">Reference Links</h2>
                <div className="space-y-3">
                  {project.github_links && (
                    <a href={project.github_links} target="_blank" className="flex items-center gap-3 p-3 bg-pathly-bg rounded-xl hover:shadow-md transition-shadow font-bold text-sm">
                      <GitBranch className="w-5 h-5" /> GitHub Repo
                      <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
                    </a>
                  )}
                  {project.documentation_links && (
                    <a href={project.documentation_links} target="_blank" className="flex items-center gap-3 p-3 bg-pathly-bg rounded-xl hover:shadow-md transition-shadow font-bold text-sm">
                      <Book className="w-5 h-5 text-blue-500" /> Documentation
                      <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
                    </a>
                  )}
                </div>
              </>
            ) : null}

            <h2 className="text-xl font-black mb-4 mt-8">Search Tutorials</h2>
            <div className="space-y-3">
              <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(project.title + ' tutorial')}`} target="_blank" className="flex items-center gap-3 p-3 bg-pathly-bg rounded-xl hover:shadow-md transition-shadow font-bold text-sm">
                <PlayCircle className="w-5 h-5 text-red-500" /> YouTube Search
                <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
              </a>
              <a href={`https://github.com/search?q=${encodeURIComponent(project.title)}&type=repositories`} target="_blank" className="flex items-center gap-3 p-3 bg-pathly-bg rounded-xl hover:shadow-md transition-shadow font-bold text-sm">
                <GitBranch className="w-5 h-5 text-gray-700" /> GitHub Search
                <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
