import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getStores } from "../../services/api";

interface Store {
    StoreId: number;
    Name: string;
    Description: string;
    Location: string;
    CreatedBy: number;
}
const StoresPage = () => {
    const [stores, setStores] = useState<Store[]>([]);
    useEffect(() => {
        getStores()
        .then((response) => {
            setStores(response.data);
            console.log('Stores fetched successfully:', response.data);

            console.log(response);
        })
    }, []);

  return (
   <Box>
    
   </Box>
  );
};

export default StoresPage;
