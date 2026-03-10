"use client"

import { useCallback, useState } from "react"
import { Upload, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResumeUploadProps {
  onAnalyze: (text: string) => void
  isAnalyzing: boolean
}

export function ResumeUpload({ onAnalyze, isAnalyzing }: ResumeUploadProps) {
  const [resumeText, setResumeText] = useState("")
  const [fileName, setFileName] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileRead = useCallback((file: File) => {
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      setResumeText(text)
    }
    reader.readAsText(file)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFileRead(file)
    },
    [handleFileRead]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFileRead(file)
    },
    [handleFileRead]
  )

  const clearFile = () => {
    setFileName(null)
    setResumeText("")
  }

  return (
    <div className="flex flex-col gap-6">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-10 transition-all ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/50"
        }`}
      >
        {fileName ? (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{fileName}</p>
              <p className="text-xs text-muted-foreground">Ready to analyze</p>
            </div>
            <button
              onClick={clearFile}
              className="ml-2 rounded-full p-1 hover:bg-muted"
              aria-label="Remove file"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Drop your resume here, or{" "}
                <label className="cursor-pointer text-primary hover:underline">
                  browse
                  <input
                    type="file"
                    accept=".txt,.md,.doc,.docx,.pdf"
                    onChange={handleFileInput}
                    className="sr-only"
                  />
                </label>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Supports .txt and .md files
              </p>
            </div>
          </>
        )}
      </div>

      <div className="relative">
        <label
          htmlFor="resume-text"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Or paste your resume text
        </label>
        <textarea
          id="resume-text"
          value={resumeText}
          onChange={(e) => {
            setResumeText(e.target.value)
            setFileName(null)
          }}
          placeholder="Paste your resume content here..."
          className="min-h-[200px] w-full resize-none rounded-lg border border-border bg-card p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <span className="absolute bottom-3 right-3 text-xs text-muted-foreground">
          {resumeText.length} characters
        </span>
      </div>

      <Button
        onClick={() => onAnalyze(resumeText)}
        disabled={!resumeText.trim() || isAnalyzing}
        size="lg"
        className="w-full"
      >
        {isAnalyzing ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            Analyzing your resume...
          </span>
        ) : (
          "Analyze Resume"
        )}
      </Button>
    </div>
  )
}
