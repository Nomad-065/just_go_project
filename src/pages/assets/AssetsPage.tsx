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
import {Plus, Pencil, Trash2, Eye} from "lucide-react";

type AssetType = "Image" | "Video" | "HTML";
type AssetStatus = "Active" | "Archived";

interface Asset {
  id: number;
  name: string;
  type: AssetType;
  size: string;
  status: AssetStatus;
}

const mockAssets: Asset[] = [
  {
    id: 1,
    name: "Nike Banner 300x250",
    type: "Image",
    size: "120 KB",
    status: "Active"
  },
  {
    id: 2,
    name: "Samsung Promo Video",
    type: "Video",
    size: "8.5 MB",
    status: "Active"
  },
  {
    id: 3,
    name: "Adidas Interactive Ad",
    type: "HTML",
    size: "340 KB",
    status: "Archived"
  }
];

const statusColor: Record<AssetStatus, "success" | "default"> = {
  Active: "success",
  Archived: "default"
};

export default function AssetsPage() {
  const [search, setSearch] = useState("");

  const columns: GridColDef<Asset>[] = [
    {field: "name", headerName: "Asset Name", flex: 1.5},

    {field: "type", headerName: "Type", flex: 1},

    {field: "size", headerName: "Size", flex: 0.7},

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColor[params.value as AssetStatus]}
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
            <Eye size={18}/>
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

  const filteredAssets = mockAssets.filter((asset) =>
    asset.name.toLowerCase().includes(search.toLowerCase())
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
          Assets
        </Typography>

        <Button
          variant="contained"
          startIcon={<Plus size={18}/>}
        >
          Upload Asset
        </Button>
      </Box>

      {/* Search */}
      <Box mb={2}>
        <TextField
          size="small"
          placeholder="Search assets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* Table */}
      <Paper>
        <DataGrid
          rows={filteredAssets}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}