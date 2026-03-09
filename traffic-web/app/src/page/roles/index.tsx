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
import { roleManipulation, useRoles } from "@/hooks/api/roles";
import { Roles } from "@/types/roles";

export default function RolesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 1000);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Roles | null>(null);
  const { deleteRole, isDeleting } = roleManipulation();
  const {
    data: roles = {
      data: [],
      total: 0,
      totalPages: 0,
      currentPage: 0,
      limit: 0,
    },
    isLoading,
    isError,
  } = useRoles(currentPage, itemsPerPage, debouncedSearch);

  const toggleModal = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
      setSelectedRole(null);
    } else {
      setDeleteModalOpen(!deleteModalOpen);
    }
  };

  const handleSelectedRole = (role: Roles) => {
    setSelectedRole(role);
  };

  const handleDeleteRole = async () => {
    selectedRole && (await deleteRole(selectedRole));
    setSelectedRole(null);
    toggleModal();
  };

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch roles. Please try again.");
    }
  }, [isError]);

  return (
    <>
      <div className="flex justify-end">
        <Button type="button" className="mb-2" onClick={() => setIsOpen(true)}>
          Add New Role
        </Button>
      </div>
      <Stats roles={roles} loading={isLoading} />
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <DataTable
            columns={columns(handleSelectedRole, setDeleteModalOpen, setIsOpen)}
            data={roles.data}
            currentPage={roles.currentPage || 1}
            itemsPerPage={roles.limit || 5}
            totalPages={roles.totalPages || 1}
            search={search}
            onPageChange={(page: number) => setCurrentPage(page)}
            onItemsPerPageChange={(limit: number) => setItemsPerPage(limit)}
            onSearch={(value: string) => setSearch(value)}
          />

          {isOpen && <Form toggleModal={toggleModal} role={selectedRole} />}
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
