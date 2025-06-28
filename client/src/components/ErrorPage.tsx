import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorPageProps {
  code: number;
  message: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ code, message }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">{code}</h1>
      <p className="text-xl mb-4">{message}</p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;