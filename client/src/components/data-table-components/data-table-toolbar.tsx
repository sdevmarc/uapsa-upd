"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "@/components/data-table-components/data-table-view-options";
import { DialogContainer } from "../dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({
    table
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex flex-wrap items-center justify-between">
            <div className="flex flex-1 flex-wrap items-center gap-2">
                <Input
                    placeholder="Filter labels..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => {
                        table.getColumn("name")?.setFilterValue(event.target.value);
                    }}
                    className="h-8 w-[20rem] lg:w-[25rem] placeholder:text-black/50"
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
            <div className="flex gap-2">
                <DialogContainer
                    title="Add Qr"
                    description="Please fill-out the required fields."
                    Trigger={
                        <Button variant={`outline`} size={`sm`}>
                            Add Qr
                        </Button>
                    }
                    children={
                        <>
                            <Label htmlFor="name" className="text-right">
                                Id Number
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                            <Label htmlFor="name" className="text-right">
                                Course
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                        </>
                    }
                />
                <DialogContainer
                    title="Add Qr"
                    description="Please fill-out the required fields."
                    Trigger={
                        <Button variant={`outline`} size={`sm`}>
                            Add Attendance
                        </Button>
                    }
                    children={
                        <>
                            <Label htmlFor="name" className="text-right">
                                Id Number
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                            <Label htmlFor="name" className="text-right">
                                Course
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                        </>
                    }
                />
                 <DialogContainer
                    title="Add Qr"
                    description="Please fill-out the required fields."
                    Trigger={
                        <Button variant={`outline`} size={`sm`}>
                            Add Point
                        </Button>
                    }
                    children={
                        <>
                            <Label htmlFor="name" className="text-right">
                                Id Number
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                            <Label htmlFor="name" className="text-right">
                                Course
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                        </>
                    }
                />
                <DataTableViewOptions table={table} />
            </div>


        </div>
    );
}