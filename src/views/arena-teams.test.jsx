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

describe('ArenaTeam Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <Router>
        <ArenaTeam />
      </Router>
    );
    expect(screen.getByText(/team manager/i)).toBeInTheDocument();
  });
});