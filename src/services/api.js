const API_BASE_URL = '/api';

export const api = {
  async getImages() {
    const response = await fetch(`${API_BASE_URL}/images`);
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    return response.json();
  },

  async getContainers() {
    const response = await fetch(`${API_BASE_URL}/containers`);
    if (!response.ok) {
      throw new Error('Failed to fetch containers');
    }
    return response.json();
  },

  async runContainer(imageTag) {
    const response = await fetch(`${API_BASE_URL}/containers/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageTag }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to run container');
    }
    return response.json();
  },

  async stopContainer(containerId) {
    const response = await fetch(`${API_BASE_URL}/containers/${containerId}/stop`, {
      method: 'POST',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to stop container');
    }
    return response.json();
  },

  async removeContainer(containerId) {
    const response = await fetch(`${API_BASE_URL}/containers/${containerId}/remove`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to remove container');
    }
    return response.json();
  },
};
