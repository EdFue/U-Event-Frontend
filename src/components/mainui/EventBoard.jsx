import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import "../../css/EventBoard.css";
import "../../css/EventCard.css";
import rectImageOne from "../../assets/right-rect-1.svg";
import feedIcon from "../../assets/feed-icon.svg";

import {
  handleFilterChange,
  handleSearchChange,
  filterData,
} from "../../handlers/handler";
import { fetchEvents } from "../../handlers/api"; // Import fetchEvents from api.js

const EventBoard = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [backBtn, setBackBtn] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // New state for search input

  // Move Handlers to Handler.js -----------------------------
  // const handleFilterChange = (e) => {
  //   const filter = e.target.value;
  //   setFilter(filter);
  // };

  // const handleSearchChange = (e) => {
  //   const searchValue = e.target.value.toLowerCase();
  //   setSearchInput(searchValue); // Set the search input state

  //   const updatedFilteredData = data.filter((event) => {
  //     return event.eventName.toLowerCase().includes(searchValue);
  //   });

  //   setFilteredData(updatedFilteredData);
  // };
  // Move Handlers to Handler.js -----------------------------

  // Fetch events from the backend
  // useEffect(() => {
  //   fetch("https://u-event-backend-d86136b87ee9.herokuapp.com/api/events")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //     });
  // }, []);

  useEffect(() => {
    fetchEvents().then((data) => {
      setData(data);
    });
  }, []);

  useEffect(() => {
    setFilteredData(filterData(filter, data));
  }, [filter, data]);

  const filterData = (filter) => {
    return data.filter((event) => event.category === filter);
  };

  // Move Handlers to Handler.js -----------------------------
  
  if (!localStorage.getItem("token") && !localStorage.getItem("username")) { 
    localStorage.clear(); 
    window.location.href = "/login";
  } 

  return (
    <section className="event-board" data-testid="event-board">
      <p className="welcome-text">{`Welcome back ${
        localStorage.getItem("firstName")
          ? localStorage.getItem("firstName")
          : "User"
      }!`}</p>
      <img src={rectImageOne} className="bg-rec-image" alt="rectimage" />
      <img src={feedIcon} className="feed-icon" alt="feedicon" />
      <div className="event-board-top">
        <div className="event-board-header">
          <div className="event-board-filter">
            <h1 className="event-board-title">Event Board</h1>
            <p className="filter-text">Filter By</p>
            <select
              className="event-board-filter"
              onChange={(e) => handleFilterChange(e, setFilter)}
            >
              <option value="all">All</option>
              <option value="concert">Concert</option>
              <option value="sports">Sports</option>
              <option value="food">Food</option>
              <option value="outdoors">Outdoors</option>
              <option value="games">Games</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="search-container">
            <input
              className="search-bar"
              type="text"
              placeholder="Search for an event..."
              onChange={(e) =>
                handleSearchChange(e, data, setSearchInput, setFilteredData)
              }
            />
          </div>
        </div>
      </div>

      <div className="event-board-top">
        <div className="event-board-events">
          {searchInput.length > 0 || filter !== "all"
            ? filteredData.map((event) => (
                <Link
                  to="/event-details"
                  state={{ event }}
                  key={event.eventId}
                  className="event-board-event"
                >
                  <div className="zoom-effect">
                    <EventCard {...event} height={600} />
                  </div>
                </Link>
              ))
            : data.map((event) => (
                <Link
                  to="/event-details"
                  state={{ event }}
                  key={event.eventId}
                  className="event-board-event"
                >
                  <div className="zoom-effect">
                    <EventCard {...event} height={600} />
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
};

export default EventBoard;
