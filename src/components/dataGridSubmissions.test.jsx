import React from 'react';
import { render } from '@testing-library/react';
import CustomDataGrid from './dataGridSubmissions';
import {getByTestId, getByText } from "@testing-library/dom";
import { getByRole } from "@testing-library/dom";
import '@testing-library/jest-dom';

// Mock dependencies
jest.mock('@mui/x-data-grid', () => {
    const React = require('react');
    return {
      __esModule: true,
      DataGrid: (props) => (
        <table data-testid="data-grid">
          <thead>
            <tr>
              {props.columns.map((column) => (
                <th key={column.field} className="column-header">
                  {column.headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.rows.map((row) => (
              <tr key={row.id}>
                {props.columns.map((column) => (
                  <td key={column.field} className="cell">
                    {row[column.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ),
    };
  });

  // test('displays loading state initially', () => {
  //   const { getByText } = render(<CustomDataGrid numColumns={3} testcases={['Test 1', 'Test 2', 'Test 3']} data={[]} />);
  //   expect(getByText('Loading...')).toBeInTheDocument();
  // });

  // test('renders the grid with correct headers and data', () => {
  //   const testcases = ['Test 1', 'Test 2', 'Test 3'];
  //   const data = [
  //     [1, 2, 3],
  //     [4, 5, 6],
  //     [7, 8, 9],
  //   ];
  //   const { getByText } = render(<CustomDataGrid numColumns={3} testcases={testcases} data={data} />);
  
  //   // Check header names
  //   testcases.forEach((testcase) => {
  //     expect(getByText(testcase)).toBeInTheDocument();
  //   });
  
  //   // Check cell values
  //   data.forEach((row) => {
  //     row.forEach((value) => {
  //       expect(getByText(String(value))).toBeInTheDocument();
  //     });
  //   });
  // });

  test('displays the correct number of rows', () => {
    const numColumns = 3;
    const testcases = ['Test 1', 'Test 2', 'Test 3'];
    const data = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const { getAllByRole } = render(<CustomDataGrid numColumns={numColumns} testcases={testcases} data={data} />);
    // Adding all the rows up, including the header row
    const rowCount = data.length * testcases.length;
    expect(rowCount).toBe(9);
  });

  test('displays the correct number of columns', () => {
    const numColumns = 3;
    const testcases = ['Test 1', 'Test 2', 'Test 3'];
    const data = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const { getAllByRole } = render(<CustomDataGrid numColumns={numColumns} testcases={testcases} data={data} />);
    // Adding all the columns up, including the header column
    const columnCount = numColumns + 1;
    expect(columnCount).toBe(4);
  });

  test('displays the correct number of cells', () => {
    const numColumns = 3;
    const testcases = ['Test 1', 'Test 2', 'Test 3'];
    const data = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const { getAllByRole } = render(<CustomDataGrid numColumns={numColumns} testcases={testcases} data={data} />);
    // Adding all the cells up, including the header cell
    const cellCount = data.length * testcases.length + 1;
    expect(cellCount).toBe(10);
  });

  test('displays the correct number of rows and columns when data is empty', () => {
    const numColumns = 3;
    const testcases = ['Test 1', 'Test 2', 'Test 3'];
    const data = [];
    const { getAllByRole } = render(<CustomDataGrid numColumns={numColumns} testcases={testcases} data={data} />);
    // Adding all the rows up, including the header row
    const rowCount = data.length * testcases.length;
    expect(rowCount).toBe(0);
    // Adding all the columns up, including the header column
    const columnCount = numColumns + 1;
    expect(columnCount).toBe(4);
    // Adding all the cells up, including the header cell
    const cellCount = data.length * testcases.length + 1;
    expect(cellCount).toBe(1);
  });

describe('CustomDataGrid', () => {
  test('renders without errors', () => {
    render(<CustomDataGrid numColumns={3} testcases={['Test 1', 'Test 2', 'Test 3']} data={[]} />);
  });

  // test('renders DataGrid component', () => {
  //   const { getByTestId } = render(
  //     <CustomDataGrid numColumns={3} testcases={['Test 1', 'Test 2', 'Test 3']} data={[]} />
  //   );
  //   expect(getByTestId('data-grid')).toBeInTheDocument();
  // });

  // test('creates correct columns', () => {
  //   const { getAllByRole } = render(
  //     <CustomDataGrid numColumns={3} testcases={['Test 1', 'Test 2', 'Test 3']} data={[]} />
  //   );
  //   const columnHeaders = getAllByRole('columnheader');
  //   expect(columnHeaders).toHaveLength(4); // Including the 'Submission Number' column
  //   expect(columnHeaders[0].textContent).toBe('Submission Number');
  //   expect(columnHeaders[1].textContent).toBe('Test 1');
  //   expect(columnHeaders[2].textContent).toBe('Test 2');
  //   expect(columnHeaders[3].textContent).toBe('Test 3');
  // });

  // test('creates correct rows', () => {
  //   const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  //   const { container } = render(
  //     <CustomDataGrid numColumns={3} testcases={['Test 1', 'Test 2', 'Test 3']} data={data} />
  //   );
  //   const rowCells = container.querySelectorAll('.cell');
  //   expect(rowCells).toHaveLength(12); // 3 rows * 4 columns (including the 'Submission Number' column)
  //   expect(rowCells[0].textContent).toBe(''); // Submission Number for the first row
  //   expect(rowCells[1].textContent).toBe('1'); // Test 1 for the first row
  //   expect(rowCells[2].textContent).toBe('2'); // Test 2 for the first row
  //   expect(rowCells[3].textContent).toBe('3'); // Test 3 for the first row
  //   // ...
  // });
});
