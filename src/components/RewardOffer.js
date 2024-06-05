import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import CostcoCard from '../assets/img/cq5dam.thumbnail.319.319.avif';

const RewardOffer = () => {
  return (
    <Container className="reward-offer-container my-5 p-4 bg-light rounded">
      <Row className="justify-content-center mb-4">
        <Col md={6} className="text-center">
          <Image src={CostcoCard} alt="Costco Card" className="img-fluid rounded" />
        </Col>
      </Row>
      <div className="text-center">
        <h1 className="mb-4"> <span className="text-danger">Ready for a $400+ reward?</span></h1>
        <h3>Provide your email address when you open a CIBC Smart Account, then within 2 months:</h3>
      </div>
      <Row className="requirements text-center">
        <Col md={6} className="requirement mb-4">
          <div className="number"><h1><span className="text-danger">1</span></h1></div>
          <h5>Set up ongoing monthly direct deposits totaling $500 or more.</h5>
        </Col>
        <Col md={6} className="requirement mb-4">
          <div className="number"><h1><span className="text-danger">2</span></h1></div>
          <h5>And complete one of these 3 transactions within the same calendar month:</h5>
          <ul className="list-unstyled">
            <li>2 ongoing pre-authorized transactions</li>
            <li>2 online bill payments of $50 or More each</li>
            <li>5 online Visa * Debit Purchases</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default RewardOffer;
