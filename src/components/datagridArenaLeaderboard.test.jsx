import React from 'react';
import ReactDOM from 'react-dom';
import CustomDataGrid from './datagridArenaLeaderboard';

test('Test with valid input values', () => {
    const rows = [
        { id: 1, team_name: 'Team A', team_location: 'Western Cape', testcase_1: 10, testcase_2: 20, team_score: 30 },
        { id: 2, team_name: 'Team B', team_location: 'Gauteng', testcase_1: 5, testcase_2: 15, team_score: 20 },
        { id: 3, team_name: 'Team C', team_location: 'Kwa-Zulu-Natal', testcase_1: 15, testcase_2: 5, team_score: 20 },
    ];
    const noTests = 2;
    const testcases = ['Test Case 1', 'Test Case 2'];
    const myTeam = 'Team B';
    
    <CustomDataGrid rows={rows} noTests={noTests} testcases={testcases} myTeam={myTeam} />
    
  });
  test('Test with empty input values', () => {
    <CustomDataGrid rows={[]} noTests={0} testcases={[]} myTeam={''} />
  });
  
  test('Test with invalid input values', () => {
    const rows = [
        { id: 1, team_name: 'Team A', team_location: 'Western Cape', testcase_1: 10, testcase_2: 20, team_score: 30 },
        { id: 2, team_name: 'Team B', team_location: 'Gauteng', testcase_1: 'invalid', testcase_2: 15, team_score: 20 },
        { id: 3, team_name: 'Team C', team_location: 'Kwa-Zulu-Natal', testcase_1: 15, testcase_2: 5, team_score: 20 },
    ];
    const noTests = 2;
    const testcases = ['Test Case 1', 'Test Case 2'];
    const myTeam = 'Team B';
    
    <CustomDataGrid rows={rows} noTests={noTests} testcases={testcases} myTeam={myTeam} />
  });
  test('Test case for sorting the rows', () => {
    const rows = [
        { team_score: 100, team_name: 'Team A' },
        { team_score: 80, team_name: 'Team B' },
        { team_score: 120, team_name: 'Team C' },
      ];
      
      <CustomDataGrid rows={rows} />
  });
  test('Test case for highlighting a row', () => {
    const rows = [
        { team_score: 100, team_name: 'Team A' },
        { team_score: 80, team_name: 'Team B' },
        { team_score: 120, team_name: 'Team C' },
      ];
      const myTeam = 'Team A';
      
      <CustomDataGrid rows={rows} myTeam={myTeam} />
  });
  test('Test case for the noTests and testcases props', () => {
    const rows = [
        { team_score: 100, team_name: 'Team A', testcase_1: 20, testcase_2: 10 },
        { team_score: 80, team_name: 'Team B', testcase_1: 30, testcase_2: 5 },
        { team_score: 120, team_name: 'Team C', testcase_1: 25, testcase_2: 15 },
      ];
      const noTests = 2;
      const testcases = ['Test 1', 'Test 2'];
      
      <CustomDataGrid rows={rows} noTests={noTests} testcases={testcases} />
  });
