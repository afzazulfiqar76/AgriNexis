import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from 'react-router-dom'
import {
  UNVERIFIED_PAGE_MESSAGE,
  isInternalPath,
  validateChatLink,
} from '@/utils/chatLinkPolicy'

const linkClassName =
  'font-medium text-primary underline underline-offset-2 hover:opacity-80'

function ChatLink({ href, children }) {
  const result = validateChatLink(href)

  if (!result.allowed) {
    return (
      <span className="italic opacity-90">{result.message || UNVERIFIED_PAGE_MESSAGE}</span>
    )
  }

  if (isInternalPath(result.href)) {
    return (
      <Link to={result.href} className={linkClassName}>
        {children}
      </Link>
    )
  }

  return (
    <a href={result.href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
      {children}
    </a>
  )
}

const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="mb-3 mt-1 text-lg font-bold leading-snug text-inherit">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-2 mt-3 text-base font-bold leading-snug text-inherit">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-2 text-sm font-semibold leading-snug text-inherit">{children}</h3>
  ),
  p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-inherit">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="my-2 border-l-2 border-primary/50 pl-3 italic opacity-90">
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = className?.includes('language-')
    if (isBlock) {
      return (
        <code
          className={`${className} block overflow-x-auto rounded-lg bg-black/10 px-3 py-2 text-xs`}
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <code className="rounded bg-black/10 px-1 py-0.5 text-[0.85em]" {...props}>
        {children}
      </code>
    )
  },
  pre: ({ children }) => (
    <pre className="my-2 overflow-x-auto rounded-lg bg-black/10 p-0 last:mb-0">{children}</pre>
  ),
  table: ({ children }) => (
    <div className="my-2 overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-xs">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-gray-200 bg-gray-50 px-2 py-1 font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border border-gray-200 px-2 py-1">{children}</td>
  ),
  a: ({ href, children }) => <ChatLink href={href}>{children}</ChatLink>,
}

export function ChatMessageContent({ content, isUser = false }) {
  const text = String(content ?? '').trim()
  if (!text) return null

  if (isUser) {
    return <span className="whitespace-pre-wrap">{text}</span>
  }

  return (
    <div className="chat-markdown text-sm leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {text}
      </ReactMarkdown>
    </div>
  )
}
