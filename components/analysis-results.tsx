"use client"

import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Tag,
  Target,
  TrendingUp,
} from "lucide-react"
import { ScoreRing } from "@/components/score-ring"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface AnalysisData {
  overallScore: number
  scores: {
    content: number
    formatting: number
    keywords: number
    impact: number
  }
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  keywords: {
    present: string[]
    missing: string[]
  }
  summary: string
}

interface AnalysisResultsProps {
  data: AnalysisData
}

export function AnalysisResults({ data }: AnalysisResultsProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Summary */}
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {data.summary}
          </p>
        </CardContent>
      </Card>

      {/* Score Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-4 w-4 text-primary" />
            Score Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-between">
            <ScoreRing
              score={data.overallScore}
              label="Overall"
              size={110}
            />
            <ScoreRing score={data.scores.content} label="Content" size={90} />
            <ScoreRing
              score={data.scores.formatting}
              label="Format"
              size={90}
            />
            <ScoreRing
              score={data.scores.keywords}
              label="Keywords"
              size={90}
            />
            <ScoreRing score={data.scores.impact} label="Impact" size={90} />
          </div>
        </CardContent>
      </Card>

      {/* Strengths & Weaknesses */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-3">
              {data.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  <span className="text-muted-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Areas to Improve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-3">
              {data.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
                  <span className="text-muted-foreground">{w}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Lightbulb className="h-4 w-4 text-[hsl(43,96%,56%)]" />
            Actionable Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-col gap-3">
            {data.suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{s}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Keywords */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Tag className="h-4 w-4 text-primary" />
            Keyword Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-medium text-foreground">
                Keywords Found
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.keywords.present.map((k) => (
                <Badge
                  key={k}
                  variant="secondary"
                  className="bg-accent/10 text-accent"
                >
                  {k}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
              <span className="text-xs font-medium text-foreground">
                Consider Adding
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.keywords.missing.map((k) => (
                <Badge
                  key={k}
                  variant="outline"
                  className="border-destructive/30 text-destructive"
                >
                  {k}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
