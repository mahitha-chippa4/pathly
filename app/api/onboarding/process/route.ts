import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { readFile } from "fs/promises"
import path from "path"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const profile = await prisma.profile.findUnique({
      where: { user_id: session.user.id }
    })

    if (!profile || !profile.resume_url || !profile.target_role) {
      return NextResponse.json({ error: "Incomplete profile data for processing" }, { status: 400 })
    }

    // Read the file from disk
    const fileBuffer = await readFile(profile.resume_url)
    const fileBlob = new Blob([fileBuffer], { type: "application/pdf" })

    // Proxy the request to the Flask Python Backend
    const backendFormData = new FormData()
    backendFormData.append("file", fileBlob, path.basename(profile.resume_url))

    const flaskUrl = `http://localhost:8000/api/analyze-resume?target_role=${encodeURIComponent(profile.target_role)}`
    
    console.log("Calling Flask API:", flaskUrl)
    const flaskRes = await fetch(flaskUrl, {
      method: "POST",
      body: backendFormData,
    })

    if (!flaskRes.ok) {
      const errorText = await flaskRes.text()
      console.error("Flask API Error:", errorText)
      return NextResponse.json({ error: "Failed to process resume in ML engine" }, { status: 500 })
    }

    const data = await flaskRes.json()

    // Extract the parsed profile and analysis results
    const { match_result, roadmap, parsed_skills, parsed_projects, parsed_education, parsed_experience } = data

    // Save Profile to Prisma and mark onboarding complete
    await prisma.profile.update({
      where: { user_id: session.user.id },
      data: {
        skills: JSON.stringify(parsed_skills || []),
        projects: JSON.stringify(parsed_projects || []),
        education: JSON.stringify(parsed_education || []),
        experience: JSON.stringify(parsed_experience || []),
        onboarding_complete: true,
      }
    })

    // Save Analysis to Prisma
    await prisma.analysis.upsert({
      where: { user_id: session.user.id },
      update: {
        readiness_score: match_result?.readiness_score || 0,
        role_match_score: match_result?.match_score || 0,
        roadmap: JSON.stringify(roadmap || {}),
        recommendations: JSON.stringify(match_result?.recommendations || []),
      },
      create: {
        user_id: session.user.id,
        readiness_score: match_result?.readiness_score || 0,
        role_match_score: match_result?.match_score || 0,
        roadmap: JSON.stringify(roadmap || {}),
        recommendations: JSON.stringify(match_result?.recommendations || []),
      }
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Onboarding process error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
