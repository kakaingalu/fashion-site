// PostDetails.js
import React, {useLayoutEffect} from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Image from 'react-image-gallery';

// import components
import NavBar from './NavBar.js';
import Footer from './Footer.js';
import CommentList from './CommentList.js';
import SocialMediaLinks from './SocialMediaLinks.js';
import ContactForm from './ContactForm.js';

// Redux import
import { useFetchRedux } from '../hooks/useFetchRedux.js';

// import bootstrap components
import {Container} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import { Card } from 'react-bootstrap';

const PostDetails = () => {
  const { id } = useParams();
  const { posts, siteIcons} = useFetchRedux();
  const post = posts[parseInt(id)];
  const location = useLocation();
  
  console.log('id:', id);
  console.log('posts:', post);
  useLayoutEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle case where post doesn't exist
  if (!post) {
    return <h1>Post not found</h1>; 
  }
  const comments = [
    {
     content: 'This is a comment',
    },
    {
     content: 'This is another comment',
    },
    {
     content: 'This is a third comment',
    }, 
  ]
  

  return (
    <div className="position-relative overflow-hidden">
    <Container fluid className="p-0 d-flex w-100">
      <NavBar />
      <div className='flex-column'>
      <Card className='w-100 border-0 pt-2 mt-5'>
      {/* close button on header*/}
      <Card.Header className='border-0 bg-transparent'>
      <Link to="/">
          <img src={siteIcons[2].icon} alt={siteIcons[2].name} className='me-0' height={33} width={33}/>
      </Link>
      </Card.Header>
      <Row className="justify-content-between mt-5 ms-0 flex-row">
        {/* Post Details */}
        
        <Col md={8} className="mb-4">
        
          <Card className='mt-4'>
            <Card.Header className='fw-bold text-center fs-3'>{post.title}</Card.Header>
            <Card.Body className='p-2'>
              <img src={post.images} alt={`${post.title}`} className='w-100 rounded' />
              <br />
              <Card.Text >{post.created_at}</Card.Text>
              <Card.Text >{post.author}</Card.Text>
              <Card.Text >{post.category}</Card.Text>
              <Card.Text >{post.tags}</Card.Text>

              <Card.Text className='text-capitalize'>{post.content}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Comments, Social Media Links, and Contact Form */}
        <Col md={4} className='mt-2'>
          <Row className="mt-3">
            <Col xs={12} md={11} className="mb-3">
              <Card >
                <Card.Header className='fw-bold text-center fs-3'>CommentList</Card.Header>
                <Card.Body>
                  <CommentList comments={comments} />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={11} className="mb-3">
              <Card>
                <Card.Header className='fw-bold text-center fs-3'>Social Media Links</Card.Header>
                <Card.Body>
                  <SocialMediaLinks />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={11} className="mb-3">
              <Card>
                <Card.Header className='fw-bold text-center fs-3'>Contact Form</Card.Header>
                <Card.Body>
                  <ContactForm />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        
      </Row>
      </Card>
      <Footer />
      </div>
    </Container>
    </div>
  );
};

export default PostDetails;

