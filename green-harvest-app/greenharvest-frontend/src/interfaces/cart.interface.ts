import { Common } from "./common.interface";
import { Product } from "./product.interface";

export interface CartItems extends Common{
    CartItemId?: number,
    ProductId: number,
    Quantity: number,
    Status?: string,
    Product?: Product
}
