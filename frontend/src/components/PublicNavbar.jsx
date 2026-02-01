import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicNavbar = () => {
    const { auth, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg safemind-navbar fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand safemind-brand">
                    SafeMind
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav ms-auto align-items-center">
                        <Link to="/" className="nav-link safemind-nav-link">Home</Link>
                        <Link to="/about" className="nav-link safemind-nav-link">About Us</Link>
                        <Link to="/services" className="nav-link safemind-nav-link">Services</Link>
                        <Link to="/assessments" className="nav-link safemind-nav-link">Assessments</Link>
                        <Link to="/book-appointment" className="nav-link safemind-nav-link">Book Appointment</Link>
                        {auth ? (
                            <div className="dropdown ms-3">
                                <button 
                                    className="btn btn-outline-custom dropdown-toggle" 
                                    type="button" 
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    style={{ border: "none", background: "transparent", color: "#8E6EC8" }}
                                >
                                    {auth.fullName}
                                </button>
                                {dropdownOpen && (
                                    <div className="dropdown-menu show" style={{ position: "absolute", right: 0, top: "100%", zIndex: 1000 }}>
                                        <Link 
                                            to={auth.role === 'ROLE_ADMIN' ? '/admin' : auth.role === 'ROLE_PROFESSIONAL' ? '/professional' : '/user'} 
                                            className="dropdown-item" 
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                        <button className="dropdown-item" onClick={() => { logout(); setDropdownOpen(false); }}>Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline-custom ms-3">
                                    Login
                                </Link>
                                <Link to="/register-user" className="btn btn-primary-custom text-white">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default PublicNavbar;