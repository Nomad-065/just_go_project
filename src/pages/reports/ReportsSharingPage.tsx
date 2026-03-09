import {useState} from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Chip,
  IconButton,
  Paper
} from "@mui/material";
import {DataGrid, type GridColDef,} from "@mui/x-data-grid";
import {Plus, Pencil, Trash2, Send} from "lucide-react";

type ShareStatus = "Active" | "Expired";

interface ReportShare {
  id: number;
  reportName: string;
  sharedWith: string;
  accessType: "View" | "Download";
  expiryDate: string;
  status: ShareStatus;
}

const mockShares: ReportShare[] = [
  {
    id: 1,
    reportName: "Weekly Performance Report",
    sharedWith: "marketing@nike.com",
    accessType: "View",
    expiryDate: "2026-03-20",
    status: "Active"
  },
  {
    id: 2,
    reportName: "Campaign Revenue Summary",
    sharedWith: "ads@samsung.com",
    accessType: "Download",
    expiryDate: "2026-03-15",
    status: "Active"
  },
  {
    id: 3,
    reportName: "Monthly Ad Inventory",
    sharedWith: "team@adidas.com",
    accessType: "View",
    expiryDate: "2026-02-28",
    status: "Expired"
  }
];

const statusColor: Record<ShareStatus, "success" | "default"> = {
  Active: "success",
  Expired: "default"
};

export default function ReportsSharingPage() {
  const [search, setSearch] = useState("");

  const columns: GridColDef<ReportShare>[] = [
    {field: "reportName", headerName: "Report Name", flex: 1.5},

    {field: "sharedWith", headerName: "Shared With", flex: 1.2},

    {field: "accessType", headerName: "Access", flex: 0.7},

    {field: "expiryDate", headerName: "Expiry Date", flex: 0.9},

    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColor[params.value as ShareStatus]}
          size="small"
        />
      )
    },

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: () => (
        <>
          <IconButton size="small">
            <Send size={18}/>
          </IconButton>

          <IconButton size="small">
            <Pencil size={18}/>
          </IconButton>

          <IconButton size="small" color="error">
            <Trash2 size={18}/>
          </IconButton>
        </>
      )
    }
  ];

  const filteredShares = mockShares.filter((item) =>
    item.reportName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={3}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight="bold">
          Reports Sharing
        </Typography>

        <Button
          variant="contained"
          startIcon={<Plus size={18}/>}
        >
          Share Report
        </Button>
      </Box>

      {/* Search */}
      <Box mb={2}>
        <TextField
          size="small"
          placeholder="Search shared reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* Table */}
      <Paper>
        <DataGrid
          rows={filteredShares}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}