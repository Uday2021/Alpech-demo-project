import * as React from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Input } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const ariaLabel = { 'aria-label': 'description' };

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'f_name', headerName: 'First name', width: 130 },
  { field: 'l_name', headerName: 'Last name', width: 130 },
  {
    field: 'company',
    headerName: 'Company',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 160,
  },
  {
    field: 'city',
    headerName: 'City',
    type: 'number',
    width: 90,
  },
  {
    field: 'state',
    headerName: 'State',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 160,
  },
  {
    field: 'zip',
    headerName: 'Zip',
    type: 'number',
    width: 90,
  },
  {
    field: 'email',
    headerName: 'Email',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 160,
  },
  {
    field: 'web',
    headerName: 'Web',
    type: 'number',
    width: 180,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
];

export default function DataTable() {
  const [row, setRow] = React.useState([]);
  const [search, setSearch] = React.useState('');

  const filteredRow = row.filter((item) => item.f_name === search);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        'https://5f37efc3bbfd1e00160bf767.mockapi.io/ap/v1/users'
      );
      setRow(res.data);
      return res;
    };
    fetchData();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      {/* Navbar */}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Search Input Field */}

      <Box
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          padding: '20px',
        }}
      >
        <Input
          placeholder="Placeholder"
          inputProps={ariaLabel}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* Table for data plotting */}

      <DataGrid
        rows={search === '' ? row : filteredRow}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
