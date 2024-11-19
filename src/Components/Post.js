// Post.js
import React from 'react';
import { Card } from 'react-bootstrap';


const Post = ({ post, index }) => {
  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  const truncatedContent = post?.content ? truncateText(post.content) : '';





  
  console.log(`Posts received at post at index: ${index}`, post);
  
  console.log(post)


  return (
    <Card className="mb-4">
      <Card.Header className='fw-bold text-center'>{post.title}</Card.Header>
      <Card.Body style={{ maxHeight: '1000px', overflow: 'hidden' }}>
        <Card.Img variant="top" alt={`Image for ${post.title}`}  src={post.images} fluid style={{ height: '400px' }} />
        <Card.Text >{truncatedContent}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;