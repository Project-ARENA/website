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
  
  describe('getLatestScores', () => {
    it('should call axios.get with the correct arguments', async () => {
      await getLatestScores();
  
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:3002/api/get/testcase_latest/null'
      );
    });
  });
});