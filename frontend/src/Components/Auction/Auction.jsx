

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
import AdminNewProductAdd from '../AdminNewProductAdd/AdminNewProductAdd';
import AuctionAddPlant from '../AuctionAddPlant/AuctionAddPlant';
import './Auction.css';

const Auction = () => {
  const [auction, setAuction] = useState({
    date: '',
    startTime: '',
    endTime: '',
    plants: [],
  });

  const [showAddPlantsForm, setShowAddPlantsForm] = useState(false);

  const handleDateChange = (e) => {
    setAuction((prevAuction) => ({
      ...prevAuction,
      date: e.target.value,
    }));
  };

  const handleTimeChange = (field, e) => {
    const fullDate = new Date(`${auction.date}T${e.target.value}`);
    setAuction((prevAuction) => ({
      ...prevAuction,
      [field]: fullDate,
    }));
  };

  const handleAddPlant = (newPlant) => {
    setAuction((prevAuction) => ({
      ...prevAuction,
      plants: [...prevAuction.plants, newPlant],
    }));
  };

  const handleStartAuction = () => {
    setShowAddPlantsForm(true);
  };

  return (
    <div className="auction-page">
      <h1 className="auction-title">Auction Details</h1>
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

      {showAddPlantsForm ? (
        <>
          <AuctionAddPlant onAddPlant={handleAddPlant} />
          <button className="start-auction-button" disabled>
            Create Auction
          </button>
        </>
      ) : (
        <button onClick={handleStartAuction} className="start-auction-button">
          Create Auction
        </button>
      )}

      <h2 className="plants-title">Plants in Auction</h2>
      <ul className="plants-list">
        {auction.plants.map((plant, index) => (
          <li key={index} className="plant-item">
            {plant.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Auction;

