import React, { useEffect, useMemo, useState } from "react"; // Import useMemo
import { getCartItems, getProductById } from "../../services/api";
import { CartItems } from "../../interfaces/cart.interface";
import { userService } from "../../services/user.service";
import { Product } from "../../interfaces/product.interface";

// Define an interface for the grouped structure
interface GroupedCartItems {
    [storeName: string]: CartItems[];
}

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItems[]>([]); // Initialize as empty array
    const placeholderImage = 'https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?fit=1200%2C800&ssl=1';
    // Note: The single 'quantity' state here seems incorrect for managing individual item quantities.
    // Each item's quantity should likely be managed within the item data or via separate update functions.
    // For now, we'll focus on the grouping display.
    // const [quantity, setQuantity] = useState<number>(0);
    const [checkout, setCheckout] = useState<boolean>(false);

    const handleGetCartItems = async () => {
        try{
            const userId = Number(userService.getCurrentUserDetails()?.id);
            if (!userId) {
                console.error("User ID not found");
                setCartItems([]); // Clear items if no user
                return;
            }
            const response = await getCartItems(userId);

            const itemsWithProduct = await Promise.all(
                response.data.map(async (item: CartItems) => {
                    try {
                        const productResponse = await getProductById(item.ProductId);
                        // Assuming Product data includes StoreName after fetching
                        return { ...item, Product: productResponse.data };
                    }catch(error){
                        console.error(`Error fetching product for cart item ${item.CartItemId}:`, error);
                        // Add a placeholder product or handle differently if needed
                        return { ...item, Product: { StoreName: 'Unknown Store', Name: 'Product Error', ProductID: item.ProductId } as unknown as Product };
                    }
                })
            );
            setCartItems(itemsWithProduct);
        }catch(err){
            console.error('Error fetching cart items:', err);
            setCartItems([]); // Clear items on error
        }
    };

    // --- Grouping Logic using useMemo ---
    const groupedCartItems = useMemo(() => {
        if (!cartItems) return {}; // Handle case where cartItems might be null/undefined initially

        return cartItems.reduce((acc, item) => {
            // Use 'Unknown Store' as a fallback if StoreName is missing
            const storeName = item.Product?.StoreName || 'Unknown Store';

            // If the store name isn't a key in the accumulator yet, create it
            if (!acc[storeName]) {
                acc[storeName] = [];
            }

            // Push the current item into the array for that store
            acc[storeName].push(item);

            return acc; // Return the accumulator for the next iteration
        }, {} as GroupedCartItems); // Initialize with an empty object typed correctly

    }, [cartItems]); // Recalculate only when cartItems changes

    // --- Quantity Handlers (Need Adjustment for specific items) ---
    // These need to accept an item ID to update the correct item
    const handleIncreaseQuantity = (itemId: number | undefined) => {
        if (!itemId) return;
        console.log("Increase quantity for item:", itemId);
        // TODO: Implement logic to update the specific item's quantity in state/backend
        // Example:
        // setCartItems(prevItems => prevItems.map(item =>
        //   item.CartItemId === itemId ? { ...item, Quantity: item.Quantity + 1 } : item
        // ));
        // You'll likely need an API call here too.
    };

    const handleDecreaseQuantity = (itemId: number | undefined) => {
        if (!itemId) return;
        console.log("Decrease quantity for item:", itemId);
        // TODO: Implement logic to update the specific item's quantity (min 1)
        // Example:
        // setCartItems(prevItems => prevItems.map(item =>
        //   item.CartItemId === itemId ? { ...item, Quantity: Math.max(1, item.Quantity - 1) } : item
        // ));
        // You'll likely need an API call here too.
    };

    const handleCheckout = () => {
        setCheckout(!checkout)
    }

    useEffect(() => {
        handleGetCartItems();
    }, []); // Fetch on mount

  return (
    <div>

        { checkout === false ? (
            <div>
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
                </div>

                <div className="mb-0 pt-3">
                    <div className="justify-content-between d-flex">
                        <span className="fw-bold">Total: </span>
                        <span className="fw-bold">₱ 80.00</span>
                    </div>

                    <button className="btn btn-success w-100 mt-3" role="button" onClick={handleCheckout}>Proceed to checkout</button>
                </div>
            </div>
        ) : (
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
                <button className="btn btn-success w-100 mt-3" role="button">Complete Order</button>
                <button className="btn btn-secondary w-100 mt-3" role="button" onClick={handleCheckout}>Back</button>
            </div>

        )}
    </div>
  );
};

export default Cart;
