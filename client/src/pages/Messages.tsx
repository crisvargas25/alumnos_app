import React, { useState, useEffect } from 'react';
import MessageForm from '../components/MessageForm';

interface Message {
  _id: string;
  sender: { _id: string; name: string };
  recipient: string;
  content: string;
  createdAt: string;
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/messages', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Messages</h2>
      <MessageForm />
      <div className="mt-6">
        <h3 className="text-xl mb-2">Received Messages</h3>
        {messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((message) => (
              <li key={message._id} className="bg-white p-4 rounded shadow-md">
                <p><strong>From:</strong> {message.sender.name}</p>
                <p><strong>Message:</strong> {message.content}</p>
                <p><strong>Date:</strong> {new Date(message.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Messages;