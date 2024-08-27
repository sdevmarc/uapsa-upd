"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { incomeType, categories } from "@/components/data-table-components/data";
import { DataTableFacetedFilter } from "@/components/data-table-components/data-table-faceted-filter";
import { useState } from "react";
import { DataTableViewOptions } from "@/components/data-table-components/data-table-view-options";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({
    table
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
        from: new Date(new Date().getFullYear(), 0, 1),
        to: new Date()
    });

    const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
        setDateRange({ from, to });
        // Filter table data based on selected date range
        table.getColumn("date")?.setFilterValue([from, to]);
    };

    return (
        <div className="flex flex-wrap items-center justify-between">
            <div className="flex flex-1 flex-wrap items-center gap-2">
                <Input
                    placeholder="Filter labels..."
                    value={(table.getColumn("note")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => {
                        table.getColumn("note")?.setFilterValue(event.target.value);
                    }}
                    className="h-8 w-[20rem] lg:w-[25rem] placeholder:text-muted"
                />
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>

            <DataTableViewOptions table={table} />
        </div>
    );
}