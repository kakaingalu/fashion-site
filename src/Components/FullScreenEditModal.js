import React, {useState, useEffect} from 'react';

// Bootstrap imports
import { Modal } from 'react-bootstrap';

// Redux imports
import { editPost, imageUpload} from '../store/reducer.js';
import { useDispatch } from 'react-redux';

// fetch post from id given
import { useFetchRedux } from '../hooks/useFetchRedux.js';

// Moment.js import
import moment from 'moment';

function FullScreenEditModal({ show, handleClose, setErrorMessage, setSuccessMessage, editId }) {
    const [articleTitle, setArticleTitle] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    const [imageName, setImageName] = useState('');
    const [articleContent, setArticleContent] = useState('');
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const { posts } = useFetchRedux();
    
    useEffect(() => {

    // get post from id    
    const post = posts.find((post) => post.id === editId);
    if (!post) {
      console.warn(`Post with id ${editId} not found`);
      setErrorMessage('No post found with the given ID');
      return; // or return early from the component
    }
    const { title, content, images } = post;
    setArticleContent(content);
    setArticleTitle(title);
    setImageName(images);
    setUploadedImages(images);
    }, [posts, editId]);
    
  
  //   // Function to create timestamp without seconds
  function getTimestampWithoutSeconds() {
    const now = new Date();
    return moment(now).format('YYYY-MM-DD HH:mm');
  }

  const handleEditPost = async (event) => {
    event.preventDefault();
    console.log("handleEditPost called");
  
    setImageName(file?.name ?? '');
      
    if (!uploadedImages.length && (!articleTitle || !articleContent)) {
      setErrorMessage('Please enter both title, content, at least one image, and upload images.');
      return;
    }
  
    console.log('Attempting to dispatch editPostAction with:', {
      title: articleTitle,
      content: articleContent,
      images: `http://localhost:3001/uploads/${getTimestampWithoutSeconds()}-${imageName}`,
      uploadedImages: uploadedImages,
      id: editId
    });
  
    try {
      const postData = {
        title: articleTitle,
        content: articleContent,
        images: `http://localhost:3001/uploads/${getTimestampWithoutSeconds()}-${imageName}`,
        id: editId
      };
  
      // Dispatch addPost action
      const result = await dispatch(editPost(postData));
  
      // Handle file upload
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
  
        const response = await dispatch(imageUpload(formData));
        
        // Add the uploaded image URL to the uploadedImages array
        setUploadedImages(prevImages => [...prevImages, response.payload.location]);
      }
  
      console.log('editPostAction dispatched successfully', result);
      setSuccessMessage('Article edited successfully!');
      handleClose();
    } catch (error) {
      console.error('Error posting article:', error);
      setErrorMessage('Failed to post article. Please try again.');
    }
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
        <Modal.Title id="contained-modal-title-vcenter">Edi Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleEditPost}>
          <input
            className="form-control mb-2"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
            placeholder="Enter article title..."
            
          />
          <textarea
            className="form-control mb-2"
            value={articleContent}
            onChange={(e) => setArticleContent(e.target.value)}
            placeholder="Enter your article content..."
            rows={5}
            
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
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default FullScreenEditModal;