"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import QRCode from 'qrcode';
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "@/components/data-table-components/data-table-view-options";
import { DialogContainer } from "../dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_CREAT_QR } from "@/api";
import { DatePickerAtendance } from "../date-picker";
import { AlertDialogConfirmation } from "../alert-dialog";
import { useNavigate } from "react-router-dom";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

interface IQr {
    idNumber: string
    name: string
    degree: string
}

const now = new Date();
const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
const day = String(now.getDate()).padStart(2, '0');
const year = now.getFullYear();

const formattedDate = `${month}/${day}/${year}`;

export function DataTableToolbar<TData>({
    table
}: DataTableToolbarProps<TData>) {
    const navigate = useNavigate()
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
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries({ queryKey: ['dashboardQr'] })
        }
    })

    const handleAddQr = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await InsertQr(qrvalues)
        await downloadQRCode({ idNumber: qrvalues.idNumber })
    }

    const handleQrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setQrValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const downloadQRCode = async ({ idNumber }: { idNumber: string }) => {
        if (canvasRef.current) {
            try {
                await QRCode.toCanvas(canvasRef.current, idNumber, { width: 500 });
                const image = canvasRef.current.toDataURL("image/png");
                const link = document.createElement('a');
                link.href = image;
                link.download = `qrcode-${idNumber}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error("Error generating QR code:", error);
            }
        }
    };

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
                <AlertDialogConfirmation
                    btnTitle="Add Attendance"
                    title="Are you sure?"
                    description={`This will create a new attendance at ${formattedDate}`}
                    btnContinue={() => navigate('/scanattendance')}
                />
                <AlertDialogConfirmation
                    btnTitle="Add Point"
                    title="Are you sure?"
                    description={`This will direct you to a qr scanner to earn points.`}
                    btnContinue={() => navigate('/scanpoints')}
                />
                {/*  <DialogContainer
                    title="Add Point"
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
                /> */}
                <DataTableViewOptions table={table} />
            </div>
        </div>
    );
}

