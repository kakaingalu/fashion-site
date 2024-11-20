// React imports
import React, { useState, useEffect } from 'react';

// Bootstrap imports
import { Container, Row, Col, Button, Form, Alert, Card } from 'react-bootstrap';

// Redux imports
import { useDispatch } from 'react-redux';
import { fetchPosts, deletePost, fetchSocialMedia, fetchSiteIcons } from '../store/reducer.js';
import { useFetchRedux } from '../hooks/useFetchRedux.js';

// Moment.js import
import moment from 'moment';

// module imports
import Footer from './Footer.js';
import ToastStack from './ToastStack.js';
import FullScreenModal from './FullScreenModal.js';
import NavBar from './NavBar.js';


function UserPage() {
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
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



  

  // const handleImageRemove = (index) => {
  //   setUploadedImages(prevImages =>
  //     prevImages.filter((_, i) => i !== index)
  //   );
  // };

  const handleDeletePost = async (id) => {
    try {
      await dispatch(deletePost(id));
      setSuccessMessage('Post deleted successfully!');

      const updatedPosts = await dispatch(fetchPosts());

      console.log('id:', id);
      // setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
      setErrorMessage('Failed to delete post. Please try again.');
    }
  };

  // // truncate text
  // const truncateText = (text, maxLength = 150) => {
  //   if (!text) return '';
  //   if (text.length <= maxLength) return text;
  //   return `${text.substring(0, maxLength)}...`;
  // };

  const truncateText = (content, maxLength = 150) => {
    if (!content || content.length <= maxLength) {
      return content;
    }
  
    const truncatedContent = content.substring(0, maxLength - 3);
    return `${truncatedContent}...`;
  };
  
  // const truncatedContent = posts?.content ? truncateText(posts.content) : '';
  console.log('content:', posts.content);
  console.log('post:', posts);

  const handleOpen = () => setShowModal(true);
  
  return (
    <Container>
      
      {/*Navigation bar*/}
      <NavBar/>
      {/* Posts section */}
      <h1 className='mt-5 pt-5 text-center'>Your Posts</h1>
      <ToastStack successMessage={successMessage} errorMessage={errorMessage} />
      {/* Check if posts exist */}
      {posts.length === 0 && (
        <div className="container mt-5 pt-5 mx-auto">
          <Alert variant="" className="fw-bold text-center">
            No posts available. Create a new post to get started!
          </Alert>
          <div className="d-flex justify-content-center w-100">
            <Button variant="dark" className='mx-auto' onClick={handleOpen}>Create Post</Button>
          </div>
        </div>
      )}

      {/*if posts exist*/}
      <Col xs={10} md={12} className="ps-md-5 h-100 custom-no-padding">
                <Container className='d-flex h-100 p-0 m-0' fluid>
                  <Row xs={1} md={3} lg={3} className='flex-grow-1 overflow-y-auto m-5 p-0'>
                    {posts.map((post, index) => (
                      <Col className='' key={index}>
                        <Card className="mb-4">
                          <Card.Header className='fw-bold text-center'>{post.title}</Card.Header>
                          <Card.Body style={{ maxHeight: '1000px', overflow: 'hidden' }}>
                            <Card.Img variant="top" alt={`Image for ${post.title}`}  src={post.images} fluid style={{ height: '400px' }} />
                            <Card.Text >{truncateText(post.content)}</Card.Text>
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

              {/* Add post button */}
              {posts.length > 0 && (
              <div className="d-flex justify-content-center position-fixed bottom-0 me-3 mb-3 end-0 pb-5">
                <Button variant="dark" className='mx-auto' onClick={handleOpen}>Create Post</Button>
              </div>
            )}

      {/* Create new post section */}
      <FullScreenModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
      />

      
      

      {/* Social Media Links section */}
      {/* <h2>Social Media Links</h2> */}
      {/* Similar structure as Posts section */}

      {/* Site Icons section */}
      {/* <h2>Site Icons</h2> */}
      {/* Similar structure as Posts section */}

      {/* Social Media Links Data section */}
      {/* <h2>Social Media Links Data</h2> */}
      {/* Similar structure as Posts section */}
    </Container>
  );
}

export default UserPage;