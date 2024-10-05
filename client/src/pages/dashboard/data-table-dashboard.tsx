"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { DataTablePagination } from "@/components/data-table-components/data-table-pagination"
import { DataTableToolbarDashboard } from "./data-table-toolbar-dashboard"
import { IQRSchema } from "@/components/data-table-components/schema"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    // fetchCheck: (e: IQRSchema[]) => void
    resetSelection: boolean
    onResetComplete: () => void
}

export function DataTableDashboard<TData, TValue>({
    columns,
    data,
    // fetchCheck,
    resetSelection,
    onResetComplete
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [isrows, setRows] = React.useState<boolean>(false)
    const [selected, setSelected] = React.useState<IQRSchema[]>([])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues()
    })


    React.useEffect(() => {
        const selectedRows = table.getFilteredSelectedRowModel().rows
        const current_rows = selectedRows.map(row => {
            const original = row.original as IQRSchema
            const { idNumber, name, points, attended } = original
            return { idNumber, name, points, attended }
        })

        if (selectedRows.length > 0) {
            setRows(true)
        } else {
            setRows(false)
        }
        setSelected(current_rows)
        // fetchCheck(current_rows)
    }, [rowSelection, table])

    React.useEffect(() => {
        if (resetSelection) {
            table.resetRowSelection()
            onResetComplete()
        }
    }, [resetSelection, table, onResetComplete])

    return (
        <div className="space-y-4 pb-[13rem]">
            <DataTableToolbarDashboard
                table={table}
                isrows={isrows}
                checks={selected}
                onResetRows={
                    () => {
                        setRows(false)
                        table.resetRowSelection()
                    }
                } 
                onResetSelections={() =>  table.resetRowSelection()}
                />
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    )
}