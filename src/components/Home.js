import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  const navigate = useNavigate();

  const goToEmployees = () => {
    navigate('/employees');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-box text-center">
        <h1 className="display-5 fw-bold mb-3">Welcome to Employees Management</h1>
        <p className="lead mb-4">
          Seamlessly manage, monitor, and update your employee records with our user-friendly dashboard powered by Spring Boot and React.
          Easily add, edit, or remove employee details and keep your organization structured and efficient.
        </p>
        <button className="btn btn-primary btn-lg" onClick={goToEmployees}>
          Employees List
        </button>
      </div>

      <footer className="mt-5">
        <p className="text-white text-center">&copy; 2025 by Prinda. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
