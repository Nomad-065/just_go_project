import {useState} from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Paper,
  Chip
} from "@mui/material";
import {DataGrid, type GridColDef,} from "@mui/x-data-grid";
import {Pencil, RefreshCw} from "lucide-react";

type RateStatus = "Active" | "Inactive";

interface DfpRate {
  id: number;
  inventory: string;
  adUnit: string;
  cpm: number;
  currency: string;
  status: RateStatus;
  lastUpdated: string;
}

const mockDfpRates: DfpRate[] = [
  {
    id: 1,
    inventory: "Homepage Banner",
    adUnit: "banner_300x250",
    cpm: 2.5,
    currency: "USD",
    status: "Active",
    lastUpdated: "2026-03-08"
  },
  {
    id: 2,
    inventory: "Sidebar Skyscraper",
    adUnit: "skyscraper_160x600",
    cpm: 1.8,
    currency: "USD",
    status: "Active",
    lastUpdated: "2026-03-07"
  },
  {
    id: 3,
    inventory: "Footer Banner",
    adUnit: "banner_728x90",
    cpm: 1.2,
    currency: "USD",
    status: "Inactive",
    lastUpdated: "2026-02-28"
  }
];

const statusColor: Record<RateStatus, "success" | "default"> = {
  Active: "success",
  Inactive: "default"
};

export default function DFPRatesPage() {
  const [search, setSearch] = useState("");

  const columns: GridColDef<DfpRate>[] = [
    {field: "inventory", headerName: "Inventory", flex: 1},

    {field: "adUnit", headerName: "Ad Unit", flex: 1},

    {field: "cpm", headerName: "CPM ($)", flex: 0.7},

    {field: "currency", headerName: "Currency", flex: 0.7},

    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColor[params.value as RateStatus]}
          size="small"
        />
      )
    },

    {field: "lastUpdated", headerName: "Last Updated", flex: 1},

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

          <IconButton size="small">
            <RefreshCw size={18}/>
          </IconButton>
        </>
      )
    }
  ];

  const filteredRates = mockDfpRates.filter((rate) =>
    rate.inventory.toLowerCase().includes(search.toLowerCase())
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
          DFP Rates
        </Typography>

        <Button variant="contained">
          Update Rates
        </Button>
      </Box>

      {/* Search */}
      <Box mb={2}>
        <TextField
          size="small"
          placeholder="Search inventory..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* Table */}
      <Paper>
        <DataGrid
          rows={filteredRates}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}