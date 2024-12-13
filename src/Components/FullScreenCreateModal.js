import React, {useState} from 'react';

// Bootstrap imports
import { Modal } from 'react-bootstrap';

// Redux imports
import { addPost, imageUpload} from '../store/reducer.js';
import { useDispatch } from 'react-redux';

// Moment.js import
import moment from 'moment';




function FullScreenCreateModal({ show, handleClose, setErrorMessage, setSuccessMessage }) {
    const [articleTitle, setArticleTitle] = useState('');
    const [imageName, setImageName] = useState('');
    const [articleContent, setArticleContent] = useState('');
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
  
  //   // Function to create timestamp without seconds
  function getTimestampWithoutSeconds() {
    const now = new Date();
    return moment(now).format('YYYY-MM-DD HH:mm');
  }

  // function to reset page
  function refreshPage() {
    window.location.reload(false);
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
      image_location: `http://143.198.152.80:3001/api/uploads/${getTimestampWithoutSeconds()}-${imageName}`,
    });
  
    try {
      const postData = {
        title: articleTitle,
        content: articleContent,
        image_location: `http://143.198.152.80:3001/api/uploads/${getTimestampWithoutSeconds()}-${imageName}`,
      };

      const result = await dispatch(addPost(postData));
  
      // Handle file upload
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        await dispatch(imageUpload(formData));
        handleClose();
      }


  
      console.log('addPostAction dispatched successfully', result);
      setSuccessMessage('Article posted successfully!');

      setArticleTitle('');
      setArticleContent('');
    } catch (error) {
      console.error('Error posting article:', error);
      setErrorMessage('Failed to post article. Please try again.');
    }
    handleClose();
    // refreshPage();
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
          </div>
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default FullScreenCreateModal;
