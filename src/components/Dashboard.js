import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Carousel,} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RewardOffer from "./RewardOffer";
import CongratulationsPage from "./CongratulationsPage";
import CIBC from "../assets/img/cibc-0224-ph-2-transformed.webp";
import Content from "../assets/img/cq5dam.web.1280.1280.avif";

const Dashboard = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item style={{ maxHeight: "450px" }}>
          <img
            className="d-block w-100"
            src={CIBC}
            alt="Welcome to CIBC Bank"
            style={{ objectFit: "cover", maxHeight: "600px" }}
          />
        </Carousel.Item>
        <Carousel.Item style={{ maxHeight: "450px" }}>
          <img
            className="d-block w-100"
            src={CIBC}
            alt="Welcome to CIBC Bank"
            style={{ objectFit: "cover", maxHeight: "600px" }}
          />
        </Carousel.Item>
      </Carousel>

      {/* Welcome Message */}
      <div className="text-center mb-4">
        <h2 className="display-4">
          Welcome to <span style={{ color: "red", fontWeight: "bold" }}>CIBC Bank</span>
        </h2>
      </div>
      
      <RewardOffer />
      <CongratulationsPage />


      {/* Information and Services Section */}
      <Container className="my-5">
        <Row className="d-flex align-items-stretch">
          <Col md={4} className="offset-md-1">
            <Card className="p-4 bg-light shadow rounded d-flex flex-column justify-content-between h-100">
              <div>
                <h2>About <span className="text-danger">CIBC</span> Bank</h2>
                <p>Learn more about CIBC Bank, our values, and our mission to provide excellent banking services to our customers.</p>
                <h3>Our Services</h3>
                <p>We offer a wide range of banking services to meet your needs.</p>
              </div>
              <div className="d-grid gap-2">
                <Link to="/login" className="btn btn-danger btn-lg">Login</Link>
                <Link to="/signup" className="btn btn-danger btn-lg">Sign Up</Link>
              </div>
            </Card>
          </Col>
          <Col md={7}>
            <img src={Content} alt="Welcome to CIBC Bank" className="img-fluid rounded h-100" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
