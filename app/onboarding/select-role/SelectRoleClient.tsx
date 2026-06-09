"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Target, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SelectRoleClient() {
  const router = useRouter()
  const [targetRole, setTargetRole] = useState("Software Engineer")
  const [customRole, setCustomRole] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  const handleSave = async () => {
    setIsSaving(true)
    setError("")
    
    try {
      const finalRole = targetRole === "Custom" ? customRole : targetRole
      
      const res = await fetch("/api/onboarding/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetRole: finalRole }),
      })

      if (!res.ok) {
        throw new Error("Failed to save target role")
      }

      router.push("/onboarding/generating-analysis")
      router.refresh()
    } catch (err: any) {
      setError(err.message)
      setIsSaving(false)
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100 text-center">
          {error}
        </div>
      )}
      <div className="bg-pathly-bg rounded-[2rem] p-8 border border-pathly-primary/5">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-pathly-primary" />
          <h3 className="text-xl font-bold">What is your target role?</h3>
        </div>

        <div className="space-y-4">
          <select 
            value={targetRole} 
            onChange={(e) => setTargetRole(e.target.value)}
            disabled={isSaving}
            className="w-full bg-white rounded-xl px-4 py-4 border-2 border-pathly-primary/10 focus:border-pathly-primary focus:ring-0 text-lg font-medium outline-none disabled:opacity-50"
          >
            <option value="Software Engineer">Software Engineer</option>
            <option value="ML Engineer">ML Engineer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Backend Engineer">Backend Engineer</option>
            <option value="Frontend Engineer">Frontend Engineer</option>
            <option value="Full Stack Engineer">Full Stack Engineer</option>
            <option value="Cloud Engineer">Cloud Engineer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="Cybersecurity Engineer">Cybersecurity Engineer</option>
            <option value="Custom">Other (Custom)</option>
          </select>

          {targetRole === "Custom" && (
            <input 
              type="text" 
              placeholder="e.g. Product Manager" 
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              disabled={isSaving}
              className="w-full bg-white rounded-xl px-4 py-4 border-2 border-pathly-primary/10 focus:border-pathly-primary focus:ring-0 text-lg font-medium outline-none disabled:opacity-50"
            />
          )}
        </div>

        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="w-full mt-8 bg-pathly-primary text-white hover:bg-pathly-primary/90 rounded-2xl h-16 text-xl font-black group shadow-lg shadow-pathly-primary/20"
        >
          {isSaving ? "Saving..." : "Generate Analysis"}
          {!isSaving && <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />}
        </Button>
      </div>
    </div>
  )
}
