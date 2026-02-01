import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBrain, FaCloudRain, FaRegComments, FaBed, FaUserInjured, FaBolt, FaHeartBroken, FaExclamationCircle, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { BsEmojiFrown, BsWind, BsEmojiDizzy } from 'react-icons/bs';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
    const { auth, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);

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

            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <h1 className="hero-title">
                                Find Balance in Your <span style={{ color: 'var(--accent-sage)' }}>Inner World</span>
                            </h1>
                            <p className="hero-subtitle">
                                A safe harbor for your mind. SafeMind connects you with compassionate professionals and tools to navigate life's emotional tides.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <img
                                src="https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=800"
                                alt="Mental Wellness"
                                className="img-fluid hero-image"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mental Health Concerns Section */}
            <section className="section-padding">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="section-title"><span>Concerns We Care For</span></h2>
                        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
                            Whatever you are going through, you are not alone. Our professionals are here to help you navigate these challenges.
                        </p>
                    </div>
                    <div className="row">
                        {[
                            {
                                title: "Depression",
                                text: "Does your life feel impossible & hopeless? You don't have to manage it alone.",
                                icon: <FaCloudRain />
                            },
                            {
                                title: "Anxiety",
                                text: "Chronic worry, mental fatigue, and feeling like your thoughts are always one step ahead of you?",
                                icon: <BsWind />
                            },
                            {
                                title: "OCD",
                                text: "Are your thoughts out of control & making you feel overwhelmed? Cope better.",
                                icon: <FaExclamationCircle />
                            },
                            {
                                title: "Bipolar Disorder",
                                text: "Struggling with episodes of mania or depression? Find the care you need.",
                                icon: <BsEmojiDizzy />
                            },
                            {
                                title: "Schizophrenia",
                                text: "Experiencing hallucinations or delusions? Professional medical help is available.",
                                icon: <FaBrain />
                            },
                            {
                                title: "Eating Disorders",
                                text: "Struggling with food, body image, or weight? We can help you find balance.",
                                icon: <FaUserInjured />
                            },
                            {
                                title: "Relationship Issues",
                                text: "Navigating conflict, communication issues, or a breakup? Let's talk.",
                                icon: <FaRegComments />
                            },
                            {
                                title: "Sleep Issues",
                                text: "Trouble falling or staying asleep? Quality rest is essential for mental health.",
                                icon: <FaBed />
                            }
                        ].map((concern, idx) => (
                            <div className="col-lg-3 col-md-6 mb-4" key={idx}>
                                <div className="concern-card">
                                    <div className="concern-icon-wrapper">
                                        <div className="concern-react-icon">{concern.icon}</div>
                                    </div>
                                    <h5>{concern.title}</h5>
                                    <p className="concern-text">{concern.text}</p>
                                    <div className="concern-arrow">→</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expertise Section */}
            <section className="section-padding expertise-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0 order-lg-2">
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <img
                                        src="https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600"
                                        alt="Indian Female Doctor"
                                        className="img-fluid expertise-image mb-3"
                                        style={{ borderRadius: '20px', height: '250px', objectFit: 'cover', width: '100%' }}
                                    />
                                    <img
                                        src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600"
                                        alt="Therapy Session"
                                        className="img-fluid expertise-image"
                                        style={{ borderRadius: '20px', height: '200px', objectFit: 'cover', width: '100%' }}
                                    />
                                </div>
                                <div className="col-6 mt-4">
                                    <img
                                        src="https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=600"
                                        alt="Indian Male Doctor"
                                        className="img-fluid expertise-image mb-3"
                                        style={{ borderRadius: '20px', height: '220px', objectFit: 'cover', width: '100%' }}
                                    />
                                    <img
                                        src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=600"
                                        alt="Counseling"
                                        className="img-fluid expertise-image"
                                        style={{ borderRadius: '20px', height: '230px', objectFit: 'cover', width: '100%' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 order-lg-1">
                            <h2 className="section-title text-start"><span>Our Expertise</span></h2>
                            <p className="lead mb-4" style={{ color: 'var(--text-charcoal)' }}>
                                Our psychiatrists, therapists, and support staff specialize in a wide range of mental health interventions at varied stages.
                            </p>
                            <ul className="list-unstyled expertise-list">
                                <li>Licensed Clinical Psychologists</li>
                                <li>Certified Psychiatrists</li>
                                <li>Trauma-Informed Care Specialists</li>
                                <li>Holistic Wellness Coaches</li>
                                <li>Couples & Family Therapists</li>
                            </ul>
                            <Link to="/about" className="btn btn-outline-custom mt-3">
                                Meet Our Team
                            </Link>
                        </div>
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

export default Home;