import { DataTable } from "@/components/data-table-components/data-table"
import Header from "@/components/header"
import { useEffect } from "react"
import HeadSection, { BackHeadSection, SubHeadSectionDetails } from "@/components/head-section"
import { useQuery } from "@tanstack/react-query"
import { API_DATA_USER_MANAGEMENT, API_INDEX, API_USER_EXIST } from "@/api"
import { useNavigate } from "react-router-dom"
import { managementcolumns } from "@/components/data-table-components/columns/management-columns"
import ScreenLoading from "@/components/screen-loading"
import { toast } from "sonner"

export default function Management() {
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
        queryKey: ['managementUserExist']
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

    const { data: usermanagement = [], isLoading: usermanagementLoading, isFetched: usermanagementFetched } = useQuery({
        queryFn: () => API_DATA_USER_MANAGEMENT({ token: token ?? '' }),
        queryKey: ['userManagement', { token: token ?? '' }],
        enabled: !!token
    })

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                {(jwtLoading || usermanagementLoading || userexistLoading) && <ScreenLoading />}
                <Header />
                <div className="w-full max-w-[90rem] px-4 flex flex-col gap-4">
                    <HeadSection>
                        <BackHeadSection />
                        <SubHeadSectionDetails
                            title="REGISTERED USERS' ACCESS"
                            description="Here is a list of registered users' system access."
                        />
                    </HeadSection>
                    {(jwtFetched && usermanagementFetched) &&
                        <DataTable columns={managementcolumns} data={usermanagement.data} toolbar="management" />
                    }
                </div>
            </div>
        </>
    )
}