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
import {Plus, Pencil, Trash2} from "lucide-react";

type ProgrammeStatus = "Active" | "Paused" | "Completed";

interface Programme {
  id: number;
  name: string;
  partner: string;
  deals: number;
  status: ProgrammeStatus;
}

const mockProgrammes: Programme[] = [
  {
    id: 1,
    name: "Holiday Retail Campaign",
    partner: "Amazon",
    deals: 12,
    status: "Active"
  },
  {
    id: 2,
    name: "Tech Launch Series",
    partner: "Samsung",
    deals: 8,
    status: "Paused"
  },
  {
    id: 3,
    name: "Sports Brand Promotion",
    partner: "Nike",
    deals: 5,
    status: "Completed"
  }
];

const statusColor: Record<
  ProgrammeStatus,
  "success" | "warning" | "default"
> = {
  Active: "success",
  Paused: "warning",
  Completed: "default"
};

export default function ProgrammesPage() {
  const [search, setSearch] = useState("");

  const columns: GridColDef<Programme>[] = [
    {field: "name", headerName: "Programme Name", flex: 1.5},
    {field: "partner", headerName: "Partner", flex: 1},
    {field: "deals", headerName: "Deals", flex: 0.7},
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColor[params.value as ProgrammeStatus]}
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

  const filteredProgrammes = mockProgrammes.filter((programme) =>
    programme.name.toLowerCase().includes(search.toLowerCase())
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
          Programmes
        </Typography>

        <Button
          variant="contained"
          startIcon={<Plus size={18}/>}
        >
          Create Programme
        </Button>
      </Box>

      {/* Search */}
      <Box mb={2}>
        <TextField
          size="small"
          placeholder="Search programmes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* Table */}
      <Paper>
        <DataGrid
          rows={filteredProgrammes}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}