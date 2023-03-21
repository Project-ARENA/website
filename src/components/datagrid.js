import * as React from 'react';
import Box from '@mui/material/Box';
import useWindowSize from '@mui/hooks/useWindowSize';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'competition_name', headerName: 'Title', width: 150 },
  { field: 'competition_views', headerName: 'Views', width: 150 },
  { field: 'competition_image', headerName: 'Image', width: 150 },
  { field: 'competition_leaderboard', headerName: 'Leaderboard', width: 150 },
  { field: 'competition_startdate', headerName: 'Start Date', width: 150 },
  { field: 'competition_enddate', headerName: 'End Date', width: 150 },
  { field: 'competition_info', headerName: 'Info', width: 150 },
  { field: 'competition_testcases', headerName: 'Test Cases', width: 150 },
];

const rows = [
    { id:1, competition_name: '1', competition_views: '2', competition_image: 'Jon', 
    competition_leaderboard: 35, competition_startdate: 'Jon', 
    competition_enddate: 35, competition_info: 'Jon', 
    competition_testcases: 35 },
  ];


export default function DataGrid(props) {
  const { data } = props;
  return (
    <Box sx={{ width, height : '80%' }}>
    <DataGrid
      rows={data}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  </Box>
);
}