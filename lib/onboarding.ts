import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function checkOnboardingState(currentPath: string) {
  const session = await auth()
  
  if (!session?.user?.id) {
    if (currentPath !== "/login" && currentPath !== "/signup") {
      redirect("/login")
    }
    return null
  }

  const profile = await prisma.profile.findUnique({
    where: { user_id: session.user.id }
  })

  // If onboarding is completely done
  if (profile?.onboarding_complete) {
    if (currentPath.startsWith("/onboarding")) {
      redirect("/dashboard")
    }
    return { session, profile }
  }

  // Determine correct onboarding step
  let correctPath = "/onboarding/upload-resume"
  
  if (profile?.resume_url) {
    if (!profile.target_role) {
      correctPath = "/onboarding/select-role"
    } else {
      correctPath = "/onboarding/generating-analysis"
    }
  }

  if (currentPath !== correctPath && currentPath.startsWith("/dashboard")) {
    redirect(correctPath)
  }
  
  if (currentPath.startsWith("/onboarding") && currentPath !== correctPath) {
     redirect(correctPath)
  }

  return { session, profile }
}
