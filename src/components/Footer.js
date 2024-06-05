import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faInstagram,
  faLinkedinIn,
  faGithub
} from '@fortawesome/free-brands-svg-icons';

const SocialMediaLinks = ({ size }) => (
  <>
    <li className="ms-3">
      <a className="link-light" href="#" aria-label="Twitter">
        <FontAwesomeIcon icon={faTwitter} size={size} />
      </a>
    </li>
    <li className="ms-3">
      <a className="link-light" href="#" aria-label="Instagram">
        <FontAwesomeIcon icon={faInstagram} size={size} />
      </a>
    </li>
    <li className="ms-3">
      <a className="link-light" href="#" aria-label="Facebook">
        <FontAwesomeIcon icon={faFacebookF} size={size} />
      </a>
    </li>
    <li className="ms-3">
      <a className="link-light" href="#" aria-label="Google">
        <FontAwesomeIcon icon={faGoogle} size={size} />
      </a>
    </li>
    <li className="ms-3">
      <a className="link-light" href="#" aria-label="LinkedIn">
        <FontAwesomeIcon icon={faLinkedinIn} size={size} />
      </a>
    </li>
    <li className="ms-3">
      <a className="link-light" href="#" aria-label="GitHub">
        <FontAwesomeIcon icon={faGithub} size={size} />
      </a>
    </li>
  </>
);

const links = [
  { text: 'Home' },
  { text: 'Features' },
  { text: 'Pricing' },
  { text: 'FAQs' },
  { text: 'About' },
  { text: 'Privacy Policy' },
  { text: 'Terms of Service' },
];

const Footer = () => (
  <footer className="bg-dark text-white py-4 w-100">
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-3 mb-4 mb-md-0">
          <h3> <span style={{ color: '#c41f3e' }}>Quick Links</span></h3>
          <ul className="nav flex-column">
            {links.map((link, index) => (
              <li key={index} className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-light">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-12 col-md-3 mb-4 mb-md-0">
          <h5><span style={{ color: '#c41f3e' }}>Contact Us</span></h5>
          <p>
            <strong>Address:</strong> 1234 Bank St, Suite 1000, Toronto, ON,
            Canada
          </p>
          <p>
            <strong>Phone:</strong> +1 234 567 890
          </p>
          <p>
            <strong>Email:</strong> support@bank.com
          </p>
        </div>
        <div className="col-12 col-md-3 mb-4 mb-md-0">
          <h5><span style={{ color: '#c41f3e' }}>Subscribe to our newsletter</span> </h5>
          <p>Monthly digest of what's new and exciting from us.</p>
          <Form className="d-flex gap-2">
            <Form.Control
              type="email"
              placeholder="Email address"
              className="me-2"
            />
            <Button variant="danger" type="button">
              Subscribe
            </Button>
          </Form>
        </div>
        <div className="col-12 col-md-3">
          <h5><span style={{ color: '#c41f3e' }}>Follow us</span></h5>
          <ul className="list-unstyled d-flex">
            <SocialMediaLinks size="1x" />
          </ul>
        </div>
      </div>
      <div className="row text-center mt-4">
        <div className="col">
          <p> <span style={{ color: '#c41f3e' }}>&copy; {new Date().getFullYear()} CIBC Bank. All rights  reserved.</span></p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
