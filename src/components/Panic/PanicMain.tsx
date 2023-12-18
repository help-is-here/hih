import { H1 } from '@/components/Text/Headings.tsx'
import { Link } from 'react-router-dom'
import preventImage from '../../assets/panic - prevent.svg'
import prepareImage from '../../assets/panic - prepare.svg'
import predicamentImage from '../../assets/panic - predicament.svg'

export const PanicMain = () => {
    const PathSelect = (props: {
        title: string
        link: string
        image: string
    }) => {
        const { title, link, image } = props
        return (
            <Link to={link} className="flex-1">
                <div className="p-8 h-full flex flex-col justify-center items-center text-xl rounded m-8 bg-orange-300 text-center hover:bg-orange-400 font-semibold text-gray-800">
                    <img src={image} alt={title} />
                    {title}
                </div>
            </Link>
        )
    }
    return (
        <div className="p-8">
            <H1 title="How Are You Feeling?" />
            <div className="flex flex-row">
                <PathSelect
                    title="I'm feeling safe but need to reach out"
                    link="/panic/prevent"
                    image={preventImage}
                ></PathSelect>
                <PathSelect
                    title="I'm not feeling as safe, I need to talk to someone now"
                    link="/panic/prepare"
                    image={prepareImage}
                ></PathSelect>
                <PathSelect
                    title="I'm in crisis and need immediate care"
                    link="/panic/predicament"
                    image={predicamentImage}
                ></PathSelect>
            </div>
        </div>
    )
}
