import axios from 'axios';
import './SearchDropDown.css'
import React, { useState } from 'react'
import SearchItem from '../SearchItem/SearchItem';

const SearchDropDown = (prod) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:8000/api/user/${prod.userId}`);
    //             const data = await response.json();
    //             setUser(data);
    //         } catch (error) {
    //           console.error('Error fetching product data:', error);
    //         }
    //       };

    //       fetchUser();
    //     //   const intervalId = setInterval(() => {
    
    //     //   }, 5000);
      
    //     //   return () => clearInterval(intervalId);
       
    //   }, []);

    const handleChange =  async(event) => {
        const value  = event.target.value;
        console.log(value);
        setQuery(value);
    
        try {
          const response = await axios.post(`http://localhost:8000/api/search`, { "query": value });
          setSuggestions(response.data);
          //console.log(suggestions)
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      };

  return (
    <div className="search-container">
      <div className="search-without-btn">
        <input type="text" style={{width:'250px'}} className='search-textbox' placeholder="Search" value={query} onChange={handleChange} required/>

          {suggestions.length > 0 && (
              <div className="searchallitems">
                  {suggestions.map((item,i)=>{
                      return <SearchItem id={item._id} name={item.name} photo={item.photo} userId={prod.userId}/>
                  })}
              </div>

          )}
      </div>

        <button className="usersearchbutton" style={{backgroundColor:'transparent', width:'10px'}}><i class="bi bi-search" style={{color:'black'}}></i></button>
    </div>
  )
}

export default SearchDropDown
