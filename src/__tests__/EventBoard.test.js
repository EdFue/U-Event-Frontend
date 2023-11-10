import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import EventBoard from "../components/mainui/EventBoard";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
// import sinon from "sinon"; // Add this import for Sinon
import { expect } from "chai"; // Add this import for Chai

describe("EventBoard Component", () => {
  const wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

  it("should render without errors", () => {
    const { container } = render(<EventBoard />, { wrapper });
  });
});
