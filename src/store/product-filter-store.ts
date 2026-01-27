import {create} from 'zustand';

interface ProductFilterStore {
  filter: string;
  setFilter: (value: string) => void;

  sortBy: string;
  setSortBy: (value: string) => void;
  toggleSortBy: (value: string) => void;

  order: "asc" | "desc";

}

export const useProductFilterStore = create<ProductFilterStore>((set, get) => ({
  filter: '',
  setFilter: (value) => set({filter: value}),

  sortBy: "",
  setSortBy: (value) => set({sortBy: value}),

  order: "asc",
  toggleSortBy: (field) => {
    const { sortBy, order } = get();

    if (sortBy !== field) {
      // New field → ascending
      set({ sortBy: field, order: "asc" });
    } else if (order === "asc") {
      // Currently ascending → switch to descending
      set({ order: "desc" });
    } else if (order === "desc") {
      // Currently descending → reset sorting
      set({ sortBy: "", order: "asc" });
    }
  },
}));
