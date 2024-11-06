// SocialMediaLinks.js
import React from 'react';

// Redux imports
import { useFetchRedux } from '../hooks/useFetchRedux.js';

// React Bootstrap imports
import { Card } from 'react-bootstrap';

const SocialMediaLinks = () => {
  const { socialMedia } = useFetchRedux();

  return (
    <Card className="mb-4">
      <Card.Header>Social Media</Card.Header>
      <Card.Body>
        <div>
          {socialMedia.map((link, index) => (
            <div key={index} className='mb-2'>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className='text-decoration-none text-reset'>
                <img src={link.icon} alt={link.name} className='me-2' height={18} width={18}/>
                {link.name}</a>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default SocialMediaLinks;