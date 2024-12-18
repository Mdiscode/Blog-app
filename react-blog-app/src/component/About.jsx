import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
// const history = useHistory();

  const handleRedirect = () => {
    navigate('/'); // Replace '/target-page' with your desired route
        // history.push('/');
  };

  return (
    <div>
      <button onClick={handleRedirect}>Go to Target Page</button>
    </div>
  );
};



export default About;
