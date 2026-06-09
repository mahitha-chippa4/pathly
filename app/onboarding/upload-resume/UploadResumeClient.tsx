"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { UploadCloud } from "lucide-react"

export function UploadResumeClient() {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true)
      setError("")
      
      try {
        const formData = new FormData()
        formData.append("file", e.target.files[0])

        const res = await fetch("/api/onboarding/upload", {
          method: "POST",
          body: formData,
        })

        if (!res.ok) {
          throw new Error("Failed to upload resume")
        }

        router.push("/onboarding/select-role")
        router.refresh()
      } catch (err: any) {
        setError(err.message)
        setIsUploading(false)
      }
    }
  }

  return (
    <>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100 text-center">
          {error}
        </div>
      )}
      <div className="bg-pathly-bg border-2 border-dashed border-pathly-primary/20 rounded-[2rem] p-12 text-center hover:border-pathly-primary/50 transition-colors">
        <UploadCloud className="w-16 h-16 text-pathly-primary/50 mx-auto mb-6" />
        <h3 className="text-2xl font-bold mb-2">Upload your resume</h3>
        <p className="text-base opacity-70 mb-8">PDF or DOCX (max 5MB)</p>
        <label className={`cursor-pointer bg-pathly-primary text-white rounded-2xl px-8 py-4 text-lg font-bold inline-block hover:bg-pathly-primary/90 transition-transform shadow-lg shadow-pathly-primary/20 ${isUploading ? 'opacity-50 pointer-events-none' : 'active:scale-95'}`}>
          {isUploading ? "Uploading..." : "Browse Files"}
          <input type="file" className="hidden" accept=".pdf,.docx" onChange={handleFileChange} disabled={isUploading} />
        </label>
      </div>
    </>
  )
}
