import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"

interface DialogContainerProps {
    Trigger?: React.ReactNode;
    title?: string;
    description?: string;
    children?: React.ReactNode;
    disabled: boolean
    submit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
}

export function DialogContainer({ Trigger, title, description, children, submit, disabled }: DialogContainerProps) {
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submit) {
            await submit(e);
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {Trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    <div className="w-full py-4">
                        {children}
                    </div>
                    <DialogFooter>
                        <Button disabled={disabled} type="submit" variant="outline" size="sm">
                            {disabled ? 'Submitting...' : 'Submit'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}