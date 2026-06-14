'use client'

import * as React from 'react'

export function CountUp({
  value,
  decimals = 0,
  duration = 1100,
  className,
}: {
  value: number
  decimals?: number
  duration?: number
  className?: string
}) {
  const [display, setDisplay] = React.useState(0)

  React.useEffect(() => {
    if (value === 0) {
      setDisplay(0)
      return
    }
    let raf = 0
    let start: number | null = null
    const step = (ts: number) => {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return <span className={className}>{display.toFixed(decimals)}</span>
}
