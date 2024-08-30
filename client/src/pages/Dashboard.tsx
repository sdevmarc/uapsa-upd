import { DataTable } from "@/components/data-table-components/data-table";
import { QR } from "@/components/data-table-components/schema";
import Header from "@/components/header";
import QRData from '@/components/data-table-components/data.json'
import { useEffect, useState } from "react";
import { qrcolumns } from "@/components/data-table-components/columns/qr-columns";
import HeadSection, { SubHeadSectionDetails } from "@/components/head-section";
import { useMutation } from "@tanstack/react-query";
import { API_INDEX } from "@/api";

export default function Dashboard() {
    const [data, setData] = useState<QR[]>(QRData)
    const token = localStorage.getItem('token') || '';

    const { mutateAsync: JwtAuthorized, isPending: jwtPending } = useMutation({
        mutationFn: API_INDEX,
        onSuccess: (data) => {
            console.log(data)
        }
    })

    useEffect(() => {
        JwtAuthorized({ token })
    }, [])

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                <Header />
                <div className="w-full max-w-[90rem] px-4 flex flex-col gap-4">
                    <HeadSection>
                        <SubHeadSectionDetails
                            title="RECORD OF REGISTERED QR"
                            description="Here's a list of registered qr holders."
                        />
                    </HeadSection>
                    <DataTable columns={qrcolumns} data={data} />
                </div>
            </div>
        </>
    )
}