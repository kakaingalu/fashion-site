// Post.js
import React, {useEffect, useState} from 'react';
import { Card, Image } from 'react-bootstrap';


const Post = ({ post, index }) => {
  const [imageSrc, setImageSrc] = useState('');

  // // get images
  // useEffect(() => {
  //   if (post && post.images) {
  //     const loadImage = async () => {
  //       try {
  //         const response = await fetch(post.images);
  //         if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //         }
  //         const blob = await response.blob();
  //         const objectURL = URL.createObjectURL(blob);
  //         setImageSrc(objectURL);
  //       } catch (error) {
  //         console.error('Error loading image:', error);
  //         setImageSrc('');
  //       }
  //     };
  //     loadImage();
  //   }
  // }, [post]);

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
        <Image src={post.images} alt={`Image for ${post.title}`} fluid style={{ height: '400px' }}/>
        <Card.Text >{truncatedContent}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;