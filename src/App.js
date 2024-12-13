// Code to render the app and set up the routes
import React  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// redux imports
import { Provider } from 'react-redux';
import { store } from './store/index.js';

import FetchProvider  from './FetchProvider.js';

// import PostList from './Components/PostList.js';
import PostDetail from './Components/PostDetail.js';
import ContactForm from './Components/ContactForm.js';
import Home from './Components/Home.js';
import UserPage from './Components/UserPage.js';



function App() {
  
  return (
    <Provider store={store}>
      <FetchProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/admin" element={<UserPage />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/contact" element={<ContactForm/>} />
          
          </Routes>
        </div>
        
      </Router>
      </FetchProvider>
    </Provider>
  );
}



export default App;
