import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdminRequest } from '@/lib/server/admin'

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  if (!isAdminRequest()) return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { title, body: content, author_email, image_url, is_published } = body

  const supabase = await createClient()
  const { data, error } = await supabase.from('blogs').insert([{ title, body: content, author_email, image_url, is_published }]).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
