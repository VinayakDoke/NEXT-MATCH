// import { useCallback, useEffect, useRef } from "react"
// import usePresenceStore from "./usePresenceStore"
// import { Channel, Members } from "pusher-js"
// import { pusherClient } from "@/lib/pusher"

// export const usePresenceChannel = () => {
//     const { set, add, remove } = usePresenceStore(state => ({
//         set: state.set,
//         add: state.add,
//         remove: state.remove
//     }
//     ))

//     const channelRef = useRef<Channel | null>(null)

//     const handleSetMembers = useCallback((memberIds: string[]) => {
//         set(memberIds)
//     }, [set])
//     const handleAddMember= useCallback((memberId: string) => {
//         add(memberId)
//     }, [add])
//     const handleRemoveMember = useCallback((memberId: string) => {
//         remove(memberId)
//     }, [remove])

//     useEffect(() => {
//         if (!channelRef.current) {
//             channelRef.current = pusherClient.subscribe('presence-nm')
//             channelRef.current.bind('pusher:subscription_succeeded', (members: Members) => {
//                 handleSetMembers(Object.keys(members.members))
//             }
//             )
//             channelRef.current.bind('pusher:member_added', (member: Record<string, any>) => {
//                 handleAddMember(member.id)
//             })
//             channelRef.current.bind('pusher:member_removed', (member: Record<string, any>) => {
//                 handleRemoveMember(member.id)
//             })
//         }
//         return()=>{
//             if(channelRef.current){
//                 channelRef.current.unsubscribe()
//                 channelRef.current.unbind('pusher:subscription_succeeded',handleSetMembers)
//                 channelRef.current.unbind('pusher:member_added',handleAddMember)
//                 channelRef.current.unbind('pusher:member_removed',handleRemoveMember)
//                 channelRef.current = null;
//             }
//         }
//     }, [handleAddMember,handleRemoveMember,handleSetMembers])

// }

import { useEffect, useRef } from "react";
import usePresenceStore from "./usePresenceStore";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "@/lib/pusher";

export const usePresenceChannel = () => {
  // Stable selectors for Zustand store
  const set = usePresenceStore((state) => state.set);
  const add = usePresenceStore((state) => state.add);
  const remove = usePresenceStore((state) => state.remove);

  const channelRef = useRef<Channel | null>(null);

  useEffect(() => {
    if (!channelRef.current) {
      // Subscribe to the presence channel
      channelRef.current = pusherClient.subscribe("presence-nm");

      // Bind events
      channelRef.current.bind("pusher:subscription_succeeded", (members: Members) => {
        set(Object.keys(members.members)); // Set initial members
      });

      channelRef.current.bind("pusher:member_added", (member: { id: string }) => {
        add(member.id); // Add a new member
      });

      channelRef.current.bind("pusher:member_removed", (member: { id: string }) => {
        remove(member.id); // Remove a member
      });
    }

    // Cleanup on unmount
    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unbind("pusher:subscription_succeeded");
        channelRef.current.unbind("pusher:member_added");
        channelRef.current.unbind("pusher:member_removed");
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
    };
  }, [set, add, remove]); // Stable dependencies

};
