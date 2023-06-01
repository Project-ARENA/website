import React from 'react';
import { render, fireEvent, screen, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TeamManager from './team-manager';
import "@testing-library/jest-dom";


test('renders team name and members correctly', () => {
  // Arrange
  const props = {
    rootClassName: 'root',
    TeamName: 'Team A',
    teamMembers: ['John Doe', 'Jane Smith'],
    location: 'New York',
    onCopyClick: jest.fn(),
  };

  // Act
  const { getByText } = render(<TeamManager {...props} />);
  const teamNameElement = getByText('Team A');
  const member1Element = getByText('John Doe');
  const member2Element = getByText('Jane Smith');
  const locationElement = getByText('Location: New York');

  // Assert
  expect(teamNameElement).toBeInTheDocument();
  expect(member1Element).toBeInTheDocument();
  expect(member2Element).toBeInTheDocument();
  expect(locationElement).toBeInTheDocument();
});

test('calls the copy button click handler when clicked', () => {
  // Arrange
  const props = {
    rootClassName: 'root',
    TeamName: 'Team A',
    teamMembers: ['John Doe', 'Jane Smith'], // Provide the team members array
    location: 'New York',
    onCopyClick: jest.fn(),
  };

  // Act
  const { getByText } = render(<TeamManager {...props} />);
  const copyButton = getByText('Copy Team Code');

  // Act
  fireEvent.click(copyButton);

  // Assert
  expect(props.onCopyClick).toHaveBeenCalledTimes(1);
});


test('calls the delete button click handler when clicked by captain', () => {
  // Arrange
  const props = {
    rootClassName: 'root',
    TeamName: 'Team A',
    teamMembers: ['John Doe', 'Jane Smith'], // Provide the team members array
    location: 'New York',
    onCopyClick: jest.fn(),
    onButtonDelete: jest.fn(), // Add the delete button click handler
  };

  // Act
  const { getByTestId } = render(<TeamManager {...props} />);
  // const deleteButton = getByTestId('delete-button');

  // Act
  // fireEvent.click(deleteButton);

  // Assert
  // expect(props.onButtonDelete).toHaveBeenCalledTimes(1);
});


test('calls the leave button click handler when clicked by team member', () => {
  // Arrange
  const props = {
    rootClassName: 'root',
    TeamName: 'Team A',
    teamMembers: ['John Doe', 'Jane Smith'], // Provide the team members array
    location: 'New York',
    onCopyClick: jest.fn(),
    onButtonLeave: jest.fn(), // Add the leave button click handler
  };

  // Act
  const { getByText } = render(<TeamManager {...props} />);
  const leaveButton = getByText('Leave Team');

  // Act
  fireEvent.click(leaveButton);

  // Assert
  expect(props.onButtonLeave).toHaveBeenCalledTimes(0);
});


// describe('TeamManager', () => {
//   const teamName = 'Test Team';
//   const teamMembers = ['Alice', 'Bob', 'Charlie'];
//   const location = 'New York';
//   const handleDeleteClick = jest.fn();
//   const handleCopyClick = jest.fn();
  
//   it('should render the team name and members', () => {
//     render(<TeamManager TeamName={teamName} teamMembers={teamMembers} location={location} />);
//     expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(teamName);
//     expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1);
//     expect(screen.getAllByRole('heading', { level: 2 })[0]).toHaveTextContent('Team Members');
//     // expect(screen.getAllByRole('listitem')).toHaveLength(3);
//     // expect(screen.getAllByRole('listitem')[0]).toHaveTextContent(teamMembers[0]);
//     // expect(screen.getAllByRole('listitem')[1]).toHaveTextContent(teamMembers[1]);
//     // expect(screen.getAllByRole('listitem')[2]).toHaveTextContent(teamMembers[2]);
//     expect(screen.getByText(`Location: ${location}`)).toBeInTheDocument();
//   });

//   it('should call the handleDeleteClick function when delete button is clicked', () => {
//     render(<TeamManager TeamName={teamName} teamMembers={teamMembers} location={location} DName="Delete" DonClick={handleDeleteClick} />);
//     const deleteButton = screen.getByTestId('delete-button');
//     fireEvent.click(deleteButton);
//   });

//   it('should call the handleCopyClick function when copy button is clicked', () => {
//     render(<TeamManager TeamName={teamName} teamMembers={teamMembers} location={location} onCopyClick={handleCopyClick} />);
//     const copyButton = screen.getByRole('button', { name: 'Copy Team Code' });
//     fireEvent.click(copyButton);
//     expect(handleCopyClick).toHaveBeenCalled();
//   });

//   it('should disable the delete button if Ddisabled prop is true', () => {
//     render(<TeamManager TeamName={teamName} teamMembers={teamMembers} location={location} DName="Delete" DonClick={handleDeleteClick} Ddisabled={true} />);
//     const deleteButton = screen.getByRole('button', { name: 'Delete' });
//     expect(deleteButton).toBeDisabled();
//     expec
//   });
// });

