import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { writeFile } from "fs/promises"
import path from "path"
import os from "os"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Save file locally to a temp dir so we don't pollute the git repo, but it persists across page loads
    const filename = `${session.user.id}_${Date.now()}_${file.name}`
    const filepath = path.join(os.tmpdir(), filename)
    await writeFile(filepath, buffer)

    // Save to Prisma Profile
    await prisma.profile.upsert({
      where: { user_id: session.user.id },
      update: { resume_url: filepath },
      create: {
        user_id: session.user.id,
        resume_url: filepath,
      }
    })

    return NextResponse.json({ success: true, filepath })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
