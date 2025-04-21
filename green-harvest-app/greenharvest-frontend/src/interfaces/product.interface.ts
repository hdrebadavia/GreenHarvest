import { Common } from "./common.interface";

export interface Product extends Common{
    ProductID: number;
    Name: string;
    Description: string;
    Price: number;
    imageUrl: string;
    ProductType: string;
    Quantity: number;
    Unit: string;
    StoreID: number;
    StoreName? : string;
  }
  