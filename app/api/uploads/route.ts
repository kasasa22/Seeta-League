import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdminRequest } from '@/lib/server/admin'

export async function POST(req: Request) {
  if (!isAdminRequest()) return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as any
    if (!file) return NextResponse.json({ ok: false, message: 'No file provided' }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${Date.now()}_${file.name}`

    const supabase = await createClient()
  const { data, error } = await supabase.storage.from('uploads').upload(filename, buffer, { cacheControl: '3600', upsert: false, contentType: file.type })
  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 })

  // getPublicUrl returns an object with data.publicUrl
  const { data: urlData } = await supabase.storage.from('uploads').getPublicUrl(data.path as string)
  const publicUrl = (urlData as any)?.publicUrl || null

  return NextResponse.json({ ok: true, url: publicUrl })
  } catch (err: any) {
    return NextResponse.json({ ok: false, message: err.message || String(err) }, { status: 500 })
  }
}
