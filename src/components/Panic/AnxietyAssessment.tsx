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
        const score = q1 + q2 + q3 + q4 + q5 + q6 + q7
        if (score <= 4) {
            setResult(EAssessments.Prevention)
        } else if (score <= 14) {
            setResult(EAssessments.Precaution)
        } else {
            setResult(EAssessments.Predicament)
        }
    }, [q1, q2, q3, q4, q5, q6, q7])

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
                            href="https://adaa.org/sites/default/files/GAD-7_Anxiety-updated_0.pdf"
                        >
                            GAD-7 from ADAA
                        </a>
                    </div>
                </AssessmentCard>
                <MultiOptionCard
                    options={options}
                    value={q1}
                    onSet={(val) => setQ1(Number(val))}
                    title="Feeling nervous, anxious, or on edge"
                />
                <MultiOptionCard
                    options={options}
                    value={q2}
                    onSet={(val) => setQ2(Number(val))}
                    title="Not being able to stop or control worrying"
                />
                <MultiOptionCard
                    options={options}
                    value={q3}
                    onSet={(val) => setQ3(Number(val))}
                    title="Worrying too much about different things"
                />
                <MultiOptionCard
                    options={options}
                    value={q4}
                    onSet={(val) => setQ4(Number(val))}
                    title="Trouble relaxing"
                />
                <MultiOptionCard
                    options={options}
                    value={q5}
                    onSet={(val) => setQ5(Number(val))}
                    title="Being so restless that it is hard to sit still"
                />
                <MultiOptionCard
                    options={options}
                    value={q6}
                    onSet={(val) => setQ6(Number(val))}
                    title="Becoming easily annoyed or irritable"
                />
                <MultiOptionCard
                    options={options}
                    value={q7}
                    onSet={(val) => setQ7(Number(val))}
                    title="Feeling afraid, as if something awful
                    might happen"
                />
                <AssessmentCard>
                    <div className="flex h-full flex-col items-center justify-center gap-4">
                        <div className="text-center md:text-2xl">
                            ~ Your result ~
                        </div>
                        <div className="rounded-full bg-orange-200 px-4 py-2 text-xl text-black">
                            Score:
                            {String(q1 + q2 + q3 + q4 + q5 + q6 + q7)}
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
