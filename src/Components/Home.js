//Default import
import React, {useLayoutEffect, useEffect} from 'react';

//React Router import
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

//Components import
import NavBar from './NavBar.js';
import Post from './Post.js';
import OffCanvas from './OffCanvas.js';
import SideBar from './SideBar.js';
import Footer from './Footer.js';

//Redux import
import { useFetchRedux } from '../hooks/useFetchRedux.js';
import { useDispatch } from 'react-redux';
import { fetchSocialMedia, fetchPosts, fetchSiteIcons } from '../store/fetchSlice.js';

//Bootstrap import
import {Container} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Spinner} from 'react-bootstrap';




function Home() {
  const location = useLocation();
  const { posts, socialMedia, siteIcons, loading, errors} = useFetchRedux();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSocialMedia());
    dispatch(fetchPosts());
    dispatch(fetchSiteIcons());
  }, [dispatch]);

  
console.log(siteIcons[0]);
  useLayoutEffect(() => {
   // Scroll to top when route changes and returning to home page
   if (location.pathname === '/') {
    window.scrollTo(0, 0);
  }
}, [location]);

  // site check for loading data
  if (loading) {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light flex-wrap">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <div className="ms-2">Loading...</div>
        </div>
      </>
    );
  }

  if (!socialMedia.length || !Object.keys(siteIcons).length) {
    return  <>
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light flex-wrap">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <div className="ms-2">Loading...Please Wait</div>
      </div>
    </>
  }

  if (errors) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-danger text-white">
        <div className="fs-4 fw-bold">{errors}</div>
      </div>
    );
  }

  
    return (
      <>
      <div>
        {/*Navbar*/}
        <NavBar />
        <br />
        <br />
        <br />
        <br />
        {/*body*/}
        {/* Sidebar */}
         {/* Post List Sidebar */}
         <Col xs={12} md={3} className="d-none d-md-block">
          <OffCanvas posts={posts}/>
          </Col>  

          <div className="container-fluid">
            <Row>
              {/* Sidebar */}
              <Col xs={12} md={3} className="d-none d-md-block">
                <SideBar posts={posts} />
              </Col>
              {/* Main Content */}
              <Col xs={12} md={9} className="ps-md-5">
                <Container fluid>
                  <Row xs={1} md={2} lg={3}>
                    {posts.map((post, index) => (
                      <Col key={index}>
                        <Link className='text-decoration-none text-reset'  preventScrollReset={true} to={`/posts/${index}`}>
                        <Post 
                          title={post.title} 
                          content={post.content} 
                          image={post.image}
                          index={index}
                        />
                        </Link>
                      </Col>
                    ))}
                  </Row>
                  <Footer/>
                </Container>
              </Col>
              {/* Footer */}
              
            </Row>
            
          </div>
          
      </div>

      
      </>
    );
  }

  export default Home;