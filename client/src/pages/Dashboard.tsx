import { DataTable } from "@/components/data-table-components/data-table";
import { QR } from "@/components/data-table-components/schema";
import Header from "@/components/header";
import QRData from '@/components/data-table-components/data.json'
import { useEffect, useState } from "react";
import { qrcolumns } from "@/components/data-table-components/columns/qr-columns";
import HeadSection, { SubHeadSectionDetails } from "@/components/head-section";
import { useQuery } from "@tanstack/react-query";
import { API_INDEX } from "@/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate()
    const [data, setData] = useState<QR[]>(QRData)
    const token = localStorage.getItem('token') || '';

    const { data: jwtAuthorized = '', isLoading: jwtLoading, isFetched: jwtFetched } = useQuery({
        queryFn: () => API_INDEX({ token }),
        queryKey: ['dashboardJwt', { token }],
        enabled: !!token
    })

    if (jwtLoading) {
        console.log('Loading');
    }

    useEffect(() => {
        if (jwtFetched) {
            if (jwtAuthorized.success && jwtAuthorized.role === 'user') {
                navigate('/');
            }
        }
    }, [jwtFetched, jwtAuthorized, navigate]);

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