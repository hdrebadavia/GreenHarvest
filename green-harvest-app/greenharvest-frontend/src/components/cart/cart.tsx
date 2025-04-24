import { useEffect, useState } from "react";
import { getCartItems, getProductById } from "../../services/api";
import { CartItems } from "../../interfaces/cart.interface";
import { userService } from "../../services/user.service";
import { Product } from "../../interfaces/product.interface";

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItems[]>()
    const placeholderImage = 'https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1';
    const [quantity, setQuantity] = useState<number>(0); // State for quantity

    const handleGetCartItems = async () => {
        try{
            const userId = Number(userService.getCurrentUserDetails()?.id)
            const response = await getCartItems(userId);

            const itemWithProduct = await Promise.all(
                response.data.map(async (item: CartItems) => {
                    try {
                        const productResponse = await getProductById(item.ProductId);
                        setQuantity(item.Quantity)
                        return { ...item, Product: productResponse.data };
                    }catch(error){
                        console.error(`Error fetching product for cart item ${item.CartItemId}:`, error);
                        return { ...item, Product: null };
                    }
                })
            );
            setCartItems(itemWithProduct);
        }catch(err){
            console.error('Error fetching cart items:', err);
        }
    }

    const handleIncreaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecreaseQuantity = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };
    useEffect(() => {
        handleGetCartItems();
    }, []);
  return (
    <div>
      {/* Cart content goes here */}
        {cartItems && cartItems.length > 0 ? (
        <div>
            <ul className="list-group list-group-flush">
                {cartItems.map((item) => (
                    <li className="list-group-item" key={item.CartItemId}>
                        <div className="row">
                            <div className="col-3">
                                <div style={{ width: '100%', aspectRatio: '1', overflow: 'hidden'}}>
                                    <img
                                        src={item.Product?.imageUrl ? item.Product.imageUrl : placeholderImage}
                                        alt={item.Product?.Name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-9">
                                <span className="fw-bold">{item.Product?.Name}</span>
                                <span className="fw-light">{item.Product?.StoreName}</span>
                                <div className="btn-group">
                                    <button
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={handleDecreaseQuantity}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm text-center rounded-0 border-black border-end-0 border-start-0"
                                        value={item.Quantity}
                                    />
                                    <button
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={handleIncreaseQuantity}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                    </li>
                ))}

            </ul>

        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>

  );
};

export default Cart;
