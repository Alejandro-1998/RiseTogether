import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

export default function PrivateChat({ destUser, onClose }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    // A simple polling to get new messages every 5 seconds (since no websockets are set up)
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [destUser.id]);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(`/api/chat/${destUser.id}`);
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      if (loading) setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const { data } = await axios.post(`/api/chat/${destUser.id}`, { contenido: newMessage });
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#2d2d2d] rounded-2xl w-full max-w-md h-[500px] flex flex-col shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a1a1a]">
          <div className="flex items-center gap-3">
            <img 
              src={destUser.profile_photo_url || `https://ui-avatars.com/api/?name=${destUser.nombreUsuario}`} 
              alt={destUser.nombreUsuario} 
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                {destUser.nombreCompleto || destUser.nombreUsuario}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">@{destUser.nombreUsuario}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f9fafb] dark:bg-[#1f1f1f]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <span className="material-symbols-outlined animate-spin text-gray-400">autorenew</span>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-sm text-gray-500">
              No hay mensajes todavía. ¡Di hola!
            </div>
          ) : (
            messages.map((msg) => {
              const isMine = msg.id_remitente === user?.id;
              return (
                <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                      isMine 
                        ? 'bg-[#f2780d] text-white rounded-br-none' 
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-none'
                    }`}
                  >
                    {msg.contenido}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white dark:bg-[#2d2d2d] border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f2780d]/50"
            />
            <button 
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-[#f2780d] hover:bg-[#d96a0a] disabled:opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
