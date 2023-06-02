import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import bycrypt from "bcryptjs";
import React, { useState } from 'react';
import AboutPerson from "./aboutPerson";


describe("AboutPerson component", () => {
    test("renders correctly with provided props", () => {
      const props = {
        rootClassName: "custom-root",
        name: "John Doe",
        profile_src: "profile.jpg",
        profile_alt: "Profile image",
      };
  
      const { getByAltText, getByText } = render(<AboutPerson {...props} />);
  
      // Check if the component renders with the provided props
      expect(getByAltText("Profile image")).toBeInTheDocument();
      expect(getByText("John Doe")).toBeInTheDocument();
    });
  });