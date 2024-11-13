import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import moment from 'moment';

function UserPage() {
  // const [posts, setPosts] = useState([]);
  // const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  // const [siteIcons, setSiteIcons] = useState([]);
  // const [socialMediaLinksData, setSocialMediaLinksData] = useState([]);
  const [articleContent, setArticleContent] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [articleTitle, setArticleTitle] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageName, setImageName] = useState('');
 


  // useEffect(() => {
  //   fetchAllData();
  // }, []);
  

  // const fetchAllData = async () => {
  //   try {
  //     const postsResponse = await fetch('/api/posts');
  //     const socialMediaLinksResponse = await fetch('/api/social-media-links');
  //     const siteIconsResponse = await fetch('/api/site-icons');
  //     const socialMediaLinksDataResponse = await fetch('/api/social-media-links');

  //     const [posts] = await Promise.all([postsResponse.json()]);
  //     const [socialMediaLinks] = await Promise.all([socialMediaLinksResponse.json()]);
  //     const [siteIcons] = await Promise.all([siteIconsResponse.json()]);
  //     const [socialMediaLinksData] = await Promise.all([socialMediaLinksDataResponse.json()]);

  //     setPosts(posts);
  //     setSocialMediaLinks(socialMediaLinks);
  //     setSiteIcons(siteIcons);
  //     setSocialMediaLinksData(socialMediaLinksData);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     // setErrorMessage('Failed to fetch data. Please try again.');
  //   }
  // };

  // post article
  // const postArticle = async () => {
  //   if (!articleTitle || articleContent.trim() === '' || uploadedImages.length === 0) {
  //     setErrorMessage('Please enter both title, content, and at least one image.');
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append('title', articleTitle);
  //   formData.append('content', articleContent);
  //   formData.append('images', uploadedImages);
    
  //   // uploadedImages.forEach((imageLocation, index) => {
  //   //   formData.append(`images[${index}]`, { path: imageLocation });
  //   // });
  //   // console.log("article content:", articleContent, "article tile:", articleTitle, "uploaded images:", uploadedImages)
  //   console.log("form data", formData);

  //   try {
  //     const response = await fetch('/api/posts', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     // const newData = await response.json();
  //     // // setPosts([...posts, newData]);
  //     setSuccessMessage('Article posted successfully!');
      
  //   } catch (error) {
  //     console.error('Error posting article:', error);
  //     setErrorMessage('Failed to post article. Please try again.');
  //   }

  //   setArticleTitle('');
  //   setArticleContent('');
  //   setUploadedImages([]);
    
  // };


  const postArticle = async () => {
    if (!articleTitle || articleContent.trim() === '' || !imageName) {
      setErrorMessage('Please enter both title, content, and at least one image.');
      return;
    }
    

    // Function to create timestamp without seconds
    function getTimestampWithoutSeconds() {
      const now = new Date();
      return moment(now).format('YYYY-MM-DD HH:mm');
    }
    

    const postData = {
      title: articleTitle,
      content: articleContent,
      images: `http://localhost:3001/api/uploads/${getTimestampWithoutSeconds()}-${imageName}`,
    };



    console.log(postData);
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newData = await response.json();
      // setPosts([...posts, newData]);
      setSuccessMessage('Article posted successfully!');
      setArticleTitle('');
      setArticleContent('');
      setUploadedImages('');
    } catch (error) {
      console.error('Error posting article:', error);
      setErrorMessage('Failed to post article. Please try again.');
    }
    
  };

  // handle create post
  const handleCreatePost = async (event) => {
    event.preventDefault();
    await postArticle();
  };

  const handleTitleChange = (e) => {
    setArticleTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setArticleContent(e.target.value);
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

      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        setUploadedImages(prevImages => [...prevImages, data.location]);
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
      await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      // setPosts(posts.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
      setErrorMessage('Failed to delete post. Please try again.');
    }
  };

  // Similar functions for handling social media links, site icons, and social media links data
//  console.log(posts);
  return (
    <Container>
      {/* Posts section */}
      <h2>Posts</h2>
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
      {/* <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title}
            <Button variant="danger" size="sm" onClick={() => handleDeletePost(post.id)}>Delete</Button>
          </li>
        ))}
      </ul> */}

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