// React imports
import { useState } from 'react';

// Bootstrap imports
import {Button} from 'react-bootstrap';
import {Offcanvas} from 'react-bootstrap'

// Component imports
import ACcordion from './ACcordion.js';


function OffCanvas({posts}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='ms-5 fixed-left left-5 position-fixed' variant="dark" onClick={handleShow}>
        Posts
      </Button>

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