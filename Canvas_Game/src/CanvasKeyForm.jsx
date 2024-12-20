import React, { useState, useEffect } from 'react';
import API_BASE_URL from './apiconfig'

const CanvasKeyForm = () => {
  const [canvasKey, setCanvasKey] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Retrieve email from local storage when the component mounts
    const signupFormData = localStorage.getItem('signupFormData');
    if (signupFormData) {
      const { email } = JSON.parse(signupFormData);
      setEmail(email);
    }
  }, []);

  const handleChange = (event) => {
    setCanvasKey(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Reset previous error/success state
    setError(null);
    setSuccess(false);
    console.log(email);
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/canvasKey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ canvasKey, email }),
      });

      if (!response.ok) {
        // Extract error message from the backend response
        const errorData = await response.json();

        throw new Error(errorData.message || 'An unknown error occurred.');
      }

      const data = await response.json();
      console.log('Success:', data);
      setSuccess(true);
      setCanvasKey(''); // Clear the input field after successful submission
    } catch (err) {
      console.error('Error:', err.message);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Submit Canvas Key</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Canvas Key:
          <input
            type="text"
            value={canvasKey}
            onChange={handleChange}
            required
          />
        </label>
        <input type="hidden" value={email} />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {success && <p style={{ color: 'green' }}>Canvas Key submitted successfully!</p>}
    </div>
  );
};

export default CanvasKeyForm;