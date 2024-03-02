

import React, { useState } from 'react';
import './RatingPopUp.css';

const RatingPopUp = ({ productId, closePopup }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handleRatingSubmit = async() => {
    // Handle rating submission logic here
    // You can make API calls or perform other actions
    // Close the popup when done
    //firsly get the old rating,ratedBy numbers of that product by get api
    //then add the new rating to the old rating and then divide it by ratedBy+1
   
    try {
      // 1. Fetch old rating and ratedBy numbers
      const response = await fetch(`http://localhost:8000/api/anyproduct/getrating/${productId}`);
      const oldRatingData = await response.json();
      const oldRating = oldRatingData.rating || 4;
      const ratedBy = oldRatingData.ratedBy || 1;
  
      // 2. Calculate new rating
      // const newRating = ((oldRating * ratedBy) + selectedRating) / (ratedBy + 1);
      const newRating = Math.round(((oldRating * ratedBy) + selectedRating) / (ratedBy + 1));

  
      // 3. Make a PUT or POST request to update the product's rating
      const updateResponse = await fetch(`http://localhost:8000/api/anyproduct/giverating/${productId}`, {
        method: 'POST', // or 'POST' depending on your API
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          rating: newRating,
          ratedBy: ratedBy + 1,
        })
      });
  
      if (updateResponse.ok) {
        console.log(`Rating submitted for ${productId}: ${selectedRating}`);
      } else {
        console.error('Error updating rating:', updateResponse.statusText);
      }
    } catch (error) {
      console.error('Error handling rating submission:', error);
    }
  
    // Close the popup when done
    //closePopup();

    console.log(`Rating submitted for ${productId}: ${selectedRating}`);
    closePopup();
  };

  const  rateit= (rating) => {
    setSelectedRating(rating);
  };

  const ratingColor = {
    color:"gold",
   };

  return (
    <div className="rating-popup">
      <div className="rating-popup-content">
        <h2>How was Your Experience with this Plant? </h2>
        <div className="rating-radio-group">
          {[1, 2, 3, 4, 5].map((rating) => (
            // <label key={rating} className="rating-radio-label">
            //   <input
            //     type="radio"
            //     name="rating"
            //     value={rating}
            //     checked={selectedRating === rating}
            //     onChange={() => handleRatingChange(rating)}
            //   />
            //   {rating}
            // </label>
            <button key={rating} 
            className={rating <= selectedRating ? 'star-selected' : ''} 
            style={{background:"transparent"}} 
            onClick={() => rateit(rating)}>
              <i class="bi bi-star-fill" style={{ color: rating <= selectedRating ? 'gold' : 'white' }}></i>
              </button>
          ))}
        </div>
        <button onClick={handleRatingSubmit}>Submit Rating</button>
        <button onClick={closePopup}>Cancel</button>
      </div>
    </div>
  );
};

export default RatingPopUp;

