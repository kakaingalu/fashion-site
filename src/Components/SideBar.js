// Desc: Sidebar component to display most viewed posts
import React from 'react';

// Bootstrap imports
import { Card} from 'react-bootstrap';
import { Col } from 'react-bootstrap';

const Sidebar = ({ posts }) => {
  return (
    <div className="mt-5 left-0 position-fixed w-50">
      <Col xs={12} md={6} className="d-none d-md-block">
      <Card className="border-0 mb-3">
        <Card.Title className='text-center'>Ad</Card.Title>
      </Card>
      </Col>
      {/* {posts.slice(0, 5).map((post, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
          <Link className='text-decoration-none text-reset' to={`/posts/${index}`}>
            <h5 className="card-title">{`${index + 1} . ${post.title}`}</h5>
            <p className="card-text">
            </p>
          </Link>
          </Card.Body>
        </Card>
      ))} */}
    </div>
  );
};

export default Sidebar;
