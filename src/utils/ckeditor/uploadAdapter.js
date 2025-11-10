// Custom upload adapter for CKEditor image uploads
import api from '../../api/axios';

class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  // Starts the upload process
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        })
    );
  }

  // Aborts the upload process
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Initializes the XMLHttpRequest object
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    // Get base URL from environment or api instance
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    
    // Update this endpoint to match your backend API
    xhr.open('POST', `${baseURL}/api/upload-image/`, true);
    
    // Add authorization token if available
    const token = localStorage.getItem('token');
    if (token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }

    xhr.responseType = 'json';
  }

  // Initializes XMLHttpRequest listeners
  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;

      // Check for different response structures
      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText);
      }

      // Handle different response formats from backend
      // Adjust these based on your API response structure
      const imageUrl = response.url || response.data?.url || response.image || response.data?.image;

      if (!imageUrl) {
        return reject('Upload successful but no image URL received from server');
      }

      resolve({
        default: imageUrl,
      });
    });

    // Upload progress
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request
  _sendRequest(file) {
    const data = new FormData();
    data.append('image', file); // Backend should expect 'image' field
    // Alternative field names your backend might use:
    // data.append('file', file);
    // data.append('upload', file);

    this.xhr.send(data);
  }
}

// Plugin function to integrate the custom upload adapter
export function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new UploadAdapter(loader);
  };
}
