
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import { AccountCircle } from '@mui/icons-material';

interface SharedLayoutProps {
  title: string;
  children: React.ReactNode;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Container>{children}</Container>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ title, children }) => {
  const [activeKey, setActiveKey] = useState('products');

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container fluid className="p-4">
    {/* Header Section */}
    <Row className="align-items-center text-center mb-4">
      {/* Logo */}
      <Col xs={12} md={3} className="text-center">
        <img
          src="/src/assets/GreenHarvest Logo - Transparent.png"
          alt="Logo"
          style={{
            width: '35%',
            transition: 'transform 0.2s',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </Col>

      {/* Tabs */}
      <Col xs={12} md={6} className="text-center">
        <Nav
          variant="tabs"
          activeKey={activeKey}
          onSelect={(selectedKey) => setActiveKey(selectedKey || 'products')}
          className="justify-content-center"
        >
          <Nav.Item>
            <Nav.Link eventKey="products">Products</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="about">About GreenHarvest</Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>

        {/* Account Icon */}
        <Col xs={12} md={3} className="text-center">
          <i
            className="bi bi-person-circle"
            style={{ fontSize: '60px', color: '#000' }}
          ></i>
        </Col>
      </Row>

      {/* Main Content Section */}
      <Row>
        {/* Navigation Pane */}
        <Col xs={12} md={3} className="border-end">
          <h5>Navigation Pane</h5>
          <p>Links or additional content can go here.</p>
        </Col>

        {/* Tab Content */}
        <Col xs={12} md={9}>
          <Tab.Content>
            <Tab.Pane eventKey="products" active={activeKey === 'products'}>
              {children}
            </Tab.Pane>
            <Tab.Pane eventKey="about" active={activeKey === 'about'}>
              <h3>About GreenHarvest</h3>
              <p>Information about GreenHarvest can go here.</p>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Container>
  );
};

export default SharedLayout;