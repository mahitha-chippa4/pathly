"use client"
import React from "react"

export function ExportButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="px-4 py-2 bg-pathly-primary text-white rounded-full font-bold text-sm hover:bg-pathly-primary/90 print:hidden"
    >
      Export Report
    </button>
  )
}
