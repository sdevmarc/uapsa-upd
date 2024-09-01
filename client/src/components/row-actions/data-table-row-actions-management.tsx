"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { API_DELETE_USER } from "@/api";
import { useEffect } from "react";
import { toast } from "sonner";
import ScreenLoading from "../screen-loading";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActionsManagement<TData>({ row }: DataTableRowActionsProps<TData>) {
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const token = localStorage.getItem('token') ?? '';

    useEffect(() => {
        if (!token) { navigate('/') }
    }, [token, navigate]);

    const { mutateAsync: deleteUser, isPending: userLoading } = useMutation({
        mutationFn: API_DELETE_USER,
        onSuccess: (data) => {
            if (!data.success) return toast("Uh oh! something went wrong.", { description: 'User failed to delete.' })

            queryClient.invalidateQueries({ queryKey: ['userManagement'] })
            return toast("Uh oh! something went wrong.", { description: 'User successfully deleted!' })
        }
    })

    const handleDelete = async () => {
        const id = (row.original as any)._id
        await deleteUser({ id, token })
    }

    return (
        <DropdownMenu>
            {userLoading && <ScreenLoading />}
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
                <DropdownMenuItem onClick={handleDelete}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}