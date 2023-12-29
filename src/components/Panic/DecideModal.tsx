import { Modal } from 'flowbite-react'
import SuicidalityAssessment from './SuicidalityAssessment'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EAssessments, EDecisions } from '@/types'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import DepressionAssessment from './DepressionAssessment'
import AnxietyAssessment from './AnxietyAssessment'
import AssessmentCard from './AssessmentCard'
import PopularTopics from '../Resources/PopularTopics'

type TDecideModal = {
    openModal: boolean
    onClose: () => void
}
export default function DecideModal({ openModal, onClose }: TDecideModal) {
    const [option, setOption] = useState(EDecisions.None)

    const navigate = useNavigate()
    const decide = (result: EAssessments) => {
        navigate(`/panic/${result}`)
        onClose()
        window.location.reload()
    }
    return (
        <>
            <Modal show={openModal} onClose={onClose}>
                <Modal.Header>
                    <div className="flex items-center">
                        <button
                            onClick={() => {
                                setOption(EDecisions.None)
                            }}
                            className={`${
                                option === EDecisions.None ? 'hidden' : 'block'
                            } me-4`}
                        >
                            <FaArrowAltCircleLeft />
                        </button>
                        I need help because...
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div
                        className={`${
                            option === EDecisions.None ? 'block' : 'hidden'
                        } flex h-full flex-col gap-4`}
                    >
                        <button
                            onClick={() => setOption(EDecisions.Suicidality)}
                            className="w-full rounded-lg bg-orange-400 px-4 py-8 text-4xl text-white md:px-24 md:py-8"
                        >
                            Suicidality
                        </button>
                        <button
                            onClick={() => setOption(EDecisions.Depression)}
                            className="w-full rounded-lg bg-orange-400 px-4 py-8 text-4xl text-white md:px-24 md:py-8"
                        >
                            Depression
                        </button>
                        <button
                            onClick={() => setOption(EDecisions.Anxiety)}
                            className="w-full rounded-lg bg-orange-400 px-4 py-8 text-4xl text-white md:px-24 md:py-8"
                        >
                            Anxiety
                        </button>
                        <button
                            onClick={() => setOption(EDecisions.Other)}
                            className="w-full rounded-lg bg-orange-400 px-4 py-8 text-4xl text-white md:px-24 md:py-8"
                        >
                            Something else
                        </button>
                    </div>
                    <div
                        className={`${
                            option === EDecisions.Suicidality
                                ? 'block'
                                : 'hidden'
                        }`}
                    >
                        <SuicidalityAssessment
                            onResult={(result) => {
                                decide(result)
                            }}
                        />
                    </div>
                    <div
                        className={`${
                            option === EDecisions.Depression
                                ? 'block'
                                : 'hidden'
                        }`}
                    >
                        <DepressionAssessment
                            onResult={(result) => {
                                decide(result)
                            }}
                        />
                    </div>
                    <div
                        className={`${
                            option === EDecisions.Anxiety ? 'block' : 'hidden'
                        }`}
                    >
                        <AnxietyAssessment
                            onResult={(result) => {
                                decide(result)
                            }}
                        />
                    </div>
                    <div
                        className={`${
                            option === EDecisions.Other ? 'block' : 'hidden'
                        }`}
                    >
                        <AssessmentCard>
                            <div className="mb-4 rounded-lg bg-orange-50 py-4 text-center text-black">
                                Check out our most popular topics or go to our{' '}
                                <Link
                                    to="/resources"
                                    className="text-orange-950 underline"
                                >
                                    Resources Page
                                </Link>
                            </div>
                            <PopularTopics />
                        </AssessmentCard>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
