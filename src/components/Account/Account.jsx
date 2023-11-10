import React, { useState, useEffect } from "react";
import { useRef } from "react";

// Import the fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import loginimage from "../../assets/ugur-arpaci-U18V0ToioFU-unsplash.jpg";
import { useNavigate } from "react-router-dom";

const Account = () => {
  // Initial profile picture URL
  const [profilePicture, setProfilePicture] = useState(
    "https://via.placeholder.com/150"
  ); //placeholder image
  // Handle the file input

  const fileInputRef = useRef(null);

  const openFileInput = () => {
    fileInputRef.current.click();
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear user session or perform any other logout logic here
    localStorage.clear(); // Example: Clearing local storage

    // Redirect user to the login page or any other page
    navigate("/login"); // Update the path as per your routing setup
  };

  // get username from local storage and use it to get user details from backend
  const [imageBase64, setImageBase64] = useState(null);
  const username = localStorage.getItem("username");
  const [imageId, setImageId] = useState([0]);

  // fetch the images associated with the current username
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // fetch data from the backend
    let isMounted = true;
    fetch(`https://u-event-backend-d86136b87ee9.herokuapp.com/images/image/${username}`)
      .then((res) => res.json())
      .then((userData) => {
        if (isMounted) {
          setUserData(userData);
          setImageId(userData);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error("Error fetching image:", error);
          setImageBase64(null); // set image to null if there is an error
        }
      });
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  // DISPLAY THE IMAGE passing the first ID -----
  setTimeout(() => {
    fetch(`https://u-event-backend-d86136b87ee9.herokuapp.com/images/${imageId[0]}`)
      .then((res) => res.json())
      .then((data) => {
        // Extract the base64 image data from the JSON response
        const base64String = data.image;
        setImageBase64(base64String);

        // console.log("Image Base64: ", base64String);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        setImageBase64(null); // set image to null if there is an error
      });
  }, 100);

  // DISPLAY THE IMAGE -----

  useEffect(() => {
    setTimeout(() => {
      // fetch data from the backend
      fetch(`https://u-event-backend-d86136b87ee9.herokuapp.com/api/users/${username}`)
        .then((res) => res.json())
        .then((userData) => {
          setUserData(userData);
          localStorage.setItem("firstName", userData.firstName);
        });
    }, 500);
  }, []);

  // -------
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      fetch(`https://u-event-backend-d86136b87ee9.herokuapp.com/images/uploadImage/${username}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            // Image uploaded successfully, you can handle the success here
            setProfilePicture(URL.createObjectURL(file));
          } else {
            // Handle the error here
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };
  // --------------------------------------------------

  const {
    firstName,
    lastName,
    jobDescription,
    nickname,
    phoneNumber,
    address,
    postalCode,
    password,
  } = userData;

  const handleChangeField = (e) => {
    const { name, value } = e.target;
    // Assuming you are using React's useState hooks
    // Update the state for the respective input field
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //handle the submit button on the details card
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a FormData object
    const formData = new FormData();

    // Create an object of the form fields
    const createForm = {
      firstName: firstName,
      lastName: lastName,
      jobDescription: jobDescription,
      nickname: nickname,
      username: username,
      phoneNumber: phoneNumber,
      address: address,
      postalCode: postalCode,
      password: password,
      confirmPassword: password,
    };

    // Update the formData object
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("jobDescription", jobDescription);
    formData.append("nickname", nickname);
    formData.append("username", username);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);
    formData.append("postalCode", postalCode);
    formData.append("password", password);

    console.log(formData);

    // Make a POST request to your backend endpoint
    fetch(
      `https://u-event-backend-d86136b87ee9.herokuapp.com/api/users/${localStorage.getItem("username")}`,
      {
        method: "PUT",
        body: JSON.stringify(createForm),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          // The request was successful, you can handle the response here
          console.log("User Details updated successfully");
          alert("Account Created");
          // Reset the form or navigate to a different page
        } else {
          // The request failed, handle the error here
          console.error("Failed to update user details");
          alert("User Details Not Updated 😭");
          // Display an error message or handle the error as needed
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle any network errors here
      });
    console.log("Updated user details:" + userData);
  };

  // Handle the delete image button
  const handleDeleteImage = () => {
    fetch(`https://u-event-backend-d86136b87ee9.herokuapp.com/images/deleteImage/${imageId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Image deleted successfully - remove the image from the state
          setImageBase64(null);
        } else {
          // Handle the error
        }
      })
      .catch((error) => {
        console.error("Error removing image:", error);
      });
  };

  /** Interests Card */

  const [selectedInterests, setSelectedInterests] = useState([]);
  const interests = [
    "Archery",
    "Dancing",
    "Cooking",
    "Sports",
    "Hiking",
    "Painting",
    "Rock-Climbing",
  ]; // Example interests

  const [editDetails, setEditDetails] = useState(false);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest)
      );
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  /** Events Card */

  const [events, setEvents] = useState([
    { id: 1, name: "Event 1", date: "2021-01-01" },
    { id: 2, name: "Event 2", date: "2021-01-02" },
    { id: 3, name: "Event 3", date: "2021-01-03" },
  ]);

  return (
    <div className="accounts-page">
      <div className="accounts-grid-block">
        <div className="grid-content">
          {/* User Profile Card Section */}

          {/* USER CONTAINER */}
          <div
            className={`user-profile-container ${editDetails ? "edit" : ""}`}
          >
            <div className="user-profile-card">
              <div className="user-profile-card-body">
                <div className="user-profile-card-body-content">
                  <div className="user-profile-card-body-content-image">
                    {/* Close Icon */}
                    <div className="image-profile-container">
                      {/* 
                      IMPORTANT CODE FOR DELETE ICON: If the image (imageBase64) is present then the delete icon will appear else it will not appear.
                       */}
                      {imageBase64 ? (
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="close-icon"
                          onClick={(e) => {
                            handleDeleteImage(e);
                            console.log("Image Deleted");
                            console.log("Image ID: ", imageId);
                          }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          style={{
                            display: "none",
                          }}
                          icon={faTimes}
                          className="close-icon"
                          onClick={(e) => {
                            handleDeleteImage(e);
                            console.log("Image Deleted");
                            console.log("Image ID: ", imageId);
                          }}
                        />
                      )}
                      {/* 
                      IMPORTANT CODE FOR IMAGE FIELD: If the image is present in DB then the image will appear else a placeholder image will appear in the size of 150x150.
                       */}
                      {imageBase64 ? (
                        <img
                          className="user-profile-image"
                          src={`data:image/jpeg;base64,${imageBase64}`}
                          width={100}
                          height={100}
                          alt="image_alt"
                        />
                      ) : (
                        <img
                          className="user-profile-image"
                          src="https://via.placeholder.com/150"
                          width={100}
                          height={100}
                          alt="image_alt"
                        />
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      ref={fileInputRef}
                    />
                  </div>
                  <div className="user-profile-card-body-content-text">
                    {console.log("userData: ", userData)}
                    <div className="meta-data">
                      <h3>{`${firstName ? firstName : ""} ${
                        lastName ? lastName : ""
                      }`}</h3>
                      <p>{jobDescription}</p>
                      <p>{nickname}</p>
                      <p>{username}</p>
                    </div>
                  </div>
                  <input type="file" onChange={handleFileChange} />
                  <button onClick={handleUpload}>Upload Image</button>
                </div>
              </div>
            </div>

            {/* User Details Card Section */}

            <div
              className={`user-details-card
            ${editDetails ? "edit" : ""}`}
            >
              <div className="user-details-card-body">
                <div className="user-details-card-header">
                  <h2>Details</h2>
                </div>
                <div className="user-details-card-body-content">
                  <button
                    className="edit-user-details-button"
                    onClick={
                      editDetails
                        ? () => setEditDetails(false)
                        : () => setEditDetails(true)
                    }
                  >
                    Edit User Details
                  </button>
                  <form
                    onSubmit={handleSubmit}
                    className="accounts-form-container"
                  >
                    <div className="user-details-card-body-content-text">
                      <div>
                        <label htmlFor="firstName">First Name</label>
                        {/* Updated First and Last name fields to update localstorage */}
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={firstName}
                          onChange={(e) => {
                            handleChangeField(e);
                            localStorage.setItem("firstName", e.target.value);
                          }}
                        />
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={lastName}
                          onChange={(e) => {
                            handleChangeField(e);
                            localStorage.setItem("lastName", e.target.value);
                          }}
                        />
                        <label htmlFor="jobDescription">Job Description</label>
                        <input
                          type="text"
                          id="jobDescription"
                          name="jobDescription"
                          value={jobDescription}
                          onChange={handleChangeField}
                        />
                        <label htmlFor="nickname">Nickname</label>
                        <input
                          type="text"
                          id="nickname"
                          name="nickname"
                          value={nickname}
                          onChange={handleChangeField}
                        />
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="username"
                          value={username}
                          onChange={handleChangeField}
                        />
                        <label htmlFor="phone">Phone</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phoneNumber"
                          value={phoneNumber}
                          onChange={handleChangeField}
                        />
                        <label htmlFor="address">Address</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={address}
                          onChange={handleChangeField}
                        />
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={postalCode}
                          onChange={handleChangeField}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={password}
                          onChange={handleChangeField}
                        />
                        <label htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={password}
                          onChange={handleChangeField}
                        />
                      </div>
                    </div>
                    <div className="user-details-card-body-content-button">
                      <button
                        className="submit-updated-user-details"
                        type="submit-updated-user-details"
                        onClick={(e) => {
                          handleSubmit(e);
                          alert("Updated User Details");
                        }}
                      >
                        {" "}
                        Update{" "}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* USER CONTAINER */}

          {/* <UserInterestsCard/> */}

          <div className="user-profile-lower-container">
            <div className="interests-card">
              <h2>Interests</h2>
              <div className="interests-selection-box">
                {interests.map((interest) => (
                  <div className="interest-wrapper" key={interest}>
                    <input
                      type="checkbox"
                      checked={selectedInterests.includes(interest)}
                      onChange={() => toggleInterest(interest)}
                    />
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* <UserEventsCard/> */}

            <div className="events-card">
              <h2>Events</h2>
              <div className="events-signup-listing">
                {events.map((event) => (
                  <p key={event.id}>
                    {event.name} - {event.date}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="logout-button-container">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
