import { H1 } from '@/components/Text/Headings.tsx'
import { Link } from 'react-router-dom'
import preventImage from '../../assets/panic - prevent.svg'
import prepareImage from '../../assets/panic - prepare.svg'
import predicamentImage from '../../assets/panic - predicament.svg'
import { useState } from 'react'
import DecideModal from './DecideModal'

export const PanicMain = () => {
    const [show, setShow] = useState(false)

    const PathSelect = (props: {
        title: string
        link: string
        image: string
    }) => {
        const { title, link, image } = props
        return (
            <Link to={link} className="flex-1">
                <div className="flex h-full flex-col items-center justify-center rounded bg-orange-300 p-8 text-center text-xl font-semibold text-gray-800 hover:bg-orange-400">
                    <img src={image} alt={title} />
                    {title}
                </div>
            </Link>
        )
    }
    return (
        <div className="flex flex-col gap-4 p-8">
            <H1 title="How Are You Feeling?" />
            <div className="flex flex-row flex-wrap gap-2 md:gap-4">
                <PathSelect
                    title="I'm feeling safe but need to reach out"
                    link="/panic/prevent"
                    image={preventImage}
                ></PathSelect>
                <PathSelect
                    title="I'm not feeling as safe, I need to talk to someone now"
                    link="/panic/precaution"
                    image={prepareImage}
                ></PathSelect>
                <PathSelect
                    title="I'm in crisis and need immediate care"
                    link="/panic/predicament"
                    image={predicamentImage}
                ></PathSelect>
            </div>
            <button
                onClick={() => setShow(true)}
                className="rounded-full bg-orange-500 px-8 py-4 text-center text-2xl text-white md:px-12 md:py-8 md:text-4xl "
            >
                Help me decide
            </button>
            <DecideModal openModal={show} onClose={() => setShow(false)} />
        </div>
    )
}
