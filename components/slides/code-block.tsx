"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

// Vercel Triangle Logo - proper upward pointing triangle
function VercelLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 76 65" 
      fill="currentColor" 
      className={className}
    >
      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
    </svg>
  )
}
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  code: string
  language?: string
}

// Vercel-style syntax highlighting
function highlightCode(code: string, language: string): React.ReactNode {
  const keywords = {
    typescript: ["import", "export", "from", "const", "let", "var", "function", "async", "await", "return", "if", "else", "for", "while", "class", "interface", "type", "extends", "implements", "new", "this", "try", "catch", "throw", "default", "true", "false", "null", "undefined"],
    tsx: ["import", "export", "from", "const", "let", "var", "function", "async", "await", "return", "if", "else", "for", "while", "class", "interface", "type", "extends", "implements", "new", "this", "try", "catch", "throw", "default", "true", "false", "null", "undefined"],
    sql: ["CREATE", "TABLE", "INSERT", "INTO", "VALUES", "SELECT", "FROM", "WHERE", "UPDATE", "DELETE", "ALTER", "DROP", "INDEX", "PRIMARY", "KEY", "FOREIGN", "REFERENCES", "NOT", "NULL", "DEFAULT", "UNIQUE", "ON", "CASCADE", "SET", "TEXT", "INTEGER", "BOOLEAN", "UUID", "TIMESTAMP", "JSONB", "SERIAL", "BIGSERIAL", "VARCHAR", "ENABLE", "ROW", "LEVEL", "SECURITY", "POLICY", "FOR", "USING", "WITH", "CHECK", "AND", "OR", "IF", "EXISTS", "ALL", "NOW", "REFERENCES", "CASCADE"],
    bash: ["npm", "npx", "pnpm", "yarn", "cd", "mkdir", "git", "vercel", "supabase"],
  }

  const languageKeywords = keywords[language as keyof typeof keywords] || keywords.typescript

  return code.split("\n").map((line, lineIndex) => {
    // Handle comments
    if (line.trim().startsWith("//") || line.trim().startsWith("#") || line.trim().startsWith("--")) {
      return (
        <span key={lineIndex}>
          <span className="text-[#444]">{line}</span>
          {lineIndex < code.split("\n").length - 1 && "\n"}
        </span>
      )
    }

    // Process each token
    const tokens = line.split(/(\s+|[{}()\[\];,.:=<>]|"[^"]*"|'[^']*'|`[^`]*`)/)
    
    return (
      <span key={lineIndex}>
        {tokens.map((token, tokenIndex) => {
          // Strings - Vercel cyan/teal
          if (/^["'`]/.test(token)) {
            return <span key={tokenIndex} className="text-[#50e3c2]">{token}</span>
          }
          // Keywords - Vercel pink
          if (languageKeywords.includes(token) || languageKeywords.includes(token.toUpperCase())) {
            return <span key={tokenIndex} className="text-[#ff0080]">{token}</span>
          }
          // Functions
          if (/^[a-zA-Z_]\w*$/.test(token) && tokens[tokenIndex + 1] === "(") {
            return <span key={tokenIndex} className="text-[#0070f3]">{token}</span>
          }
          // Properties/methods after dot
          if (tokens[tokenIndex - 1] === "." && /^[a-zA-Z_]\w*$/.test(token)) {
            return <span key={tokenIndex} className="text-[#7928ca]">{token}</span>
          }
          // Numbers - Vercel orange
          if (/^\d+$/.test(token)) {
            return <span key={tokenIndex} className="text-[#f5a623]">{token}</span>
          }
          // Types (capitalized words)
          if (/^[A-Z][a-zA-Z]*$/.test(token)) {
            return <span key={tokenIndex} className="text-[#f5a623]">{token}</span>
          }
          // Default - light gray
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
    <div className="relative group rounded-lg overflow-hidden border border-[#191919] bg-black">
      {/* Copy button */}
      <div className="absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-7 w-7 p-0 bg-[#111] hover:bg-[#191919] border border-[#222]"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-white" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-[#555]" />
          )}
        </Button>
      </div>
      
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#191919]">
        <div className="flex items-center gap-2">
          <VercelLogo className="w-3 h-3 text-[#444]" />
          <span className="text-xs text-[#555] font-mono">{language}</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#222]" />
          <div className="w-3 h-3 rounded-full bg-[#222]" />
          <div className="w-3 h-3 rounded-full bg-[#222]" />
        </div>
      </div>
      
      {/* Code content */}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed max-h-[320px] overflow-y-auto">
        <code className="text-[#ccc] font-mono text-[13px]">
          {highlightCode(code, language)}
        </code>
      </pre>
    </div>
  )
}
