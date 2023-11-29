import React, { useState, useEffect } from "react";
import "../../css/EventCard.css";
import { AvatarImage } from "../commonElements";
import { fetchImageId, fetchAndSetImageBase64 } from "../../handlers/api";

const EventCard = ({
  width,
  height,
  attendees,
  fontSize,
  eventName,
  eventDate,
  eventTime,
  location,
  city,
  postalCode,
  description,
  category,
  image,
  user: { username, firstName, lastName },
  tags,
  backgroundImage,
}) => {
  const [imageBase64, setImageBase64] = useState(null);
  const [imageId, setImageId] = useState([0]);
  const userAttending = (attendees || []).includes(
    localStorage.getItem("username") || ""
  );

  const eventDateFormatted = eventDate
    ? new Date(eventDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  // HandlerMethods
  const handleSettingImageId = async () => {
    const imageId = await fetchImageId(username);
    setImageId(imageId);
  };

  const handleSettingImageBase64 = async () => {
    const base64String = await fetchAndSetImageBase64(imageId);
    setImageBase64(base64String);
  };

  // FUNCTIONS
  handleSettingImageBase64();

  // USEFFECT
  useEffect(() => {
    handleSettingImageId();
  }, [username]);

  return (
    <article
      className="event-card"
      style={{
        width: width + "px",
        height: height + "px",
        fontSize: fontSize + "px",
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,.1)), url(${
          backgroundImage ? backgroundImage : image
        })`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      {imageBase64 ? (
        <img
          className="event-avatar"
          src={`data:image/jpeg;base64,${imageBase64}`}
          width={100}
          height={100}
          alt="image_alt"
          style={{
            objectFit: "cover",
          }}
        />
      ) : (
        <img
          className="event-avatar"
          src={AvatarImage}
          width={100}
          height={100}
          alt="image_alt"
        />
      )}
      {/* {console.log("userDatasss: ", userData)} */}
      <p className="match-tag">Match</p>
      <div
        className="card-content"
        style={{
          fontSize: fontSize - 25 + "px",
          animation: `contentRightInAnim 0.9s ease-in-out`,
        }}
      >
        <h2 className="card-title">{eventName}</h2>
        <p className="attending-tag-event-card match-tag">
          Attending ({attendees ? attendees.length : ""})
        </p>
        <p>Host: {`${firstName} ${lastName}`}</p>
        <p
          className="category"
          style={{
            textTransform: "capitalize",
          }}
        >
          Category: {category}
        </p>
        <p>
          Date: {eventDateFormatted}
          {eventTime && ` | ${eventTime}`}
        </p>
        <p>
          Location: {`${location ? location + ", " : ""}${city} ${postalCode}`}
        </p>
        <p className="event-details">
          <span className="event-details-header">Event Details:</span> <br />{" "}
          <span className="event-details-text">{description}</span>
        </p>
        <div className="event-tags">
          {tags.map((tag, index) => (
            <p className="event-tag" key={index}>{`#${tag}`}</p>
          ))}
        </div>
        <div className="attend-block">
          {
            // Determine if the username is in the attendees array
            userAttending ? (
              <button
                className="attend-btn"
                style={{
                  backgroundColor: "red",
                }}
              >
                Attending
              </button>
            ) : (
              <button className="attend-btn">Attend</button>
            )
          }
          <div className="contact-details">
            <p>User: {`${firstName} ${lastName}`}</p>
            <p>Member Since: {2023}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
