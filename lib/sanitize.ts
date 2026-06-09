export function sanitizeHtml(input: string): string {
  if (!input) return ""
  let html = input
  html = html.replace(/<\/?(script|style|iframe|object|embed|link|meta|form|input)[^>]*>/gi, "")
  html = html.replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
  html = html.replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1=$2#$2')
  return html
}
