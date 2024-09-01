"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "@/components/data-table-components/data-table-view-options";
import { DialogContainer } from "../dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_SIGN_UP } from "@/api";
import { toast } from "sonner";
import ScreenLoading from "../screen-loading";
import { Eye, EyeOff } from "lucide-react";  // Import the Eye and EyeOff icons

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

interface IQr {
    idNumber: string;
    name: string;
    degree: string;
    email: string;
    password: string;
}

export function DataTableToolbarManagement<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const queryClient = useQueryClient();
    const isFiltered = table.getState().columnFilters.length > 0;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [uservalues, setuservalues] = useState<IQr>({
        idNumber: "",
        name: "",
        degree: "",
        email: "",
        password: "",
    });

    const [isConfirm, setConfirm] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const { mutateAsync: InserUser, isPending: userLoading } = useMutation({
        mutationFn: API_SIGN_UP,
        onSuccess: (data) => {
            if (!data.success) return toast("Uh, oh! Something went wrong.", { description: data.message });
            queryClient.invalidateQueries({ queryKey: ["userManagement"] });
            return toast("Yay! Success.", { description: "User registered successfully!" });
        },
    });

    const handleAddUserAccess = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isConfirm !== uservalues.password) {
            toast("Uh, oh! Something went wrong.", { description: "Your password do not match!" })
            return
        }
        await InserUser(uservalues);

    };

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setuservalues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="flex flex-wrap items-center justify-between">
            {userLoading && <ScreenLoading />}
            <canvas ref={canvasRef} style={{ display: "none" }} />
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
                    submit={handleAddUserAccess}
                    title="Add User Access"
                    description="Please fill-out the required fields."
                    Trigger={
                        <Button variant={`outline`} size={`sm`}>
                            Add Access
                        </Button>
                    }
                    children={
                        <>
                            <Label htmlFor="idNumber" className="text-right">
                                Id No.
                            </Label>
                            <Input
                                required
                                id="idNumber"
                                name="idNumber"
                                onChange={handleUserChange}
                                placeholder="eg. 0001"
                                className="col-span-3 placeholder:text-muted"
                            />
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                required
                                id="name"
                                name="name"
                                onChange={handleUserChange}
                                placeholder="eg. John Doe"
                                className="col-span-3 placeholder:text-muted"
                            />
                            <Label htmlFor="degree" className="text-right">
                                Course
                            </Label>
                            <Input
                                required
                                id="degree"
                                name="degree"
                                onChange={handleUserChange}
                                placeholder="eg. BS--"
                                className="col-span-3 placeholder:text-muted"
                            />
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                required
                                type="email"
                                id="email"
                                name="email"
                                onChange={handleUserChange}
                                placeholder="eg. m@example.com"
                                className="col-span-3 placeholder:text-muted"
                            />
                            <Label htmlFor="password" className="text-right">
                                Password
                            </Label>
                            <div className="relative col-span-3">
                                <Input
                                    required
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    onChange={handleUserChange}
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={toggleShowPassword}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-400" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            <Label htmlFor="confirmpassword" className="text-right">
                                Confirm Password
                            </Label>
                            <div className="relative col-span-3">
                                <Input
                                    required
                                    id="confirmpassword"
                                    name="confirmpassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={toggleShowConfirmPassword}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-400" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </>
                    }
                />
                <DataTableViewOptions table={table} />
            </div>
        </div>
    );
}
