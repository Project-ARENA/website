import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

import './datagridArenaLeaderboard.css'

export default function CustomDataGrid({ rows, noTests, myTeam }) {

    const columns = [
        { field: 'team_rank', headerName: 'Rank', width: 100 },
        { field: 'team_name', headerName: 'Name', width: 200 },
        { field: 'team_location', headerName: 'Location', width: 200,type: "singleSelect", 
        valueOptions: [
            //{ value: 99, label: "Select One" },
            { value: "Free State", label: "Free State" },
            { value: "Limpopo", label: "Limpopo" },
            { value: "Northern Cape", label: "Northern Cape" },
            { value: "Mpumalanga", label: "Mpumalanga" },
            { value: "North West" , label: "North West" },
            { value: "Western Cape", label: "Western Cape" },
            { value: "Eastern Cape", label: "Eastern Cape" },
            { value: "Gauteng", label: "Gauteng" },
            { value: "Kwa-Zulu-Natal", label: "Kwa-Zulu-Natal" }
          ],
          valueFormatter: ({ id: rowId, value, field, api }) => {
            const colDef = api.getColumn(field);
            const option = colDef.valueOptions.find(
              ({ value: optionValue }) => value === optionValue
            );
      
            return option;
          },
          editable: true
        },
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