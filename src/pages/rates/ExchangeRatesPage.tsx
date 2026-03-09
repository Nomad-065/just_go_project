import { useState } from "react";
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
import { Pencil, RefreshCw } from "lucide-react";

type RateStatus = "Updated" | "Stale";

interface ExchangeRate {
  id: number;
  currency: string;
  rate: number;
  lastUpdated: string;
  status: RateStatus;
}

const mockRates: ExchangeRate[] = [
  {
    id: 1,
    currency: "USD",
    rate: 1,
    lastUpdated: "2026-03-08",
    status: "Updated"
  },
  {
    id: 2,
    currency: "EUR",
    rate: 0.92,
    lastUpdated: "2026-03-08",
    status: "Updated"
  },
  {
    id: 3,
    currency: "BDT",
    rate: 118.5,
    lastUpdated: "2026-03-01",
    status: "Stale"
  }
];

const statusColor: Record<RateStatus, "success" | "warning"> = {
  Updated: "success",
  Stale: "warning"
};

export default function ExchangeRatesPage() {
  const [search, setSearch] = useState("");

  const columns: GridColDef<ExchangeRate>[] = [
    { field: "currency", headerName: "Currency", flex: 1 },

    {
      field: "rate",
      headerName: "Rate (Base USD)",
      flex: 1
    },

    {
      field: "lastUpdated",
      headerName: "Last Updated",
      flex: 1
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColor[params.value as RateStatus]}
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
            <Pencil size={18} />
          </IconButton>

          <IconButton size="small">
            <RefreshCw size={18} />
          </IconButton>
        </>
      )
    }
  ];

  const filteredRates = mockRates.filter((rate) =>
    rate.currency.toLowerCase().includes(search.toLowerCase())
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
          Exchange Rates
        </Typography>

        <Button variant="contained">
          Refresh Rates
        </Button>
      </Box>

      {/* Search */}
      <Box mb={2}>
        <TextField
          size="small"
          placeholder="Search currency..."
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