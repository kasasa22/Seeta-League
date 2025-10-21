import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdminRequest } from '@/lib/server/admin'

export async function GET(req: Request, { params }: any) {
  const { id } = params
  const supabase = await createClient()
  const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}

export async function PUT(req: Request, { params }: any) {
  if (!isAdminRequest()) return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 })
  const { id } = params
  const body = await req.json()
  const supabase = await createClient()
  const { data, error } = await supabase.from('blogs').update({ ...body, updated_at: new Date().toISOString() }).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: Request, { params }: any) {
  if (!isAdminRequest()) return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 })
  const { id } = params
  const supabase = await createClient()
  const { error } = await supabase.from('blogs').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
