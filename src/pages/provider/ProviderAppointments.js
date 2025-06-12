import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';

// Determine API URL in a browser-safe way
const API_URL = (typeof process !== 'undefined' && process.env.REACT_APP_API_URL)
  ? process.env.REACT_APP_API_URL
  : (window.REACT_APP_API_URL || 'http://localhost:5000');

export default function ProviderAppointments() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_URL}/api/appointments/provider`,
        { headers, params: { page: page + 1, limit: pageSize } }
      );

      setRows(
        res.data.data.map(a => ({
          id: a._id,
          visitType: a.type,
          apptTime: new Date(a.startTime).toLocaleString(),
          patientName: a.patientName || 'N/A',
          pr: a.payer || 'N/A',
          reason: a.reason || '',
          sex: a.sex || '',
          age: a.age || '',
          visitStatus: a.status || '',
          hcc: a.hccUnreviewed ? 'Yes' : 'No',
          arrTime: a.arrivalTime ? new Date(a.arrivalTime).toLocaleTimeString() : '',
          duration: a.durationMinutes || '',
          room: a.room || '',
          status: a.roomStatus || '',
          cycleTime: a.cycleTimeMinutes || '',
          notesStatus: a.notesStatus || '',
          healowConnect: a.healowConnected ? 'Yes' : 'No'
        }))
      );
      setRowCount(res.data.totalCount);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [page, pageSize]);

  const columns = [
    { field: 'visitType', headerName: 'Visit Type', width: 120 },
    { field: 'apptTime', headerName: 'Appt Time', width: 160 },
    { field: 'patientName', headerName: 'Patient Name', width: 180 },
    { field: 'pr', headerName: 'P/R', width: 80 },
    { field: 'reason', headerName: 'Reason', width: 200 },
    { field: 'sex', headerName: 'Sex', width: 60 },
    { field: 'age', headerName: 'Age', width: 80 },
    { field: 'visitStatus', headerName: 'Visit Status', width: 120 },
    { field: 'hcc', headerName: 'HCC Un-Reviewed', width: 140 },
    { field: 'arrTime', headerName: 'Arr Time', width: 100 },
    { field: 'duration', headerName: 'Duration', width: 100 },
    { field: 'room', headerName: 'Room', width: 100 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'cycleTime', headerName: 'Cycle Time', width: 100 },
    { field: 'notesStatus', headerName: 'Notes Sts', width: 100 },
    { field: 'healowConnect', headerName: 'Healow Connect', width: 140 }
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar role="provider" />
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold mb-4">Provider Appointments</h1>
        <div style={{ height: 700, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            pagination
            paginationMode="server"
            pageSize={pageSize}
            onPageSizeChange={newSize => setPageSize(newSize)}
            rowsPerPageOptions={[10, 25, 50, 100]}
            rowCount={rowCount}
            page={page}
            onPageChange={newPage => setPage(newPage)}
            components={{ Toolbar: GridToolbar }}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
}
