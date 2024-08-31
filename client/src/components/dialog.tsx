import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React from "react"
import { Button } from "./ui/button"
import { DialogClose } from "@radix-ui/react-dialog"

export function DialogContainer({ Trigger, title, description, children, submit }: { submit?: React.FormEventHandler<HTMLFormElement>, Trigger?: React.ReactNode, title?: string, description?: string, children?: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {Trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>
                            {title}
                        </DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            {children}
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" variant={`outline`} size={`sm`}>
                                Submit
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
