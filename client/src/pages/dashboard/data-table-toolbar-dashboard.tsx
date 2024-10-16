"use client"

import { Cross2Icon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import QRCode from 'qrcode'
import { Button } from "@/components/ui/button"
import { DataTableViewOptions } from "@/components/data-table-components/data-table-view-options"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useEffect, useRef, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_CREATE_POINT, API_CREATE_QR, API_DELETE_MULTIPLE_QR, API_LESS_MULTIPLE_ATTENDANCE, API_LESS_MULTIPLE_POINTS, API_RESET_QR_PROGRESS } from "@/api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import ScreenLoading from "@/components/screen-loading"
import { DialogContainer } from "@/components/dialog"
import { AlertDialogConfirmation } from "@/components/alert-dialog"
import { IQRSchema } from "@/components/data-table-components/schema"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
    isrows: boolean
    checks: IQRSchema[]
    onResetRows: () => void
    onResetSelections: () => void
}

interface IQr {
    idNumber: string
    name: string
}

const now = new Date()
const month = String(now.getMonth() + 1).padStart(2, '0') // Months are zero-based, so add 1
const day = String(now.getDate()).padStart(2, '0')
const year = now.getFullYear()

const formattedDate = `${month}/${day}/${year}`

export function DataTableToolbarDashboard<TData>({
    table,
    isrows,
    checks,
    onResetRows,
    onResetSelections
}: DataTableToolbarProps<TData>) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const isFiltered = table.getState().columnFilters.length > 0
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [qrvalues, setQrValues] = useState<IQr>({
        idNumber: '',
        name: '',
    })
    const [idNumbers, setIdNumbers] = useState<string[]>([])
    const [less, setLess] = useState({
        points: 0,
        attended: 0
    })
    const [point, setPoint] = useState<number>(0)
    const token = localStorage.getItem('token') || ''

    useEffect(() => {
        if (!token) { navigate('/') }
    }, [token, navigate])

    const { mutateAsync: InsertQr, isPending: qrLoading } = useMutation({
        mutationFn: API_CREATE_QR,
        onSuccess: async (data) => {
            if (!data.success) return toast("Uh, oh! Something went wrong.", { description: data.message })
            queryClient.invalidateQueries({ queryKey: ['qrstatus'] })
            await queryClient.refetchQueries({ queryKey: ['qrstatus'] })
            return toast("Yay! Success.", { description: "Qr registered successfully!" })
        }
    })

    const handleAddQr = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await InsertQr(qrvalues)
        downloadQRCode({ qr: response.qr.new_qr, idNumber: response.qr.idNumber })
    }

    const handleQrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setQrValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const downloadQRCode = async ({ qr, idNumber }: { qr: string, idNumber: string }) => {
        if (canvasRef.current) {
            try {
                await QRCode.toCanvas(canvasRef.current, qr, { width: 500 })
                const image = canvasRef.current.toDataURL("image/png")
                const link = document.createElement('a')
                link.href = image

                link.download = `qrcode-${idNumber}.png`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            } catch (error) {
                console.error("Error generating QR code:", error)
            }
        }
    }

    useEffect(() => {
        if (checks.length > 0) {
            const idNumbers = checks.map((item) => item.idNumber as string)
            setIdNumbers(idNumbers)
        } else {
            setIdNumbers(idNumbers)
        }
    }, [checks])

    const { mutateAsync: insertPoint, isPending: insertpointLoading } = useMutation({
        mutationFn: API_CREATE_POINT,
        onSuccess: async (data) => {
            if (!data.success) return toast("Uh, oh! Something went wrong.", { description: 'Failed to add point.' })
            await queryClient.invalidateQueries({ queryKey: ['qrstatus'] })
            await queryClient.refetchQueries({ queryKey: ['qrstatus'] })
            return toast("Yay, Success!", { description: data.message })
        }
    })

    const { mutateAsync: deletemultipleqruser, isPending: deleteqruserLoading } = useMutation({
        mutationFn: API_DELETE_MULTIPLE_QR,
        onSuccess: async (data) => {
            if (!data.success) return toast("Uh, oh! Something went wrong.", { description: 'Failed to delete users.' })
            await queryClient.invalidateQueries({ queryKey: ['qrstatus'] })
            await queryClient.refetchQueries({ queryKey: ['qrstatus'] })
            return toast("Yay, Success!", { description: data.message })
        }
    })

    const { mutateAsync: resetprogress, isPending: resetprogressLoading } = useMutation({
        mutationFn: API_RESET_QR_PROGRESS,
        onSuccess: async (data) => {
            if (!data.success) return toast("Uh, oh! Something went wrong.", { description: 'Failed to reset users.' })
            await queryClient.invalidateQueries({ queryKey: ['qrstatus'] })
            await queryClient.refetchQueries({ queryKey: ['qrstatus'] })
            return toast("Yay, Success!", { description: data.message })
        }
    })

    const { mutateAsync: lesspoints, isPending: lesspointsLoading } = useMutation({
        mutationFn: API_LESS_MULTIPLE_POINTS,
        onSuccess: async (data) => {
            if (!data.success) return toast("Uh, oh! Something went wrong.", { description: 'Failed to reset users.' })
            await queryClient.invalidateQueries({ queryKey: ['qrstatus'] })
            await queryClient.refetchQueries({ queryKey: ['qrstatus'] })
            return toast("Yay, Success!", { description: data.message })
        }
    })

    const { mutateAsync: lessattendance, isPending: lessattendanceLoading } = useMutation({
        mutationFn: API_LESS_MULTIPLE_ATTENDANCE,
        onSuccess: async (data) => {
            if (!data.success) return toast("Uh, oh! Something went wrong.", { description: 'Failed to reset users.' })
            await queryClient.invalidateQueries({ queryKey: ['qrstatus'] })
            await queryClient.refetchQueries({ queryKey: ['qrstatus'] })
            return toast("Yay, Success!", { description: data.message })
        }
    })

    const handleAddPointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setPoint(Number(value))
    }

    const handleAddPoint = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isNaN(Number(point))) {
            toast("Uh, oh! Something went wrong.", { description: "Point should be a number." })
            return
        }
        await insertPoint({ idNumbers, points: point })
        onResetSelections()
    }

    const handleDeleteQrUser = async () => {
        await deletemultipleqruser({ idNumber: idNumbers, token })
        onResetRows()
    }

    const handleResetProgress = async () => {
        await resetprogress({ idNumber: idNumbers, token })
        onResetSelections()
    }

    const handleLessPoints = async () => {
        if (isNaN(Number(less.points))) {
            toast("Uh, oh! Something went wrong.", { description: "Point should be a number." })
            return
        }
        if (isNaN(Number(less.points === 0))) return

        await lesspoints({ idNumber: idNumbers, points: less.points, token })
        onResetSelections()
    }


    const handleLessAttendance = async () => {
        if (isNaN(Number(less.attended))) {
            toast("Uh, oh! Something went wrong.", { description: "Point should be a number." })
            return
        }
        if (isNaN(Number(less.attended === 0))) return

        await lessattendance({ idNumber: idNumbers, attended: less.attended, token })
        onResetSelections()
    }

    const isLoading = qrLoading || insertpointLoading || deleteqruserLoading || resetprogressLoading

    return (
        <div className="flex flex-wrap items-center justify-between" >
            {isLoading && <ScreenLoading />}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            < div className="flex flex-1 flex-wrap items-center gap-2" >
                <Input
                    placeholder="Search ID Number..."
                    value={(table.getColumn("idNumber")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => {
                        table.getColumn("idNumber")?.setFilterValue(event.target.value)
                    }}
                    className="h-8 w-[20rem] lg:w-[25rem] placeholder:text-muted"
                />
                {
                    isFiltered && (
                        <Button
                            variant="ghost"
                            onClick={() => table.resetColumnFilters()}
                            className="h-8 px-2 lg:px-3"
                        >
                            Reset
                            <Cross2Icon className="ml-2 h-4 w-4" />
                        </Button>
                    )
                }
                {
                    isrows &&
                    <>
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
                            <DropdownMenuContent align="end" className="w-[160px] flex flex-col gap-1">
                                <DialogContainer
                                    disabled={insertpointLoading}
                                    submit={handleAddPoint}
                                    title="Add Point"
                                    description="Please fill-out the required fields."
                                    Trigger={
                                        <Button variant={`outline`} size={`sm`}>
                                            Add Point
                                        </Button>
                                    }
                                    children={
                                        <>
                                            <Label htmlFor="points" className="text-right">
                                                Please input a valid number.
                                            </Label>
                                            <Input disabled={insertpointLoading} required id="points" name="points" onChange={handleAddPointChange} placeholder="eg. 2" className="col-span-3 placeholder:text-muted" />
                                        </>
                                    }
                                />
                                <DialogContainer
                                    disabled={insertpointLoading}
                                    submit={handleLessPoints}
                                    title="Less Point"
                                    description="Please fill-out the required fields."
                                    Trigger={
                                        <Button variant={`outline`} size={`sm`}>
                                            Less Point
                                        </Button>
                                    }
                                    children={
                                        <>
                                            <Label htmlFor="points" className="text-right">
                                                Please input a valid number.
                                            </Label>
                                            <Input disabled={lesspointsLoading} required id="points" name="points" onChange={(e) => setLess(prev => ({ ...prev, points: Number(e.target.value) }))} placeholder="eg. 20" className="col-span-3 placeholder:text-muted" />
                                        </>
                                    }
                                />
                                <DialogContainer
                                    disabled={insertpointLoading}
                                    submit={handleLessAttendance}
                                    title="Less Attendance"
                                    description="Please fill-out the required fields."
                                    Trigger={
                                        <Button variant={`outline`} size={`sm`}>
                                            Less Attendance
                                        </Button>
                                    }
                                    children={
                                        <>
                                            <Label htmlFor="attendance" className="text-right">
                                                Please input a valid number.
                                            </Label>
                                            <Input disabled={lessattendanceLoading} required id="attendance" name="attendance" onChange={(e) => setLess(prev => ({ ...prev, attended: Number(e.target.value) }))} placeholder="eg. 20" className="col-span-3 placeholder:text-muted" />
                                        </>
                                    }
                                />
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialogConfirmation
                            btnTitle="Reset Progress"
                            title="Are you sure?"
                            description={`This will reset its attendance and points.`}
                            btnContinue={handleResetProgress}
                        />
                        <AlertDialogConfirmation
                            btnTitle="Delete"
                            title="Are you sure?"
                            description={`This will permanently delete the user and its progress.`}
                            btnContinue={handleDeleteQrUser}
                        />
                    </>
                }
            </div >
            <div className="flex gap-2">
                <DialogContainer
                    disabled={qrLoading}
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
                {/* <AlertDialogConfirmation
                    btnTitle="Add Point"
                    title="Are you sure?"
                    description={`This will direct you to a qr scanner to earn points.`}
                    btnContinue={() => navigate('/scanpoints')}
                /> */}
                <DataTableViewOptions table={table} />
            </div>
        </div >
    )
}

