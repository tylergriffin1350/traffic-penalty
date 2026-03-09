import React, { useState } from "react";
import { UserData } from "@/types/user";
import { columns } from "./columns";
import { DataTable } from "@/components/table/data-table";
import { useUsers } from "@/hooks/api/users";
import { useDebouncedValue } from "@/hooks/debounce";
import { Button } from "@/components/ui/button";
import { Stats } from "./stats";
import { TableSkeleton } from "@/components/table/tableSkeleton";
import { Form } from "./form";
import DeleteModal from "@/components/modal/delete-modal";
import { userManipulation } from "@/hooks/api/users";
import { useAuthContext } from "@/context/AuthClientProvider";

export default function UserPage() {
  const { user } = useAuthContext();
  //const { deleteUser, isDeleting } = userManipulation();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 1000);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const {
    data: users = {
      data: [],
      total: 0,
      totalPages: 0,
      currentPage: 0,
      limit: 0,
    },
    isLoading,
  } = useUsers(currentPage, itemsPerPage, debouncedSearch);

  const toggleModal = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
      setSelectedUser(null);
    } else {
      setDeleteModalOpen(!deleteModalOpen);
    }
  };

  const handleSelected = (user: UserData) => {
    setSelectedUser(user);
  };

  //   const handleDelete = async () => {
  //     selectedUser && (await deleteUser(selectedUser));
  //     setSelectedUser(null);
  //     toggleModal();
  //   };

  return (
    <>
      <div className="flex justify-end">
        <Button type="button" className="mb-2" onClick={() => setIsOpen(true)}>
          Add New User
        </Button>
      </div>
      <Stats users={users} loading={isLoading} />
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <DataTable
            columns={columns(handleSelected, setDeleteModalOpen, setIsOpen)}
            data={users.data}
            currentPage={users.currentPage}
            itemsPerPage={users.limit}
            totalPages={users.totalPages}
            search={search}
            onPageChange={(page: number) => setCurrentPage(page)}
            onItemsPerPageChange={(limit: number) => setItemsPerPage(limit)}
            onSearch={(value: string) => setSearch(value)}
          />

          {isOpen && user && (
            <Form toggleModal={toggleModal} users={selectedUser} />
          )}
          {/* {deleteModalOpen && (
            <DeleteModal
              onDelete={handleDelete}
              isDeleting={isDeleting}
              toggleModal={toggleModal}
            />
          )} */}
        </>
      )}
    </>
  );
}
