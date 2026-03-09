"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { columns } from "./columns";
import { DataTable } from "@/components/table/data-table";

import { TableSkeleton } from "@/components/table/tableSkeleton";
import { useDebouncedValue } from "@/hooks/debounce";
import { Stats } from "./stats";
import { Button } from "@/components/ui/button";
import { Form } from "./form";

import DeleteModal from "@/components/modal/delete-modal";
import {
  penalityTypeManipulation,
  usePenalityTypes,
} from "@/hooks/api/penalityType";
import { PenalityType } from "@/types/penalityType";

export default function PenalityTypePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 1000);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<PenalityType | null>(null);
  const { deletePenalityType, isDeleting } = penalityTypeManipulation();
  const {
    data: penalityTypes = {
      data: [],
      total: 0,
      totalPages: 0,
      currentPage: 0,
      limit: 0,
    },
    isLoading,
    isError,
  } = usePenalityTypes(currentPage, itemsPerPage, debouncedSearch);

  const toggleModal = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
      setSelectedRole(null);
    } else {
      setDeleteModalOpen(!deleteModalOpen);
    }
  };

  const handleSelectedRole = (penalityType: PenalityType) => {
    setSelectedRole(penalityType);
  };

  const handleDeleteRole = async () => {
    selectedRole && (await deletePenalityType(selectedRole));
    setSelectedRole(null);
    toggleModal();
  };

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch penalty types. Please try again.");
    }
  }, [isError]);

  return (
    <>
      <div className="flex justify-end">
        <Button type="button" className="mb-2" onClick={() => setIsOpen(true)}>
          Add New Penalty Type
        </Button>
      </div>
      <Stats penalityTypes={penalityTypes} loading={isLoading} />
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <DataTable
            columns={columns(handleSelectedRole, setDeleteModalOpen, setIsOpen)}
            data={penalityTypes.data}
            currentPage={penalityTypes.currentPage || 1}
            itemsPerPage={penalityTypes.limit || 5}
            totalPages={penalityTypes.totalPages || 1}
            search={search}
            onPageChange={(page: number) => setCurrentPage(page)}
            onItemsPerPageChange={(limit: number) => setItemsPerPage(limit)}
            onSearch={(value: string) => setSearch(value)}
          />

          {isOpen && (
            <Form toggleModal={toggleModal} penalityTypes={selectedRole} />
          )}
          {deleteModalOpen && (
            <DeleteModal
              onDelete={handleDeleteRole}
              isDeleting={isDeleting}
              toggleModal={toggleModal}
            />
          )}
        </>
      )}
    </>
  );
}
