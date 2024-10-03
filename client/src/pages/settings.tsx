import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Header from '@/components/header'
import HeadSection, { BackHeadSection, SubHeadSectionDetails } from '@/components/head-section'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { API_FIND_SYSTEM_UI, API_INDEX, API_UPDATE_SYSTEM_UI, API_USER_EXIST } from '@/api'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ScreenLoading from '@/components/screen-loading'
import axios from 'axios'

export default function Settings() {
    return (
        <>
            <div className="flex flex-col min-h-screen items-center">
                <Header />
                <div className="w-full max-w-[90rem] flex flex-col pb-[20rem]">
                    <HeadSection>
                        <BackHeadSection />
                        <SubHeadSectionDetails
                            title="SETTINGS"
                            description="A page for editing your system ui preferences."
                        />
                    </HeadSection>
                    <main className="flex justify-end py-4">
                        <UpdateSettings />
                    </main>
                </div>
            </div>
        </>
    )
}

const UpdateSettings = () => {
    axios.defaults.withCredentials = true
    const queryClient = useQueryClient()
    const [values, setValues] = useState({
        header_title: '',
        icon: null as File | null,
        icon_preview: '',
        background: null as File | null,
        background_preview: ''
    })

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
        if (!userexistLoading && !userexist?.success) {
            localStorage.clear()
            return navigate('/')
        }
    }, [jwtFetched, jwtAuthorized, userexist, userexistLoading, navigate])

    const { data: systemui, isLoading: systemuiLoading, isFetched: systemuiFetched } = useQuery({
        queryFn: () => API_FIND_SYSTEM_UI(),
        queryKey: ['systemui']
    })

    useEffect(() => {
        if (systemuiFetched && systemui && systemui.data) {
            const header_title = systemui.data?.header_title || ''
            const icon_image_url = systemui.data.header_icon?.header_icon_url || ''
            const bg_image_url = systemui.data.sign_in?.bg_image_url || ''

            setValues((prev) => ({
                ...prev,
                header_title,
                icon_preview: icon_image_url,
                background_preview: bg_image_url
            }))
        }
    }, [systemuiFetched, systemui])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target
        if (files) {
            const file = files[0]
            const fileUrl = URL.createObjectURL(file)
            setValues((prev) => ({
                ...prev,
                [name]: file,
                [`${name}_preview`]: fileUrl
            }))
        } else {
            setValues((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const isLoading = jwtLoading || userexistLoading || systemuiLoading

    const { mutateAsync: updateUI, isPending: updateLoading } = useMutation({
        mutationFn: async (formData: FormData) => await API_UPDATE_SYSTEM_UI(formData, token ?? ''),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['systemui'] })
            toast("Settings updated successfully!")
        },
        onError: (error) => {
            console.error(error)
            toast("Failed to update settings.", { description: 'There was an error submitting the form.' })
        }
    })

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { header_title, icon, background } = values
        if (!header_title) return toast("Uh, oh! Something went wrong.", { description: 'Looks like you have an empty field.' })

        const formData = new FormData()
        formData.append('header_title', header_title)
        formData.append('icon', icon ?? '')
        formData.append('background', background ?? '')
        await updateUI(formData)

    }

    return (
        <>
            {
                isLoading ? (
                    <ScreenLoading />
                ) : (
                    <form onSubmit={handleUpdate} className="w-[80%] flex flex-col justify-start gap-4 rounded-lg border">
                        <div className="w-full px-4 py-3 border-b">
                            <h1 className='text-text font-semibold text-lg'>Configuration</h1>
                        </div>
                        <div className="w-full py-2 flex flex-col justify-between">
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex flex-col px-4 gap-1">
                                    <h1 className='text-[.83rem]'>Website Title</h1>
                                    <Input
                                        value={values.header_title || ''}
                                        onChange={handleOnChange}
                                        name='header_title'
                                        type='text'
                                        placeholder='eg. pon-hub'
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2  px-4">
                                    <div className="flex justify-start items-center gap-4">
                                        <h1 className='text-[.83rem]'>Website Icon</h1>
                                        <label htmlFor='icon' className="cursor-pointer flex items-center justify-center bg-accent hover:bg-accent-foreground text-sm text-primary-foreground font-normal py-2 px-3 rounded-md transition duration-200 ease-in-out">
                                            <span>Select file</span>
                                            <input
                                                id='icon'
                                                name='icon'
                                                type="file"
                                                accept="image/*"
                                                onChange={handleOnChange}
                                                style={{ display: 'none' }}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        {
                                            values.icon_preview ?
                                                <div className="overflow-hidden w-[10rem] h-[10rem] border flex justify-center items-center">
                                                    <img
                                                        src={values.icon_preview}
                                                        alt="Header icon image"
                                                        className='object-cover w-full h-full'
                                                    />
                                                </div>
                                                :
                                                <div className="w-[10rem] h-[10rem] border flex justify-center items-center">
                                                    <h1 className='text-primary'>No Image</h1>
                                                </div>
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2  px-4">
                                    <div className="flex justify-start items-center gap-4">
                                        <h1 className='text-[.83rem]'>Sign-In Background Image</h1>
                                        <label htmlFor='background' className="cursor-pointer flex items-center justify-center bg-accent hover:bg-accent-foreground text-sm text-primary-foreground font-normal py-2 px-3 rounded-md transition duration-200 ease-in-out">
                                            <span>Select file</span>
                                            <input
                                                id='background'
                                                name='background'
                                                type="file"
                                                accept="image/*"
                                                onChange={handleOnChange}
                                                style={{ display: 'none' }}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        {
                                            values.background_preview ?
                                                <div className="overflow-hidden w-[10rem] h-[10rem] border flex justify-center items-center">
                                                    <img
                                                        src={values.background_preview}
                                                        alt="Background image"
                                                        className='object-cover w-full h-full'
                                                    />
                                                </div>
                                                :
                                                <div className="w-[10rem] h-[10rem] border flex justify-center items-center">
                                                    <h1 className='text-primary'>No Image</h1>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-end px-4 pt-4 pb-2">
                                <Button disabled={updateLoading} type='submit' variant={`default`} size={`default`} className='text-primary-foreground'>
                                    {updateLoading ? 'UPDATING...' : 'UPDATE'}
                                </Button>
                            </div>
                        </div>
                    </form>
                )
            }
        </>
    )
}