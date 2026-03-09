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
import {DataGrid, type GridColDef} from "@mui/x-data-grid";
import {Plus, Pencil, Trash2} from "lucide-react";

type IdStatus = "Active" | "Inactive";

interface CustomId {
  id: number;
  name: string;
  key: string;
  description: string;
  status: IdStatus;
}

const mockCustomIds: CustomId[] = [
  {
    id: 1,
    name: "Campaign ID",
    key: "campaign_id",
    description: "Unique identifier for campaigns",
    status: "Active"
  },
  {
    id: 2,
    name: "Advertiser ID",
    key: "advertiser_id",
    description: "Tracks advertiser accounts",
    status: "Active"
  },
  {
    id: 3,
    name: "Placement ID",
    key: "placement_id",
    description: "Used for ad placement targeting",
    status: "Inactive"
  }
];

const statusColor: Record<IdStatus, "success" | "default"> = {
  Active: "success",
  Inactive: "default"
};

export default function CustomIDsPage() {
  const [search, setSearch] = useState("");

  const columns: GridColDef<CustomId>[] = [
    {field: "name", headerName: "Name", flex: 1},
    {field: "key", headerName: "Key", flex: 1},
    {field: "description", headerName: "Description", flex: 2},
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColor[params.value as IdStatus]}
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
            <Pencil size={18}/>
          </IconButton>

          <IconButton size="small" color="error">
            <Trash2 size={18}/>
          </IconButton>
        </>
      )
    }
  ];

  const filteredIds = mockCustomIds.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
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
          Custom IDs
        </Typography>

        <Button
          variant="contained"
          startIcon={<Plus size={18}/>}
        >
          Create Custom ID
        </Button>
      </Box>

      {/* Search */}
      <Box mb={2}>
        <TextField
          size="small"
          placeholder="Search custom IDs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* Table */}
      <Paper>
        <DataGrid
          rows={filteredIds}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}