import React from 'react'
import axios from 'axios';
import { render, act } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ArenaSubmissions from './arena-submissions';

jest.mock('axios');

describe('ArenaSubmissions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call axios and set the number of tests', async () => {
        const competition_id = 1;
        const user_id = 2;
        const mockResponse = [
            {
                no_testcases: 3,
                testcase_prev: '{"testcase_1":"input1", "testcase_2":"input2", "testcase_3":"input3"}',
            },
        ];

        axios.get.mockResolvedValueOnce({ data: mockResponse });

        const { getByTestId } = render(<Router> <ArenaSubmissions competition_id={competition_id} user_id={user_id} /> </Router>);

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(axios.get).toHaveBeenCalledWith(`http://localhost:3002/api/get/numTests/${competition_id}`);
        expect(getByTestId('numTests').textContent).toBe('3');
    });

    it('should call axios and set the data', async () => {
        const competition_id = 1;
        const user_id = 2;
        const mockResponse = [
            {
                no_testcases: 3,
                testcase_prev: '{"testcase_1":"input1", "testcase_2":"input2", "testcase_3":"input3"}',
            },
        ];

        axios.get.mockResolvedValueOnce({ data: mockResponse });

        const { getByTestId } = render(<Router> <ArenaSubmissions competition_id={competition_id} user_id={user_id} /> </Router> );

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(axios.get).toHaveBeenCalledWith(`http://localhost:3002/api/get/testcase_prev/${competition_id}/${user_id}`);
        expect(getByTestId('testData').textContent).toBe('[["input1","input2","input3"]]');
    });

    it('should handle axios errors', async () => {
        const competition_id = 1;
        const user_id = 2;

        axios.get.mockRejectedValueOnce(new Error('Error'));

        const { getByTestId } = render(<Router> <ArenaSubmissions competition_id={competition_id} user_id={user_id} /> </Router> );

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(getByTestId('error').textContent).toBe('Error');
    });

    it('should handle no data returned from axios', async () => {
        const competition_id = 1;
        const user_id = 2;

        axios.get.mockResolvedValueOnce({ data: [] });

        const { getByTestId } = render(<Router> <ArenaSubmissions competition_id={competition_id} user_id={user_id} /> </Router> );

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(getByTestId('error').textContent).toBe('No data returned from server');
    });
});
