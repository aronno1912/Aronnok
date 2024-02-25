// import React from 'react';
// import './RatingPopUp.css'; // Create a CSS file for styling the popup

// const RatingPopUp = ({ productName, closePopup }) => {
//   const handleRatingSubmit = () => {
//     // Handle rating submission logic here
//     // You can make API calls or perform other actions
//     // Close the popup when done
//     closePopup();
//   };

//   return (
//     <div className="rating-popup">
//       <div className="rating-popup-content">
//         <h2>Give Rating for {productName}</h2>
//         {/* Add rating input, submit button, etc. */}
//         <button onClick={handleRatingSubmit}>Submit Rating</button>
//         <button onClick={closePopup}>Cancel</button>
//       </div>
//     </div>
//   );
// };

// export default RatingPopUp;


// RatingPopUp.jsx

import React, { useState } from 'react';
import './RatingPopUp.css';

const RatingPopUp = ({ productName, closePopup }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handleRatingSubmit = () => {
    // Handle rating submission logic here
    // You can make API calls or perform other actions
    // Close the popup when done
    console.log(`Rating submitted for ${productName}: ${selectedRating}`);
    closePopup();
  };

  return (
    <div className="rating-popup">
      <div className="rating-popup-content">
        <h2>How was Your Experience with this Plant? </h2>
        <div className="rating-radio-group">
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating} className="rating-radio-label">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={selectedRating === rating}
                onChange={() => handleRatingChange(rating)}
              />
              {rating}
            </label>
          ))}
        </div>
        <button onClick={handleRatingSubmit}>Submit Rating</button>
        <button onClick={closePopup}>Cancel</button>
      </div>
    </div>
  );
};

export default RatingPopUp;

