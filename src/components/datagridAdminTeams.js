import * as React from 'react';
import Box from '@mui/material/Box';
// import { Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import Modal from 'react-modal';
import Button from '../components/button'

export default function CustomDataGrid({ rows }) {

    const [clickedRowDelete, setClickedRowDelete] = React.useState();
    const [clickedRowEdit, setClickedRowEdit] = React.useState();
    const [visible, setvisible] = React.useState(false)

    const onButtonEdit = (e, row) => {
        e.stopPropagation();
        setClickedRowEdit(row);
        setvisible(true);
    };

    const onButtonDelete = (e, row) => {
        e.stopPropagation();
        setClickedRowDelete(row);
    };

    const columns = [
        { field: 'team_code', headerName: 'Team Code', width: 350 },
        { field: 'user_id', headerName: 'User ID', width: 100 },
        { field: 'team_name', headerName: 'Team Name', width: 150 },
        { field: 'team_score', headerName: 'Team Score', width: 150 },
        { field: 'competition_name', headerName: 'Competition Name', width: 200 },
        {
            field: "deleteButton",
            headerName: "Actions",
            description: "Actions column.",
            sortable: false,
            width: 250,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            name="Edit"
                            onClick={(e) => onButtonEdit(e, params.row)}
                        >
                            Edit
                        </Button>

                        <Button
                            name="Delete"
                            onClick={(e) => onButtonDelete(e, params.row)}
                        >
                            Delete
                        </Button>
                    </Box>
                );
            }
        }
    ];

    return (
        <Box sx={{ height: 400, width: '100%' }}>

            <Modal isOpen={visible} style={{ content: { width: '70%', height: '70%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }, overlay: { zIndex: 1000 } }} >

                <h1>Row selected for edit: {clickedRowEdit ? `${clickedRowEdit.team_code}` : null}</h1>

                <Button
                    name="Close"
                    onClick={() => {
                        setvisible(false)
                        console.log("button clicked");
                    }}
                />

            </Modal>

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
            />

        </Box>
    );
}