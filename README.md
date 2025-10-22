# Docker Jukebox

A React-based web interface for managing Docker containers, designed with a jukebox metaphor where Docker images are "discs" and running containers are "now playing".

## Features

- View all available Docker images in a menu-style interface
- Run containers from images with a single click
- See currently running containers
- Eject (stop) running containers
- Auto-refresh every 5 seconds
- Modern UI with Tailwind CSS

## Prerequisites

- Python 3.x
- Node.js (v14 or higher)
- Docker

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Install Node.js dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

1. Start the backend server:
```bash
python backend.py
```

The backend will run on `http://127.0.0.1:5001`

2. In a separate terminal, start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

3. Open your browser and navigate to `http://localhost:3000`

### Production Mode (with Gunicorn)

For production deployments, use Gunicorn as the WSGI server:

1. Start the backend with Gunicorn:
```bash
gunicorn -c gunicorn.conf.py backend:app
```

Or with custom settings:
```bash
gunicorn --bind 0.0.0.0:5001 --workers 4 backend:app
```

2. Build and serve the frontend:
```bash
npm run build
npm run preview
```

The configuration file `gunicorn.conf.py` includes production-ready settings:
- 4 worker processes for handling concurrent requests
- Logging to stdout/stderr
- Proper timeout and keepalive settings
- Bound to `0.0.0.0:5001` for network accessibility

## Project Structure

```
docker_jukebox/
├── backend.py              # Flask backend API
├── src/
│   ├── components/         # React components
│   │   ├── Menu.jsx       # Disc collection menu
│   │   ├── Disc.jsx       # Individual disc component
│   │   └── CurrentlyPlaying.jsx  # Now playing display
│   ├── services/
│   │   └── api.js         # API service for backend communication
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html             # HTML entry point
└── vite.config.js         # Vite configuration
```

## API Endpoints

- `GET /images` - List all Docker images
- `GET /containers` - List all running containers
- `POST /containers/run` - Run a container from an image
- `POST /containers/<id>/stop` - Stop a running container
- `DELETE /containers/<id>/remove` - Stop and remove a container

## Development

The application uses:
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Flask + Docker SDK for Python
- **Auto-refresh**: Frontend polls backend every 5 seconds

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.
