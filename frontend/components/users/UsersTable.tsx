"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/tours/Table";
import useModalClose from "@/hook/useModalClose";
import { handleApi } from "@/lib/handleApi";
import { User } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import Modal from "../Modal";

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalAction, setModalAction] = useState("");

  const handleModalAction = (action: string, user: User) => {
    setModalAction(action);
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setModalAction("");
  };

  const handleConfirm = () => {
    if (!selectedUser) return;

    switch (modalAction) {
      case "promoteGuide":
        // Logic to promote user to guide
        updateUser(selectedUser._id, { role: "guide" });
        break;
      case "promoteLeadGuide":
        // Logic to promote user to tour guide
        updateUser(selectedUser._id, { role: "lead-guide" });
        break;
      case "downgradeUser":
        updateUser(selectedUser._id, { role: "user" });
        // Logic to promote user to tour guide
        break;
      case "disableUser":
        // Logic to deactivate user

        updateUser(selectedUser._id, { active: false });
        break;
      case "deleteUser":
        deleteUser(selectedUser._id);
        break;
      default:
        break;
    }
    handleCloseModal();
  };

  const updateUser = async (
    id: string,
    options: { role?: string; active?: boolean },
  ) => {
    await handleApi(`/users/${id}`, "PATCH", { id, ...options }).then(
      (data) => {
        if (data?.status === "success") {
          toast.success("User updated");
          router.refresh();
        }
      },
    );
  };

  const deleteUser = async (id: string) => {
    await handleApi(`/users/${id}`, "DELETE").then((data) => {
      if (data?.status === "success") {
        toast.success("User deleted");
        router.refresh();
      }
    });
  };

  const [showMenuForUser, setShowMenuForUser] = useState<string | null>(null);
  useModalClose(() => {
    setShowMenuForUser(null);
  }, ".dropdown");
  const toggleMenuForUser = (tourId: string) => {
    if (showMenuForUser === tourId) {
      setShowMenuForUser(null);
    } else {
      setShowMenuForUser(tourId);
    }
  };
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Role</TableHeader>
            <TableHeader className="w-20">Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="flex flex-wrap items-center gap-8">
                {user.photo ? (
                  <Image
                    src={user.photo}
                    alt={user.name}
                    width={44}
                    height={44}
                    className="aspect-square rounded-full object-cover"
                  />
                ) : (
                  <p className="grid size-11 place-content-center rounded-full bg-gray-300">
                    {user.name[0]}
                  </p>
                )}
                {user.name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <RoleLabel role={user.role} />
              </TableCell>
              <TableCell>
                <button
                  onClick={() => toggleMenuForUser(user._id)}
                  className="dropdown absolute inset-0 w-full text-zinc-500"
                >
                  &#8226;&#8226;&#8226;
                </button>

                {showMenuForUser === user._id && (
                  <div className="dropdown absolute right-0 top-full z-10 mt-[1px] w-48 rounded-md border border-primary bg-white shadow-lg">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {user.role !== "guide" && user.role !== "admin" && (
                        <button
                          onClick={() =>
                            handleModalAction("promoteGuide", user)
                          }
                          className="block w-full px-4 py-2 text-left text-sm text-zinc-500 hover:bg-zinc-100"
                          role="menuitem"
                        >
                          {user.role === "lead-guide" ? "Demote" : "Promote"} to
                          Guide
                        </button>
                      )}

                      {user.role !== "lead-guide" && user.role !== "admin" && (
                        <button
                          onClick={() =>
                            handleModalAction("promoteLeadGuide", user)
                          }
                          className="block w-full px-4 py-2 text-left text-sm text-zinc-500 hover:bg-zinc-100"
                          role="menuitem"
                        >
                          Promote to Lead Guide
                        </button>
                      )}

                      {user.role !== "user" && user.role !== "admin" && (
                        <button
                          onClick={() =>
                            handleModalAction("downgradeUser", user)
                          }
                          className="block w-full px-4 py-2 text-left text-sm text-zinc-500 hover:bg-zinc-100"
                          role="menuitem"
                        >
                          Downgrade to User
                        </button>
                      )}

                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleModalAction("disableUser", user)}
                          className="block w-full px-4 py-2 text-left text-sm text-zinc-500 hover:bg-zinc-100"
                          role="menuitem"
                        >
                          Disable User
                        </button>
                      )}

                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleModalAction("deleteUser", user)}
                          className="block w-full px-4 py-2 text-left text-sm text-zinc-500 hover:bg-zinc-100"
                          role="menuitem"
                        >
                          Delete User
                        </button>
                      )}
                      {user.role === "admin" && (
                        <li className="block w-full px-4 py-2 text-left text-sm text-zinc-500 hover:bg-zinc-100">
                          You cannot alter admin
                        </li>
                      )}
                    </div>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title={`Action: ${modalAction}`}
        description={`Are you sure you want to ${modalAction.toLowerCase()} this user?`}
      />
    </>
  );
};

const RoleLabel = ({ role }: { role: string }) => {
  let colorClass = "";
  let borderColorClass = "";
  let textClass = "";

  switch (role) {
    case "Guide":
      colorClass = "bg-blue-500/20";
      borderColorClass = "border-blue-600";
      textClass = "text-blue-600";
      break;
    case "Tour-Guide":
      colorClass = "bg-purple-500/20";
      borderColorClass = "border-purple-600";
      textClass = "text-purple-600";
      break;
    default:
      colorClass = "bg-gray-500/20";
      borderColorClass = "border-gray-600";
      textClass = "text-gray-600";
      break;
  }

  return (
    <span
      className={`${textClass} ${colorClass} ${borderColorClass} inline-block rounded-full border-2 px-3 py-1 text-xs font-semibold`}
    >
      {role}
    </span>
  );
};

export default UsersTable;
