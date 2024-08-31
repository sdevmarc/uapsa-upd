"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "@/components/data-table-components/data-table-view-options";
import { DialogContainer } from "../dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_CREAT_QR } from "@/api";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

interface IQr {
    idNumber: string
    name: string
    degree: string
}

export function DataTableToolbarManagement<TData>({
    table
}: DataTableToolbarProps<TData>) {
    const queryClient = useQueryClient();
    const isFiltered = table.getState().columnFilters.length > 0;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [qrvalues, setQrValues] = useState<IQr>({
        idNumber: '',
        name: '',
        degree: ''
    })

    const { mutateAsync: InsertQr, isPending: qrLoading } = useMutation({
        mutationFn: API_CREAT_QR,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dashboardQr'] })
        }
    })

    const handleAddQr = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
         await InsertQr(qrvalues)
    }

    const handleQrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setQrValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="flex flex-wrap items-center justify-between">
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div className="flex flex-1 flex-wrap items-center gap-2">
                <Input
                    placeholder="Search name..."
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
                    submit={handleAddQr}
                    title="Add Access"
                    description="Please fill-out the required fields."
                    Trigger={
                        <Button variant={`outline`} size={`sm`}>
                            Add Access
                        </Button>
                    }
                    children={
                        <>
                            <Label htmlFor="name" className="text-right">
                                Id Number
                            </Label>
                            <Input required id="name" name="idNumber" onChange={handleQrChange} placeholder="eg. 0001" className="col-span-3 placeholder:text-muted" />
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input required id="name" name="name" onChange={handleQrChange} placeholder="eg. John Doe" className="col-span-3 placeholder:text-muted" />
                            <Label htmlFor="name" className="text-right">
                                Course
                            </Label>
                            <Input required id="name" name="degree" onChange={handleQrChange} placeholder="eg. BS--" className="col-span-3 placeholder:text-muted" />
                        </>
                    }
                />
                <DataTableViewOptions table={table} />
            </div>
        </div>
    );
}

