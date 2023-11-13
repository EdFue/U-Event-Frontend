// API Requests ---------------------------------------------------------------

export const fetchEvents = async () => {
  try {
    const response = await fetch("https://u-event-frontend-20ddc44bb59c.herokuapp.com/api/events");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchUserImage = async (username) => {
  try {
    const responseUserData = await fetch(
      `https://u-event-frontend-20ddc44bb59c.herokuapp.com/images/image/${username}`
    );
    const userData = await responseUserData.json();
    const imageId = userData[0]; // Assuming userData is an array

    const responseImage = await fetch(
      `https://u-event-frontend-20ddc44bb59c.herokuapp.com/images/${imageId}`
    );
    const imageData = await responseImage.json();

    return imageData.image;
  } catch (error) {
    throw error;
  }
};

// EventDetails API Requests ---------------------------------------------------
// Add these functions in your api.js

export const fetchUserDetails = async (username) => {
  try {
    const response = await fetch(
      `https://u-event-frontend-20ddc44bb59c.herokuapp.com/images/image/${username}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchImageData = async (imageId) => {
  try {
    const response = await fetch(`https://u-event-frontend-20ddc44bb59c.herokuapp.com/images/${imageId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// EventDetails API Requests ---------------------------------------------------
