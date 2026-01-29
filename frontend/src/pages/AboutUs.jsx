import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart, FaBalanceScale, FaHandHoldingHeart, FaUsers } from 'react-icons/fa';
import './Home.css';

const AboutUs = () => {
    const [showVision, setShowVision] = useState(false);

    return (
        <>
            {/* Navbar */}
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
                            <Link to="/about" className="nav-link safemind-nav-link active">About Us</Link>
                            <Link to="/services" className="nav-link safemind-nav-link">Services</Link>
                            <Link to="/login" className="btn btn-outline-custom ms-3">
                                Login
                            </Link>
                            <Link to="/register-user" className="btn btn-primary-custom text-white">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section" style={{ minHeight: '60vh', paddingBottom: '4rem' }}>
                <div className="container text-center">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h1 className="hero-title">
                                Restoring Hope, <br /><span style={{ color: 'var(--accent-pink)' }}>One Mind at a Time</span>
                            </h1>
                            <p className="hero-subtitle mx-auto">
                                At SafeMind, we believe that mental health care should be accessible, empathetic, and effective. We are on a mission to bridge the gap between clinical excellence and compassionate support.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story / Mission */}
            <section className="section-padding bg-white">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <img
                                src="https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=800"
                                alt="Team Meeting"
                                className="img-fluid expertise-image"
                            />
                        </div>
                        <div className="col-lg-6">
                            <h2 className="section-title text-start"><span>Our Story</span></h2>
                            <p className="lead mb-4" style={{ color: 'var(--text-charcoal)' }}>
                                Founded in 2025, SafeMind was born from a simple realization: finding the right mental health support shouldn't be a struggle.
                            </p>
                            <p className="text-muted mb-4">
                                We started as a small team of passionate psychologists and psychiatrists who wanted to create a space where patients felt truly heard. Today, we have grown into a multi-disciplinary network of professionals, but our core value remains the same: <strong>The patient always comes first.</strong>
                            </p>
                            <button
                                className="btn btn-outline-custom"
                                onClick={() => setShowVision(!showVision)}
                                aria-controls="vision-collapse"
                                aria-expanded={showVision}
                            >
                                {showVision ? "Hide Vision" : "Read Our Vision"}
                            </button>
                            <div className={`collapse ${showVision ? 'show' : ''}`} id="vision-collapse">
                                <div className="mt-4 p-4 rounded" style={{ backgroundColor: '#FAF5FF', borderLeft: '4px solid var(--primary-violet)' }}>
                                    <h4 style={{ color: 'var(--primary-violet)' }}>Our Vision</h4>
                                    <p className="mb-0">
                                        To be the most trusted mental healthcare partner for individuals and families, creating a world where mental well-being is prioritized, stigma is eliminated, and quality care is available to everyone, everywhere.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The SafeMind Difference (Values) */}
            <section className="section-padding" style={{ backgroundColor: '#FAF5FF' }}>
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="section-title"><span>The SafeMind Difference</span></h2>
                        <p className="text-muted">What makes us the preferred choice for mental wellness.</p>
                    </div>
                    <div className="row">
                        {[
                            { title: "Clinical Excellence", text: "Evidence-based treatments delivered by licensed experts.", icon: <FaBalanceScale /> },
                            { title: "Empathetic Care", text: "A non-judgmental space where you are treated with dignity.", icon: <FaHeart /> },
                            { title: "Accessibility", text: "Quality care that is reachable from the comfort of your home.", icon: <FaHandHoldingHeart /> },
                            { title: "Community", text: "You are never alone. Join a supportive community of peers.", icon: <FaUsers /> }
                        ].map((value, idx) => (
                            <div className="col-md-6 col-lg-3 mb-4" key={idx}>
                                <div className="concern-card text-center" style={{ height: '100%', alignItems: 'center', textAlign: 'center' }}>
                                    <div className="concern-react-icon mb-3" style={{ background: 'var(--bg-lavender)', color: 'var(--primary-violet)' }}>
                                        {value.icon}
                                    </div>
                                    <h5 style={{ color: 'var(--primary-violet)' }}>{value.title}</h5>
                                    <p className="text-muted small mb-0">{value.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="safemind-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-4 mb-md-0">
                            <Link to="/" className="footer-brand">SafeMind</Link>
                            <p className="text-white-50">
                                Empowering your mental health journey with professional care and supportive tools.
                            </p>
                            <div className="d-flex mt-4 gap-3">
                                <a href="#" className="social-icon"><FaFacebook /></a>
                                <a href="#" className="social-icon"><FaTwitter /></a>
                                <a href="#" className="social-icon"><FaInstagram /></a>
                                <a href="#" className="social-icon"><FaLinkedin /></a>
                            </div>
                        </div>
                        <div className="col-md-2 col-6 mb-4 mb-md-0">
                            <h5 className="text-white mb-3">Company</h5>
                            <Link to="/" className="footer-link">Home</Link>
                            <Link to="/about" className="footer-link">About Us</Link>
                            <Link to="/careers" className="footer-link">Careers</Link>
                            <Link to="/blog" className="footer-link">Blog</Link>
                        </div>
                        <div className="col-md-2 col-6 mb-4 mb-md-0">
                            <h5 className="text-white mb-3">Support</h5>
                            <Link to="/help" className="footer-link">Help Center</Link>
                            <Link to="/safety" className="footer-link">Safety Center</Link>
                            <Link to="/guidelines" className="footer-link">Community Guidelines</Link>
                        </div>
                        <div className="col-md-4">
                            <h5 className="text-white mb-3">Contact Us</h5>
                            <p className="text-white-50 mb-2">
                                <strong>Address:</strong> 123 Wellness Ave, Mind City, MC 45678
                            </p>
                            <p className="text-white-50 mb-2">
                                <strong>Email:</strong> support@safemind.com
                            </p>
                            <p className="text-white-50">
                                <strong>Phone:</strong> +91 9955768325
                            </p>
                            <button className="btn btn-outline-light btn-sm mt-2 rounded-pill px-4">
                                Contact Support
                            </button>
                        </div>
                    </div>
                    <div className="border-top border-secondary mt-5 pt-4 text-center text-white-50">
                        <p className="mb-0">&copy; {new Date().getFullYear()} SafeMind. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default AboutUs;