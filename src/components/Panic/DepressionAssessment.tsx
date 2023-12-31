import { Carousel } from 'flowbite-react'
import AssessmentCard from './AssessmentCard'
import { useEffect, useState } from 'react'
import { EAssessments, IOption } from '@/types'
import MultiOptionCard from './MultiOptionCard'

type TDepressionAssessment = {
    onResult: (res: EAssessments) => void
}

export default function DepressionAssessment({
    onResult,
}: TDepressionAssessment) {
    const [result, setResult] = useState(EAssessments.Precaution)
    const [q1, setQ1] = useState(0)
    const [q2, setQ2] = useState(0)
    const [q3, setQ3] = useState(0)
    const [q4, setQ4] = useState(0)
    const [q5, setQ5] = useState(0)
    const [q6, setQ6] = useState(0)
    const [q7, setQ7] = useState(0)
    const [q8, setQ8] = useState(0)
    const [q9, setQ9] = useState(0)

    const options: IOption[] = [
        {
            id: 'notatall',
            value: 0,
            label: 'Not at all',
        },
        {
            id: 'acoupledays',
            value: 1,
            label: 'A couple days',
        },
        {
            id: 'half',
            value: 2,
            label: 'More than half the days',
        },
        {
            id: 'every',
            value: 3,
            label: 'Nearly every day',
        },
    ]

    useEffect(() => {
        const score = q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8 + q9
        if (score <= 4) {
            setResult(EAssessments.Prevention)
        } else if (score <= 14) {
            setResult(EAssessments.Precaution)
        } else {
            setResult(EAssessments.Predicament)
        }
    }, [q1, q2, q3, q4, q5, q6, q7, q8, q9])

    return (
        <div className="min-h-96">
            <Carousel slide={false}>
                <AssessmentCard>
                    <p>
                        Your answers are anonymous and never saved in Help is
                        Here database.
                    </p>
                    <p className="my-2 font-bold">
                        This is not clinical advice. Consider consulting a
                        medical professional with your concerns.
                    </p>
                    <p>
                        Please use this questionaire to find resources that can
                        help you.
                    </p>
                    <br />
                    <div className="text-xs text-gray-200">
                        Questions taken from
                        <a
                            target="_blank"
                            className="ps-2 underline"
                            rel="noopener noreferer"
                            href="https://med.stanford.edu/fastlab/research/imapp/msrs/_jcr_content/main/accordion/accordion_content3/download_256324296/file.res/PHQ9%20id%20date%2008.03.pdf"
                        >
                            PHQ-9 from Stanford
                        </a>
                    </div>
                </AssessmentCard>
                <MultiOptionCard
                    options={options}
                    value={q1}
                    onSet={(val) => setQ1(Number(val))}
                    title="Little interest or pleasure in doing things"
                />
                <MultiOptionCard
                    options={options}
                    value={q2}
                    onSet={(val) => setQ2(Number(val))}
                    title="Feeling down, depressed, or hopeless"
                />
                <MultiOptionCard
                    options={options}
                    value={q3}
                    onSet={(val) => setQ3(Number(val))}
                    title="Trouble falling or staying asleep, or sleeping too much"
                />
                <MultiOptionCard
                    options={options}
                    value={q4}
                    onSet={(val) => setQ4(Number(val))}
                    title="Feeling tired or having little energy"
                />
                <MultiOptionCard
                    options={options}
                    value={q5}
                    onSet={(val) => setQ5(Number(val))}
                    title="Poor appetite or overeating"
                />
                <MultiOptionCard
                    options={options}
                    value={q6}
                    onSet={(val) => setQ6(Number(val))}
                    title="Feeling bad about yourself or that you are a failure or
                    have let yourself or your family down"
                />
                <MultiOptionCard
                    options={options}
                    value={q7}
                    onSet={(val) => setQ7(Number(val))}
                    title="Trouble concentrating on things, such as reading the
                    newspaper or watching television"
                />
                <MultiOptionCard
                    options={options}
                    value={q8}
                    onSet={(val) => setQ8(Number(val))}
                    title="Moving or speaking so slowly that other people could
                    have noticed. Or the opposite being so figety or
                    restless that you have been moving around a lot more
                    than usual"
                />
                <MultiOptionCard
                    options={options}
                    value={q9}
                    onSet={(val) => setQ9(Number(val))}
                    title="Thoughts that you would be better off dead, or of
                    hurting yourself"
                />
                <AssessmentCard>
                    <div className="flex h-full flex-col items-center justify-center gap-4">
                        <div className="text-center md:text-2xl">
                            ~ Your result ~
                        </div>
                        <div className="rounded-full bg-orange-200 px-4 py-2 text-xl text-black">
                            Score:
                            {String(q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8 + q9)}
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
