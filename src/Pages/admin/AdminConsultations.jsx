import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FiMessageSquare, FiUser, FiSend, FiCheckCircle, FiClock, FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import Loader from "../../Components/Loader";

const AdminConsultations = () => {
    const [consultations, setConsultations] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const chatEndRef = useRef(null);

    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchConsultations();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [selectedChat?.messages]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchConsultations = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/Consultation/admin/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setConsultations(response.data);
            setLoading(false);
        } catch (error) {
            toast.error("Failed to load consultations");
            setLoading(false);
        }
    };

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedChat) return;

        try {
            const response = await axios.post(`${API_URL}/api/Consultation/send`, 
                { message: newMessage, userId: selectedChat.userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            // Update local state
            setSelectedChat(response.data);
            setConsultations(prev => prev.map(c => c.userId === selectedChat.userId ? response.data : c));
            setNewMessage("");
        } catch (error) {
            toast.error("Failed to send message");
        }
    };

    const handleCloseChat = async (userId) => {
        try {
            await axios.put(`${API_URL}/api/Consultation/admin/close/${userId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Consultation closed");
            fetchConsultations();
            if (selectedChat?.userId === userId) setSelectedChat(null);
        } catch (error) {
            toast.error("Failed to close chat");
        }
    };

    const filteredConsultations = consultations.filter(c => 
        c.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <Loader />;

    return (
        <div className="h-[calc(100vh-140px)] flex gap-6 animate-fadeIn">
            {/* Sidebar: Chat List */}
            <div className="w-1/3 flex flex-col bg-white rounded-[2.5rem] border border-secondery/5 shadow-xl overflow-hidden">
                <div className="p-6 border-b border-secondery/5">
                    <h2 className="text-xl font-black text-secondery uppercase tracking-tight mb-4">Consultations</h2>
                    <div className="relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-secondery/30" />
                        <input 
                            type="text" 
                            placeholder="Search users..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-primary/20 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 ring-accent/30 transition-all"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
                    {filteredConsultations.map((chat) => (
                        <button 
                            key={chat.userId}
                            onClick={() => handleSelectChat(chat)}
                            className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all ${
                                selectedChat?.userId === chat.userId 
                                ? 'bg-secondery text-white shadow-lg shadow-secondery/20 translate-x-1' 
                                : 'hover:bg-primary/40 text-secondery'
                            }`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black ${
                                selectedChat?.userId === chat.userId ? 'bg-accent text-secondery' : 'bg-accent/10 text-accent'
                            }`}>
                                {chat.userName.charAt(0)}
                            </div>
                            <div className="flex-1 text-left overflow-hidden">
                                <h4 className="font-bold text-sm truncate">{chat.userName}</h4>
                                <p className={`text-[10px] truncate ${selectedChat?.userId === chat.userId ? 'text-white/60' : 'text-secondery/40'}`}>
                                    {chat.messages[chat.messages.length - 1]?.message || "No messages yet"}
                                </p>
                            </div>
                            {chat.status === "active" && (
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-white rounded-[2.5rem] border border-secondery/5 shadow-xl overflow-hidden relative">
                {selectedChat ? (
                    <>
                        {/* Header */}
                        <div className="p-6 bg-primary/20 border-b border-secondery/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-black text-secondery">
                                    {selectedChat.userName.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-secondery text-sm">{selectedChat.userName}</h3>
                                    <p className="text-[10px] text-secondery/40 font-black uppercase tracking-widest">Customer Consultation</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleCloseChat(selectedChat.userId)}
                                className="px-4 py-2 bg-white text-emerald-600 border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                            >
                                Mark as Resolved
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar space-y-6 bg-white">
                            {selectedChat.messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.sender === "admin" ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] p-4 rounded-[1.5rem] ${
                                        msg.sender === "admin" 
                                        ? 'bg-secondery text-white rounded-tr-none' 
                                        : 'bg-primary/40 text-secondery rounded-tl-none'
                                    }`}>
                                        <p className="text-xs font-medium leading-relaxed">{msg.message}</p>
                                        <span className={`text-[8px] font-black uppercase mt-2 block ${msg.sender === "admin" ? 'text-white/40' : 'text-secondery/30'}`}>
                                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-secondery/5 flex items-center gap-4">
                            <input 
                                type="text" 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your reply..." 
                                className="flex-1 h-14 bg-primary/20 rounded-2xl px-6 text-sm font-bold focus:outline-none focus:bg-primary/30 transition-all border border-transparent focus:border-accent/30"
                            />
                            <button 
                                type="submit"
                                className="w-14 h-14 bg-accent text-secondery rounded-2xl flex items-center justify-center hover:bg-secondery hover:text-white transition-all shadow-lg shadow-accent/20 group"
                            >
                                <FiSend className="text-xl group-hover:scale-110 transition-transform" />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-20">
                        <div className="w-24 h-24 rounded-full bg-primary/40 flex items-center justify-center mb-6">
                            <FiMessageSquare className="text-accent text-4xl opacity-20" />
                        </div>
                        <h3 className="text-xl font-bold text-secondery uppercase tracking-tight">Expert Consultation Console</h3>
                        <p className="text-xs text-secondery/40 font-medium max-w-xs mt-3">Select a user from the left to start a real-time beauty consultation.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminConsultations;
