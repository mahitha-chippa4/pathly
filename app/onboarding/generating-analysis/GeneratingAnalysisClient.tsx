"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"

export function GeneratingAnalysisClient() {
  const router = useRouter()
  const [error, setError] = useState("")

  useEffect(() => {
    const processData = async () => {
      try {
        const res = await fetch("/api/onboarding/process", {
          method: "POST"
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || "Failed to generate analysis")
        }

        router.push("/dashboard")
        router.refresh()
      } catch (err: any) {
        setError(err.message)
      }
    }

    processData()
  }, [router])

  return (
    <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100 text-center">
          {error}
        </div>
      ) : (
        <>
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-pathly-lavender rounded-full"></div>
            <div className="absolute inset-0 border-4 border-pathly-primary rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-pathly-primary animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl font-black mb-4">Analyzing your profile...</h2>
          <p className="text-lg opacity-70 font-medium max-w-sm mx-auto">
            We're extracting your skills, generating embeddings, and building your personalized career roadmap.
          </p>
        </>
      )}
    </div>
  )
}
