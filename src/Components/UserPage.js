import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

function UserPage() {
  const [posts, setPosts] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [siteIcons, setSiteIcons] = useState([]);
  const [socialMediaLinksData, setSocialMediaLinksData] = useState([]);

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

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: 'New Post Title', content: 'New Post Content' }),
      });

      const newData = await response.json();
      setPosts([...posts, newData]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
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
        <Button type="submit">Add New Post</Button>
      </Form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title}
            <Button variant="danger" size="sm" onClick={() => handleDeletePost(post.id)}>Delete</Button>
          </li>
        ))}
      </ul>

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
