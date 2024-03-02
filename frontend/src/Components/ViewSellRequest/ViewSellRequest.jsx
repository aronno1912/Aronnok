


// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import './ViewSellRequest.css';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import ReviewAdd from '../AdminNewProductAdd/ReviewAdd';
// import ReviewAddProductPage from '../../Pages/ReviewAddProductPage';

// const ViewSellRequest = ({ productName, askingPrice, userWhoBid, productPhoto, description, reqId }) => {
//   const [isFormVisible, setFormVisible] = useState(false);

//   const handleAccept = async () => {
//     setFormVisible(true);
//     console.log(reqId);
//     //await axios.post(`http://localhost:8000/api/requestApproval/${reqId}`);
//     console.log("Accepted");
//   };

//   return (
//     <div className="fpast-auction-product-card">
//       <div className="fproduct-image">
//         <img src={productPhoto} alt={productName} />
//       </div>
//       <div className="fproduct-details">
//         <h3>{productName}</h3>
//         <p>{description}</p>
//         <p>
//           <strong>Asking Price:</strong> ${askingPrice}
//         </p>
//         <p>
//           <strong> User : </strong>
//           {userWhoBid}
//         </p>
//       </div>
//       <Link to={`/admin/viewsellrequests/review`} pname={productName} pdescription={description} pprice={askingPrice} pphoto={productPhoto} >
//       <button className="fadd-to-auction-button" onClick={handleAccept}>
//         Accept
//       </button>
//         </Link>
//       {/* {isFormVisible && (
//         <div className="revpopup-overlay">
//           <div className="revpopup-container">
            
//             <ReviewAddProductPage pname={productName} pdescription={description} pprice={askingPrice} pphoto={productPhoto} />
//           </div>
//         </div>
//       )} */}
//     </div>
//   );
// };

// ViewSellRequest.propTypes = {
//   productName: PropTypes.string.isRequired,
//   askingPrice: PropTypes.number.isRequired,
//   userWhoBid: PropTypes.string.isRequired,
//   productPhoto: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   reqId: PropTypes.string.isRequired,
// };

// export default ViewSellRequest;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ViewSellRequest.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReviewAdd from '../AdminNewProductAdd/ReviewAdd';
import ReviewAddProductPage from '../../Pages/ReviewAddProductPage';

const ViewSellRequest = ({ productName, askingPrice, userWhoBid, productPhoto, description, reqId,userId, lifespan }) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const navigate = useNavigate();

  const handleAccept = async () => {
    setFormVisible(true);
    console.log(reqId);
    const requestData = {
      pname: productName,
      pdescription: description,
      pprice: askingPrice,
      pphoto: productPhoto,
      
    };
     const response=await axios.post(`http://localhost:8000/api/sellRequest/${reqId}/payment`,requestData);
    console.log("Accepted");
    window.location.href=response.data.url
    // Navigate to ReviewAddProductPage with parameters
    // navigate(`/admin/viewsellrequests/review`, {
    //   state: {
    //     pname: productName,
    //     pdescription: description,
    //     pprice: askingPrice,
    //     pphoto: productPhoto,
    //   },
    // });
  };

  return (
    <div className="fpast-auction-product-card">
      <div className="fproduct-image">
        <img src={productPhoto} alt={productName} />
      </div>
      <div className="fproduct-details">
        <h3>{productName}</h3>
        <p>{description}</p>
        <p>
          <strong>Asking Price:</strong> ${askingPrice}
        </p>
        <p>
          <strong> User : </strong>
          {userWhoBid}
        </p>
      </div>
      <button className="fadd-to-auction-button" onClick={handleAccept}>
        Accept
      </button>
    </div>
  );
};

ViewSellRequest.propTypes = {
  productName: PropTypes.string.isRequired,
  askingPrice: PropTypes.number.isRequired,
  userWhoBid: PropTypes.string.isRequired,
  productPhoto: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  reqId: PropTypes.string.isRequired,
};

export default ViewSellRequest;
