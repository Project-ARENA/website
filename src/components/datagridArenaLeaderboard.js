import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

import './datagridArenaLeaderboard.css'

export default function CustomDataGrid({ rows, noTests, myTeam }) {

    const columns = [
        { field: 'team_rank', headerName: 'Rank', width: 100 },
        { field: 'team_name', headerName: 'Name', width: 200 },
        { field: 'team_location', headerName: 'Location', width: 200 },
        // TODO: #3 Figure out how to add no. test case columns dynamically
        ...Array.from({ length: noTests }, (_, i) => ({
            field: `test_case_${i+1}`, headerName: `Test Case ${i+1}`, width: 150
          })),
        { field: 'team_score', headerName: 'Team Score', width: 150 },
    ];

    // Highlight row based on "team_name" field
    const getRowClassName = (params) => {
        return params.row.team_name === myTeam ? 'highlighted-row' : '';
    };

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                getRowClassName={getRowClassName} // Add getRowClassName prop
            />
        </Box>
    );
}