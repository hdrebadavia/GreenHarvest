
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';
import { getCartItems } from '../../services/api';
import { CartItems } from '../../interfaces/cart.interface';
import { userService } from '../../services/user.service';
import './shared-layout.css'
import Cart from '../cart/cart';

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
  const [cartItems, setCartItems] = useState<CartItems[]>()
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleGetCartItems = async () => {
    try{
      const userId = Number(userService.getCurrentUserDetails()?.id)
      const response = await getCartItems(userId);
      setCartItems(response.data);
    }catch(err){
      console.error('Error fetching cart items:', err);
    }
  }
  useEffect(() => {
    handleGetCartItems();
  }, []);

  return (
    <div className="container">
        <div className="row align-items-center p-5">
          <div className="col-xs-12 col-md-3 text-center">
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
          </div>
          <div className="green-tab-nav col-xs-12 col-md-6 text-center bg-success-subtle p-1 rounded-pill">
            <ul className="nav nav-pills nav-fill justify-content-center" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active rounded-pill"
                  id="products-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#products"
                  type="button"
                  role="tab"
                  aria-controls="products"
                  aria-selected="true"
                >
                  Products
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link rounded-pill"
                  id="about-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#about"
                  type="button"
                  role="tab"
                  aria-controls="about"
                  aria-selected="false"
                >
                  About GreenHarvest
                </button>
              </li>
            </ul>
          </div>
          <div className="col-xs-12 col-md-3 text-center">
            <i className="bi bi-person-circle text-success fs-2 me-3"></i>
            <i className="bi bi-cart-plus text-success fs-2" role="button" data-bs-toggle="offcanvas" data-bs-target="#cartOffCanvas" aria-controls="cartOffCanvas"></i>
          </div>
        </div>
        <div className="row">
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="products" role="tabpanel" aria-labelledby="products-tab">
              {children}
            </div>
            <div className="tab-pane fade" id="about" role="tabpanel" aria-labelledby="about-tab">
              <h3>About GreenHarvest</h3>
              <p>Information about GreenHarvest can go here.</p>
            </div>
          </div>
        </div>

        <div className="offcanvas offcanvas-end m-3 rounded-4 p-3" id="cartOffCanvas" aria-labelledby="offcanvasLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasLabel">Your Cart</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" id="dismissOffcanvasButton"></button>
          </div>
          <div className="offcanvas-body">
              <Cart></Cart>
          </div>
        </div>
      </div>
  );
};

export default SharedLayout;