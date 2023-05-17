import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { getLatestScores } from './arena-main';
import { handleUploadTXTDone } from './arena-main';
import { getNumTestCases } from './arena-main';
import { getTeamID } from './arena-main';
// Mock axios
jest.mock('axios');

describe('getLatestScores', () => {
  const mockResponse = {
    data: [
      {
        testcase_latest: '{"test1": 20, "test2": 30}'
      }
    ]
  };
  const team_code = 'team_code';

  beforeEach(() => {
    axios.get.mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call axios.get with the correct arguments', async () => {
    await getLatestScores();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `http://localhost:3002/api/get/testcase_latest/`
    );
  });

  it('should return an array of scores when axios.get succeeds', async () => {
    const expectedScores = [20, 30];
    const actualScores = await getLatestScores();

    expect(actualScores).toEqual(expectedScores);
  });

  it('should reject the promise when axios.get fails', async () => {
    const mockError = new Error('Network Error');
    axios.get.mockRejectedValue(mockError);

    await expect(getLatestScores()).rejects.toThrow(mockError);
  });
});

// describe('getTeamID', () => {
//     const mockResponse = {
//       data: [
//         {
//           team_name: 'Test Team'
//         }
//       ]
//     };
//     const competition_id = 'competition_id';
//     const user_id = 'user_id';
  
//     beforeEach(() => {
//       axios.get.mockResolvedValue(mockResponse);
//       sessionStorage.setItem.mockClear();
//     });
  
//     afterEach(() => {
//       jest.clearAllMocks();
//     });
  
    // it('should call axios.get with the correct arguments', async () => {
    //   await getTeamID();
  
    //   expect(axios.get).toHaveBeenCalledTimes(1);
    //   expect(axios.get).toHaveBeenCalledWith(
    //     `http://localhost:3002/api/get/team_name/${competition_id}/${user_id}`
    //   );
    // });
  
    // it('should set the teamName sessionStorage item when axios.get succeeds', async () => {
    //   const expectedTeamName = 'Test Team';
    //   await getTeamID();
  
    //   expect(sessionStorage.setItem).toHaveBeenCalledTimes(1);
    //   expect(sessionStorage.setItem).toHaveBeenCalledWith('teamName', expectedTeamName);
    // });
  
    // it('should resolve the promise without any value when axios.get succeeds', async () => {
    //   await expect(getTeamID()).resolves.toBeUndefined();
    // });
  
    // it('should reject the promise with the error when axios.get fails', async () => {
    //   const mockError = new Error('Network Error');
    //   axios.get.mockRejectedValue(mockError);
  
    //   await expect(getTeamID()).rejects.toThrow(mockError);
    //   expect(sessionStorage.setItem).not.toHaveBeenCalled();
    // });
//   });

// describe('getNumTestCases', () => {

//     // function getNumTestCases() {
//     //     axios
//     //       .get("http://localhost:3002/api/get/numTests/" + competition_id)
//     //       .then(function (response) {
//     //         numTests = response.data[0].no_testcases;
//     //         console.log("Number of testcase" + numTests);
//     //       });
//     //   }

//     const mockResponse = {
//         data: [
//             {
//                 no_testcases: 3
//             }
//         ]
//     };
//     const competition_id = 1;

//     beforeEach(() => {
//         axios.get.mockResolvedValue(mockResponse);
//     }
//     );

//     afterEach(() => {
//         jest.clearAllMocks();
//     }
//     );

//     it('should call axios.get with the correct arguments', async () => {
//         await getNumTestCases();

//         expect(axios.get).toHaveBeenCalledTimes(1);
//         expect(axios.get).toHaveBeenCalledWith(
//             `http://localhost:3002/api/get/numTests/`
//         );
//     }
//     );

//     it('should return an array of scores when axios.get succeeds', async () => {
//         const expectedScores = [3];
//         const actualScores = await getNumTestCases();

//         expect(actualScores).toEqual(expectedScores);
//     }
//     );

//     it('should reject the promise when axios.get fails', async () => {
//         const mockError = new Error('Network Error');
//         axios.get.mockRejectedValue(mockError);

//         await expect(getNumTestCases()).rejects.toThrow(mockError);
//     }
//     );
// }
// );
