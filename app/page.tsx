"use client"

import { useState } from "react"
import { FileSearch, Sparkles, Shield, Zap } from "lucide-react"
import { ResumeUpload } from "@/components/resume-upload"
import {
  AnalysisResults,
  type AnalysisData,
} from "@/components/analysis-results"

export default function HomePage() {
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (text: string) => {
    setIsAnalyzing(true)
    setError(null)
    setAnalysis(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: text }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze resume. Please try again.")
      }

      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      )
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <FileSearch className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              ResumeAI
            </span>
          </div>
          <p className="hidden text-sm text-muted-foreground sm:block">
            AI-powered resume analysis
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {/* Hero */}
        {!analysis && (
          <div className="mb-10 text-center">
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Get your resume reviewed by AI
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-muted-foreground">
              Upload your resume and receive instant, detailed feedback on
              content quality, keyword optimization, formatting, and actionable
              improvement suggestions.
            </p>

            {/* Feature pills */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm ring-1 ring-border">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                AI-Powered Analysis
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm ring-1 ring-border">
                <Zap className="h-3.5 w-3.5 text-[hsl(43,96%,56%)]" />
                Instant Results
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm ring-1 ring-border">
                <Shield className="h-3.5 w-3.5 text-accent" />
                Private & Secure
              </div>
            </div>
          </div>
        )}

        {/* Results header when showing analysis */}
        {analysis && (
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Analysis Results
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {"Here's what we found in your resume"}
              </p>
            </div>
            <button
              onClick={() => {
                setAnalysis(null)
                setError(null)
              }}
              className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              Analyze Another
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Upload or Results */}
        {analysis ? (
          <AnalysisResults data={analysis} />
        ) : (
          <div className="mx-auto max-w-2xl">
            <ResumeUpload
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <p className="text-center text-xs text-muted-foreground">
          Your resume data is processed securely and never stored.
        </p>
      </footer>
    </div>
  )
}
