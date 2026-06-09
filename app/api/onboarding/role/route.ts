import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { targetRole } = await req.json()

    if (!targetRole) {
      return NextResponse.json({ error: "Missing target role" }, { status: 400 })
    }

    await prisma.profile.update({
      where: { user_id: session.user.id },
      data: { target_role: targetRole },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Role save error:", error)
    return NextResponse.json({ error: "Failed to save role" }, { status: 500 })
  }
}
