import { DataTable } from "@/components/data-table-components/data-table";
import Header from "@/components/header";
import { useEffect } from "react";
import { qrcolumns } from "@/components/data-table-components/columns/qr-columns";
import HeadSection, { SubHeadSectionDetails } from "@/components/head-section";
import { useQuery } from "@tanstack/react-query";
import { API_DATA_QR_HOLDERS, API_INDEX } from "@/api";
import { useNavigate } from "react-router-dom"
import ScreenLoading from "@/components/screen-loading";
import { toast } from "sonner";

export default function Dashboard() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) { navigate('/') }
    }, [token, navigate]);

    const { data: jwtAuthorized, isFetched: jwtFetched, isLoading: jwtLoading } = useQuery({
        queryFn: () => API_INDEX({ token: token ?? '' }),
        queryKey: ['dashboardJwt', { token: token ?? '' }],
        enabled: !!token
    })

    useEffect(() => {
        if (jwtFetched && !jwtAuthorized) {
            localStorage.clear()
            toast("Uh oh! something went wrong.", {
                description: 'Looks like you need to login again.'
            })
            return navigate('/')
        }
    }, [jwtFetched, jwtAuthorized, navigate]);

    const { data: qrHolders = [], isLoading: qrLoading, isFetched: qrFetched } = useQuery({
        queryFn: () => API_DATA_QR_HOLDERS({ token: token ?? '' }),
        queryKey: ['dashboardQr', { token: token ?? '' }],
        enabled: !!token
    })

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                {(jwtLoading || qrLoading) && <ScreenLoading />}
                <Header />
                <div className="w-full max-w-[90rem] px-4 flex flex-col gap-4">
                    <HeadSection>
                        <SubHeadSectionDetails
                            title="RECORD OF REGISTERED QR"
                            description="Here's a list of registered qr holders."
                        />
                    </HeadSection>
                    {(jwtLoading || qrLoading) && 'Loading...'}
                    {(jwtFetched && qrFetched) &&
                        <DataTable columns={qrcolumns} data={qrHolders.data} toolbar="dashboard" />
                    }
                </div>
            </div>
        </>
    )
}