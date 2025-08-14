import { NextResponse } from 'next/server'
import { openvpn, OpenVPNClient } from 'openvpn-client'

const config = 'config/openvpn.ovpn'

let vpn: OpenVPNClient | undefined

export async function POST(req: Request) {
  const { action } = await req.json()

  if (action === 'connect') {
    try {
      vpn = openvpn(config)
      if (vpn) {
        await vpn.connect()
      } else {
        throw new Error('Failed to initialize VPN client')
      }
      return NextResponse.json({ success: true, message: 'VPN connected' })
    } catch (error) {
      const errorMessage = typeof error === 'object' && error !== null && 'message' in error
        ? (error as { message: string }).message
        : String(error)
      return NextResponse.json({ error: errorMessage }, { status: 500 })
    }
  }

  if (action === 'disconnect') {
    try {
      if (!vpn) {
        return NextResponse.json({ error: 'VPN client is not initialized' }, { status: 400 })
      }
      await vpn.disconnect()
      return NextResponse.json({ success: true, message: 'VPN disconnected' })
    } catch (error) {
      const errorMessage = typeof error === 'object' && error !== null && 'message' in error
        ? (error as { message: string }).message
        : String(error)
      return NextResponse.json({ error: errorMessage }, { status: 500 })
    }
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}

export async function GET() {
  const isConnected = vpn && vpn.isConnected()
  return NextResponse.json({ isConnected })
}

declare module 'openvpn-client' {
  interface OpenVPNClient {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    isConnected(): boolean;
  }
  function openvpn(config: string): OpenVPNClient;
}
