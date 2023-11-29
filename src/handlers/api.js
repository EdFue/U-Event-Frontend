// API Requests ---------------------------------------------------------------

export const fetchEvents = async () => {
  try {
    const response = await fetch("https://u-event-backend-d86136b87ee9.herokuapp.com/api/events");
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
      `https://u-event-backend-d86136b87ee9.herokuapp.com/images/image/${username}`
    );
    const userData = await responseUserData.json();
    const imageId = userData[0]; // Assuming userData is an array

    const responseImage = await fetch(
      `https://u-event-backend-d86136b87ee9.herokuapp.com/images/${imageId}`
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
      `https://u-event-backend-d86136b87ee9.herokuapp.com/images/image/${username}`
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
    const response = await fetch(`https://u-event-backend-d86136b87ee9.herokuapp.com/images/${imageId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// API Call to fetch imageId from username
export const fetchImageId = async (username) => {
  try {
    const response = await fetch(
      `https://u-event-backend-d86136b87ee9.herokuapp.com/images/image/${username}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    throw error;
  }
};

// API Call to fetch imageId and setbase64Image
export const fetchAndSetImageBase64 = async (imageId) => {
  try {
    const response = await fetch(`https://u-event-backend-d86136b87ee9.herokuapp.com/images/${imageId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      // Check if the response contains JSON data
      const data = await response.json();
      return data.image || null; // Ensure a valid image is returned or null
    } else {
      console.error("Response is not JSON.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};
// EventDetails API Requests ---------------------------------------------------


// handle