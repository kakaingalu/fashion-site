// React library imports
import React, {useEffect} from 'react';

// import bootstrap
import {Container} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Navbar} from 'react-bootstrap';

// routing 
import { Link } from 'react-router-dom';

//Redux import
import { useFetchRedux } from '../hooks/useFetchRedux.js';
import { useDispatch } from 'react-redux';
import { fetchSocialMedia, fetchSiteIcons } from '../store/reducer.js';

function NavBar() {
  const { socialMedia, siteIcons } = useFetchRedux();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSocialMedia());
    dispatch(fetchSiteIcons());
  }, [dispatch]);


  if (!Array.isArray(socialMedia) || socialMedia.length === 0) {
    console.error('Error: socialMedia is empty or not an array');
    console.log(socialMedia);
    return <div>No social media links available</div>;
  }

  if (!siteIcons ||!Array.isArray(siteIcons) || siteIcons.length === 0) {
    console.error('Error: siteIcons is empty or not an array');
    return <div>No site icons available</div>;
  }
  return (
    <div>
    <Navbar expand="lg" className="bg-body-tertiary fixed-top">
      <Container fluid>
        <Navbar.Brand >
          <Link to="/">
          <img src={siteIcons[0].icon} alt={siteIcons[0].name} height={33} width={33}/>
          </Link>
          </Navbar.Brand>
        <Navbar.Brand >
          <Link to="/" className='text-reset text-decoration-none'>
          Fashion
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='container flex-nowrap'>
        <Nav className='row flex-nowrap'>

          {socialMedia.map((platform, index) => (
            <Nav.Item key={index} className="col-md-1">
              <Nav.Link href={`${platform.url.toLowerCase()}`} target="_blank" rel="noopener noreferrer">
                <img src={platform.icon} alt={`${platform.name} icon`} loading='lazy' height={27} width={27} />
              </Nav.Link>
            </Nav.Item>
          ))}
           <Nav.Item className="col-md-12">
            <form role="search">
              <div className="input-group">
                <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                
                <button className="btn btn-outline-secondary btn-md" type="submit">Search</button>
              </div>
            </form>
          </Nav.Item>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default NavBar;