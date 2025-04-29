import React from 'react';

const Inventory: React.FC = () => {
    const sampleData = [
        {
            id: 1,
            orderNumber: 'ORD-001',
            store: 'Tindahan ni Aling Nena',
            status: 'Delivered',
            dateOrdered: '2023-10-01',
            dateDelivered: '2023-10-05',
        },
        {
            id: 2,
            orderNumber: 'ORD-002',
            store: 'Gulayan ni Boyet',
            status: 'Pending',
            dateOrdered: '2023-10-03',
            dateDelivered: 'N/A',
        },
        {
            id: 3,
            orderNumber: 'ORD-003',
            store: 'Tindahan ni Aling Nena',
            status: 'Cancelled',
            dateOrdered: '2023-09-25',
            dateDelivered: 'N/A',
        },
        {
            id: 4,
            orderNumber: 'ORD-004',
            store: 'Jessicas Vegetables and Fruits',
            status: 'Delivered',
            dateOrdered: '2023-09-20',
            dateDelivered: '2023-09-25',
        },
        {
            id: 5,
            orderNumber: 'ORD-005',
            store: 'Gulayan ni Boyet',
            status: 'In Progress',
            dateOrdered: '2023-10-02',
            dateDelivered: 'N/A',
        },
        {
            id: 6,
            orderNumber: 'ORD-006',
            store: 'Jessicas Vegetables and Fruits',
            status: 'Delivered',
            dateOrdered: '2023-09-15',
            dateDelivered: '2023-09-20',
        },
        {
            id: 7,
            orderNumber: 'ORD-007',
            store: 'Tindahan ni Aling Nena',
            status: 'Pending',
            dateOrdered: '2023-10-04',
            dateDelivered: 'N/A',
        },
        {
            id: 8,
            orderNumber: 'ORD-008',
            store: 'Jessicas Vegetables and Fruits',
            status: 'Cancelled',
            dateOrdered: '2023-09-18',
            dateDelivered: 'N/A',
        },
        {
            id: 9,
            orderNumber: 'ORD-009',
            store: 'Gulayan ni Boyet',
            status: 'Delivered',
            dateOrdered: '2023-09-10',
            dateDelivered: '2023-09-15',
        },
        {
            id: 10,
            orderNumber: 'ORD-010',
            store: 'Gulayan ni Boyet',
            status: 'In Progress',
            dateOrdered: '2023-10-05',
            dateDelivered: 'N/A',
        },
    ];

    // Function to count orders by status
    const getStatusCounts = () => {
        const counts: { [key: string]: number } = {};
        sampleData.forEach((order) => {
            counts[order.status] = (counts[order.status] || 0) + 1;
        });
        return counts;
    };

    const statusCounts = getStatusCounts();

    // Function to determine badge class based on status
    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'Delivered':
                return 'bg-success-subtle text-success rounded-pill'; // Green badge
            case 'Pending':
                return 'bg-warning-subtle text-warning rounded-pill'; // Yellow badge
            case 'Cancelled':
                return 'bg-danger-subtle text-danger rounded-pill'; // Red badge
            case 'In Progress':
                return 'bg-primary-subtle text-primary rounded-pill'; // Blue badge
            default:
                return 'bg-secondary-subtle'; // Gray badge for unknown statuses
        }
    };

    return (
        <div className="container w-75">

            {/* Orders Table */}
            <div className="row mb-2">
                <div className="col-lg-5 col-sm-12">
                    <h3 className="text-muted fw-bolder">Orders</h3>
                </div>
                <div className="col-lg-7 mb-sm-2">
                    <div className="input-group">
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
            </div>
            {/* Summary Cards */}
            <div className="row mb-2">
                <div className="col-lg-3 col-sm-6 mb-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <i className="bi bi-check-circle-fill text-success fs-1"></i>
                            <h5 className="card-title mt-2">Delivered</h5>
                            <p className="card-text fs-4">{statusCounts['Delivered'] || 0}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 mb-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <i className="bi bi-hourglass-split text-warning fs-1"></i>
                            <h5 className="card-title mt-2">Pending</h5>
                            <p className="card-text fs-4">{statusCounts['Pending'] || 0}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 mb-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <i className="bi bi-x-circle-fill text-danger fs-1"></i>
                            <h5 className="card-title mt-2">Cancelled</h5>
                            <p className="card-text fs-4">{statusCounts['Cancelled'] || 0}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 mb-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <i className="bi bi-arrow-repeat text-primary fs-1"></i>
                            <h5 className="card-title mt-2">In Progress</h5>
                            <p className="card-text fs-4">{statusCounts['In Progress'] || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Order Number</th>
                                            <th>Store</th>
                                            <th>Status</th>
                                            <th>Date Ordered</th>
                                            <th>Date Delivered</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sampleData.map((order) => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{order.orderNumber}</td>
                                                <td>{order.store}</td>
                                                <td>
                                                    <span
                                                        className={`badge ${getStatusBadgeClass(
                                                            order.status
                                                        )}`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td>{order.dateOrdered}</td>
                                                <td>{order.dateDelivered}</td>
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

export default Inventory;