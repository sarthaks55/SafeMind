import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaUserMd, FaUsers, FaChild, FaBrain, FaPhoneAlt, FaLaptopMedical } from 'react-icons/fa';
import './Home.css';

const Services = () => {
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
                            <Link to="/about" className="nav-link safemind-nav-link">About Us</Link>
                            <Link to="/services" className="nav-link safemind-nav-link active">Services</Link>
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
            <section className="hero-section" style={{ minHeight: '50vh', paddingBottom: '4rem' }}>
                <div className="container text-center">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h1 className="hero-title">
                                Holistic Care for <span style={{ color: 'var(--accent-sage)' }}>Every Stage</span>
                            </h1>
                            <p className="hero-subtitle mx-auto">
                                From clinical assessments to ongoing therapy and community support, we offer a full spectrum of mental health services tailored to your unique needs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding bg-white">
                <div className="container">
                    <div className="row">
                        {[
                            {
                                title: "Individual Therapy",
                                text: "One-on-one sessions with licensed psychologists to explore your thoughts, feelings, and behaviors in a safe space.",
                                icon: <FaUserMd />
                            },
                            {
                                title: "Psychiatric Consultation",
                                text: "Medical assessment and medication management by certified psychiatrists for conditions requiring clinical intervention.",
                                icon: <FaBrain />
                            },
                            {
                                title: "Couples Therapy",
                                text: "Navigate relationship challenges, improve communication, and rebuild trust with expert guidance.",
                                icon: <FaUsers />
                            },
                            {
                                title: "Child & Adolescent Care",
                                text: "Specialized support for young minds dealing with developmental changes, academic stress, or emotional difficulties.",
                                icon: <FaChild />
                            },
                            {
                                title: "Crisis Support",
                                text: "Immediate assistance and resources for those facing acute mental health crises or distress.",
                                icon: <FaPhoneAlt />
                            },
                            {
                                title: "Online Consultations",
                                text: "Secure, private video sessions that allow you to receive quality care from the comfort of your home.",
                                icon: <FaLaptopMedical />
                            }
                        ].map((service, idx) => (
                            <div className="col-lg-4 col-md-6 mb-4" key={idx}>
                                <div className="concern-card text-center" style={{ height: '100%' }}>
                                    <div className="concern-react-icon mb-4" style={{ background: 'var(--bg-lavender)', color: 'var(--primary-violet)' }}>
                                        {service.icon}
                                    </div>
                                    <h4 style={{ color: 'var(--primary-violet)', marginBottom: '1rem' }}>{service.title}</h4>
                                    <p className="text-muted">{service.text}</p>
                                    <button className="btn btn-link text-decoration-none mt-auto" style={{ color: 'var(--highlight-orange)', fontWeight: 'bold' }}>
                                        Learn More →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding" style={{ backgroundColor: '#FAF5FF' }}>
                <div className="container text-center">
                    <h2 className="section-title mb-4">Not sure where to start?</h2>
                    <p className="lead mb-5">
                        Our care coordinators can help match you with the right professional based on your needs.
                    </p>
                    <Link to="/register-user" className="btn btn-primary-custom text-white btn-lg">
                        Find My Match
                    </Link>
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

export default Services;