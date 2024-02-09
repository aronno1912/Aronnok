import React from 'react'

const AuctionWinitem = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/product/659c027001b07da1b7fef185/${prod.id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
              console.error('Error fetching product data:', error);
            }
          };
    
         fetchProduct();
      }, []);

      const pay = async () => {
          try {
            console.log(userId);
            await axios.post(`http://localhost:8000/api/auction/${auctionId}/${productId}/payment`, {"bidAmount":Number(inputValue) , "bidder": userId});
            setState(2);
          } catch (error) {
            console.error('Error bidding', error);
          }
      };

  return (
    <div>
    <div className="order-item-container">
        <div className="order-item-left">
            <img src={prod.photo} alt="" />
            <div className="orderitem-name-quantity">
                <p style={{fontSize:'17px', color:'rgb(2, 75, 33)'}}>{prod.name}</p>
            </div>
        </div>
        <div className="order-item-middle">
            <p><b>${prod.price}</b></p>
        </div>
        <div className="order-item-right">
            <button onClick={pay}>pay for item</button>
        </div>
    
   </div>
    </div>
  )
}

export default AuctionWinitem
