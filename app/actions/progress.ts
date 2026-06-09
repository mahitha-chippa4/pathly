"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function markProblemSolved(problemId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    await prisma.userProblemProgress.upsert({
      where: {
        userId_problemId: {
          userId: session.user.id,
          problemId: problemId,
        }
      },
      update: {
        status: "Solved",
      },
      create: {
        userId: session.user.id,
        problemId: problemId,
        status: "Solved",
      }
    });

    revalidatePath("/dashboard/practice");
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: "Failed to mark as solved" };
  }
}

export async function advanceProjectPhase(projectId: string, currentPhase: number, totalPhases: number) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const nextPhase = Math.min(currentPhase + 1, totalPhases + 1);
    const status = nextPhase > totalPhases ? "Completed" : "In Progress";

    await prisma.userProjectProgress.upsert({
      where: {
        userId_projectId: {
          userId: session.user.id,
          projectId: projectId,
        }
      },
      update: {
        current_phase: nextPhase,
        status: status
      },
      create: {
        userId: session.user.id,
        projectId: projectId,
        current_phase: nextPhase,
        status: status
      }
    });

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true, nextPhase, status };
  } catch (e) {
    console.error(e);
    return { error: "Failed to advance phase" };
  }
}

export async function toggleProjectTask(projectId: string, taskName: string, isCompleted: boolean) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const progress = await prisma.userProjectProgress.findUnique({
      where: {
        userId_projectId: {
          userId: session.user.id,
          projectId: projectId,
        }
      }
    });

    let completedTasks: string[] = [];
    if (progress?.completed_tasks) {
      try {
        completedTasks = JSON.parse(progress.completed_tasks);
      } catch (e) {}
    }

    if (isCompleted) {
      if (!completedTasks.includes(taskName)) {
        completedTasks.push(taskName);
      }
    } else {
      completedTasks = completedTasks.filter(t => t !== taskName);
    }

    await prisma.userProjectProgress.upsert({
      where: {
        userId_projectId: {
          userId: session.user.id,
          projectId: projectId,
        }
      },
      update: {
        completed_tasks: JSON.stringify(completedTasks),
        status: "In Progress"
      },
      create: {
        userId: session.user.id,
        projectId: projectId,
        completed_tasks: JSON.stringify(completedTasks),
        status: "In Progress"
      }
    });

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: "Failed to toggle task" };
  }
}
