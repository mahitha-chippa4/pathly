import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { put } from "@vercel/blob"

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

    // Save file directly to Vercel Blob Storage
    const filename = `${session.user.id}_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const blob = await put(filename, buffer, { access: 'public' })

    // Save to Prisma Profile
    await prisma.profile.upsert({
      where: { user_id: session.user.id },
      update: { resume_url: blob.url },
      create: {
        user_id: session.user.id,
        resume_url: blob.url,
      }
    })

    return NextResponse.json({ success: true, filepath: blob.url })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
