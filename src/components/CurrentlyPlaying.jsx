import React from 'react';

export default function CurrentlyPlaying({ container, onEject }) {
  if (!container) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 border-2 border-gray-700 text-center">
        <div className="text-gray-500 text-lg">
          <svg
            className="w-16 h-16 mx-auto mb-4 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
          <p>No disc playing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border-2 border-green-500 shadow-lg shadow-green-500/50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-500 font-semibold text-sm uppercase tracking-wide">
              Now Playing
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {container.image}
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            {container.name}
          </p>
        </div>
        <button
          onClick={() => onEject(container.id)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Eject
        </button>
      </div>
      <div className="bg-gray-700 rounded p-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Container ID:</span>
            <p className="text-white font-mono">{container.id}</p>
          </div>
          <div>
            <span className="text-gray-400">Status:</span>
            <p className="text-green-400 font-semibold">{container.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
