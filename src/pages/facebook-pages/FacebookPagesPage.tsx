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
import {RefreshCw, Trash2, Pencil} from "lucide-react";

type PageStatus = "Connected" | "Disconnected";

interface FacebookPage {
  id: number;
  name: string;
  pageId: string;
  admins: string;
  followers: number;
  status: PageStatus;
}

const mockPages: FacebookPage[] = [
  {
    id: 1,
    name: "Nike Official",
    pageId: "nike_official",
    admins: "John Doe, Jane Smith",
    followers: 1200000,
    status: "Connected"
  },
  {
    id: 2,
    name: "Samsung Ads",
    pageId: "samsung_ads",
    admins: "Alice Brown",
    followers: 800000,
    status: "Connected"
  },
  {
    id: 3,
    name: "Adidas Promotions",
    pageId: "adidas_promos",
    admins: "Michael Lee",
    followers: 450000,
    status: "Disconnected"
  }
];

const statusColor: Record<PageStatus, "success" | "default"> = {
  Connected: "success",
  Disconnected: "default"
};

export default function FacebookPagesPage() {
  const [search, setSearch] = useState("");

  const columns: GridColDef<FacebookPage>[] = [
    {field: "name", headerName: "Page Name", flex: 1.5},
    {field: "pageId", headerName: "Page ID", flex: 1},
    {field: "admins", headerName: "Admins", flex: 1},
    {field: "followers", headerName: "Followers", flex: 0.8},
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColor[params.value as PageStatus]}
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
            <RefreshCw size={18}/>
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

  const filteredPages = mockPages.filter((page) =>
    page.name.toLowerCase().includes(search.toLowerCase())
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
          Facebook Pages
        </Typography>

        <Button variant="contained">
          Connect Page
        </Button>
      </Box>

      {/* Search */}
      <Box mb={2}>
        <TextField
          size="small"
          placeholder="Search pages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* Table */}
      <Paper>
        <DataGrid
          rows={filteredPages}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}