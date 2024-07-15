import React from 'react';

const Loading = ({ message }) => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                <p className="text-gray-700 text-lg">{message}</p>
            </div>
        </div>
    );
};

export default Loading;
