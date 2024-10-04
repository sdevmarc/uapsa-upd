"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import QRCode from 'qrcode'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useEffect, useRef } from "react"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { API_DELETE_QR } from "@/api"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import ScreenLoading from "@/components/screen-loading"
import { SERVER } from "@/constants"

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export function DataTableRowActionsDashboard<TData>({ row }: DataTableRowActionsProps<TData>) {
    const navigate = useNavigate()
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const queryClient = useQueryClient()
    const token = localStorage.getItem('token') ?? ''

    useEffect(() => {
        if (!token) { navigate('/') }
    }, [token, navigate])

    const downloadQRCode = async () => {
        if (canvasRef.current) {
            const qr = (row.original as any)._id
            const idNumber = (row.original as any).idNumber

            const encodedQr = btoa(qr)
            const new_qr = `${SERVER}${encodedQr}`
            try {
                await QRCode.toCanvas(canvasRef.current, new_qr, { width: 500 })
                const image = canvasRef.current.toDataURL("image/png")
                const link = document.createElement('a')
                link.href = image
                link.download = `qrcode-${idNumber}.png`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            } catch (error) {
                console.error("Error generating QR code:s", error)
            }
        }
    }

    const { mutateAsync: deleteQr, isPending: deleteqrLoading } = useMutation({
        mutationFn: API_DELETE_QR,
        onSuccess: (data) => {
            if (!data.success) return toast("Uh oh! something went wrong.", { description: 'Qr failed to delete.' })
            queryClient.invalidateQueries({ queryKey: ['dashboardQr'] })
            return toast("Yay! Success.", { description: data.message })
        }
    })

    const handleDelete = async () => {
        const qr = (row.original as any)._id
        await deleteQr({ qr, token })
    }

    return (
        <>
            {deleteqrLoading && <ScreenLoading />}
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
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleDelete}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}