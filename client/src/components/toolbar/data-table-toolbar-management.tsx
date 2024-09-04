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
import { API_CREATE_USER } from "@/api";
import { toast } from "sonner";
import ScreenLoading from "../screen-loading";
import { Eye, EyeOff } from "lucide-react";  // Import the Eye and EyeOff icons
import { IFormUser } from "@/interface";
import { ComboBox } from "../combo-box";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

const Lists = [
    { value: 'exeboard', label: 'Exeboard' },
    { value: 'membership', label: 'Membership' },
    { value: 'academic', label: 'Academic' },
    { value: 'external', label: 'External' },
    { value: 'publicity', label: 'Publicity' },
    { value: 'finance', label: 'Finance' },
    { value: 'logistic', label: 'Logistic' },
    { value: 'internal', label: 'Internal' },
]

export function DataTableToolbarManagement<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const queryClient = useQueryClient();
    const isFiltered = table.getState().columnFilters.length > 0;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isrole, setRole] = useState<string>('')
    const [uservalues, setuservalues] = useState<IFormUser>({
        name: "",
        email: "",
        password: ""
    });

    const [isConfirm, setConfirm] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const { mutateAsync: InserUser, isPending: insertuserLoading } = useMutation({
        mutationFn: API_CREATE_USER,
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
        await InserUser(
            {
                name: uservalues.name,
                email: uservalues.email,
                password: uservalues.password,
                role: isrole
            }
        );
        setRole('')
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
            {insertuserLoading && <ScreenLoading />}
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
                            <div className="w-full flex flex-col gap-2">
                                <div className="w-full flex justify-between items-center gap-4">
                                    <Label htmlFor="name">
                                        Name
                                    </Label>
                                    <Input
                                        required
                                        id="name"
                                        name="name"
                                        onChange={handleUserChange}
                                        placeholder="eg. John Doe"
                                        className="w-[75%] placeholder:text-muted"
                                    />
                                </div>

                                <div className="w-full flex justify-between items-center gap-4">
                                    <h1 className="text-sm font-medium">Role</h1>
                                    <ComboBox
                                        type={(e) => setRole(e || '')}
                                        title='None'
                                        lists={Lists}
                                        value={isrole}
                                    />
                                </div>

                                <div className="w-full flex justify-between items-center gap-4">
                                    <Label htmlFor="email">
                                        Email
                                    </Label>
                                    <Input
                                        required
                                        type="email"
                                        id="email"
                                        name="email"
                                        onChange={handleUserChange}
                                        placeholder="eg. m@example.com"
                                        className="w-[75%] placeholder:text-muted"
                                    />
                                </div>

                                <div className="w-full flex justify-between items-center gap-4">
                                    <Label htmlFor="password">
                                        Password
                                    </Label>
                                    <div className="w-[75%] relative">
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
                                </div>

                                <div className="w-full flex justify-between items-center gap-4">
                                    <Label htmlFor="confirmpassword">
                                        Confirm Password
                                    </Label>
                                    <div className="w-[75%] relative">
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
                                </div>
                            </div>

                        </>
                    }
                />
                <DataTableViewOptions table={table} />
            </div>
        </div>
    );
}
