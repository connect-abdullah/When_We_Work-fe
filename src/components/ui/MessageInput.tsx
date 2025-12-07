"use client";
import React from "react";
import { Image as ImageIcon, Mic, Paperclip, Send, Smile } from "lucide-react";

const MessageInput: React.FC = () => {
  return (
    <div className="p-2 border-t border-gray-200 bg-white">
      <div className="flex items-center gap-1.5">
        <button className="p-1.5 text-gray-500 hover:text-[#5A6ACF] hover:bg-[#5A6ACF]/5 rounded-md transition-colors">
          <ImageIcon size={14} />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-[#5A6ACF] hover:bg-[#5A6ACF]/5 rounded-md transition-colors">
          <Paperclip size={14} />
        </button>
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-3 py-1.5 text-[10px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A6ACF] focus:border-transparent"
        />
        <button className="p-1.5 text-gray-500 hover:text-[#5A6ACF] hover:bg-[#5A6ACF]/5 rounded-md transition-colors">
          <Smile size={14} />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-[#5A6ACF] hover:bg-[#5A6ACF]/5 rounded-md transition-colors">
          <Mic size={14} />
        </button>
        <button className="bg-[#5A6ACF] text-white px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-[#5A6ACF]/90 transition-colors">
          <span className="text-[9px] font-medium">Send</span>
          <Send size={12} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
