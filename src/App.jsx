import React, { useState, useEffect } from 'react';
import Menu from './components/Menu';
import CurrentlyPlaying from './components/CurrentlyPlaying';
import { api } from './services/api';

function App() {
  const [images, setImages] = useState([]);
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const [imagesData, containersData] = await Promise.all([
        api.getImages(),
        api.getContainers(),
      ]);
      setImages(imagesData);
      setContainers(containersData);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePlayDisc = async (imageTag) => {
    setLoading(true);
    try {
      await api.runContainer(imageTag);
      await fetchData();
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEject = async (containerId) => {
    setLoading(true);
    try {
      await api.stopContainer(containerId);
      await fetchData();
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get the first running container (currently playing disc)
  const currentlyPlaying = containers.length > 0 ? containers[0] : null;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-500">
            Docker Jukebox
          </h1>
          <p className="text-gray-400 mt-2">Manage your Docker containers like a jukebox</p>
        </div>
      </header>

      {/* Loading Indicator */}
      {loading && (
        <div className="fixed top-4 right-4 bg-cyan-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-md">
          <div className="flex items-center justify-between gap-4">
            <p>{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-white hover:text-gray-200 font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Currently Playing Section */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Now Playing</h2>
            <CurrentlyPlaying container={currentlyPlaying} onEject={handleEject} />
          </div>

          {/* Menu Section */}
          <div>
            <Menu
              images={images}
              runningContainers={containers}
              onPlayDisc={handlePlayDisc}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
