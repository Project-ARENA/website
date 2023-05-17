import React from 'react';
import { render } from '@testing-library/react';
import CustomDataGrid from './dataGridSubmissions';
import "@testing-library/jest-dom";

test('renders CustomDataGrid component', () => {
  const numColumns = 3;
  const testcases = ['TestCase 1', 'TestCase 2', 'TestCase 3'];
  const data = [
    ['value1', 'value2', 'value3'],
    ['value4', 'value5', 'value6'],
    ['value7', 'value8', 'value9'],
  ];

  render(<CustomDataGrid numColumns={numColumns} testcases={testcases} data={data} />);
});
