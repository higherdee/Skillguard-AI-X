"use client"

import { useState, useEffect } from "react"
import { Shield, Zap, Power, MapPin, ChevronDown, Clock } from "lucide-react"
import { TopNav } from "@/components/top-nav"
import { Sidebar } from "@/components/sidebar"

const servers = [
  { name: "United States", location: "New York, USA", ip: "192.168.1.1" },
  { name: "United Kingdom", location: "London, UK", ip: "192.168.1.2" },
  { name: "Japan", location: "Tokyo, JP", ip: "192.168.1.3" },
  { name: "Germany", location: "Frankfurt, DE", ip: "192.168.1.4" },
  { name: "Canada", location: "Toronto, CA", ip: "192.168.1.5" },
]

export default function VpnPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [selectedServer, setSelectedServer] = useState(servers[0])
  const [isServerListOpen, setIsServerListOpen] = useState(false)
  const [connectionTime, setConnectionTime] = useState(0)

  useEffect(() => {
    const fetchVpnStatus = async () => {
      const response = await fetch('/api/vpn')
      const data = await response.json()
      setIsConnected(data.isConnected)
    }
    fetchVpnStatus()

    let timer: NodeJS.Timeout
    if (isConnected) {
      timer = setInterval(() => {
        setConnectionTime((prevTime) => prevTime + 1)
      }, 1000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [isConnected])

  const handleConnect = async () => {
    const action = isConnected ? 'disconnect' : 'connect'
    const response = await fetch('/api/vpn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action }),
    })
    const data = await response.json()
    if (data.success) {
      setIsConnected(!isConnected)
      if (action === 'disconnect') {
        setConnectionTime(0)
      }
    }
  }

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0")
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0")
    const s = (seconds % 60).toString().padStart(2, "0")
    return `${h}:${m}:${s}`
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <TopNav />
        <main className="p-8">
          <h1 className="text-4xl font-bold mb-8 flex items-center">
            <Shield className="w-10 h-10 mr-4 text-blue-500" />
            VPN Protection
          </h1>

          <div className="max-w-md mx-auto bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-8">
            <div className="flex flex-col items-center">
              <button
                onClick={handleConnect}
                className={`w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isConnected
                    ? "bg-green-500/20 text-green-400 border-4 border-green-500"
                    : "bg-gray-500/20 text-gray-400 border-4 border-gray-500"
                }`}
              >
                <Power className="w-20 h-20" />
              </button>
              <p className={`mt-4 text-2xl font-bold ${isConnected ? "text-green-400" : "text-gray-400"}`}>
                {isConnected ? "Connected" : "Disconnected"}
              </p>
              {isConnected && (
                <div className="mt-2 flex items-center text-gray-400">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{formatTime(connectionTime)}</span>
                </div>
              )}
            </div>

            <div className="mt-8">
              <div className="relative">
                <button
                  onClick={() => setIsServerListOpen(!isServerListOpen)}
                  className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-200 dark:bg-white/10"
                >
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3" />
                    <div>
                      <p className="font-semibold">{selectedServer.name}</p>
                      <p className="text-sm text-gray-500">{selectedServer.location}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${isServerListOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isServerListOpen && (
                  <div className="absolute w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    {servers.map((server) => (
                      <div
                        key={server.name}
                        onClick={() => {
                          setSelectedServer(server)
                          setIsServerListOpen(false)
                          if (isConnected) {
                            setIsConnected(false)
                            setConnectionTime(0)
                          }
                        }}
                        className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                      >
                        <MapPin className="w-5 h-5 mr-3" />
                        <div>
                          <p className="font-semibold">{server.name}</p>
                          <p className="text-sm text-gray-500">{server.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Your IP: {isConnected ? selectedServer.ip : "N/A"}</p>
              <p>Status: {isConnected ? "Protected" : "Not Protected"}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
