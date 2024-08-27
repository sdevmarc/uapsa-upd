"use client";

import { ColumnDef } from "@tanstack/react-table";
import { QR } from "@/components/data-table-components/schema";
import { DataTableColumnHeader } from "@/components/data-table-components/data-table-column-header";
import { DataTableRowActions } from "@/components/data-table-components/data-table-row-actions";

export const qrcolumns: ColumnDef<QR>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID No." className="text-text" />
        ),
        cell: ({ row }) => (
            <div className="w-[100px] capitalize">{row.getValue("id")}</div>
        ),
        enableSorting: false,
        enableHiding: false
    },
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
            );
        }
    },
    {
        accessorKey: "course",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Course" className="text-text" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <span className="capitalize"> {row.getValue("course")}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "attended",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Attended" className="text-text" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <span className="capitalize"> {row.getValue("attended")}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "points",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Points" className="text-text" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <span className="capitalize"> {row.getValue("points")}</span>
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />
    }
];