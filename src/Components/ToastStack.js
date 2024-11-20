import React, {useState, useEffect} from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import moment from 'moment';



function ToastStack({ successMessage, errorMessage }) {
    const [showToast, setshowToast] = useState(true);
    
    useEffect(() => {
        // Initial visibility state
        setshowToast(false);
    
        // Function to showToast toast with auto-hide after 5 seconds
        const showToastWithTimeout = () => {
          setshowToast(true);
          setTimeout(() => setshowToast(false), 5000);
        };
    
        // showToast toast when successMessage or errorMessage changes
        if (successMessage || errorMessage) {
          showToastWithTimeout();
        }
    
        // Clear timer when component unmounts
        return () => {
          clearTimeout(timeoutId);
        };
      }, [successMessage, errorMessage]);

      const timeoutId = setTimeout(() => {}, 5000);

    //  success message time stamp function
function generateSuccessMessage() {
    const now = moment().valueOf(); // Get current timestamp in milliseconds
    let successDate = moment(successMessage);
    if (!successDate.isValid()) {
        console.warn('Invalid success message date:', successMessage);
        return 'Just now';
      }
    const diff = now - successDate.valueOf(); // Calculate difference between now and message time
    
    if (diff < 60000) { // Less than 60 seconds
      return ` ${Math.floor(diff / 1000)} second${diff % 10 !== 1 ? 's' : ''} ago`;
    } else if (diff < 3600000) { // Less than 60 minutes
      const minutes = Math.floor(diff / 60000);
      return ` ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else { // More than 60 minutes
      const hours = Math.floor(diff / 3600000);
      return ` ${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
  }

// error message time stamp function
function generateErrorMessage() {
    const now = moment().valueOf(); // Get current timestamp in milliseconds
    const diff = now - moment(errorMessage).valueOf(); // Calculate difference between now and message time
    
    if (diff < 60000) { // Less than 60 seconds
      return ` ${Math.floor(diff / 1000)} second${diff % 10 !== 1 ? 's' : ''} ago. `;
    } else if (diff < 3600000) { // Less than 60 minutes
      const minutes = Math.floor(diff / 60000);
      return ` ${minutes} minute${minutes > 1 ? 's' : ''} ago. `;
    } else { // More than 60 minutes
      const hours = Math.floor(diff / 3600000);
      return ` ${hours} hour${hours > 1 ? 's' : ''} ago. `;
    }
  }

  return (
    
      <ToastContainer position="top-end" className="p-3 mt-5 pt-5" style={{ zIndex: 1 }}>
        {showToast && (
            <>    
        {successMessage && (
          <Toast onClose={() => setshowToast(false)}>
            <Toast.Header>
              <img
                src=""
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Notifications</strong>
              <small className="text-muted">{generateSuccessMessage()}</small>
            </Toast.Header>
            <Toast.Body>{successMessage}</Toast.Body>
          </Toast>
        )}
        {!successMessage && (
          <Toast onClose={() => setshowToast(false)}>
            <Toast.Header>
              <img
                src=""
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Notifications</strong>
              <small className="text-muted">{generateErrorMessage()}</small>
            </Toast.Header>
            <Toast.Body>{errorMessage}</Toast.Body>
          </Toast>
        )}
        </>
        )}
      </ToastContainer>
 
  );
}

export default ToastStack;
