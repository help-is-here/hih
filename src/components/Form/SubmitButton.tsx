import React from 'react'

type TSubmitButtonProps = {
    disabled: boolean
    onClick: () => void
    children: React.ReactNode
}
export default function SubmitButton({
    disabled,
    onClick,
    children,
}: TSubmitButtonProps) {
    return (
        <button
            title={!disabled ? 'All fields must be valid' : ''}
            className="my-4 block w-full rounded-full bg-orange-400 py-2 disabled:bg-orange-200 disabled:text-gray-600"
            disabled={!disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
