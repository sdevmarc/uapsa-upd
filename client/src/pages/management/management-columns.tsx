"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table-components/data-table-column-header"
import { IManagementSchema } from "@/components/data-table-components/schema"
import { DataTableRowActionsManagement } from "./data-table-row-actions-management"

export const ManagementColumns: ColumnDef<IManagementSchema>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" className="text-text" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] truncate capitalize font-medium">
                        {row.getValue("name")}
                    </span>
                </div>
            )
        }
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" className="text-text" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <span> {row.getValue("email")}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "role",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Role" className="text-text" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <span className="capitalize">{row.getValue("role")}</span>
                </div>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActionsManagement row={row} />
    }
]