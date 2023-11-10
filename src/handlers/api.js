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
