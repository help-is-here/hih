import React from 'react'

type TAssessmentCard = {
    children: React.ReactNode
}
export default function AssessmentCard({ children }: TAssessmentCard) {
    return (
        <div className="h-full bg-orange-950 px-16 py-16 text-white md:px-24 md:py-12">
            {children}
        </div>
    )
}
