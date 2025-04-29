import React, { useEffect, useState } from 'react';
import { Store } from '../../interfaces/store.interface';
import { getStores } from '../../services/api';

const Stores: React.FC = () => {
    const [stores, setStores] = useState<Store[]>([])

    const handleGetStores = async () => {
        try{
          const response = await getStores();
          setStores(response.data);
          console.log(stores)
        }catch(err){
          console.error('Error fetching stores:', err);
        }
      };

    useEffect(() => {
        handleGetStores()
    })
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <h3 className="card-title mb-3">Stores</h3>
                    <div className="card">
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <th>#</th>
                                    <th>Store Name</th>
                                    <th>Location</th>
                                </thead>
                                <tbody>
                                    {
                                        stores.map((store, index) => (
                                            <tr key={store.StoreId || index}>
                                                <td>{index}</td>
                                                <td>{store.Name}</td>
                                                <td>{store.Location}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Stores;