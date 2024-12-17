import { pusherClient } from "@/lib/pusher"
import { Channel } from "pusher-js"
import { useEffect, useRef } from "react"

export const useNotificationChannel = (userId: string|null) => {
    const channelNRef = useRef<Channel | null>(null)

    useEffect(() => {
        console.log("userId",userId)
        if (!userId) return
        if (!channelNRef.current) {
            channelNRef.current = pusherClient.subscribe(`private-${userId}`)
        }
        return () => {
            if (channelNRef.current) {
                channelNRef.current.unsubscribe()
                channelNRef.current = null
            }
        }
    }, [userId])
}