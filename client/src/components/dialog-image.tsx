import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"

export function DialogImage({ trigger, children, download }: { download?: React.MouseEventHandler<HTMLButtonElement>, trigger: React.ReactNode, children: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {children}
                <DialogFooter>
                    {/* <DialogClose>
                        <Button type="button">Close</Button>
                    </DialogClose>
                    <Button onClick={download} type="button">Download QR</Button> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
