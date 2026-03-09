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
import { driverManipulation, useDrivers } from "@/hooks/api/driver";
import { Driver } from "@/types/driver";

export default function DriversPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 1000);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const { deleteDriver, isDeleting } = driverManipulation();
  const {
    data: drivers = {
      data: [],
      total: 0,
      totalPages: 0,
      currentPage: 0,
      limit: 0,
    },
    isLoading,
    isError,
  } = useDrivers(currentPage, itemsPerPage, debouncedSearch);

  const toggleModal = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
      setSelectedDriver(null);
    } else {
      setDeleteModalOpen(!deleteModalOpen);
    }
  };

  const handleSelectedDriver = (driver: Driver) => {
    setSelectedDriver(driver);
  };

  const handleDeleteRole = async () => {
    selectedDriver && (await deleteDriver(selectedDriver));
    setSelectedDriver(null);
    toggleModal();
  };

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch drivers. Please try again.");
    }
  }, [isError]);

  return (
    <>
      <div className="flex justify-end">
        <Button type="button" className="mb-2" onClick={() => setIsOpen(true)}>
          Add New Driver
        </Button>
      </div>
      <Stats drivers={drivers} loading={isLoading} />
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <DataTable
            columns={columns(
              handleSelectedDriver,
              setDeleteModalOpen,
              setIsOpen
            )}
            data={drivers.data}
            currentPage={drivers.currentPage || 1}
            itemsPerPage={drivers.limit || 5}
            totalPages={drivers.totalPages || 1}
            search={search}
            onPageChange={(page: number) => setCurrentPage(page)}
            onItemsPerPageChange={(limit: number) => setItemsPerPage(limit)}
            onSearch={(value: string) => setSearch(value)}
          />

          {isOpen && <Form toggleModal={toggleModal} driver={selectedDriver} />}
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
