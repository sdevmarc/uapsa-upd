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
import { API_CREATE_QR } from "@/api";
import { AlertDialogConfirmation } from "../alert-dialog";
import { useNavigate } from "react-router-dom";
import ScreenLoading from "../screen-loading";
import { toast } from "sonner";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

interface IQr {
    idNumber: string
    name: string
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
    })

    const { mutateAsync: InsertQr, isPending: qrLoading } = useMutation({
        mutationFn: API_CREATE_QR,
        onSuccess: (data) => {
            if (!data.success) return toast("Uh, oh! Something went wrong.", { description: data.message });
            queryClient.invalidateQueries({ queryKey: ['dashboardQr'] })
            return toast("Yay! Success.", { description: "Qr registered successfully!" });
        }
    })

    const handleAddQr = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await InsertQr(qrvalues)
        downloadQRCode({ qr: response.qr })
    }

    const handleQrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setQrValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const downloadQRCode = async ({ qr }: { qr: string }) => {
        if (canvasRef.current) {
            try {
                await QRCode.toCanvas(canvasRef.current, qr, { width: 500 });
                const image = canvasRef.current.toDataURL("image/png");
                const link = document.createElement('a');
                link.href = image;
                link.download = `qrcode-${qr}.png`;
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
            {qrLoading && <ScreenLoading />}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div className="flex flex-1 flex-wrap items-center gap-2">
                <Input
                    placeholder="Search name..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => {
                        table.getColumn("name")?.setFilterValue(event.target.value);
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
                            <Label htmlFor="idNumber" className="text-right">
                                Id Number
                            </Label>
                            <Input required id="idNumber" name="idNumber" onChange={handleQrChange} placeholder="eg. 0001" className="col-span-3 placeholder:text-muted" />
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input required id="name" name="name" onChange={handleQrChange} placeholder="eg. John Doe" className="col-span-3 placeholder:text-muted" />
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
                <DataTableViewOptions table={table} />
            </div>
        </div>
    );
}

