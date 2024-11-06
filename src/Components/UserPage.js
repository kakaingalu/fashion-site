import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

function UserPage() {
  const [posts, setPosts] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [siteIcons, setSiteIcons] = useState([]);
  const [socialMediaLinksData, setSocialMediaLinksData] = useState([]);
  const [articleContent, setArticleContent] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [articleTitle, setArticleTitle] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
 


  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const postsResponse = await fetch('/api/posts');
      const socialMediaLinksResponse = await fetch('/api/social-media-links');
      const siteIconsResponse = await fetch('/api/site-icons');
      const socialMediaLinksDataResponse = await fetch('/api/social-media-links');

      const [posts] = await Promise.all([postsResponse.json()]);
      const [socialMediaLinks] = await Promise.all([socialMediaLinksResponse.json()]);
      const [siteIcons] = await Promise.all([siteIconsResponse.json()]);
      const [socialMediaLinksData] = await Promise.all([socialMediaLinksDataResponse.json()]);

      setPosts(posts);
      setSocialMediaLinks(socialMediaLinks);
      setSiteIcons(siteIcons);
      setSocialMediaLinksData(socialMediaLinksData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // post article
  const postArticle = async () => {
    if (!articleTitle || articleContent.trim() === '' || uploadedImages.length === 0) {
      setErrorMessage('Please enter both title and content.');
      return;
    }
    const formData = new FormData();
    formData.append('title', articleTitle);
    formData.append('content', articleContent);
    formData.append('images', uploadedImages);
    console.log(formData);
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newData = await response.json();
      setPosts([...posts, newData]);
      setSuccessMessage('Article posted successfully!');
      setArticleTitle('');
      setArticleContent('');
      setUploadedImages(null);
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
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages(reader.result);
      };
      reader.readAsDataURL(file);
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
      setPosts(posts.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Similar functions for handling social media links, site icons, and social media links data
 console.log(posts);
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
        />
        <textarea
          className="form-control mb-2"
          value={articleContent}
          onChange={(e) => setArticleContent(e.target.value)}
          placeholder="Enter your article content..."
          rows={5}
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