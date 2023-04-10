// import React from 'react';
// import { render } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import CustomDataGrid from './datagridArenaLeaderboard';

// describe('CustomDataGrid', () => {
//   // it('renders the correct number of test case columns', () => {
//   //   const rows = [
//   //     { id: 1, team_rank: 1, team_name: 'Team A', team_location: 'Location A', test_case_1: 10, test_case_2: 20, team_score: 30 },
//   //     { id: 2, team_rank: 2, team_name: 'Team B', team_location: 'Location B', test_case_1: 15, test_case_2: 25, team_score: 40 },
//   //     { id: 3, team_rank: 3, team_name: 'Team C', team_location: 'Location C', test_case_1: 12, test_case_2: 22, team_score: 34 },
//   //   ];
//   //   const noTests = 2;
//   //   const myTeam = 'Team A';
//   //   const { getByText } = render(<CustomDataGrid rows={rows} noTests={noTests} myTeam={myTeam} />);
    
//   //   // Test that the correct number of test case columns are displayed
//   //   for (let i = 1; i <= noTests; i++) {
//   //     const testCaseHeader = getByText(`Test Case ${i}`);
//   //     expect(testCaseHeader).toBeInTheDocument();
//   //   }
//   // });

//   // it('highlights the row for the specified team', () => {
//   //   const rows = [
//   //     { id: 1, team_rank: 1, team_name: 'Team A', team_location: 'Location A', test_case_1: 10, test_case_2: 20, team_score: 30 },
//   //     { id: 2, team_rank: 2, team_name: 'Team B', team_location: 'Location B', test_case_1: 15, test_case_2: 25, team_score: 40 },
//   //     { id: 3, team_rank: 3, team_name: 'Team C', team_location: 'Location C', test_case_1: 12, test_case_2: 22, team_score: 34 },
//   //   ];
//   //   const noTests = 2;
//   //   const myTeam = 'Team A';
//   //   const { getByRole } = render(<CustomDataGrid rows={rows} noTests={noTests} myTeam={myTeam} />);
    
//   //   // Test that the row for the specified team is highlighted
//   //   const highlightedRow = getByRole('row', { name: 'Team A' });
//   //   expect(highlightedRow).toHaveClass('highlighted-row');
//   // });
// });


import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomDataGrid from './datagridArenaLeaderboard';

test('renders a data grid', () => {
  const rows = [
    { id: 1, team_rank: 1, team_name: 'Team A', team_location: 'USA', test_case_1: 100, team_score: 500 },
    { id: 2, team_rank: 2, team_name: 'Team B', team_location: 'UK', test_case_1: 80, team_score: 400 },
    { id: 3, team_rank: 3, team_name: 'Team C', team_location: 'Canada', test_case_1: 70, team_score: 350 },
  ];
  const noTests = 1;
  const myTeam = 'Team A';

  const { getByRole, getByText } = render(<CustomDataGrid rows={rows} noTests={noTests} myTeam={myTeam} />);

  // Check that the data grid exists
  const dataGrid = getByRole('grid');
  expect(dataGrid).toBeInTheDocument();

  // Check that the column headers are present
  const rankHeader = getByText('Rank');
  expect(rankHeader).toBeInTheDocument();

  const nameHeader = getByText('Name');
  expect(nameHeader).toBeInTheDocument();

  const locationHeader = getByText('Location');
  expect(locationHeader).toBeInTheDocument();

  // const testCaseHeader = getByText('Test Case 1');
  // expect(testCaseHeader).toBeInTheDocument();

  // const scoreHeader = getByText('Team Score');
  // expect(scoreHeader).toBeInTheDocument();

  // Check that the rows are rendered
  const teamARow = getByText('Team A');
  expect(teamARow).toBeInTheDocument();

  const teamBRow = getByText('Team B');
  expect(teamBRow).toBeInTheDocument();

  const teamCRow = getByText('Team C');
  expect(teamCRow).toBeInTheDocument();

  // Check that the highlighted row has the correct class name
  // expect(teamARow).toHaveClass('highlighted-row');
});

