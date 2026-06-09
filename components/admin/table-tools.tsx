'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Button } from '@/components/ui/button'

export interface CsvColumn<T> {
  label: string
  value: (row: T) => string | number | null | undefined
}

export function downloadPdf<T>(title: string, columns: CsvColumn<T>[], rows: T[]) {
  const doc = new jsPDF({ orientation: columns.length > 5 ? 'landscape' : 'portrait' })

  doc.setFontSize(16)
  doc.text('Seeta League — ' + title, 14, 16)
  doc.setFontSize(10)
  doc.setTextColor(120)
  doc.text(`${rows.length} record${rows.length === 1 ? '' : 's'} · ${new Date().toLocaleString()}`, 14, 22)

  autoTable(doc, {
    head: [columns.map((c) => c.label)],
    body: rows.map((r) => columns.map((c) => {
      const v = c.value(r)
      return v == null ? '' : String(v)
    })),
    startY: 28,
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [16, 185, 129], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  })

  const filename = title.replace(/\s+/g, '_').toLowerCase() + '.pdf'
  doc.save(filename)
}

export function usePagination<T>(items: T[], pageSize = 10) {
  const [page, setPage] = React.useState(1)
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  React.useEffect(() => {
    if (page > totalPages) setPage(1)
  }, [page, totalPages])
  const start = (page - 1) * pageSize
  const pageItems = items.slice(start, start + pageSize)
  return { page, setPage, totalPages, pageItems, total: items.length }
}

export function TableToolbar({
  total,
  onExport,
  label = 'Export PDF',
}: {
  total: number
  onExport: () => void
  label?: string
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <span className="text-sm text-slate-400">{total} record{total === 1 ? '' : 's'}</span>
      <Button
        size="sm"
        variant="outline"
        onClick={onExport}
        disabled={total === 0}
        className="gap-1 border-slate-600 bg-slate-700/50 text-white hover:bg-slate-700"
      >
        <Download className="h-4 w-4" /> {label}
      </Button>
    </div>
  )
}

export function PaginationBar({
  page,
  totalPages,
  onPage,
}: {
  page: number
  totalPages: number
  onPage: (p: number) => void
}) {
  if (totalPages <= 1) return null
  return (
    <div className="mt-3 flex items-center justify-end gap-2 text-sm text-slate-400">
      <Button
        size="sm"
        variant="outline"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
        className="gap-1 border-slate-600 bg-slate-700/50 text-white hover:bg-slate-700 disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" /> Prev
      </Button>
      <span>
        Page {page} of {totalPages}
      </span>
      <Button
        size="sm"
        variant="outline"
        disabled={page >= totalPages}
        onClick={() => onPage(page + 1)}
        className="gap-1 border-slate-600 bg-slate-700/50 text-white hover:bg-slate-700 disabled:opacity-40"
      >
        Next <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
