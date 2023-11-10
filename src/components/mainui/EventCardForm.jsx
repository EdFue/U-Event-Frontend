import React, { useState, useEffect } from "react";
import { AvatarImage } from "../commonElements";

const EventCardForm = ({
  isEdit,
  onSubmit,
  onChange,
  editing,
  width,
  height,
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
  user: { firstName, lastName },
  tags,
  backgroundImage,
}) => {
  const [formData, setFormData] = useState({
    width,
    height,
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
    firstName,
    lastName,
    tags,
    backgroundImage,
  });

  useEffect(() => {
    if (editing) {
      setFormData({
        width,
        height,
        fontSize,
        eventName,
        eventDate,
        eventTime: eventTime ? eventTime.substring(0, 5) : "",
        location,
        city,
        postalCode,
        description,
        category,
        image,
        firstName,
        lastName,
        tags,
        backgroundImage,
      });
    }
  }, [
    editing,
    width,
    height,
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
    firstName,
    lastName,
    tags,
    backgroundImage,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (onChange) {
      onChange(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      const submitData = {
        ...formData,
        eventTime: formData.eventTime ? `${formData.eventTime}:00` : "",
      };
      onSubmit(submitData);
    } else {
      console.error("onSubmit is not a function");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="manage-event-card-form">
      <article
        className="manage-event-card"
        style={{
          width: formData.width + "px",
          height: formData.height + "px",
          fontSize: formData.fontSize + "px",
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,.1)), url(${
            formData.backgroundImage ? formData.backgroundImage : formData.image
          })`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <img
          src={AvatarImage}
          alt="avatarImage"
          className="manage-event-avatar"
        />
        <p className="manage-match-tag">Match</p>
        <div
          className="manage-card-content"
          style={{
            fontSize: formData.fontSize - 25 + "px",
            animation: `contentRightInAnim 0.9s ease-in-out`,
            color: `${isEdit ? "#000" : "#fff"}`,
          }}
        >
          <label>
            Event Name:
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              className="manage-card-title manage-input"
              style={{
                background: `${isEdit ? "#fff" : "transparent"}`,
                color: `${isEdit ? "#000" : "#fff"}`,
              }}
              readOnly={isEdit ? false : true}
            />
          </label>
          <label>
            Host First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="manage-card-firstname manage-input"
              style={{
                background: `${isEdit ? "#fff" : "transparent"}`,
                color: `${isEdit ? "#000" : "#fff"}`,
              }}
              readOnly={isEdit ? false : true}
            />
          </label>
          <label>
            Host Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="manage-card-lastname manage-input"
              style={{
                background: `${isEdit ? "#fff" : "transparent"}`,
                color: `${isEdit ? "#000" : "#fff"}`,
              }}
              readOnly={isEdit ? false : true}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="manage-card-category manage-input"
              style={{
                background: `${isEdit ? "#fff" : "transparent"}`,
                color: `${isEdit ? "#000" : "#fff"}`,
              }}
              readOnly={isEdit ? false : true}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="manage-card-date manage-input"
              style={{
                background: `${isEdit ? "#fff" : "transparent"}`,
                color: `${isEdit ? "#000" : "#fff"}`,
              }}
              readOnly={isEdit ? false : true}
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              name="eventTime"
              value={formData.eventTime}
              onChange={handleChange}
              className="manage-card-event-time manage-input"
              style={{
                background: `${isEdit ? "#fff" : "transparent"}`,
                color: `${isEdit ? "#000" : "#fff"}`,
              }}
              readOnly={isEdit ? false : true}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="manage-card-location manage-input"
              style={{
                background: `${isEdit ? "#fff" : "transparent"}`,
                color: `${isEdit ? "#000" : "#fff"}`,
              }}
              readOnly={isEdit ? false : true}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="manage-card-city manage-input"
              style={{
                background: `${isEdit ? "#fff" : "transparent"}`,
                color: `${isEdit ? "#000" : "#fff"}`,
              }}
              readOnly={isEdit ? false : true}
            />
          </label>
          <label>
            Postal Code:
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="manage-card-postalcode manage-input"
              style={{
                background: `${isEdit ? "#fff" : "transparent"}`,
                color: `${isEdit ? "#000" : "#fff"}`,
              }}
              readOnly={isEdit ? false : true}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="manage-event-details-text manage-input"
              style={{
                background: `${isEdit ? "#fff" : "transparent"}`,
              }}
              readOnly={isEdit ? false : true}
            />
          </label>
          <button type="submit">Update Event</button>
        </div>
      </article>
    </form>
  );
};

export default EventCardForm;
