import { prisma } from "./prisma";

export async function getRecommendedProblems(userId: string) {
  // 1. Fetch user data
  const profile = await prisma.profile.findUnique({ where: { user_id: userId } });
  const analysis = await prisma.analysis.findUnique({ where: { user_id: userId } });
  
  if (!profile || !analysis) return [];

  const targetRole = profile.target_role || "Software Engineer";
  
  // Extract weak/missing topics
  let missingTopics: string[] = [];
  try {
    const rawRecs = JSON.parse(analysis.recommendations || "[]");
    missingTopics = rawRecs.map((r: any) => r.skill || r);
  } catch(e) {}

  if (missingTopics.length === 0) {
    missingTopics = ["Arrays", "System Design", "Python", "SQL"]; // Fallback
  }

  // Fetch problems user has already interacted with
  const userProgress = await prisma.userProblemProgress.findMany({
    where: { userId: userId }
  });
  const solvedIds = userProgress.filter(p => p.status === "Solved").map(p => p.problemId);

  // Find personalized problems
  const problems = await prisma.problemBank.findMany({
    where: {
      id: { notIn: solvedIds },
      OR: [
        { role_tags: { contains: targetRole } },
        { topic: { in: missingTopics } }
      ]
    },
    take: 10,
    orderBy: { frequency_score: 'desc' }
  });

  return problems;
}

export async function getRecommendedProjects(userId: string) {
  const profile = await prisma.profile.findUnique({ where: { user_id: userId } });
  if (!profile) return [];

  const targetRole = profile.target_role || "Software Engineer";

  const userProgress = await prisma.userProjectProgress.findMany({
    where: { userId: userId }
  });
  const completedIds = userProgress.filter(p => p.status === "Completed").map(p => p.projectId);

  const projects = await prisma.projectBank.findMany({
    where: {
      id: { notIn: completedIds },
      role_tags: { contains: targetRole }
    },
    take: 6,
    orderBy: { resume_value_score: 'desc' }
  });

  return projects;
}
