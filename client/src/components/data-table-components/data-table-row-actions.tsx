"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import QRCode from 'qrcode';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useRef } from "react";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const downloadQRCode = async () => {
        if (canvasRef.current) {
            const idNumber = (row.original as any).idNumber
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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={downloadQRCode}>
                    Download Qr
                </DropdownMenuItem>

                <canvas ref={canvasRef} style={{ display: 'none' }} />
                <DropdownMenuItem>View Attendance</DropdownMenuItem>
                {/* <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}