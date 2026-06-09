"use client"
import React from "react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts'

export function DashboardCharts({ skillData }: { skillData: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#05072A', fontWeight: 'bold', fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
        <Radar name="Your Skills" dataKey="A" stroke="#05072A" fill="#E6E6FA" fillOpacity={0.7} />
        <RechartsTooltip />
      </RadarChart>
    </ResponsiveContainer>
  )
}
