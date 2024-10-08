import Header from "@/components/header"
import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { API_CREATE_ATTENDANCE, API_DATA_QR_HOLDER, API_INDEX, API_USER_EXIST } from "@/api"
import { Link, useNavigate } from "react-router-dom"
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner"
import { toast } from "sonner"
import ScreenLoading from "@/components/screen-loading"
const { VITE_SITE_SERVER } = import.meta.env

function formatCurrentDate() {
    const date = new Date()

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    })

    const timeFormatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    })

    const formattedDate = dateFormatter.format(date)
    const formattedTime = timeFormatter.format(date)

    return `${formattedDate} at ${formattedTime}`
}

const currentDate = formatCurrentDate()

export default function ScanAttendance() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [isScanning, setIsScanning] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [qr, setQr] = useState('')
    const [showDetails, setShowDetails] = useState(false)
    const [timer, setTimer] = useState(3)

    const { data: jwtAuthorized, isFetched: jwtFetched, isLoading: jwtLoading } = useQuery({
        queryFn: () => API_INDEX({ token: token ?? '' }),
        queryKey: ['attendanceJwt', { token: token ?? '' }],
        enabled: !!token
    })

    const { data: userexist, isLoading: userexistLoading } = useQuery({
        queryFn: () => API_USER_EXIST(),
        queryKey: ['scanattendanceUserExist']
    })

    useEffect(() => {
        if (!token) { return navigate('/') }
        if (jwtFetched && !jwtAuthorized.success) {
            localStorage.clear()
            toast("Uh, oh! Something went wrong.", { description: 'Looks like you need to login again.' })
            return navigate('/')
        }
        if (!userexistLoading && !userexist.success) {
            localStorage.clear()
            return navigate('/')
        }
    }, [jwtFetched, jwtAuthorized, userexist, navigate])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [token, navigate])

    const { mutateAsync: InsertAttendance, isPending: attendanceLoading } = useMutation({
        mutationFn: API_CREATE_ATTENDANCE,
        onSuccess: async (data) => {
            if (!data.success) return toast("Oops! Something went wrong.", { description: data.message })
            await queryClient.invalidateQueries({ queryKey: ['qrstatus'] })
            await queryClient.refetchQueries({ queryKey: ['qrstatus'] })
            return toast("Attendance recorded!", { description: `${currentDate}` })
        },
        onError: () => {
            return toast("Oops! Something went wrong.", { description: 'Attendance failed to record, try again!' })
        }
    })

    const { data: qruser, isLoading: qrLoading } = useQuery({
        queryFn: () => API_DATA_QR_HOLDER({ qr }),
        queryKey: ['qrstatus', { qr }],
        enabled: !!qr
    })

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (showDetails && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1)
            }, 1000)
        } else if (timer === 0) {
            setShowDetails(false)
            setTimer(3)
            setIsScanning(true)
        }
        return () => clearInterval(interval)
    }, [showDetails, timer])

    const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
        if (detectedCodes) {
            const new_qr = removeBaseUrl(detectedCodes[0].rawValue)
            console.log(new_qr)
            const decodedBase64 = decodeBase64(new_qr)
            console.log(decodedBase64)

            await InsertAttendance({ qr: new_qr })
            setIsScanning(false)
            setQr(decodedBase64)
            setShowDetails(true)
            setTimer(3)
        }
    }

    const decodeBase64 = (encodedData: string): string => {
        return atob(encodedData);
    };

    const removeBaseUrl = (data: string): string => {
        const baseUrl = `${VITE_SITE_SERVER}`
        return data.replace(baseUrl, '')
    }

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center">
                {(jwtLoading || qrLoading || attendanceLoading || userexistLoading) && <ScreenLoading />}
                <Header>
                    <Link to={`/dashboard`} className="text-sm hover:underline">
                        Go Back
                    </Link>
                </Header>
                <div className="z-[1] w-1/2 h-full pt-[6rem] px-4 pb-4 flex flex-col justify-center items-center">
                    <div className="w-full h-full flex flex-col justify-center items-center gap-3">
                        <h1 className='text-[2rem] font-bold'>
                            SCAN FOR ATTENDANCE
                        </h1>
                        <div className="scale-x-[-1] rounded-xl shadow-[_0_10px_15px_-3px_rgba(0,0,0,0.2)] overflow-hidden">
                            {isLoading ? (
                                <div className="w-[640px] h-[480px] flex justify-center items-center bg-gray-200">
                                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                                </div>
                            ) : (
                                isScanning && <Scanner onScan={handleScan} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="z-[1] w-1/2 h-full flex flex-col justify-start items-center px-10">
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="w-full flex flex-col justify-center items-center gap-7">
                            {showDetails ? (
                                <>
                                    <div className="flex flex-col justify-center items-center">
                                        <h1 className='text-md font-normal'>Points</h1>
                                        <h1 className='text-[7rem] font-semibold'>
                                            {qruser?.data?.points || '---'}
                                        </h1>
                                    </div>

                                    <div className="flex flex-col justify-center items-center">
                                        <h1 className='text-[3rem] font-semibold'>
                                            {qruser?.data?.name || '---'}
                                        </h1>
                                    </div>
                                    <div className="w-full flex flex-col justify-center items-center gap-4">
                                        <div className="w-full flex justify-evenly items-center">
                                            <div className="flex flex-col justify-center items-center">
                                                <h1 className='text-md font-normal'>Attended</h1>
                                                <h1 className="text-xl font-semibold">
                                                    {qruser?.data?.attended || '---'}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold">
                                        Resetting in {timer} seconds...
                                    </div>
                                </>
                            ) : (
                                <div className="text-2xl font-bold">
                                    Scan a QR code to see details
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}