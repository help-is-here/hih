import { Carousel } from 'flowbite-react'
import AssessmentCard from './AssessmentCard'
import { useEffect, useState } from 'react'
import YesNoCard from './YesNoCard'
import { EAssessments } from '@/types'

type TSucidalityAssessment = {
    onResult: (res: EAssessments) => void
}

export default function SuicidalityAssessment({
    onResult,
}: TSucidalityAssessment) {
    const [wished, setWished] = useState('no')
    const [betterOff, setBetterOff] = useState('no')
    const [thoughts, setThoughts] = useState('no')
    const [tried, setTried] = useState('no')
    const [having, setHaving] = useState('no')
    const [result, setResult] = useState(EAssessments.Precaution)

    useEffect(() => {
        if ([thoughts, tried, having].some((n) => n === 'yes')) {
            setResult(EAssessments.Predicament)
        } else if (betterOff === 'yes') {
            setResult(EAssessments.Precaution)
        } else {
            setResult(EAssessments.Prevention)
        }
    }, [betterOff, having, thoughts, tried])

    return (
        <div className="min-h-96 flex items-center">
            <Carousel slide={false}>
                <AssessmentCard>
                    <p>
                        Your answers are anonymous and never saved in Help is
                        Here database.
                    </p>
                    <p className="my-2 font-bold">
                        This is not clinical advice. Consider consulting a
                        medical professional with your concerns.
                    </p>{' '}
                    <p>
                        Please use this questionaire to find resources that can
                        help you.
                    </p>
                    <br />
                    <div className="text-xs text-gray-200">
                        {' '}
                        Questions taken from
                        <a
                            target="_blank"
                            className="ps-2 underline"
                            rel="noopener noreferer"
                            href="https://www.nimh.nih.gov/sites/default/files/documents/research/research-conducted-at-nimh/asq-toolkit-materials/asq-tool/screening_tool_asq_nimh_toolkit.pdf"
                        >
                            NIMH ASQ
                        </a>
                    </div>
                </AssessmentCard>
                <YesNoCard
                    title="In the past few weeks, have you wished you were dead?"
                    val={wished}
                    onSet={setWished}
                />
                <YesNoCard
                    title="In the past few weeks, have you felt that you or your family
                        would be better off if you were dead?"
                    val={betterOff}
                    onSet={setBetterOff}
                />
                <YesNoCard
                    title="In the past week, have you been having thoughts
                        about killing yourself?"
                    val={thoughts}
                    onSet={setThoughts}
                />
                <YesNoCard
                    title="Have you ever tried to kill yourself?"
                    val={tried}
                    onSet={setTried}
                />
                <YesNoCard
                    title=" Are you having thoughts of killing yourself right now?"
                    val={having}
                    onSet={setHaving}
                />
                <AssessmentCard>
                    <div className="flex h-full flex-col items-center justify-center gap-4">
                        <div className="text-center md:text-2xl">
                            ~ Your result ~
                        </div>
                        <div className="rounded-full bg-orange-200 px-4 py-2 text-xl text-black">
                            {result}
                        </div>
                        <button
                            onClick={() => onResult(result)}
                            className="w-full rounded-lg bg-orange-400 px-8 py-12 text-center text-white md:text-2xl"
                        >
                            Click to find Resources
                        </button>
                    </div>
                </AssessmentCard>
            </Carousel>
        </div>
    )
}
