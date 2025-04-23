import { Common } from "./common.interface";

export interface Store extends Common{
    StoreId: number,
    Name: string, 
    Description: string,
    Location: string
}