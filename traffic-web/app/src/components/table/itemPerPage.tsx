'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ItemPerPageProps {
  itemsPerPage: number;
  handleItemsPerPageChange: (value: string) => void;
}

export const ItemPerPage: React.FC<ItemPerPageProps> = ({ itemsPerPage, handleItemsPerPageChange }) => {
  return (
    <Select
      value={String(itemsPerPage)}
      onValueChange={handleItemsPerPageChange}
    >
      <SelectTrigger className="w-[110px]">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
      </SelectContent>
    </Select>
  );
};
