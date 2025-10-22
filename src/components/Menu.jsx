import React from 'react';
import Disc from './Disc';

export default function Menu({ images, runningContainers, onPlayDisc }) {
  // Get the image IDs that are currently running
  const runningImageIds = runningContainers.map(container => {
    // Match container.image with image tags
    const matchingImage = images.find(img =>
      img.tags.some(tag => tag === container.image)
    );
    return matchingImage?.id;
  }).filter(Boolean);

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <svg
          className="w-8 h-8 text-cyan-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        Disc Collection
      </h2>
      {images.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p>No Docker images available</p>
        </div>
      ) : (
        <div className="space-y-3">
          {images.map(image => (
            <Disc
              key={image.id}
              image={image}
              onPlay={onPlayDisc}
              isPlaying={runningImageIds.includes(image.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
