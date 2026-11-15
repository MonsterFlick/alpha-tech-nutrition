"use client"

import React from "react"
import Link from "next/link"

interface BlogMarkdownProps {
  content: string
}

interface BlockH {
  type: "h1" | "h2" | "h3" | "h4" | "cta_header"
  text: string
}

interface BlockParagraph {
  type: "paragraph" | "callout" | "blockquote"
  text: string
}

interface BlockList {
  type: "list"
  ordered: boolean
  items: string[]
}

interface BlockTable {
  type: "table"
  headers: string[]
  rows: string[][]
}

interface BlockHr {
  type: "hr"
}

type MarkdownBlock = BlockH | BlockParagraph | BlockList | BlockTable | BlockHr

/**
 * Robust line-by-line streaming markdown block parser
 */
function parseMarkdownBlocks(markdown: string): MarkdownBlock[] {
  const lines = markdown.split("\n")
  const blocks: MarkdownBlock[] = []
  let currentList: BlockList | null = null
  let currentTable: BlockTable | null = null
  let currentParagraph: string[] = []

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      blocks.push({ type: "paragraph", text: currentParagraph.join(" ") })
      currentParagraph = []
    }
  }

  function flushList() {
    if (currentList) {
      blocks.push(currentList)
      currentList = null
    }
  }

  function flushTable() {
    if (currentTable) {
      blocks.push(currentTable)
      currentTable = null
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i]
    const line = rawLine.trim()

    if (!line) {
      flushParagraph()
      flushList()
      flushTable()
      continue
    }

    // Horizontal Rule
    if (line === "---" || line === "***" || line === "___") {
      flushParagraph()
      flushList()
      flushTable()
      blocks.push({ type: "hr" })
      continue
    }

    // High-impact CTA Callout Row
    if (line.startsWith("👉 ")) {
      flushParagraph()
      flushList()
      flushTable()
      blocks.push({ type: "callout", text: line.replace(/^👉\s*/, "") })
      continue
    }

    // Special Product CTA Header
    if (line.startsWith("### ⚡")) {
      flushParagraph()
      flushList()
      flushTable()
      blocks.push({ type: "cta_header", text: line.replace(/^###\s*⚡\s*/, "") })
      continue
    }

    // Headings
    if (line.startsWith("#### ")) {
      flushParagraph()
      flushList()
      flushTable()
      blocks.push({ type: "h4", text: line.replace(/^####\s+/, "") })
      continue
    }
    if (line.startsWith("### ")) {
      flushParagraph()
      flushList()
      flushTable()
      blocks.push({ type: "h3", text: line.replace(/^###\s+/, "") })
      continue
    }
    if (line.startsWith("## ")) {
      flushParagraph()
      flushList()
      flushTable()
      blocks.push({ type: "h2", text: line.replace(/^##\s+/, "") })
      continue
    }
    if (line.startsWith("# ")) {
      flushParagraph()
      flushList()
      flushTable()
      blocks.push({ type: "h1", text: line.replace(/^#\s+/, "") })
      continue
    }

    // Table rows
    if (line.startsWith("|") && line.endsWith("|")) {
      flushParagraph()
      flushList()
      if (!currentTable) {
        currentTable = { type: "table", headers: [], rows: [] }
        const cols = line.split("|").slice(1, -1).map((c) => c.trim())
        currentTable.headers = cols
      } else if (line.includes("---")) {
        // separator row, skip
        continue
      } else {
        const cols = line.split("|").slice(1, -1).map((c) => c.trim())
        currentTable.rows.push(cols)
      }
      continue
    } else {
      flushTable()
    }

    // Unordered lists (- or *)
    if (line.startsWith("- ") || line.startsWith("* ")) {
      flushParagraph()
      const itemText = line.replace(/^[-*]\s+/, "")
      if (!currentList || currentList.ordered) {
        flushList()
        currentList = { type: "list", ordered: false, items: [itemText] }
      } else {
        currentList.items.push(itemText)
      }
      continue
    }

    // Ordered lists (1. , 2. )
    const numMatch = line.match(/^(\d+)\.\s+(.*)$/)
    if (numMatch) {
      flushParagraph()
      const itemText = numMatch[2]
      if (!currentList || !currentList.ordered) {
        flushList()
        currentList = { type: "list", ordered: true, items: [itemText] }
      } else {
        currentList.items.push(itemText)
      }
      continue
    }

    // Continuation of a list item
    if (currentList && (rawLine.startsWith("  ") || rawLine.startsWith("\t"))) {
      currentList.items[currentList.items.length - 1] += " " + line
      continue
    }

    flushList()

    // Blockquote
    if (line.startsWith("> ")) {
      flushParagraph()
      blocks.push({ type: "blockquote", text: line.replace(/^>\s*/, "") })
      continue
    }

    // Regular line in paragraph
    currentParagraph.push(line)
  }

  flushParagraph()
  flushList()
  flushTable()

  return blocks
}

/**
 * High-precision inline formatting parser
 * Supports:
 * - Bold Links: **[label](url)**
 * - Regular Links: [label](url) (including [**label**](url))
 * - Bold Text: **text**
 * - Italic Text: *text*
 * - Inline Code: `code`
 */
export function renderInlineFormatting(text: string): React.ReactNode {
  // Regex with balanced single-level nested parentheses for URLs like https://wa.me/?text=Hello(world)
  const regex =
    /\*\*\[([^\]]+)\]\(((?:[^()]+|\([^()]*\))+)\)\*\*|\[([^\]]+)\]\(((?:[^()]+|\([^()]*\))+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g

  let lastIndex = 0
  let match: RegExpExecArray | null
  const elements: React.ReactNode[] = []
  let keyIndex = 0

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(
        <React.Fragment key={`txt-${keyIndex++}`}>
          {text.slice(lastIndex, match.index)}
        </React.Fragment>
      )
    }

    if (match[1] !== undefined && match[2] !== undefined) {
      // Bold Link: **[label](href)**
      const label = match[1]
      const href = match[2]
      const isExternal = href.startsWith("http")
      elements.push(
        isExternal ? (
          <a
            key={`blink-${keyIndex++}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 font-black transition-colors inline-flex items-center gap-1"
          >
            {label}
          </a>
        ) : (
          <Link
            key={`blink-${keyIndex++}`}
            href={href}
            className="text-blue-400 hover:text-blue-300 underline underline-offset-4 font-black transition-colors inline-flex items-center gap-1"
          >
            {label}
          </Link>
        )
      )
    } else if (match[3] !== undefined && match[4] !== undefined) {
      // Standard Link: [label](href) (supports inner **bold**)
      let rawLabel = match[3]
      let isBold = false
      if (rawLabel.startsWith("**") && rawLabel.endsWith("**")) {
        rawLabel = rawLabel.slice(2, -2)
        isBold = true
      }
      const href = match[4]
      const isExternal = href.startsWith("http")
      elements.push(
        isExternal ? (
          <a
            key={`link-${keyIndex++}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors inline-flex items-center gap-1 ${
              isBold ? "font-black" : "font-bold"
            }`}
          >
            {rawLabel}
          </a>
        ) : (
          <Link
            key={`link-${keyIndex++}`}
            href={href}
            className={`text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors inline-flex items-center gap-1 ${
              isBold ? "font-black" : "font-bold"
            }`}
          >
            {rawLabel}
          </Link>
        )
      )
    } else if (match[5] !== undefined) {
      // Bold Text: **text**
      elements.push(
        <strong key={`bold-${keyIndex++}`} className="text-white font-bold">
          {match[5]}
        </strong>
      )
    } else if (match[6] !== undefined) {
      // Italic Text: *text*
      elements.push(
        <em key={`italic-${keyIndex++}`} className="italic text-white/90">
          {match[6]}
        </em>
      )
    } else if (match[7] !== undefined) {
      // Inline Code: `code`
      elements.push(
        <code
          key={`code-${keyIndex++}`}
          className="bg-white/10 text-blue-300 px-1.5 py-0.5 rounded text-xs font-mono"
        >
          {match[7]}
        </code>
      )
    }

    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    elements.push(
      <React.Fragment key={`txt-end-${keyIndex++}`}>
        {text.slice(lastIndex)}
      </React.Fragment>
    )
  }

  return elements
}

export function BlogMarkdown({ content }: BlogMarkdownProps) {
  const blocks = parseMarkdownBlocks(content)

  return (
    <div className="prose prose-invert max-w-none space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h1":
          case "h2":
            return (
              <h2
                key={i}
                className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-10 mb-4 pt-4 border-t border-white/10"
              >
                {renderInlineFormatting(block.text)}
              </h2>
            )

          case "h3":
            return (
              <h3
                key={i}
                className="text-xl sm:text-2xl font-black uppercase text-blue-400 tracking-tight mt-8 mb-3"
              >
                {renderInlineFormatting(block.text)}
              </h3>
            )

          case "h4":
            return (
              <h4
                key={i}
                className="text-base sm:text-lg font-bold uppercase text-white/90 tracking-tight mt-6 mb-2"
              >
                {renderInlineFormatting(block.text)}
              </h4>
            )

          case "cta_header":
            return (
              <div
                key={i}
                className="my-8 p-6 rounded-2xl bg-gradient-to-r from-blue-950/80 via-blue-900/40 to-blue-950/80 border-2 border-blue-500/50 shadow-xl"
              >
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white flex items-center gap-2 mb-1">
                  <span className="text-emerald-400">⚡</span>
                  <span>{renderInlineFormatting(block.text)}</span>
                </h3>
              </div>
            )

          case "callout":
            return (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-300 font-bold flex items-start gap-3 my-6 shadow-xl shadow-emerald-500/10"
              >
                <span className="text-xl shrink-0 mt-0.5">👉</span>
                <div className="flex-1 text-sm sm:text-base leading-relaxed">
                  {renderInlineFormatting(block.text)}
                </div>
              </div>
            )

          case "hr":
            return <hr key={i} className="border-white/10 my-8" />

          case "table":
            return (
              <div
                key={i}
                className="my-6 overflow-x-auto rounded-2xl border border-white/10 bg-[#0E132D] shadow-xl"
              >
                <table className="w-full text-left text-xs sm:text-sm font-mono border-collapse min-w-[540px]">
                  <thead className="bg-[#151C42] border-b border-white/10 text-white font-bold">
                    <tr>
                      {block.headers.map((h, hi) => (
                        <th key={hi} className="p-3.5 whitespace-nowrap">
                          {renderInlineFormatting(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {block.rows.map((r, ri) => (
                      <tr key={ri} className="hover:bg-white/5 transition-colors">
                        {r.map((c, ci) => (
                          <td key={ci} className="p-3.5 text-white/80">
                            {renderInlineFormatting(c)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          case "list":
            return block.ordered ? (
              <ol key={i} className="list-decimal pl-6 space-y-2 text-white/80 my-4 leading-relaxed font-mono text-sm sm:text-base">
                {block.items.map((item, j) => (
                  <li key={j} className="pl-1">
                    {renderInlineFormatting(item)}
                  </li>
                ))}
              </ol>
            ) : (
              <ul key={i} className="space-y-2.5 text-white/80 my-4 leading-relaxed font-mono text-sm sm:text-base">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                    <div className="flex-1">{renderInlineFormatting(item)}</div>
                  </li>
                ))}
              </ul>
            )

          case "blockquote":
            return (
              <blockquote
                key={i}
                className="p-4 my-4 rounded-xl border-l-4 border-blue-500 bg-blue-500/10 text-white/90 italic font-mono"
              >
                {renderInlineFormatting(block.text)}
              </blockquote>
            )

          case "paragraph":
          default:
            return (
              <p key={i} className="text-white/80 leading-relaxed text-sm sm:text-base my-4">
                {renderInlineFormatting(block.text)}
              </p>
            )
        }
      })}
    </div>
  )
}
