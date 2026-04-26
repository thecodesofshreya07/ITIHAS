import React, { useState, useEffect, useRef } from 'react';
import storiesData from '../Stories/stories.json';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I am your ITIHAAS Guide. Ask me something about history!", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);

        // Process bot response
        const botResponse = getBotResponse(input);
        setTimeout(() => {
            setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
        }, 500);

        setInput('');
    };

    const getBotResponse = (query) => {
        const q = query.toLowerCase();
        const isTimeQuery = q.includes('when') || q.includes('date') || q.includes('year') || q.includes('happen');

        const findStory = (keywords) => {
            return storiesData.find(s => keywords.some(k => s.id.includes(k) || s.title.toLowerCase().includes(k)));
        };

        let targetStory = null;
        if (q.includes('indus')) targetStory = findStory(['indus']);
        else if (q.includes('magna carta')) targetStory = findStory(['magna-carta']);
        else if (q.includes('french revolution')) targetStory = findStory(['french']);
        else if (q.includes('american revolution')) targetStory = findStory(['american']);
        else if (q.includes('world war 1') || q.includes('ww1')) targetStory = findStory(['world-war-one']);
        else if (q.includes('world war 2') || q.includes('ww2')) targetStory = findStory(['world-war-two']);
        else if (q.includes('industrial revolution')) targetStory = findStory(['industrial']);
        else if (q.includes('napoleon')) targetStory = findStory(['napoleon']);

        if (targetStory) {
            if (isTimeQuery) {
                return `The ${targetStory.title} happened during ${targetStory.period}.`;
            }
            return targetStory.shortDescription;
        }

        if (q.includes('hi') || q.includes('hello')) {
            return "Hi there! I can tell you about the Indus Valley, Magna Carta, Revolutions, World Wars, and more. You can ask me what happened or when it happened!";
        }

        return "I'm sorry, I don't know much about that yet. Try asking about the 'Indus Valley', 'Magna Carta', or 'French Revolution'!";
    };

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            {!isOpen && (
                <button className="chat-toggle" onClick={() => setIsOpen(true)} title="History Guide">
                    <span className="bot-icon">🕰️</span>
                </button>
            )}

            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h3>ITIHAAS Bot</h3>
                        <button onClick={() => setIsOpen(false)}>×</button>
                    </div>
                    <div className="chat-messages">
                        {messages.map((m, i) => (
                            <div key={i} className={`message ${m.sender}`}>
                                {m.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form className="chat-input" onSubmit={handleSend}>
                        <input
                            type="text"
                            placeholder="Ask about history..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
