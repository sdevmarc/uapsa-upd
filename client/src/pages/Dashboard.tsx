import { DataTable } from "@/components/data-table-components/data-table";
import {  QR } from "@/components/data-table-components/schema";
import Header from "@/components/header";
import QRData from '@/components/data-table-components/data.json'
import { useState } from "react";
import { qrcolumns } from "@/components/data-table-components/columns/qr-columns";

export default function Dashboard() {
    const [data, setData] = useState<QR[]>(QRData)

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                <Header />
                <div className="w-full max-w-[90rem] pt-10 px-4">
                    <DataTable columns={qrcolumns} data={data} />
                </div>
            </div>
        </>
    )
}