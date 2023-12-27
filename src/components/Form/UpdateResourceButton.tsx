import React from 'react'
import { updateResource } from '../../api/api'
import { useMutation, useQueryClient } from 'react-query'
import { IResource } from '@/types'

type TUpdateResourceButton = {
    children: React.ReactNode
    resource: IResource
    className?: string
    disabled?: boolean
    onSucces?: () => void
}
export default function UpdateResourceButton({
    children,
    resource,
    disabled = false,
    onSucces = () => {},
    className = '',
}: TUpdateResourceButton) {
    const queryClient = useQueryClient()
    const updateResourceMut = useMutation({
        mutationFn: updateResource,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['resources'] })
            onSucces()
        },
    })
    return (
        <button
            className={`w-full ${className}`}
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
