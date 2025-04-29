import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const Orders: React.FC = () => {
    const [status, setStatus] = useState('Preparing')

    const handleChangeStatus = () => {
        setStatus('Shipped Out')
    }
    return(
    <div style={{
        backgroundImage: `linear-gradient(rgb(255, 255, 255),rgb(255, 255, 255), rgba(40, 131, 77, 0.66))`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
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
              <i className="bi bi-cart-plus text-success fs-2 me-3" role="button" data-bs-toggle="offcanvas" data-bs-target="#cartOffCanvas" aria-controls="cartOffCanvas"></i>
              <i className="bi bi-card-checklist text-success fs-3 me-3"role="button"></i>
              <i className="bi bi-box-arrow-right text-success fs-3"role="button"></i>
            </div>
          </div>
          <div className="row">
            <div className="container w-75">
                <div className="justify-content-between d-flex mb-2">
                    <h3>Orders</h3>
                    <div className="input-group w-50 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Orders"
                        />
                        <span className="input-group-text">
                            <i className="bi bi-search"></i>
                        </span>
                    </div>
                </div>
                <div className="card bg-white vh-100">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Order No.</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>12897</td>
                                        <td>April 25, 2025</td>
                                        <td><span className="badge bg-warning-subtle text-dark rounded-5">Preparing</span></td>
                                        <td>
                                            <button className="btn btn-success btn-sm"  data-bs-toggle="offcanvas" data-bs-target="#addProductOffCanvas" aria-controls="addProductOffCanvas">
                                                <i className="bi bi-caret-right-fill"></i>
                                            </button>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

          </div>

          <div className="offcanvas offcanvas-end m-3 rounded-4 p-3" id="addProductOffCanvas" aria-labelledby="offcanvasLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasLabel">Order 12897</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" id="dismissOffcanvasButton"></button>
            </div>
            <div className="offcanvas-body">
                <h3 className="fw-bold mb-3">{status}</h3>
                <button className="btn btn-success btn-sm" onClick={handleChangeStatus}>Mark as {status === "Shipped Out" ? "Delivered" : "Shipped Out"}</button>
                <hr />
                <div className="mb-2">
                    <i className="bi bi-shop-window d-inline"></i>
                    <h6 className="ms-2 d-inline fw-medium">Tindahan ni Aling Nena</h6>
                </div>
                <div className="">
                    <div className="card mb-2">
                        <div className="card-body justify-content-between d-flex">
                            <div>
                                <span className="fw-medium">Orange</span>&nbsp;
                                <span className="badge bg-success-subtle text-success">Fruit</span><br></br>
                                <span className="">Quantity: 2kg</span>
                            </div>
                            <div>
                                <span className="text-success fw-bold">₱ 40.00</span>
                                <i className="bi bi-trash ms-2 text-danger"></i>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body justify-content-between d-flex">
                            <div>
                                <span className="fw-medium">Apple</span>&nbsp;
                                <span className="badge bg-success-subtle text-success">Fruit</span><br></br>
                                <span className="">Quantity: 2kg</span>
                            </div>
                            <div>
                                <span className="text-success fw-bold">₱ 40.00</span>
                                <i className="bi bi-trash ms-2 text-danger"></i>
                            </div>
                        </div>
                    </div>
                    <div className="mb-0 pt-3">
                        <div className="justify-content-between d-flex">
                            <span className="fw-bold">Total: </span>
                            <span className="fw-bold">₱ 80.00</span>
                        </div>
                    </div>
                </div>
                <hr />
                <div>
                    <div>
                    <small className="fw-bold text-muted">Deliver To:</small>
                    <div className="card mb-2">
                        <div className="card-body">
                            <i className="bi bi-person-circle text-success"></i> &nbsp;
                            Daniel Rebadavia
                        </div>
                    </div>

                    <small className="fw-bold text-muted">Address</small>
                    <div className="card mb-2">
                        <div className="card-body">
                        <i className="bi bi-geo-alt text-success"></i> &nbsp;
                            Mandaluyong City
                        </div>
                    </div>
                    <small className="fw-bold text-muted">Contact Number</small>
                    <div className="card mb-2">
                        <div className="card-body">
                            <i className="bi bi-phone text-success"></i> &nbsp;
                            09452012393
                        </div>
                    </div>
                    <small className="fw-bold text-muted">Mode of Payment</small>
                    <div className="card mb-2">
                        <div className="card-body">
                            <i className="bi bi-cash-stack text-success"></i> &nbsp;
                            Cash on Delivery (<span className="fw-bold">₱ 80.00</span>)
                        </div>
                    </div>
                    <small className="fw-bold text-muted">Mode of Transport</small>
                    <div className="card mb-2">
                        <div className="card-body">
                            <i className="bi bi-truck text-success"></i> &nbsp;
                            Lalamove
                        </div>
                    </div>


                </div>
            </div>
            </div>
          </div>
        </div>
  );
};

export default Orders;