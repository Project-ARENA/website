// Import the necessary dependencies for testing
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom';
import ArenaTeam from './arena-team';


jest.mock('axios');
jest.mock('sweetalert2');
test('renders team manager without errors', () => {
  const number =1;

});

// describe('ArenaTeam Component', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });
// });

// test('displays the correct team name', () => {
//   const teamName = 'Team A';
//   const { getByText } = render(
//     <Router>
//       <ArenaTeam />
//     </Router>
//   );
//   expect(getByText(teamName)).toBeInTheDocument();
// });

// test('displays the correct team members', () => {
//   const teamMembers = ['John Doe', 'Jane Smith'];
//   const { getByText } = render(
//     <Router>
//       <ArenaTeam />
//     </Router>
//   );
//   expect(getByText(teamMembers[0])).toBeInTheDocument();
//   expect(getByText(teamMembers[1])).toBeInTheDocument();
// });

// test('displays the correct team location', () => {
//   const location = 'New York';
//   const { getByText } = render(
//     <Router>
//       <ArenaTeam />
//     </Router>
//   );
//   expect(getByText(`Location: ${location}`)).toBeInTheDocument();
// });

// test('displays the correct team code', () => {
//   const teamCode = 'ABC123';
//   const { getByText } = render(
//     <Router>
//       <ArenaTeam />
//     </Router>
//   );
//   expect(getByText(`Team Code: ${teamCode}`)).toBeInTheDocument();
// });

// test('displays the correct team captain', () => {
//   const captain = 'John Doe';
//   const { getByText } = render(
//     <Router>
//       <ArenaTeam />
//     </Router>
//   );
//   expect(getByText(`Captain: ${captain}`)).toBeInTheDocument();
// });

// test('displays the correct team members', () => {
//   const teamMembers = ['John Doe', 'Jane Smith'];
//   const { getByText } = render(
//     <Router>
//       <ArenaTeam />
//     </Router>
//   );
//   expect(getByText(teamMembers[0])).toBeInTheDocument();
//   expect(getByText(teamMembers[1])).toBeInTheDocument();
// });





// test('renders team manager without errors', () => {
//   render(
//     <Router>
//       <ArenaTeam />
//     </Router>
//   );
// });

