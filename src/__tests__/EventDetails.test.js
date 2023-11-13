import React from "react";
import { expect } from "chai";
import { render, act } from "@testing-library/react";
import EventDetails from "../components/mainui/EventDetails";
import { waitFor } from "@testing-library/react";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: {
      event: {
        eventId: "1",
        attendees: ["user1", "user2"],
        eventName: "Summer Fest",
        user: {
          username: "johndoe",
          firstName: "John",
          lastName: "Doe",
        },
        eventDate: "2023-01-01T10:00:00Z",
        location: "Central Park",
        description: "This is a test event.",
        image: "https://example.com/event-image.jpg",
        tags: ["music", "summer", "outdoor"],
      },
    },
  }),
}));

describe("<EventDetails />", () => {
  it("renders the event date correctly", async () => {
    await act(async () => {
      const { container } = render(<EventDetails />);

      // Wait for the expected element to appear
      await waitFor(() => {
        const expectedDate = new Date(
          "2023-01-01T10:00:00Z"
        ).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const expectedTime = new Date(
          "2023-01-01T10:00:00Z"
        ).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        expect(container.textContent).to.include(
          `Meeting Time:${expectedDate}`
        );
        expect(container.textContent).to.include(expectedTime);
      });
      // Additional tests...
    });
  });
});
