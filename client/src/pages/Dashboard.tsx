import { DataTable } from "@/components/data-table-components/data-table"
import Header from "@/components/header"
import { useEffect } from "react"
import { qrcolumns } from "@/components/data-table-components/columns/qr-columns"
import HeadSection, { SubHeadSectionDetails } from "@/components/head-section"
import { useQuery } from "@tanstack/react-query"
import { API_DATA_QR_HOLDERS, API_INDEX, API_USER_EXIST } from "@/api"
import { useNavigate } from "react-router-dom"
import ScreenLoading from "@/components/screen-loading"
import { toast } from "sonner"

export default function Dashboard() {
    const navigate = useNavigate()
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

    const { data: qrHolders = [], isLoading: qrLoading, isFetched: qrFetched } = useQuery({
        queryFn: () => API_DATA_QR_HOLDERS({ token: token ?? '' }),
        queryKey: ['dashboardQr', { token: token ?? '' }],
        enabled: !!token
    })

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
                        <DataTable columns={qrcolumns} data={qrHolders.data || []} toolbar="dashboard" />
                    }
                </div>
            </div>
        </>
    )
}