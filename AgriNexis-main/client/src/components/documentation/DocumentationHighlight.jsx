export function DocumentationHighlight({ title, text }) {
  return (
    <aside className="mt-4 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
      {title && <p className="text-sm font-semibold text-primary">{title}</p>}
      <p className={title ? 'mt-1 text-sm leading-relaxed text-gray-700' : 'text-sm leading-relaxed text-gray-700'}>
        {text}
      </p>
    </aside>
  )
}
