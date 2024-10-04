"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-components/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { IQRSchema } from "@/components/data-table-components/schema";
import { DataTableRowActionsDashboard } from "./data-table-row-actions-dashboard";

export const DashboardColumns: ColumnDef<IQRSchema>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "idNumber",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID No." className="text-muted-foreground" />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">{row.getValue("idNumber")}</div>
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" className="text-muted-foreground" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[500px] capitalize font-normal">
                        {row.getValue("name")}
                    </span>
                </div>
            );
        }
    },
    {
        accessorKey: "attended",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Attended" className="text-muted-foreground" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <span> {row.getValue("attended")}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "points",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Points" className="text-muted-foreground" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex w-[100px] items-center">
                    <span> {row.getValue("points")}</span>
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActionsDashboard row={row} />
    }
];