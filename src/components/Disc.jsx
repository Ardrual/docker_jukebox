import React from 'react';

export default function Disc({ image, onPlay, isPlaying }) {
  const handlePlay = () => {
    if (!isPlaying) {
      onPlay(image.id);
    }
  };

  return (
    <div className={`bg-gray-800 rounded-lg p-4 border-2 transition-all duration-200 ${
      isPlaying
        ? 'border-green-500 shadow-lg shadow-green-500/50'
        : 'border-gray-700 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white truncate">
            {image.tags[0] || 'Unnamed Image'}
          </h3>
          <p className="text-sm text-gray-400 font-mono truncate">
            {image.id.substring(7, 19)}
          </p>
        </div>
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className={`ml-4 px-4 py-2 rounded font-semibold transition-colors ${
            isPlaying
              ? 'bg-green-600 text-white cursor-default'
              : 'bg-cyan-600 hover:bg-cyan-700 text-white'
          }`}
        >
          {isPlaying ? 'Playing' : 'Play'}
        </button>
      </div>
    </div>
  );
}
