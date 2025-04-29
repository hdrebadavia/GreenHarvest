import React from 'react';

const Checkout: React.FC = () => {
  return (
    <div>
      <h1>Checkout</h1>
      {/* Add your checkout form and logic here */}
      <form>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" placeholder="Enter your address" />
        </div>
        <div className="mb-3">
          <label htmlFor="contactNumber" className="form-label">Contact Number</label>
          <input type="tel" className="form-control" id="contactNumber" placeholder="Enter your contact number" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Checkout;
