import React from 'react';

const AuthForm = ({ onSubmit, title, buttonText, children }) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;