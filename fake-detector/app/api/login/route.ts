import { NextResponse } from 'next/server'

export async function POST(request: Request) {

  const usuarios = [{
    "DNI": "00000000A",
    "password": "password"
  },
  {
    "DNI": "00000001A",
    "password": "password"
  }
  ]

  const formData = await request.json()

  return NextResponse.json({ info: 'user logged in' }, { status: 200 })
}