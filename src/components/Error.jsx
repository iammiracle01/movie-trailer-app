import React from 'react';

const Error = ({ message }) => (
    <div className="flex items-center justify-center min-h-screen bg-dark text-white">
        <p className="text-2xl">{message}</p>
    </div>
);

export default Error;
