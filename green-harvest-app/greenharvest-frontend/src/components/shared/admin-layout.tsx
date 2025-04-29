
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getCartItems } from '../../services/api';
import { CartItems } from '../../interfaces/cart.interface';
import { userService } from '../../services/user.service';
import './shared-layout.css'
import Cart from '../cart/cart';
import { useNavigate } from 'react-router-dom';
import Stores from '../admin/stores';
import ProductPage from '../products/products';
import Users from '../admin/users';
import Inventory from '../admin/inventory';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes (adjust as needed)

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

const AdminLayout = () => {
  const [activeKey, setActiveKey] = useState('products');
  const [cartItems, setCartItems] = useState<CartItems[]>()
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const timeoutIdRef = useRef<number | null>(null);

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

  const handleLogout = () => {
    console.log("Logging out (manual or timeout)...");
    // Clear existing timeout if logout is triggered manually
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    // Optional: Clear user details from the service
    // userService.clearUserDetails();
    navigate('/'); // Redirect to login page
    // Optional: Force reload
    // window.location.reload();
  };


  // --- Inactivity Timer Logic ---
  const resetInactivityTimer = useCallback(() => {
    // Clear previous timer
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    // Set new timer
    timeoutIdRef.current = setTimeout(() => {
      console.log("Inactivity timeout reached.");
      handleLogout(); // Trigger logout after timeout
    }, INACTIVITY_TIMEOUT_MS);
  }, []);


  useEffect(() => {
    // List of events that indicate user activity
    const activityEvents: (keyof WindowEventMap)[] = [
      'mousemove', 'keydown', 'click', 'scroll', 'touchstart'
  ];

  // Function to reset timer on activity
  const handleActivity = () => {
    // console.log('User activity detected'); // Optional: for debugging
    resetInactivityTimer();
  };

  // Add event listeners for activity
  activityEvents.forEach(event => {
    window.addEventListener(event, handleActivity, { passive: true }); // Use passive for scroll/touch performance
  });

  // Start the initial timer when the component mounts
  resetInactivityTimer();

  // --- Cleanup function ---
  return () => {
    // Clear the timeout when the component unmounts or before re-running the effect
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    // Remove event listeners
    activityEvents.forEach(event => {
      window.removeEventListener(event, handleActivity);
    });
  };
}, [resetInactivityTimer, handleLogout]);

  useEffect(() => {
    // Fetch cart items only if logged in
    if (sessionStorage.getItem('authToken')) {
        handleGetCartItems();
    }
  }, []); // Runs once on mount

  return (
    <div  style={{
      backgroundImage: `linear-gradient(rgb(255, 255, 255), rgba(40, 131, 77, 0.66))`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '150vh',
    }}>
        <div className="row align-items-center p-5 w-75 mx-auto">
          <div className="col-xs-12 col-md-3 text-center">
            <img
              src="/src/assets/GreenHarvest Logo - Transparent.png"
              alt="Logo"
              style={{
                maxWidth:"60%",
                height:"auto",
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
                  id="stores-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#stores"
                  type="button"
                  role="tab"
                  aria-controls="stores"
                  aria-selected="true"
                >
                  Stores
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link rounded-pill"
                  id="inventory-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#inventory"
                  type="button"
                  role="tab"
                  aria-controls="inventory"
                  aria-selected="false"
                >
                  Orders
                </button>
              </li>
              {/* <li className="nav-item" role="presentation">
                <button
                  className="nav-link rounded-pill"
                  id="users-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#users"
                  type="button"
                  role="tab"
                  aria-controls="users"
                  aria-selected="false"
                >
                  Users
                </button>
              </li> */}
            </ul>
          </div>
          <div className="col-xs-12 col-md-3 text-center">
            <i className="bi bi-person-circle text-success fs-2 me-3"></i>
            {/* <i className="bi bi-cart-plus text-success fs-2" role="button" data-bs-toggle="offcanvas" data-bs-target="#cartOffCanvas" aria-controls="cartOffCanvas"></i> */}
            
            {/* <i className="bi bi-box-arrow-right text-success fs-3 ms-3"role="button" onClick={handleLogout}></i> */}
          </div>
        </div>
        <div className="row">
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="stores" role="tabpanel" aria-labelledby="stores-tab">
              <Stores></Stores>
            </div>
            <div className="tab-pane fade show" id="inventory" role="tabpanel" aria-labelledby="inventory-tab">
              <Inventory></Inventory>
            </div>
            <div className="tab-pane fade show" id="users" role="tabpanel" aria-labelledby="users-tab">
              <Users></Users>
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

export default AdminLayout;