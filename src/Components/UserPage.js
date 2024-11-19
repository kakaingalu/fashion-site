// React imports
import React, { useState, useEffect } from 'react';

// Bootstrap imports
import { Container, Row, Col, Button, Form, Alert, Card } from 'react-bootstrap';

// Redux imports
import { useDispatch } from 'react-redux';
import { addPost, fetchPosts, imageUpload, deletePost } from '../store/reducer.js';
import { useFetchRedux } from '../hooks/useFetchRedux.js';
import { fetchSocialMedia, fetchSiteIcons } from '../store/reducer.js';

// Moment.js import
import moment from 'moment';

// module imports
import Footer from './Footer.js';


function UserPage() {
  const [articleContent, setArticleContent] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [articleTitle, setArticleTitle] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageName, setImageName] = useState('');
  const dispatch = useDispatch();

   const { posts} = useFetchRedux();

    useEffect(() => {
      const fetchData = async () => { 
        await dispatch(fetchSocialMedia());
        await dispatch(fetchPosts());
        await dispatch(fetchSiteIcons());
      };
    
      fetchData().catch(error => {
        console.error('Error fetching data:', error);
      });
    }, [dispatch]);



  //   // Function to create timestamp without seconds
    function getTimestampWithoutSeconds() {
      const now = new Date();
      return moment(now).format('YYYY-MM-DD HH:mm');
    }

    const handleCreatePost = async (event) => {
      event.preventDefault();
      console.log("handleCreatePost called");
      
      if (!articleTitle || articleContent.trim() === '' || !imageName || uploadedImages.length === 0) {
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

        const result = await dispatch(addPost(postData));
        
        console.log('addPostAction dispatched successfully');
        setSuccessMessage('Article posted successfully!');
        setArticleTitle('');
        setArticleContent('');
        setUploadedImages([]);
    
      } catch (error) {
        console.error('Error posting article:', error);
        setErrorMessage('Failed to post article. Please try again.');
      }
    };
    

  const handleTitleChange = (e) => {
    setArticleTitle(e.target.value);
  };



  const handleImageUpload = async (event) => {
    // check title and other data
    if (!articleTitle || articleContent.trim() === '') {
      setErrorMessage('Please enter both title and content before uploading images.');
      return
    }
    const file = event.target.files[0];
    if (file) {
      // get file name
      setImageName(file.name);
      console.log(file.name);

      try {
        const postImage = file;

        const result = await dispatch(imageUpload(postImage));
        console.log('Image uploaded successfully:', result);
        setUploadedImages(prevImages => [...prevImages, result.payload.location]);
      } catch (error) {
        console.error('Error uploading image:', error);
        setErrorMessage("Failed to upload image. Please try again.")
      }
    }
  };
  

  const handleImageRemove = (index) => {
    setUploadedImages(prevImages =>
      prevImages.filter((_, i) => i !== index)
    );
  };

  const handleDeletePost = async (id) => {
    try {
      await dispatch(deletePost(id));
      setSuccessMessage('Post deleted successfully!');

      const updatedPosts = await dispatch(fetchPosts());
      // setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
      setErrorMessage('Failed to delete post. Please try again.');
    }
  };

  // truncate text
  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  const truncatedContent = posts?.content ? truncateText(posts.content) : '';

  return (
    <Container>
      {/* Posts section */}
      <h1>Your Posts</h1>
      <Col xs={10} md={12} className="ps-md-5 h-100 custom-no-padding">
                <Container className='d-flex h-100 p-0 m-0' fluid>
                  <Row xs={1} md={3} lg={3} className='flex-grow-1 overflow-y-auto m-5 p-0'>
                    {posts.map((post, index) => (
                      <Col className='' key={index}>
                        <Card className="mb-4">
                          <Card.Header className='fw-bold text-center'>{post.title}</Card.Header>
                          <Card.Body style={{ maxHeight: '1000px', overflow: 'hidden' }}>
                            <Card.Img variant="top" alt={`Image for ${post.title}`}  src={post.images} fluid style={{ height: '400px' }} />
                            <Card.Text >{truncatedContent}</Card.Text>
                          </Card.Body>
                          <div className='p-2'>
                            <div className="d-flex justify-content-between">
                              <Button variant="danger" size="sm" onClick={() => handleDeletePost(post.id)}>Delete</Button>
                              <Button variant="primary" size="sm">Edit</Button>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <Footer/>
                </Container>
              </Col>
      <h2>Create New Posts</h2>
      <Form onSubmit={handleCreatePost}>
      <input
          className="form-control mb-2"
          value={articleTitle}
          onChange={handleTitleChange}
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
         <input
          type="file"
          multiple
          accept="image/*"
          className="form-control mb-2"
          onChange={handleImageUpload}
        />
        <Button type="submit">Post Article</Button>
      </Form>
      {successMessage && (
        <div className="alert alert-success mt-2">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="alert alert-danger mt-2">{errorMessage}</div>
      )}
      

      {/* Social Media Links section */}
      <h2>Social Media Links</h2>
      {/* Similar structure as Posts section */}

      {/* Site Icons section */}
      <h2>Site Icons</h2>
      {/* Similar structure as Posts section */}

      {/* Social Media Links Data section */}
      <h2>Social Media Links Data</h2>
      {/* Similar structure as Posts section */}
    </Container>
  );
}

export default UserPage;