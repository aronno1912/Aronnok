import React, { createContext, useEffect, useMemo, useState } from 'react'
// import all_plants from "../Components/Assets/all_products"
export const ProjectContext= createContext(null);

const ProjectContextProvider = (props) => {

    const [totalQuantity, setQuantity] = useState(0);

    const updateTotalQuantity=(items)=>{
        let total=0;
        items.map((item)=>{
            total+=item.quantity;
          });
        setQuantity(total);
    }
    const fetchAllItems = async ()=>{
        let data={};
        try {
            const response = await fetch('http://localhost:8000/api/cart/viewCart/659c027001b07da1b7fef185');
            data = await response.json();
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
          return data.items;
    }
    const contextValue={totalQuantity,updateTotalQuantity,fetchAllItems};

    
    return (
      <ProjectContext.Provider value={contextValue}>
          {props.children}
      </ProjectContext.Provider>
    )
}

export default ProjectContextProvider