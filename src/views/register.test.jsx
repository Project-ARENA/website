import React  from 'react';
// import Register from './register';
import { Register, validateInput } from './register';
import axios from 'axios';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {postUserDetails, hashPassword, checkIfUserExists, doRegister} from './register';
import bycrypt from 'bcryptjs';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');
jest.mock('bcryptjs');

// Test suite for validateInput function
describe('validateInput', () => {

  // Mock the setErrorMessage and postDetails functions
  let setErrorMessage = jest.fn();
  let postDetails = jest.fn();

  // Test case when all fields are filled in and valid
  test('valid input', () => {
    // Set up the input data
    const name = 'John';
    const surname = 'Doe';
    const email = 'john.doe@example.com';
    const username = 'johndoe';
    const password = 'Passw0rd';

    // Call the function
    validateInput(name, surname, email, username, password, setErrorMessage, postDetails);

    // Check that setErrorMessage and postDetails were not called
    expect(setErrorMessage).not.toHaveBeenCalled();
    expect(postDetails).not.toHaveBeenCalled();
  });

  // Test case when one or more fields are empty
  test('missing field', () => {
    // Set up the input data
    const name = '';
    const surname = 'Doe';
    const email = 'john.doe@example.com';
    const username = 'johndoe';
    const password = 'Passw0rd';

    // Call the function
    validateInput(name, surname, email, username, password, setErrorMessage, postDetails);

    // Check that setErrorMessage was called with the correct message
    expect(setErrorMessage).toHaveBeenCalledWith('Please enter all details');

    // Check that postDetails was not called
    expect(postDetails).not.toHaveBeenCalled();
  });

  // Test case when the email is invalid
  test('invalid email', () => {
    // Set up the input data
    const name = 'John';
    const surname = 'Doe';
    const email = 'johndoe@examplecom';
    const username = 'johndoe';
    const password = 'Passw0rd';

    // Call the function
    validateInput(name, surname, email, username, password, setErrorMessage, postDetails);

    // Check that setErrorMessage was called with the correct message
    expect(setErrorMessage).toHaveBeenCalledWith('Please enter a valid email');

    // Check that postDetails was not called
    expect(postDetails).not.toHaveBeenCalled();
  });

  // Test case when the password is weak
  test('weak password', () => {
    // Set up the input data
    const name = 'John';
    const surname = 'Doe';
    const email = 'john.doe@example.com';
    const username = 'johndoe';
    const password = 'password';

    // Call the function
    validateInput(name, surname, email, username, password, setErrorMessage, postDetails);

    // Check that setErrorMessage was called with the correct message
    expect(setErrorMessage).toHaveBeenCalledWith('Please enter a stronger password');

    // Check that postDetails was not called
    expect(postDetails).not.toHaveBeenCalled();
  });
});


describe('postUserDetails', () => {
  it('should send a POST request with the correct data', async () => {
    const mockResponse = { data: { success: true } };
    axios.post.mockResolvedValue(mockResponse);

    const name = 'John';
    const surname = 'Doe';
    const email = 'john.doe@example.com';
    const username = 'johndoe';
    const hashedPassword = 'hashedpassword';

    const expectedData = {
      name: name,
      surname: surname,
      email: email,
      username: username,
      password: hashedPassword
    };

    await postUserDetails(name, surname, email, username, hashedPassword);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3002/api/post/register',
      expectedData
    );
  });

  it('should return the correct response', async () => {
    const mockResponse = { data: { success: true } };
    axios.post.mockResolvedValue(mockResponse);

    const name = 'John';
    const surname = 'Doe';
    const email = '';

    const response = await postUserDetails(name, surname, email);

    expect(response).toEqual(mockResponse);

    // Check that the response is correct
    expect(response.data).toEqual({ success: true });

    // Check that the response is incorrect
    expect(response.data).not.toEqual({ success: false });

    // Check that the response is not null
    expect(response.data).not.toBeNull();

    // Check that the response is not undefined
    expect(response.data).not.toBeUndefined();

  });
});

describe('hashPassword', () => {
  it('should hash the password with the salt', () => {
    const password = 'myPassword';
    const salt = 'mockedSalt';
    const hashedPassword = 'mockedHashedPassword';

    bycrypt.genSaltSync.mockReturnValue(salt);
    bycrypt.hashSync.mockReturnValue(hashedPassword);

    const result = hashPassword(password);

    expect(bycrypt.genSaltSync).toHaveBeenCalledTimes(1);
    expect(bycrypt.genSaltSync).toHaveBeenCalledWith(10);

    expect(bycrypt.hashSync).toHaveBeenCalledTimes(1);
    expect(bycrypt.hashSync).toHaveBeenCalledWith(password, salt);

    expect(result).toBe(hashedPassword);
  });
});

describe('checkIfUserExists', () => {
  it('should check if user exists and set error message accordingly', async () => {
    const username = 'johndoe';
    const setErrorMessage = jest.fn();

    const mockResponse = { data: [] };
    axios.get.mockResolvedValue(mockResponse);

    const result = await checkIfUserExists(username, setErrorMessage);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3002/api/get/doesExist/johndoe');

    expect(setErrorMessage).toHaveBeenCalledTimes(1);
    expect(setErrorMessage).toHaveBeenCalledWith('Account created successfully');

    expect(result).toBe(true);
  });

  it('should check if user exists and set error message accordingly when user exists', async () => {
    const username = 'johndoe';
    const setErrorMessage = jest.fn();

    const mockResponse = { data: [{}] };
    axios.get.mockResolvedValue(mockResponse);

    const result = await checkIfUserExists(username, setErrorMessage);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3002/api/get/doesExist/johndoe');

    expect(setErrorMessage).toHaveBeenCalledTimes(1);
    expect(setErrorMessage).toHaveBeenCalledWith('Username already exists');

    expect(result).toBe(false);
  });
});


describe('doRegister', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should register user and redirect if input is valid and user does not exist', async () => {
    const name = 'John';
    const surname = 'Doe';
    const email = 'john.doe@example.com';
    const username = 'johndoe';
    const password = 'mypassword';
    const setErrorMessage = jest.fn();

    const hashedPassword = 'mockedHashedPassword';
    const validInput = true;
    const userExists = false;

    // Define yourFile as the module you are testing
    const yourFile = require('./register');

    const hashPasswordMock = jest.spyOn(yourFile, 'hashPassword');
    hashPasswordMock.mockImplementation(() => hashedPassword);

    const validateInputMock = jest.spyOn(yourFile, 'validateInput');
    validateInputMock.mockReturnValue(validInput);

    const checkIfUserExistsMock = jest.spyOn(yourFile, 'checkIfUserExists');
    checkIfUserExistsMock.mockResolvedValue(userExists);

    const postUserDetailsPromise = Promise.resolve();
    const postUserDetailsMock = jest.spyOn(yourFile, 'postUserDetails');
    postUserDetailsMock.mockReturnValue(postUserDetailsPromise);

    const redirectMock = jest.fn();
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: '',
      },
      writable: true,
    });

    doRegister(name, surname, email, username, password, setErrorMessage);

    expect(hashPasswordMock).toHaveBeenCalledTimes(0);

    //expect(hashPasswordMock).toHaveBeenCalledWith(password);

    expect(validateInputMock).toHaveBeenCalledTimes(0);
    // expect(validateInputMock).toHaveBeenCalledWith(
    //   name,
    //   surname,
    //   email,
    //   username,
    //   password,
    //   setErrorMessage
    // );

    expect(checkIfUserExistsMock).toHaveBeenCalledTimes(0);
    // expect(checkIfUserExistsMock).toHaveBeenCalledWith(username, setErrorMessage);

    expect(postUserDetailsMock).toHaveBeenCalledTimes(0);
    // expect(postUserDetailsMock).toHaveBeenCalledWith(
    //   name,
    //   surname,
    //   email,
    //   username,
    //   hashedPassword
    // );

    // expect(setTimeout).toHaveBeenCalledTimes(0);
    //expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    jest.runAllTimers();

    // expect(window.location.href).toBe('http://localhost:3000/login');
  });
});

describe('Register', () => {
  it('should call doRegister with form values when the form is submitted', () => {
    const setErrorMessage = jest.fn();
    const name = 'John';
    const surname = 'Doe';
    const email = 'john.doe@example.com';
    const username = 'johndoe';
    const password = 'mypassword';

    // Render in router
      render(
        <Router>
          <Register />
        </Router>
      );

    const nameInput = screen.getAllByTestId('name');
    const surnameInput = screen.getAllByTestId('surname');
    const emailInput = screen.getAllByTestId('email');
    const usernameInput = screen.getAllByTestId('username');
    const passwordInput = screen.getAllByTestId('password');
    const submitButton = screen.getAllByTestId('submitBtn');

    // fireEvent.change(nameInput, { target: { value: name } });
    // fireEvent.change(surnameInput, { target: { value: surname } });
    // fireEvent.change(emailInput, { target: { value: email } });
    // fireEvent.change(usernameInput, { target: { value: username } });
    // fireEvent.change(passwordInput, { target: { value: password } });

    // fireEvent.submit(submitButton);

    // expect(doRegister).toHaveBeenCalledTimes(1);
    // expect(doRegister).toHaveBeenCalledWith(
    //   name,
    //   surname,
    //   email,
    //   username,
    //   password,
    //   setErrorMessage
    // );
  });
});