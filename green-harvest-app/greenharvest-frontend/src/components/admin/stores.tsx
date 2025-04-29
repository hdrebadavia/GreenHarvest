import React, { useState } from 'react';
import SharedLayout from '../shared/shared-layout';

interface Store {
    StoreId: number;
    Name: string;
    Location: string;
    Category: string;
    Description: string;
}

const Stores: React.FC = () => {
    // Predefined list of stores with 4 categories
    const predefinedStores: Store[] = [
        { StoreId: 101, Name: 'Tindahan ni Aling Nena', Location: 'Manila', Category: 'Vegetables', Description: 'A local store offering fresh produce.' },
        { StoreId: 102, Name: 'Gulayan ni Boyet', Location: 'Quezon City', Category: 'Vegetables', Description: 'A vegetable shop with organic options.' },
        { StoreId: 103, Name: 'Jessicas Vegetables and Fruits', Location: 'Cebu', Category: 'Fruits', Description: 'A store specializing in fruits and vegetables.' },
        { StoreId: 104, Name: 'Green Harvest Central', Location: 'Davao', Category: 'Main Branch', Description: 'The main branch of Green Harvest.' },
        { StoreId: 105, Name: 'Fresh Picks Market', Location: 'Baguio', Category: 'Organic', Description: 'A market offering fresh and organic produce.' },
        { StoreId: 106, Name: 'Farm to Table', Location: 'Cavite', Category: 'Fruits', Description: 'A farm-to-table store with fresh produce.' },
        { StoreId: 107, Name: 'Nature’s Basket', Location: 'Laguna', Category: 'Organic', Description: 'A store offering organic fruits and vegetables.' },
        { StoreId: 108, Name: 'Harvest Haven', Location: 'Batangas', Category: 'Fruits', Description: 'A haven for fresh and local produce.' },
    ];

    const [filteredStores, setFilteredStores] = useState<Store[]>(predefinedStores);
    const [searchTerm, setSearchTerm] = useState('');

    // Function to count stores by category
    const getCategoryCounts = () => {
        const counts: { [key: string]: number } = {};
        predefinedStores.forEach((store) => {
            counts[store.Category] = (counts[store.Category] || 0) + 1;
        });
        return counts;
    };

    const categoryCounts = getCategoryCounts();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        if (value === '') {
            setFilteredStores(predefinedStores);
        } else {
            const filtered = predefinedStores.filter((store) =>
                store.Name.toLowerCase().includes(value) ||
                store.Location.toLowerCase().includes(value) ||
                store.Category.toLowerCase().includes(value)
            );
            setFilteredStores(filtered);
        }
    };

    return (
            <div className="container w-75">

                {/* Search Bar */}
                <div className="row mb-2">
                    <div className="col-lg-5 col-sm-12">
                        <h3 className="text-muted fw-bolder">Stores</h3>
                    </div>
                    <div className="col-lg-7 mb-sm-2">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Stores"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <span className="input-group-text">
                                <i className="bi bi-search"></i>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="row mb-4 text-center">
                    {Object.entries(categoryCounts).map(([category, count]) => (
                        <div className="col-6 col-md-3 mb-2" key={category}>
                            <div className="card shadow-sm bg-light d-flex align-items-center p-2">
                                <i
                                    className={`bi ${
                                        category === 'Local'
                                            ? 'bi-house-door-fill text-primary'
                                            : category === 'Vegetables'
                                            ? 'bi-basket-fill text-success'
                                            : category === 'Fruits'
                                            ? 'bi-apple text-danger'
                                            : 'bi-shop text-warning'
                                    } fs-3 me-2`}
                                ></i>
                                <div>
                                    <h6 className="card-title mb-0">{category}</h6>
                                    <p className="card-text fs-5 fw-bold mb-0">{count}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Stores Table */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-sm table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>#</th>
                                                <th>Store Name</th>
                                                <th>Location</th>
                                                <th>Category</th>
                                                <th>Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredStores.map((store, index) => (
                                                <tr key={store.StoreId}>
                                                    <td>{index + 1}</td>
                                                    <td>{store.Name}</td>
                                                    <td>{store.Location}</td>
                                                    <td>{store.Category}</td>
                                                    <td>{store.Description}</td>
                                                    <td>
                                                        <button className="btn btn-danger btn-sm">
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                        &nbsp;
                                                        <button
                                                            className="btn btn-warning btn-sm"
                                                            data-bs-toggle="offcanvas"
                                                            data-bs-target="#editStoreOffCanvas"
                                                            aria-controls="editStoreOffCanvas"
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Stores;