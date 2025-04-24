import { useEffect, useState } from "react";
import { getCartItems, getProductById } from "../../services/api";
import { CartItems } from "../../interfaces/cart.interface";
import { userService } from "../../services/user.service";
import { Product } from "../../interfaces/product.interface";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItems[]>()
    const handleGetCartItems = async () => {
        try{
            const userId = Number(userService.getCurrentUserDetails()?.id)
            const response = await getCartItems(userId);
            setCartItems(response.data);

            const itemWithProduct = await Promise.all(
                response.data.map(async (item: CartItems) => {
                    try {
                        const productResponse = await getProductById(item.ProductId);
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
    useEffect(() => {
        handleGetCartItems();
    }, []);
  return (
    <div>
      {/* Cart content goes here */}
      <h1>Cart</h1>
        {cartItems && cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.CartItemId}>
              {item.Product?.Name} - Quantity: {item.Quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>

  );
};

export default Cart;
