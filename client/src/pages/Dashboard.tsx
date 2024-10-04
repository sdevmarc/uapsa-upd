import Header from "@/components/header"
import { useEffect, useState } from "react"
import HeadSection, { SubHeadSectionDetails } from "@/components/head-section"
import { useQuery } from "@tanstack/react-query"
import { API_DATA_QR_HOLDERS, API_INDEX, API_USER_EXIST } from "@/api"
import { useNavigate } from "react-router-dom"
import ScreenLoading from "@/components/screen-loading"
import { toast } from "sonner"
import { DataTableDashboard } from "./dashboard/data-table-dashboard"
import { DashboardColumns } from "./dashboard/dashboard-columns"
// import { IQRSchema } from "@/components/data-table-components/schema"

export default function Dashboard() {
    const navigate = useNavigate()
    const [resetSelection, setResetSelection] = useState(false)
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) { navigate('/') }
    }, [token, navigate])

    const { data: jwtAuthorized, isFetched: jwtFetched, isLoading: jwtLoading } = useQuery({
        queryFn: () => API_INDEX({ token: token ?? '' }),
        queryKey: ['dashboardJwt', { token: token ?? '' }],
        enabled: !!token
    })

    const { data: userexist, isLoading: userexistLoading } = useQuery({
        queryFn: () => API_USER_EXIST(),
        queryKey: ['dashboardUserExist']
    })

    useEffect(() => {
        if (jwtFetched && !jwtAuthorized) {
            localStorage.clear()
            toast("Uh, oh! Something went wrong.", { description: 'Looks like you need to login again.' })
            return navigate('/')
        }
        if (!userexistLoading && !userexist.success) {
            localStorage.clear()
            return navigate('/')
        }
    }, [jwtFetched, jwtAuthorized, userexist, navigate])

    const { data: qrHolders, isLoading: qrLoading, isFetched: qrFetched } = useQuery({
        queryFn: () => API_DATA_QR_HOLDERS({ token: token ?? '' }),
        queryKey: ['dashboardQr', { token: token ?? '' }],
        enabled: !!token
    })

    // const handleCheckChange = (selectedQr: IQRSchema[]) => {
    
    // }

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                {(jwtLoading || qrLoading || userexistLoading) && <ScreenLoading />}
                <Header />
                <div className="w-full max-w-[90rem] px-4 flex flex-col gap-4">
                    <HeadSection>
                        <SubHeadSectionDetails
                            title="REGISTERED QR USERS"
                            description="Here's a list of registered qr holders."
                        />
                    </HeadSection>
                    {(jwtFetched && qrFetched) &&
                        <DataTableDashboard
                            columns={DashboardColumns}
                            data={qrHolders.data || []}
                            // fetchCheck={handleCheckChange}
                            resetSelection={resetSelection}
                            onResetComplete={() => setResetSelection(false)}
                        />
                    }
                </div>
            </div>
        </>
    )
}