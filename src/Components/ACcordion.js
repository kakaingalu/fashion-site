// Ract library import
import React, {useEffect} from 'react';

// Bootstrap import
import { Accordion } from 'react-bootstrap';

// react-router-dom import
import { Link } from 'react-router-dom';

//Redux import
import { useFetchRedux } from '../hooks/useFetchRedux.js';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../store/fetchSlice.js';


const PostAccordion = () => {  
  const { posts } = useFetchRedux();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  
    const truncateText = (text, maxLength = 50) => {
        if (text.length <= maxLength) return text;
        return `${text.substring(0, maxLength)}...`;
      }; 

  return (
    <Accordion>
      {posts.map((post, index) => (
        
        <Accordion.Item key={index} eventKey={index.toString()}>
          <Accordion.Header>{`${index + 1} . ${post.title}`}</Accordion.Header>
          <Accordion.Body>
            <Link className='text-decoration-none text-reset' to={`/posts/${index}`}>
              {post.image && <img src={post.image} alt={`${post.title}`} className='img-fluid mb-2' />}
              <div dangerouslySetInnerHTML={{ __html: truncateText(post.content, 50) }} />
            </Link>
          </Accordion.Body>
        </Accordion.Item>
        
      ))}
    </Accordion>
  );
};

export default PostAccordion;
