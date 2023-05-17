/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomDataGrid from './datagridAdminTeams';
import { stringToColor, stringAvatar } from './datagridAdminTeams';
import { getTeamMembers } from './datagridAdminTeams';
import "@testing-library/jest-dom";
import axios from "axios";
import { act } from "react-dom/test-utils";

const mockRows = [
    {
      id: 1,
      team_code: 'TC001',
      user_id: '25',
      team_name: 'Team 1',
      team_score: '500',
      competition_name: 'Competition 1'
    },
    {
      id: 2,
      team_code: 'TC002',
      user_id: '14',
      team_name: 'Team 2',
      team_score: '450',
      competition_name: 'Competition 2'
    },
    {
        id: 3,
        team_code: 'TC003',
        user_id: '15',
        team_name: 'Team 3',
        team_score: '400',
        competition_name: 'Competition 3'
    }
  ];

describe('CustomDataGrid component', () => {
  test('renders without errors', () => {
    render(<CustomDataGrid rows={mockRows} />);
  });

  test('renders a data grid', () => {
    const { getByRole } = render(
      <CustomDataGrid rows={mockRows} />
    );
    const dataGrid = getByRole('grid');
    expect(dataGrid).toBeInTheDocument();
  });

  test('renders the correct number of rows', () => {
    const { getAllByRole } = render(
      <CustomDataGrid rows={mockRows} />
    );
    const rows = getAllByRole('row');
    expect(rows).toHaveLength(mockRows.length + 1); // +1 for header row
  });

  test('renders the correct number of columns', () => {
    const { getAllByRole } = render(
      <CustomDataGrid rows={mockRows} />
    );
    const headerRow = getAllByRole('row')[0];
    const headerCells = headerRow.querySelectorAll('[role="columnheader"]');
    expect(headerCells).toHaveLength(3);
  });

  // it("deletes a row when delete button is clicked", async () => {

  //   axios.post = jest.fn().mockResolvedValueOnce({ data: { message: "Row has been deleted." } });

  //   render(<CustomDataGrid rows={mockRows} />);

  //   // Get button from inside data grid, it's called "Delete Team"
  //   const deleteButton = screen.getByText("Delete Team");
  //   deleteButton.click();

  //   await screen.findByText("Are you sure?");
  //   const confirmButton = screen.getByText("Yes, delete it!");
  //   confirmButton.click();

  //   expect(axios.post).toHaveBeenCalledWith(
  //     "http://localhost:3002/api/post/remove/team",
  //     { user_id: "14", team_code: "TC002" }
  //   );

  //   await screen.findByText("Row has been deleted.");
  //   const teamCodeCell = screen.queryByText("TC002");
  //   expect(teamCodeCell).not.toBeInTheDocument();
  // });
});

// describe("getTeamMembers", () => {
//   it("should fetch team members from the server and update the state with new list", async () => {
//     const mockedAxiosPost = jest.spyOn(axios, "post").mockResolvedValue({
//       data: [
//         {
//           user_id: 1,
//           user_firstname: "John",
//           user_surname: "Doe",
//         },
//         {
//           user_id: 2,
//           user_firstname: "Jane",
//           user_surname: "Doe",
//         },
//       ],
//     });

//     const setState = jest.fn();
//     const setTeamMemberList = jest.fn();
//     const row = {
//       team_code: "ABC",
//       user_id: 123,
//     };

//     await act(async () => {
//       await getTeamMembers(null, row, setState, setTeamMemberList);
//     });

//     expect(mockedAxiosPost).toHaveBeenCalledWith(
//       "http://localhost:3002/api/get/admin/teamMembers",
//       {
//         team_code: "ABC",
//         user_id: 123,
//       }
//     );

//     expect(setTeamMemberList).toHaveBeenCalledWith([
//       {
//         key: "member-1",
//         label: "John Doe",
//         value: 1,
//         user_id: 1,
//       },
//       {
//         key: "member-2",
//         label: "Jane Doe",
//         value: 2,
//         user_id: 2,
//       },
//     ]);
//   });

//   it("should log an error to the console if the server request fails", async () => {
//     const mockedAxiosPost = jest
//       .spyOn(axios, "post")
//       .mockRejectedValue(new Error("Server error"));

//     const setState = jest.fn();
//     const setTeamMemberList = jest.fn();
//     const row = {
//       team_code: "ABC",
//       user_id: 123,
//     };

//     await act(async () => {
//       await getTeamMembers(null, row, setState, setTeamMemberList);
//     });

//     expect(mockedAxiosPost).toHaveBeenCalledWith(
//       "http://localhost:3002/api/get/admin/teamMembers",
//       {
//         team_code: "ABC",
//         user_id: 123,
//       }
//     );

//     expect(console.error).toHaveBeenCalledWith(new Error("Server error"));
//   });
// });

// describe("stringToColor function", () => {
//   test("returns a valid hex color", () => {
//     const color = stringToColor("Test String");
//     expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
//   });

//   test("returns the same color for the same string", () => {
//     const string = "Test String";
//     const color1 = stringToColor(string);
//     const color2 = stringToColor(string);
//     expect(color1).toEqual(color2);
//   });

//   test("returns a different color for a different string", () => {
//     const string1 = "Test String 1";
//     const string2 = "Test String 2";
//     const color1 = stringToColor(string1);
//     const color2 = stringToColor(string2);
//     expect(color1).not.toEqual(color2);
//   });
// });

// describe("stringAvatar function", () => {
//   test("returns an object with the correct properties", () => {
//     const name = "Test User";
//     const avatar = stringAvatar(name);
//     expect(avatar).toHaveProperty("sx");
//     expect(avatar.sx).toHaveProperty("bgcolor");
//     expect(avatar).toHaveProperty("children");
//   });

//   test("returns the correct initials for a name", () => {
//     const name = "Test User";
//     const avatar = stringAvatar(name);
//     expect(avatar.children).toEqual("TU");
//   });

//   test("returns a valid hex color for the bgcolor property", () => {
//     const name = "Test User";
//     const avatar = stringAvatar(name);
//     const color = avatar.sx.bgcolor;
//     expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
//   });
// });