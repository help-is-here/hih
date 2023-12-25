import React from 'react'
import { updateResource } from '../../api/api'
import { useMutation, QueryClient } from 'react-query'
import { IResource } from '@/types'

const queryClient = new QueryClient()
type TUpdateResourceButton = {
    children: React.ReactNode
    resource: IResource
    disabled?: boolean
}
export default function UpdateResourceButton({
    children,
    resource,
    disabled = false,
}: TUpdateResourceButton) {
    const updateResourceMut = useMutation({
        mutationFn: updateResource,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['resources'] })
        },
    })
    return (
        <button
            className="w-full"
            disabled={disabled}
            onClick={() =>
                updateResourceMut.mutate({
                    ...resource,
                })
            }
        >
            {children}
        </button>
    )
}
