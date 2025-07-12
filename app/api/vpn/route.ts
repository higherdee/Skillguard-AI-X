import { NextResponse } from 'next/server'
import openvpn from 'openvpn-client'

const config = 'config/openvpn.ovpn'

let vpn

export async function POST(req: Request) {
  const { action } = await req.json()

  if (action === 'connect') {
    try {
      vpn = openvpn(config)
      await vpn.connect()
      return NextResponse.json({ success: true, message: 'VPN connected' })
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  if (action === 'disconnect') {
    try {
      await vpn.disconnect()
      return NextResponse.json({ success: true, message: 'VPN disconnected' })
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}

export async function GET() {
  const isConnected = vpn && vpn.isConnected()
  return NextResponse.json({ isConnected })
}
