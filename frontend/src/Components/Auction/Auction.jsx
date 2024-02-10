

// import React, { useState } from 'react';
// import AuctionAddPlant from '../AuctionAddPlant/AuctionAddPlant';
// import './Auction.css';

// const Auction = () => {
//   const [auction, setAuction] = useState({
//     date: '',
//     startTime: '',
//     endTime: '',
//     plants: [],
//   });

//   const handleDateChange = (e) => {
//     setAuction((prevAuction) => ({
//       ...prevAuction,
//       date: e.target.value,
//     }));
//   };
  

//   const handleTimeChange = (field, e) => {
//     // Convert time input to full date object
//     const fullDate = new Date(`${auction.date}T${e.target.value}`);
//     setAuction((prevAuction) => ({
//       ...prevAuction,
//       [field]: fullDate,
//     }));
//   };

//   const handleAddPlant = (newPlant) => {
//     setAuction((prevAuction) => ({
//       ...prevAuction,
//       plants: [...prevAuction.plants, newPlant],
//     }));
//   };

//   const handleStartAuction = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/auction/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(auction),
//       });

//       if (response.ok) {
//         console.log('Auction started successfully!');
//         alert('Auction started successfully!');
        
//         // Optionally handle any success scenario or user feedback
//       } else {
//         console.error('Failed to start auction. Server returned:', response.status, response.statusText);
//         // Optionally handle any error scenario or user feedback
//       }
//     } catch (error) {
//       console.error('Error occurred while starting auction:', error);
//       // Optionally handle any error scenario or user feedback
//     }
//   };

//   return (
//     <div className="auction-page">
//       <h1 className="auction-title">Auction Details</h1>
//       <label htmlFor="auctionDate" className="label">
//         Auction Date:
//       </label>
//       <input
//         type="date"
//         id="auctionDate"
//         name="auctionDate"
//         value={auction.date}
//         onChange={handleDateChange}
//         className="input"
//       />

//       <label htmlFor="startTime" className="label">
//         Start Time:
//       </label>
//       <input
//         type="time"
//         id="startTime"
//         name="startTime"
//         value={auction.startTime ? auction.startTime.toTimeString().slice(0, 5) : ''}
//         onChange={(e) => handleTimeChange('startTime', e)}
//         className="input"
//       />

//       <label htmlFor="endTime" className="label">
//         End Time:
//       </label>
//       <input
//         type="time"
//         id="endTime"
//         name="endTime"
//         value={auction.endTime ? auction.endTime.toTimeString().slice(0, 5) : ''}
//         onChange={(e) => handleTimeChange('endTime', e)}
//         className="input"
//       />

//       <button onClick={handleStartAuction} className="start-auction-button">
//         Create Auction
//       </button>

//       <h2 className="plants-title">Plants in Auction</h2>
//       <ul className="plants-list">
//         {auction.plants.map((plant, index) => (
//           <li key={index} className="plant-item">
//             {plant.name}
//           </li>
//         ))}
//       </ul>

//       <AuctionAddPlant onAddPlant={handleAddPlant} />
//     </div>
//   );
// };

// export default Auction;

import React, { useState } from 'react';
import AuctionAddPlant from '../AuctionAddPlant/AuctionAddPlant';
import './Auction.css';

const Auction = () => {
  const [auction, setAuction] = useState({
    date: '',
    startTime: '',
    endTime: '',
    plants: [],
  });

  const [showCreateAuctionButton, setShowCreateAuctionButton] = useState(true);
  const [showAuctionAddPlant, setShowAuctionAddPlant] = useState(false);
  const [auctionId, setAuctionId] = useState(null);

  const handleDateChange = (e) => {
    setAuction((prevAuction) => ({
      ...prevAuction,
      date: e.target.value,
    }));
  };

  const handleTimeChange = (field, e) => {
    // Convert time input to full date object
    const fullDate = new Date(`${auction.date}T${e.target.value}`);
    setAuction((prevAuction) => ({
      ...prevAuction,
      [field]: fullDate,
    }));
  };

  const handleNameChange = (e) => {
    setAuction((prevAuction) => ({
      ...prevAuction,
      name: e.target.value,
    }));
  };

  const handleAddPlant = (newPlant) => {
    setAuction((prevAuction) => ({
      ...prevAuction,
      plants: [...prevAuction.plants, newPlant],
    }));
  };

  const handleStartAuction = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auction/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(auction),
      });
      

      if (response.ok) {
        // Assuming the backend returns auctionId in the response body
        // const responseBody = await response.json();
        // const auctionId = response.data.id;
        const data = await response.json();
        const auctionId = data.id;

        console.log('Auction started successfully!');
        alert('Auction started successfully!');
        
        // Set the state to hide "Create Auction" button and show AuctionAddPlant
        setShowCreateAuctionButton(false);
        setShowAuctionAddPlant(true);

        // Pass auctionId to AuctionAddPlant component
        // This assumes you have a function to set auctionId in AuctionAddPlant component
        // For example, a function like setAuctionId(auctionId)
        setAuctionId(auctionId);
      } else {
        console.error('Failed to start auction. Server returned:', response.status, response.statusText);
        // Optionally handle any error scenario or user feedback
      }
    } catch (error) {
      console.error('Error occurred while starting auction:', error);
      // Optionally handle any error scenario or user feedback
    }
  };

  return (
    <div className="auction-page">
      <h1 className="auction-title">Auction Details</h1>
      <label htmlFor='auctionName' className="label">
        Auction Name:
      </label>
      <input
        type="text"
        id="auctionName"
        name="auctionName"
        value={auction.name}
        onChange={handleNameChange}
        className="input"
      />
      <label htmlFor="auctionDate" className="label">
        Auction Date:
      </label>
      <input
        type="date"
        id="auctionDate"
        name="auctionDate"
        value={auction.date}
        onChange={handleDateChange}
        className="input"
      />

      <label htmlFor="startTime" className="label">
        Start Time:
      </label>
      <input
        type="time"
        id="startTime"
        name="startTime"
        value={auction.startTime ? auction.startTime.toTimeString().slice(0, 5) : ''}
        onChange={(e) => handleTimeChange('startTime', e)}
        className="input"
      />

      <label htmlFor="endTime" className="label">
        End Time:
      </label>
      <input
        type="time"
        id="endTime"
        name="endTime"
        value={auction.endTime ? auction.endTime.toTimeString().slice(0, 5) : ''}
        onChange={(e) => handleTimeChange('endTime', e)}
        className="input"
      />

      {showCreateAuctionButton && (
        <button onClick={handleStartAuction} className="start-auction-button">
          Create Auction
        </button>
      )}

      {showAuctionAddPlant && (
        <>
          <h2 className="plants-title">Plants in Auction</h2>
          <ul className="plants-list">
            {auction.plants.map((plant, index) => (
              <li key={index} className="plant-item">
                {plant.name}
              </li>
            ))}
          </ul>

          <AuctionAddPlant auctionId={auctionId}  />
        </>
      )}
    </div>
  );
};

export default Auction;


