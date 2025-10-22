import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaPlaneDeparture, FaCheckCircle, FaTimesCircle, FaDollarSign } from 'react-icons/fa';

const StatsCards = () => {
  // Datos simulados (deberían venir de una API en un proyecto real)
  const stats = [
    { value: 45, label: 'Vueloss', icon: <FaPlaneDeparture className="text-primary fs-3" />, color: 'primary' },
    { value: 33, label: 'Flights Done', icon: <FaCheckCircle className="text-success fs-3" />, color: 'success' },
    { value: 12, label: 'Flights Cancelled', icon: <FaTimesCircle className="text-danger fs-3" />, color: 'danger' },
    { value: '10,205', label: 'Ingresos ($)', icon: <FaDollarSign className="text-warning fs-3" />, color: 'warning', currency: true },
  ];

  return (
    <Row className="mb-4">
      {stats.map((stat, index) => (
        <Col key={index} md={3} sm={6} className="mb-3">
          <Card className="shadow-sm p-3 border-0">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h3 className="mb-0">
                  {stat.currency ? `$${stat.value}` : stat.value}
                </h3>
                <p className="text-muted mb-0">{stat.label}</p>
              </div>
              {stat.icon}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StatsCards;