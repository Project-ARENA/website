import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom';

const { describe, expect, it } = require("@jest/globals");
const { checkIfDetailsValid, AdminProfile } = require("./admin-profile");

describe("checkIfDetailsValid function", () => {
    it("should return false when newEmail and newUsername are empty", () => {
      const result = checkIfDetailsValid("", "", "currentPassword", "newPassword");
      expect(result).toBe(false);
    });
  
    it("should return false when password is empty", () => {
      const result = checkIfDetailsValid("newEmail@example.com", "newUsername", "", "newPassword");
      expect(result).toBe(false);
    });
  
    it("should return false when newPassword is too weak", () => {
      const result = checkIfDetailsValid("newEmail@example.com", "newUsername", "currentPassword", "weak");
      expect(result).toBe(false);
    });
  
    it("should return false when newEmail is invalid", () => {
      const result = checkIfDetailsValid("notAnEmail", "newUsername", "currentPassword", "newPassword");
      expect(result).toBe(false);
    });
  
    it("should return true when all fields are valid", () => {
      const result = checkIfDetailsValid("newEmail@example.com", "newUsername", "currentPassword", "newPassword123");
      expect(result).toBe(true);
    });

    it("should return true when only newEmail is valid", () => {
        const result = checkIfDetailsValid("newEmail@example.com", "", "currentPassword", "newPassword123");
        expect(result).toBe(false);
      });
      
    it("should return true when only newUsername is valid", () => {
        const result = checkIfDetailsValid("", "newUsername", "currentPassword", "newPassword123");
        expect(result).toBe(false);
    });
      
    it("should return false when all fields are invalid", () => {
        const result = checkIfDetailsValid("notAnEmail", "", "", "weak");
        expect(result).toBe(false);
    });
});

describe('AdminProfile', () => {
    test('renders navbar', () => {
      render(<Router> <AdminProfile /> </Router>);
      const navbar = screen.getByRole('Header');
      expect(navbar).toBeInTheDocument();
    });
  
    test('renders update profile section', () => {
      render(<Router> <AdminProfile /> </Router>);
      const updateProfileSection = screen.getByText('UPDATE PROFILE');
      expect(updateProfileSection).toBeInTheDocument();
    });
  
    test('updates email when input field changes', () => {
      render(<Router> <AdminProfile /> </Router>);
      const emailInput = screen.getByLabelText('EMAIL');
      fireEvent.change(emailInput, { target: { value: 'newemail@example.com' } });
      expect(emailInput.value).toBe('newemail@example.com');
    });
  
    test('updates password when input field changes', () => {
      render(<Router> <AdminProfile /> </Router>);
      const passwordInput = screen.getByLabelText('Current PASSWORD');
      fireEvent.change(passwordInput, { target: { value: 'oldpassword' } });
      expect(passwordInput.value).toBe('oldpassword');
    });
  
    test('updates new password when input field changes', () => {
      render(<Router> <AdminProfile /> </Router>);
      const newPasswordInput = screen.getByLabelText('PASSWORD');
      fireEvent.change(newPasswordInput, { target: { value: 'newpassword' } });
      expect(newPasswordInput.value).toBe('newpassword');
    });
  
    test('updates confirm password when input field changes', () => {
      render(<Router> <AdminProfile /> </Router>);
      const confirmPasswordInput = screen.getByLabelText('CONFIRM PASSWORD');
      fireEvent.change(confirmPasswordInput, { target: { value: 'newpassword' } });
      expect(confirmPasswordInput.value).toBe('newpassword');
    });
  });
  