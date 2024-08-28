//clicking the user and displaying the conversations
//follow instructions on Zustand documentation

import { create } from 'zustand';

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessage: (messages)=>set({ messages }),
}));

export default useConversation;