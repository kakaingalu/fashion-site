import React, {useState} from 'react';

// Bootstrap imports
import { Modal } from 'react-bootstrap';

// Redux imports
import { addPost, imageUpload} from '../store/reducer.js';
import { useDispatch } from 'react-redux';

// Moment.js import
import moment from 'moment';

function FullScreenModal({ show, handleClose, setErrorMessage, setSuccessMessage }) {
    const [articleTitle, setArticleTitle] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    const [imageName, setImageName] = useState('');
    const [articleContent, setArticleContent] = useState('');
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
  
  //   // Function to create timestamp without seconds
  function getTimestampWithoutSeconds() {
    const now = new Date();
    return moment(now).format('YYYY-MM-DD HH:mm');
  }

  const handleCreatePost = async (event) => {
    event.preventDefault();
    console.log("handleCreatePost called");
  
    setImageName(file?.name ?? '');
      
    if (!articleTitle || articleContent.trim() === '' || !imageName ) {
      setErrorMessage('Please enter both title, content, at least one image, and upload images.');
      return;
    }
  
    console.log('Attempting to dispatch addPostAction with:', {
      title: articleTitle,
      content: articleContent,
      images: `http://localhost:3001/uploads/${getTimestampWithoutSeconds()}-${imageName}`,
      uploadedImages: uploadedImages
    });
  
    try {
      const postData = {
        title: articleTitle,
        content: articleContent,
        images: `http://localhost:3001/uploads/${getTimestampWithoutSeconds()}-${imageName}`,
      };
  
      // Dispatch addPost action
      const result = await dispatch(addPost(postData));
  
      // Handle file upload
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
  
        const response = await dispatch(imageUpload(formData));
        
        // Add the uploaded image URL to the uploadedImages array
        setUploadedImages(prevImages => [...prevImages, response.payload.location]);
      }
  
      console.log('addPostAction dispatched successfully', result);
      setSuccessMessage('Article posted successfully!');
      setArticleTitle('');
      setArticleContent('');
      setUploadedImages([]);
    } catch (error) {
      console.error('Error posting article:', error);
      setErrorMessage('Failed to post article. Please try again.');
    }
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      fullscreen="true"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Create New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleCreatePost}>
          <input
            className="form-control mb-2"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
            placeholder="Enter article title..."
            required
          />
          <textarea
            className="form-control mb-2"
            value={articleContent}
            onChange={(e) => setArticleContent(e.target.value)}
            placeholder="Enter your article content..."
            rows={5}
            required
          />
          <div>
            <input
              type="file"
              multiple
              accept="image/*"
              className="form-control mb-2"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <p>Selected images: {uploadedImages.length}</p>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default FullScreenModal;
