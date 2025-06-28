import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MessageFormProps {
  recipientId?: string;
}

const MessageForm: React.FC<MessageFormProps> = ({ recipientId }) => {
  const [recipient, setRecipient] = useState(recipientId || '');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !content) {
      setError('Please fill in all fields');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ recipient, content }),
      });
      if (response.ok) {
        setRecipient('');
        setContent('');
        navigate('/messages');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to send message');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Send Message</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">Recipient ID</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter recipient ID"
            disabled={!!recipientId}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
            placeholder="Enter your message"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageForm;