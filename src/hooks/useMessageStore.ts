import { MessageDto } from "@/types"
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type MessageState={
    message:MessageDto[];
    add:(mesage:MessageDto)=>void;
    remove:(message:MessageDto)=>void;
    set:(message:MessageDto[])=>void
}
const userMessageStore=create<MessageState>()(devtools((set)=>({
    messages:[],
    add:(message:MessageDto)=>set((state)=>({messages:[...state.messages,message]})),
    remove:(id)=>set(state=>({messages:state.messages.filter(message=>message.id!==id)})),
    set:(messages)=>set({messages}),
}),{name:'messageStoreDemo'}))
export default userMessageStore



// const userMessageStore = create<MessageState>()(
//     devtools(
//       (set) => ({
//         messages: [], // Ensure `messages` is initialized as an empty array
//         add: (message) =>
//           set((state) => ({
//             messages: [...state.messages, message], // Spread `state.messages` safely
//           })),
//         remove: (id: string) =>
//           set((state) => ({
//             messages: state.messages.filter((message) => message.id !== id),
//           })),
//         set: (messages: MessageDto[]) =>
//           set(() => ({
//             messages,
//           })),
//       }),
//       { name: 'messageStoreDemo' }
//     )
//   );
  
//   export default userMessageStore;
