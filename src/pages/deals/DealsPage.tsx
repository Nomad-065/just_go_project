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

type DealStatus = "Active" | "Paused" | "Draft";

interface Deal {
  id: number;
  name: string;
  advertiser: string;
  budget: number;
  status: DealStatus;
}

const mockDeals: Deal[] = [
  {
    id: 1,
    name: "Nike Summer Campaign",
    advertiser: "Nike",
    budget: 15000,
    status: "Active"
  },
  {
    id: 2,
    name: "Samsung Galaxy Launch",
    advertiser: "Samsung",
    budget: 30000,
    status: "Paused"
  },
  {
    id: 3,
    name: "Adidas Winter Sale",
    advertiser: "Adidas",
    budget: 12000,
    status: "Draft"
  }
];

const statusColor: Record<DealStatus, "success" | "warning" | "default"> = {
  Active: "success",
  Paused: "warning",
  Draft: "default"
};

export default function DealsPage() {
  const [search, setSearch] = useState<string>("");

  const columns: GridColDef<Deal>[] = [
    {
      field: "name",
      headerName: "Deal Name",
      flex: 1
    },
    {
      field: "advertiser",
      headerName: "Advertiser",
      flex: 1
    },
    {
      field: "budget",
      headerName: "Budget ($)",
      flex: 1
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColor[params.value as DealStatus]}
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

  const filteredDeals = mockDeals.filter((deal) =>
    deal.name.toLowerCase().includes(search.toLowerCase())
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
          Deals
        </Typography>

        <Button
          variant="contained"
          startIcon={<Plus size={18}/>}
        >
          Create Deal
        </Button>
      </Box>

      {/* Search */}
      <Box mb={2}>
        <TextField
          size="small"
          placeholder="Search deals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* Table */}
      <Paper>
        <DataGrid
          rows={filteredDeals}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}