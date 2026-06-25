'use client'

import * as React from 'react'
import { Bold, Italic, Heading as HeadingIcon, List, ListOrdered, Link2, Eraser } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: Props) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (ref.current && ref.current.innerHTML !== (value || '')) {
      ref.current.innerHTML = value || ''
    }
  }, [value])

  const sync = () => onChange(ref.current?.innerHTML || '')

  const exec = (cmd: string, arg?: string) => {
    ref.current?.focus()
    document.execCommand(cmd, false, arg)
    sync()
  }

  const addLink = () => {
    const url = prompt('Enter the link URL')
    if (url) exec('createLink', url)
  }

  return (
    <div className="rounded-md border border-slate-700 bg-slate-800">
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-700 p-2">
        <Btn onClick={() => exec('bold')} label="Bold"><Bold className="h-4 w-4" /></Btn>
        <Btn onClick={() => exec('italic')} label="Italic"><Italic className="h-4 w-4" /></Btn>
        <Btn onClick={() => exec('formatBlock', 'H3')} label="Heading"><HeadingIcon className="h-4 w-4" /></Btn>
        <Btn onClick={() => exec('insertUnorderedList')} label="Bullet list"><List className="h-4 w-4" /></Btn>
        <Btn onClick={() => exec('insertOrderedList')} label="Numbered list"><ListOrdered className="h-4 w-4" /></Btn>
        <Btn onClick={addLink} label="Link"><Link2 className="h-4 w-4" /></Btn>
        <Btn onClick={() => exec('removeFormat')} label="Clear formatting"><Eraser className="h-4 w-4" /></Btn>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={sync}
        data-placeholder={placeholder || 'Write here...'}
        className={cn(
          'min-h-[180px] p-3 text-sm text-white focus:outline-none',
          '[&_h3]:text-lg [&_h3]:font-bold [&_h3]:my-2',
          '[&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-2',
          '[&_a]:text-emerald-400 [&_a]:underline',
          'empty:before:text-slate-500 empty:before:content-[attr(data-placeholder)]'
        )}
      />
    </div>
  )
}

function Btn({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="rounded p-1.5 text-slate-300 hover:bg-slate-700 hover:text-white"
    >
      {children}
    </button>
  )
}
