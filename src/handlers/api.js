// API Requests ---------------------------------------------------------------

export const fetchEvents = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/events");
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
      `http://localhost:8080/images/image/${username}`
    );
    const userData = await responseUserData.json();
    const imageId = userData[0]; // Assuming userData is an array

    const responseImage = await fetch(
      `http://localhost:8080/images/${imageId}`
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
      `http://localhost:8080/images/image/${username}`
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
    const response = await fetch(`http://localhost:8080/images/${imageId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// EventDetails API Requests ---------------------------------------------------
