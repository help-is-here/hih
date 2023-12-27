import { Tabs } from 'flowbite-react'
import { FaCheckCircle, FaExclamationTriangle, FaTag } from 'react-icons/fa'
import { IResource } from '@/types'
import ApprovedCard from '../Resources/ApprovedCard'
import UnaprovedCard from '../Resources/UnapprovedCard'
import { useQuery } from 'react-query'
import { defaultStaleTime, getResourcesWithTags } from '@/api/api'
import LoadingPage from '../States/LoadingPage'
import ErrorPage from '../States/ErrorPage'
import CategoryManager from './CategoryManager'

const tabsTheme = {
    base: 'flex flex-col gap-2',
    tablist: {
        base: 'flex text-center',
        styles: {
            default:
                'flex-wrap -mb-px border-b border-gray-200 dark:border-gray-700',
        },
        tabitem: {
            base: 'flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500',
            styles: {
                default: {
                    base: 'rounded-t-lg',
                    active: {
                        on: 'text-orange-600 rounded-t-lg border-b-2 border-orange-600 active dark:text-orange-500 dark:border-orange-500',
                        off: 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300',
                    },
                },
            },
            icon: 'mr-2 h-5 w-5',
        },
    },
    tabpanel: 'py-3',
}
export default function AdminTabs() {
    const { isLoading, isError, data } = useQuery(
        ['resources'],
        getResourcesWithTags,
        {
            staleTime: defaultStaleTime,
        }
    )

    if (isLoading) {
        return <LoadingPage />
    }
    if (isError) {
        return <ErrorPage />
    }
    return (
        <div className="min-h-screen bg-orange-50 px-12">
            {data && data.data ? (
                <Tabs aria-label="Admin tabs" theme={tabsTheme}>
                    <Tabs.Item
                        active
                        title="Awaiting Approval"
                        icon={FaExclamationTriangle}
                    >
                        {data.data
                            // @ts-expect-error: https://github.com/supabase/postgrest-js/pull/499
                            .filter((r: boolean) => r.in_review)
                            // @ts-expect-error: https://github.com/supabase/postgrest-js/pull/499
                            .map((resource: IResource) => {
                                return (
                                    <UnaprovedCard
                                        resource={resource}
                                        key={resource.id}
                                    />
                                )
                            })}
                    </Tabs.Item>
                    <Tabs.Item title="Approved" icon={FaCheckCircle}>
                        {data.data
                            // @ts-expect-error: https://github.com/supabase/postgrest-js/pull/499
                            .filter((r: boolean) => !r.in_review)
                            // @ts-expect-error: https://github.com/supabase/postgrest-js/pull/499
                            .map((resource: IResource) => {
                                return (
                                    <ApprovedCard
                                        resource={resource}
                                        key={resource.id}
                                    />
                                )
                            })}
                    </Tabs.Item>
                    <Tabs.Item title="Tag Categories" icon={FaTag}>
                        <CategoryManager />
                    </Tabs.Item>
                </Tabs>
            ) : (
                <LoadingPage />
            )}
        </div>
    )
}
