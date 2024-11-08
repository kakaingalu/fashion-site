// Post.js
import React from 'react';
import { Card } from 'react-bootstrap';

const Post = ({ title, content, image }) => {
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  const truncatedContent = truncateText(content);
  return (
    <Card className="mb-4">
      <Card.Header className='fw-bold text-center'>{title}</Card.Header>
      <Card.Body style={{ maxHeight: '1000px', overflow: 'hidden' }}>
        <Card.Img variant="top" src={image} alt={`Image for ${title}`} fluid style={{ height: '400px' }}/>
        <Card.Text >{truncatedContent}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;