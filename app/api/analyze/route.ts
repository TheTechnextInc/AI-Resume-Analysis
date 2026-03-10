import { z } from "zod"

const analysisSchema = z.object({
  overallScore: z.number(),
  scores: z.object({
    content: z.number(),
    formatting: z.number(),
    keywords: z.number(),
    impact: z.number(),
  }),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  suggestions: z.array(z.string()),
  keywords: z.object({
    present: z.array(z.string()),
    missing: z.array(z.string()),
  }),
  summary: z.string(),
})

function generateLocalAnalysis(resumeText: string) {
  const text = resumeText.toLowerCase()
  const wordCount = resumeText.split(/\s+/).length

  const techKeywords = [
    "javascript", "typescript", "python", "react", "node", "sql", "aws",
    "docker", "kubernetes", "git", "html", "css", "java", "c++", "go",
    "rust", "swift", "kotlin", "flutter", "angular", "vue", "next.js",
    "express", "mongodb", "postgresql", "redis", "graphql", "rest",
    "agile", "scrum", "ci/cd", "devops", "machine learning", "ai",
  ]
  const softKeywords = [
    "leadership", "communication", "teamwork", "problem-solving",
    "management", "collaboration", "strategic", "mentoring",
    "analytical", "innovative", "detail-oriented", "self-motivated",
  ]
  const actionVerbs = [
    "led", "developed", "implemented", "designed", "managed", "created",
    "built", "optimized", "improved", "delivered", "achieved", "launched",
    "spearheaded", "architected", "streamlined", "mentored", "reduced",
    "increased", "automated", "established",
  ]
  const sections = [
    "experience", "education", "skills", "summary", "objective",
    "projects", "certifications", "awards", "volunteer", "publications",
  ]

  const presentTech = techKeywords.filter((k) => text.includes(k))
  const presentSoft = softKeywords.filter((k) => text.includes(k))
  const presentActions = actionVerbs.filter((k) => text.includes(k))
  const presentSections = sections.filter((k) => text.includes(k))
  const hasMetrics = /\d+%|\$\d+|\d+\+/.test(text)
  const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(text)
  const hasPhone = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text)
  const hasLinkedIn = text.includes("linkedin")

  // Score calculations
  const contentScore = Math.min(100, Math.round(
    (presentSections.length / 5) * 30 +
    (wordCount > 200 ? 20 : (wordCount / 200) * 20) +
    (presentActions.length / 5) * 25 +
    (hasMetrics ? 25 : 0)
  ))

  const formattingScore = Math.min(100, Math.round(
    (presentSections.length / 4) * 35 +
    (hasEmail ? 15 : 0) + (hasPhone ? 15 : 0) + (hasLinkedIn ? 10 : 0) +
    (wordCount >= 300 && wordCount <= 800 ? 25 : wordCount < 300 ? 10 : 15)
  ))

  const keywordScore = Math.min(100, Math.round(
    (presentTech.length / 5) * 50 +
    (presentSoft.length / 3) * 30 +
    (presentActions.length / 4) * 20
  ))

  const impactScore = Math.min(100, Math.round(
    (hasMetrics ? 35 : 0) +
    (presentActions.length / 5) * 35 +
    (presentSoft.length / 3) * 30
  ))

  const overallScore = Math.round(
    contentScore * 0.3 + formattingScore * 0.2 + keywordScore * 0.25 + impactScore * 0.25
  )

  // Build strengths
  const strengths: string[] = []
  if (presentTech.length >= 3) strengths.push(`Strong technical skills highlighted: ${presentTech.slice(0, 5).join(", ")}`)
  if (presentActions.length >= 3) strengths.push("Good use of action verbs to describe accomplishments")
  if (hasMetrics) strengths.push("Includes quantifiable metrics and achievements")
  if (presentSections.length >= 4) strengths.push("Well-structured with clear sections")
  if (hasEmail && hasPhone) strengths.push("Contact information is complete and easy to find")
  if (presentSoft.length >= 2) strengths.push(`Demonstrates key soft skills: ${presentSoft.slice(0, 3).join(", ")}`)
  if (hasLinkedIn) strengths.push("Includes LinkedIn profile for additional context")
  if (strengths.length < 3) strengths.push("Resume provides a foundation to build upon")

  // Build weaknesses
  const weaknesses: string[] = []
  if (presentTech.length < 3) weaknesses.push("Limited technical keywords - could hurt ATS (Applicant Tracking System) scores")
  if (!hasMetrics) weaknesses.push("Lacks quantifiable achievements and metrics (e.g., 'increased sales by 20%')")
  if (presentActions.length < 3) weaknesses.push("Weak action verbs - descriptions feel passive rather than impactful")
  if (presentSections.length < 3) weaknesses.push("Missing standard resume sections (experience, education, skills)")
  if (wordCount < 200) weaknesses.push("Resume is too brief - needs more detail about roles and accomplishments")
  if (wordCount > 800) weaknesses.push("Resume may be too long - consider trimming to the most relevant experience")
  if (!hasLinkedIn) weaknesses.push("No LinkedIn profile URL included")
  if (!hasEmail || !hasPhone) weaknesses.push("Missing essential contact information (email and/or phone)")

  // Build suggestions
  const suggestions: string[] = []
  if (!hasMetrics) suggestions.push("Add quantifiable results: 'Managed a team of 8' or 'Reduced load time by 40%'")
  if (presentActions.length < 5) suggestions.push("Start each bullet point with a strong action verb: Led, Developed, Implemented, Optimized")
  if (presentTech.length < 5) suggestions.push("Add more industry-specific technical keywords to improve ATS matching")
  if (!text.includes("summary") && !text.includes("objective")) suggestions.push("Add a professional summary at the top highlighting your key value proposition")
  suggestions.push("Tailor your resume for each job application by matching keywords from the job description")
  suggestions.push("Use consistent formatting: same font, bullet style, and date format throughout")
  if (!hasLinkedIn) suggestions.push("Add your LinkedIn profile URL to strengthen your professional presence")
  suggestions.push("Have someone else proofread for grammar, spelling, and clarity")

  const missingTech = techKeywords.filter((k) => !text.includes(k)).slice(0, 8)

  return {
    overallScore,
    scores: { content: contentScore, formatting: formattingScore, keywords: keywordScore, impact: impactScore },
    strengths: strengths.slice(0, 5),
    weaknesses: weaknesses.slice(0, 5),
    suggestions: suggestions.slice(0, 7),
    keywords: {
      present: [...presentTech.slice(0, 6), ...presentSoft.slice(0, 3)],
      missing: missingTech,
    },
    summary: `Your resume scored ${overallScore}/100 overall. ${
      overallScore >= 70
        ? "It has a solid foundation with room for targeted improvements."
        : overallScore >= 50
          ? "There are several areas that need attention to make it more competitive."
          : "Significant improvements are needed across multiple areas to make this resume stand out."
    } Focus on ${!hasMetrics ? "adding quantifiable achievements" : presentActions.length < 3 ? "using stronger action verbs" : "tailoring content to specific job descriptions"} for the biggest impact.`,
  }
}

export async function POST(req: Request) {
  try {
    const { resumeText } = await req.json()

    if (
      !resumeText ||
      typeof resumeText !== "string" ||
      resumeText.trim().length < 50
    ) {
      return Response.json(
        { error: "Please provide at least 50 characters of resume text." },
        { status: 400 }
      )
    }

    const apiKey = process.env.PERPLEXITY_API_KEY

    // If we have a valid API key, try the Perplexity API
    if (apiKey && apiKey.trim().length > 0) {
      try {
        const response = await fetch("https://api.perplexity.ai/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "sonar",
            max_tokens: 1000,
            messages: [
              {
                role: "system",
                content: `You are an expert resume reviewer. Analyze the resume and return ONLY valid JSON (no markdown, no code fences) with this structure:
{"overallScore":<0-100>,"scores":{"content":<0-100>,"formatting":<0-100>,"keywords":<0-100>,"impact":<0-100>},"strengths":["..."],"weaknesses":["..."],"suggestions":["..."],"keywords":{"present":["..."],"missing":["..."]},"summary":"..."}
Provide 3-5 strengths, 3-5 weaknesses, 5-7 suggestions. Return ONLY JSON.`,
              },
              {
                role: "user",
                content: `Analyze this resume:\n\n${resumeText}`,
              },
            ],
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const rawContent = data.choices?.[0]?.message?.content
          if (rawContent) {
            const cleaned = rawContent
              .replace(/```json\s*/gi, "")
              .replace(/```\s*/g, "")
              .trim()
            const parsed = JSON.parse(cleaned)
            const analysis = analysisSchema.parse(parsed)
            return Response.json({ analysis })
          }
        }

        // If API fails, fall through to local analysis
        console.log("[v0] Perplexity API returned status:", response.status, "- falling back to local analysis")
      } catch (apiError) {
        console.log("[v0] Perplexity API call failed, using local analysis:", apiError)
      }
    }

    // Fallback: local keyword-based analysis
    const analysis = generateLocalAnalysis(resumeText)
    const validated = analysisSchema.parse(analysis)
    return Response.json({ analysis: validated })
  } catch (error) {
    console.error("Resume analysis error:", error)
    return Response.json(
      { error: "Failed to analyze resume. Please try again." },
      { status: 500 }
    )
  }
}
