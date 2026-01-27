import {Checkbox, Menu, MenuItem} from "@mui/material";
import {useState} from "react";
import PrimaryButton from "../button/primary-button.tsx";
import type {Column} from "./table.tsx";
import {ChevronDown} from "lucide-react";

type ColumnVisibilityMenuProps<T> = {
  columns: Column<T>[];
  onToggle: (dataIndex: keyof T) => void;
};

function ColumnVisibilityMenu<T>({columns, onToggle}: ColumnVisibilityMenuProps<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <PrimaryButton
        slim
        className={'h-8 w-28'}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        icon={ChevronDown}
      >
        Columns
      </PrimaryButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {columns.map(col => (
          <MenuItem
            key={String(col.dataIndex)}
            onClick={() => onToggle(col.dataIndex)}
            dense
          >
            <Checkbox
              checked={!col.hidden}
              onClick={(e) => e.stopPropagation()} // stop double toggle
            />
            {col.header}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default ColumnVisibilityMenu;
