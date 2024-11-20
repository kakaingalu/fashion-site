// React imports
import { useState } from 'react';

// Bootstrap imports
import {Button} from 'react-bootstrap';
import {Offcanvas} from 'react-bootstrap'
import {Alert} from 'react-bootstrap';

// Component imports
import ACcordion from './ACcordion.js';



function OffCanvas({posts}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='ms-4 fixed-left left-5 position-fixed' variant="dark" onClick={handleShow}>
        Posts
      </Button>

      {/*Check if posts exist before rendering offcanvas*/}
      {posts.length === 0 && (
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className='mx-auto'>Posts</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="container mt-5 pt-5 mx-auto">
              <div className="d-flex justify-content-center w-100">
                <Alert variant="warning" className="fw-bold text-center">
                  No posts Available
                </Alert>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      )}
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='mx-auto'>Posts</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <ACcordion posts={posts} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvas;