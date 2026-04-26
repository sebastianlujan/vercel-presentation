"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  code: string
  language?: string
}

// Simple syntax highlighting
function highlightCode(code: string, language: string): React.ReactNode {
  // Keywords for different languages
  const keywords = {
    typescript: ["import", "export", "from", "const", "let", "var", "function", "async", "await", "return", "if", "else", "for", "while", "class", "interface", "type", "extends", "implements", "new", "this", "try", "catch", "throw", "default"],
    tsx: ["import", "export", "from", "const", "let", "var", "function", "async", "await", "return", "if", "else", "for", "while", "class", "interface", "type", "extends", "implements", "new", "this", "try", "catch", "throw", "default"],
    bash: ["npm", "npx", "pnpm", "yarn", "cd", "mkdir", "git", "vercel"],
  }

  const languageKeywords = keywords[language as keyof typeof keywords] || keywords.typescript

  // Split into lines
  return code.split("\n").map((line, lineIndex) => {
    // Handle comments
    if (line.trim().startsWith("//") || line.trim().startsWith("#")) {
      return (
        <span key={lineIndex}>
          <span className="text-zinc-500">{line}</span>
          {lineIndex < code.split("\n").length - 1 && "\n"}
        </span>
      )
    }

    // Process each word/token
    const tokens = line.split(/(\s+|[{}()\[\];,.:=<>]|"[^"]*"|'[^']*'|`[^`]*`)/)
    
    return (
      <span key={lineIndex}>
        {tokens.map((token, tokenIndex) => {
          // Strings
          if (/^["'`]/.test(token)) {
            return <span key={tokenIndex} className="text-emerald-400">{token}</span>
          }
          // Keywords
          if (languageKeywords.includes(token)) {
            return <span key={tokenIndex} className="text-pink-400">{token}</span>
          }
          // Functions (word followed by parenthesis)
          if (/^[a-zA-Z_]\w*$/.test(token) && tokens[tokenIndex + 1] === "(") {
            return <span key={tokenIndex} className="text-blue-400">{token}</span>
          }
          // Properties/methods after dot
          if (tokens[tokenIndex - 1] === "." && /^[a-zA-Z_]\w*$/.test(token)) {
            return <span key={tokenIndex} className="text-cyan-400">{token}</span>
          }
          // Numbers
          if (/^\d+$/.test(token)) {
            return <span key={tokenIndex} className="text-amber-400">{token}</span>
          }
          // Types (capitalized words)
          if (/^[A-Z][a-zA-Z]*$/.test(token)) {
            return <span key={tokenIndex} className="text-yellow-300">{token}</span>
          }
          // Default
          return <span key={tokenIndex}>{token}</span>
        })}
        {lineIndex < code.split("\n").length - 1 && "\n"}
      </span>
    )
  })
}

export function CodeBlock({ code, language = "typescript" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group rounded-lg overflow-hidden shadow-xl">
      <div className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 w-8 p-0 bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700"
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-500" />
          ) : (
            <Copy className="h-4 w-4 text-zinc-400" />
          )}
        </Button>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border-b border-zinc-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-zinc-500 font-mono ml-2">{language}</span>
      </div>
      <pre className="bg-zinc-950 p-4 overflow-x-auto text-sm leading-relaxed max-h-[350px] overflow-y-auto">
        <code className="text-zinc-300 font-mono">
          {highlightCode(code, language)}
        </code>
      </pre>
    </div>
  )
}
