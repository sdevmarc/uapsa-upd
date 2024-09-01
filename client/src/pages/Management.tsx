import { DataTable } from "@/components/data-table-components/data-table";
import Header from "@/components/header";
import { useEffect } from "react";
import HeadSection, { SubHeadSectionDetails } from "@/components/head-section";
import { useQuery } from "@tanstack/react-query";
import { API_DATA_USER_MANAGEMENT, API_INDEX } from "@/api";
import { Link, useNavigate } from "react-router-dom"
import { managementcolumns } from "@/components/data-table-components/columns/management-columns";
import ScreenLoading from "@/components/screen-loading";
import { toast } from "sonner";

export default function Management() {
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

    const { data: usermanagement = [], isLoading: usermanagementLoading, isFetched: usermanagementFetched } = useQuery({
        queryFn: () => API_DATA_USER_MANAGEMENT({ token: token ?? '' }),
        queryKey: ['dashboardUserManagement', { token: token ?? '' }],
        enabled: !!token
    })

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                {(jwtLoading || usermanagementLoading) && <ScreenLoading /> }
                <Header>
                    <Link to={'/dashboard'} className="text-sm hover:underline">
                        Go Back
                    </Link>
                </Header>
                <div className="w-full max-w-[90rem] px-4 flex flex-col gap-4">
                    <HeadSection>
                        <SubHeadSectionDetails
                            title="RECORD OF REGISTERED USER ACCESS"
                            description="Here's a list of registered system user access."
                        />
                    </HeadSection>
                    {(jwtLoading || usermanagementLoading) && 'Loading...'}
                    {(jwtFetched && usermanagementFetched) &&
                        <DataTable columns={managementcolumns} data={usermanagement.data} toolbar="management" />
                    }
                </div>
            </div>
        </>
    )
}