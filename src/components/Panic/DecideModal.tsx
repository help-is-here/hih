import { Modal } from 'flowbite-react'
import SuicidalityAssessment from './SuicidalityAssessment'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EAssessments } from '@/types'

type TDecideModal = {
    openModal: boolean
    onClose: () => void
}
export default function DecideModal({ openModal, onClose }: TDecideModal) {
    const [suicidality, setSuicidality] = useState(false)
    const navigate = useNavigate()
    const decide = (result: EAssessments) => {
        navigate(`/panic/${result}`)
        onClose()
        window.location.reload()
    }
    return (
        <>
            <Modal show={openModal} onClose={onClose}>
                <Modal.Header>I need help because...</Modal.Header>
                <Modal.Body>
                    <div
                        className={`${
                            suicidality ? 'hidden' : 'block'
                        } flex h-full flex-col gap-4`}
                    >
                        <button
                            onClick={() => setSuicidality(true)}
                            className="w-full rounded-lg bg-orange-400 px-4 py-8 text-4xl text-white md:px-24 md:py-12"
                        >
                            Suicidality
                        </button>
                        <button className="w-full rounded-lg bg-orange-400 px-4 py-8 text-4xl text-white md:px-24 md:py-12">
                            Depression or anxiety
                        </button>
                        <button className="w-full rounded-lg bg-orange-400 px-4 py-8 text-4xl text-white md:px-24 md:py-12">
                            Something else
                        </button>
                    </div>
                    <div
                        className={`${
                            suicidality ? 'block' : 'hidden'
                        } h-screen`}
                    >
                        <SuicidalityAssessment
                            onResult={(result) => {
                                decide(result)
                            }}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
