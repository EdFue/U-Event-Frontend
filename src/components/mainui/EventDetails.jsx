import React, { useEffect, useState } from "react";
import { Link, Params } from "react-router-dom";
import "../../css/EventDetails.css";
import { AvatarImage } from "../commonElements";

// Use the useLocation hook to get the event object passed from the EventCard component
import { useLocation } from "react-router-dom";

// TODO-Complete: Separate EventPrompt component
const EventPrompt = ({ eventName, userName }) => {
  return (
    <div>
      <p className="event-prompt-header-1">
        Current Viewing: <span className="event-name-bold">{eventName}</span> by
        Event <span className="event-name-bold">{userName}</span>
      </p>
    </div>
  );
};

// TODO-Complete: Reusable Date Component
const DateComponent = ({ eventDate }) => {
  const date = `${new Date(eventDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}\n${new Date(eventDate).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })}`;
  return <p>Meeting Time:{date}</p>;
};

// TODO-Complete: Tag Component
const TagComponent = ({ tags }) => {
  // Fragment used to avoid unnecessary divs in the DOM
  return (
    <>
      {tags.map((tag, index) => {
        return (
          <p className="event-tag-content" key={index}>
            {`#${tag}`}
          </p>
        );
      })}
    </>
  );
};

// TODO-Complete: Main EventDetails component + subcomponents
const EventDetails = () => {
  // REQUESTS
  // get username from local storage and use it to get user details from backend
  const [imageBase64, setImageBase64] = useState(null);
  const [imageId, setImageId] = useState([0]);

  // fetch the images associated with the current username
  const [userData, setUserData] = useState([]);

  // Get the join status of the event
  const [joinStatus, setJoinStatus] = useState(false);

  // const handleEventJoinStatus = () => {
  //   if (joinStatus) {
  //     setJoinStatus(false);
  //     console.log("Join Status: ", joinStatus);
  //   } else {
  //     setJoinStatus(true);
  //     console.log("Join Status: ", joinStatus);
  //   }
  // };

  // Fetch

  useEffect(() => {
    // fetch data from the backend
    fetch(`https://u-event-backend-d86136b87ee9.herokuapp.com/images/image/${username}`)
      .then((res) => res.json())
      .then((userData) => {
        // set the state of the user data
        setUserData(userData);
        setImageId(userData); // this is the image ID for the user profile picture
      })
      .catch((error) => {
        setImageBase64(null); // set image to null if there is an error
      });
  }, []);

  // DISPLAY THE IMAGE passing the first ID -----
  useEffect(() => {
    setTimeout(() => {
      fetch(`https://u-event-backend-d86136b87ee9.herokuapp.com/images/${imageId}`)
        .then((res) => res.json())
        .then((data) => {
          // Extract the base64 image data from the JSON response
          const base64String = data.image;
          setImageBase64(base64String);

          // console.log("Image Base64: ", base64String);
        })
        .catch((error) => {
          setImageBase64(null); // set image to null if there is an error
        });
    }, 100);
  }, [imageId]);
  // REQUESTS
  // The useLocation hook returns the event object passed from the EventCard component from the EventCard component
  const loc = useLocation();
  const { event } = loc.state || {}; // Destructure the event object from the location object

  // Fetch the event details from the event object and check if the user is attending the event from local storage
  useEffect(() => {
    const { attendees } = event;
    const user = localStorage.getItem("username");
    if (attendees.includes(user)) {
      setJoinStatus(true);
    }
  }, []);

  // Allows users to join the event
  const handleJoinEvent = (e) => {
    const loggedInUser = localStorage.getItem("username");
    e.preventDefault();
    // https://u-event-backend-d86136b87ee9.herokuapp.com/api/users/50cent@email.com/events/13

    if (joinStatus) {
      // Unjoin Event (DELETE REQUEST)
      // https://u-event-backend-d86136b87ee9.herokuapp.com/api/users/50cent@email.com/events/13/unjoin
      fetch(
        `https://u-event-backend-d86136b87ee9.herokuapp.com/api/users/${loggedInUser}/events/${eventId}/unjoin`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId,
            attendees: [loggedInUser],
          }),
        }
      )
        .then((data) => {
          setJoinStatus(false);
          console.log("Unjoin Event: ", data);
          console.log("Join Status: ", joinStatus);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    } else {
      // Join Event
      fetch(
        `https://u-event-backend-d86136b87ee9.herokuapp.com/api/users/${loggedInUser}/events/${eventId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId,
            attendees: [loggedInUser],
          }),
        }
      )
        .then((data) => {
          setJoinStatus(true);
          console.log("Join Event: ", data);
          console.log("Join Status: ", joinStatus);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  };

  const {
    eventId,
    attendees,
    eventName,
    user: { username, firstName, lastName },
    eventDate,
    location,
    description,
    image,
    tags,
  } = event;

  const userName_s = `${firstName} ${lastName}`;

  return (
    <section className="event-detail">
      <div className="event-card-container">
        {/* EVENT CARD */}
        <article
          className="event-card-content"
          style={{
            backgroundImage: `linear-gradient(
              rgba(0,0,0,1), 
              rgba(0,0,0,.6), 
              rgba(0,0,0,1)), 
              url(${image})`,
          }}
        >
          <Link to="/" className="btn back-btn">
            {"\u2190 Event Board"}
          </Link>
          <div className="tag-section">
            <p className="event-details-match-tag">Tags</p>
            <div className="event-tag-container">
              {/* Tag Component */}
              <TagComponent tags={tags} />
              {/* End of Tag Component */}
            </div>
          </div>
          {
            // Check the image
            imageBase64 ? (
              <img
                className="event-details-avatar"
                src={`data:image/jpeg;base64,${imageBase64}`}
                width={100}
                height={100}
                alt="image_alt"
              />
            ) : (
              <img
                className="event-details-avatar"
                src={AvatarImage}
                width={100}
                height={100}
                alt="image_alt"
              />
            )
          }
          <p className="attending-tag match-tag">
            Attending ({attendees.length})
          </p>
          <div className="card-content">
            <h2 className="card-title">{eventName}</h2>
            <p>Host: {userName_s}</p>
            {/* Date Component */}
            <DateComponent eventDate={eventDate} />
            {/* End of Date Component */}
            <p>Location: {location}</p>
            <div className="contact-block">
              <p className="event-details">
                <span className="event-details-header">Event Details:</span>{" "}
                <br /> <span className="event-details-text">{description}</span>
              </p>
              <button className="contact-btn">Match</button>
              <div className="contact-details">
                <p>User: {userName_s}</p>
                <p>Memeber Since: {2023}</p>
              </div>
            </div>
            {/* Use the reusable Button component */}
            <div className="btn-container">
              <button
                className={
                  joinStatus
                    ? "join-status-btn btn joined"
                    : "join-status-btn btn"
                }
                onClick={(e) => {
                  // handleEventJoinStatus();
                  handleJoinEvent(e);
                }}
              >
                {joinStatus ? "Joined" : "Join"}
              </button>
            </div>
          </div>
        </article>
        {/* End of EVENT CARD */}
      </div>
      {/* EventPrompt component */}
      <EventPrompt eventName={eventName} userName={userName_s} />
      {/* End of EventPrompt component */}
    </section>
  );
};

export default EventDetails;
