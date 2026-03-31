# ResumeAI - AI-Powered Resume Analyzer

A modern web application that provides instant, actionable feedback on your resume using AI analysis.

## Features

- **Drag & Drop Upload**: Upload `.txt` or `.md` resume files, or paste text directly
- **AI-Powered Analysis**: Uses Perplexity AI's Sonar model for deep resume analysis
- **Smart Fallback**: Works offline with keyword-based analysis when API is unavailable
- **Comprehensive Scoring**: Overall score plus breakdowns for Content, Formatting, Keywords, and Impact
- **Actionable Feedback**: Specific strengths, weaknesses, and improvement suggestions
- **Keyword Analysis**: Shows present and missing industry keywords
- **Dark Mode UI**: Professional, accessible interface

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui components
- **AI Integration**: Perplexity AI API (Sonar model)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Perplexity API key (optional - app works without it)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd resume-analyzer

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with:

```env
PERPLEXITY_API_KEY=your_perplexity_api_key_here
```

Get your API key from [perplexity.ai/settings/api](https://www.perplexity.ai/settings/api)

**Note**: The app works without an API key using the local fallback analyzer.

### Running the App

```bash
# Development
pnpm dev

# Production build
pnpm build
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Upload Resume**: Drag and drop a `.txt` or `.md` file, or paste your resume text directly
2. **Analyze**: Click "Analyze Resume" to start the analysis
3. **Review Results**: See your scores, strengths, weaknesses, and improvement suggestions
4. **Iterate**: Make changes to your resume and re-analyze

## Project Structure

```
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts      # AI analysis API endpoint
│   ├── globals.css           # Global styles and theme
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page component
├── components/
│   ├── analysis-results.tsx  # Results display component
│   ├── resume-upload.tsx     # Upload interface component
│   ├── score-ring.tsx        # Animated score visualization
│   └── ui/                   # shadcn/ui components
└── README.md
```

## API Reference

### POST /api/analyze

Analyzes resume text and returns structured feedback.

**Request Body:**
```json
{
  "resumeText": "Your resume content here..."
}
```

**Response:**
```json
{
  "overallScore": 75,
  "sections": {
    "content": { "score": 80, "feedback": "..." },
    "formatting": { "score": 70, "feedback": "..." },
    "keywords": { "score": 75, "feedback": "..." },
    "impact": { "score": 72, "feedback": "..." }
  },
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "suggestions": ["...", "..."],
  "keywords": {
    "present": ["JavaScript", "React", "..."],
    "missing": ["TypeScript", "AWS", "..."]
  }
}
```

## License

MIT
