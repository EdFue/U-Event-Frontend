import { expect } from "chai";
import sinon from "sinon";
import {
  fetchEvents,
  fetchUserImage,
  fetchImageData,
  fetchUserDetails,
} from "../handlers/api"; // Adjust the path as per your project structure

describe("API", () => {
  let fetchStub;

  beforeEach(() => {
    // Stub the global fetch function
    fetchStub = sinon.stub(global, "fetch");
  });

  afterEach(() => {
    // Restore the original fetch function
    fetchStub.restore();
  });

  it("fetchEvents should return a list of events on successful fetch", async () => {
    // Mock the fetch response
    fetchStub.resolves(
      new Response(JSON.stringify([{ id: 1, name: "Event 1" }]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const events = await fetchEvents();
    expect(events).to.be.an("array");
    expect(events).to.have.length(1);
    expect(events[0]).to.deep.equal({ id: 1, name: "Event 1" });
  });

  it("fetchEvents should throw an error on fetch failure", async () => {
    // Mock a failed fetch response
    fetchStub.resolves(
      new Response(null, {
        status: 500,
      })
    );

    try {
      await fetchEvents();
      throw new Error("fetchEvents did not throw");
    } catch (error) {
      expect(error).to.be.an("error");
      expect(error.message).to.equal("HTTP error! status: 500");
    }
  });

  //   Test for Successful fetchUserImage Execution
  it("fetchUserImage should return user image data on successful fetch", async () => {
    const username = "testuser";
    const mockUserData = ["imageId"];
    const mockImageData = { image: "base64ImageData" };

    fetchStub
      .withArgs(`https://u-event-backend-d86136b87ee9.herokuapp.com/images/image/${username}`)
      .resolves(
        new Response(JSON.stringify(mockUserData), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      );
    fetchStub
      .withArgs(`https://u-event-backend-d86136b87ee9.herokuapp.com/images/${mockUserData[0]}`)
      .resolves(
        new Response(JSON.stringify(mockImageData), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      );

    const imageBase64 = await fetchUserImage(username);
    expect(imageBase64).to.equal(mockImageData.image);
  });

  //   Test for Failed fetchUserImage Execution
  it("fetchUserImage should throw an error on fetch failure", async () => {
    const username = "testuser";
    fetchStub
      .withArgs(`https://u-event-backend-d86136b87ee9.herokuapp.com/images/image/${username}`)
      .resolves(
        new Response(null, {
          status: 500,
        })
      );

    try {
      await fetchUserImage(username);
      throw new Error("fetchUserImage did not throw");
    } catch (error) {
      expect(error).to.be.an("error");
      expect(error.message).to.equal("Unexpected end of JSON input");
    }
  });

  // Updated Test:
  // Test for Successful fetchUserDetails Execution
  it("fetchUserDetails should return user details on successful fetch", async () => {
    const username = "testuser";
    const mockUserDetails = { id: 1, name: "Test User" };

    fetchStub
      .withArgs(`https://u-event-backend-d86136b87ee9.herokuapp.com/images/image/${username}`)
      .resolves(
        new Response(JSON.stringify(mockUserDetails), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      );

    const userDetails = await fetchUserDetails(username);
    expect(userDetails).to.deep.equal(mockUserDetails);
  });

  // Test for Failed fetchUserDetails Execution
  it("fetchUserDetails should throw an error on fetch failure", async () => {
    const username = "testuser";

    fetchStub
      .withArgs(`https://u-event-backend-d86136b87ee9.herokuapp.com/images/image/${username}`)
      .resolves(
        new Response(null, {
          status: 500,
        })
      );

    try {
      await fetchUserDetails(username);
      throw new Error("fetchUserDetails did not throw");
    } catch (error) {
      expect(error).to.be.an("error");
      expect(error.message).to.equal("HTTP error! status: 500");
    }
  });

  // Test for Successful fetchImageData Execution
  it("fetchImageData should return image data on successful fetch", async () => {
    const imageId = "12345";
    const mockImageData = { image: "base64ImageData" };

    fetchStub.withArgs(`https://u-event-backend-d86136b87ee9.herokuapp.com/images/${imageId}`).resolves(
      new Response(JSON.stringify(mockImageData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const imageData = await fetchImageData(imageId);
    expect(imageData).to.deep.equal(mockImageData);
  });

  // Test for Failed fetchImageData Execution
  it("fetchImageData should throw an error on fetch failure", async () => {
    const imageId = "12345";

    fetchStub.withArgs(`https://u-event-backend-d86136b87ee9.herokuapp.com/images/${imageId}`).resolves(
      new Response(null, {
        status: 500,
      })
    );

    try {
      await fetchImageData(imageId);
      throw new Error("fetchImageData did not throw");
    } catch (error) {
      expect(error).to.be.an("error");
      expect(error.message).to.equal("HTTP error! status: 500");
    }
  });
});
