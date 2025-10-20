from flask import Flask, jsonify, request
from flask_cors import CORS
import docker

# Initialize Flask app and Docker client
app = Flask(__name__)
# Enable Cross-Origin Resource Sharing (CORS) to allow the frontend to communicate with this backend
CORS(app)
client = docker.from_env()

# --- API Endpoints ---

@app.route('/images', methods=['GET'])
def list_images():
    """Endpoint to get a list of all available Docker images."""
    try:
        images = client.images.list()
        # Format the image data to be simple and clean for the frontend
        image_list = []
        for img in images:
            # We only want top-level images, not the intermediate layers
            if img.tags:
                image_list.append({
                    'id': img.short_id.replace('sha256:', ''),
                    'tags': img.tags
                })
        return jsonify(image_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/containers', methods=['GET'])
def list_containers():
    """Endpoint to get a list of all running containers."""
    try:
        containers = client.containers.list()
        container_list = [
            {
                'id': c.short_id,
                'name': c.name,
                'image': c.image.tags[0] if c.image.tags else 'N/A',
                'status': c.status
            } for c in containers
        ]
        return jsonify(container_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/containers/run', methods=['POST'])
def run_container():
    """Endpoint to run a new container from an image."""
    data = request.get_json()
    image_name = data.get('image')

    if not image_name:
        return jsonify({'error': 'Image name is required'}), 400

    try:
        # Run the container in detached mode (in the background)
        # For a real app, you would handle port mapping here.
        # This is a simplified example.
        container = client.containers.run(image_name, detach=True)
        return jsonify({
            'id': container.short_id,
            'name': container.name,
            'status': 'created'
        }), 201
    except docker.errors.ImageNotFound:
        return jsonify({'error': f'Image "{image_name}" not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/containers/<container_id>/stop', methods=['POST'])
def stop_container(container_id):
    """Endpoint to stop a running container."""
    try:
        container = client.containers.get(container_id)
        container.stop()
        return jsonify({'status': 'stopped'})
    except docker.errors.NotFound:
        return jsonify({'error': 'Container not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/containers/<container_id>/remove', methods=['DELETE'])
def remove_container(container_id):
    """Endpoint to remove a stopped container."""
    try:
        container = client.containers.get(container_id)
        # Ensure container is stopped before removing
        if container.status == 'running':
             container.stop()
        container.remove()
        return jsonify({'status': 'removed'})
    except docker.errors.NotFound:
        return jsonify({'error': 'Container not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# --- Main execution ---
if __name__ == '__main__':
    # Run the Flask app on host 0.0.0.0 to be accessible from the network
    # Note: For production, use a proper WSGI server like Gunicorn or Waitress.
    app.run(host='0.0.0.0', port=5001, debug=True)
