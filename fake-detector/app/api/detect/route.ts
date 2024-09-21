import { NextResponse } from 'next/server'
import { detectAI } from '@/lib/detectAI'
import { getHash } from '@/lib/hashing'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type. Only JPEG, PNG, and GIF are supported.' }, { status: 400 })
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 })
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())

    // const result = await detectAI(buffer)
    const result = await getHash(buffer)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error detecting AI:', error)
    return NextResponse.json({ error: 'Error processing file' }, { status: 500 })
  }
}