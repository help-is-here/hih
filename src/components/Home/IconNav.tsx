import depressionIcon from '../../assets/depression - icon.png'
import anxietyIcon from '../../assets/anxiety - icon.png'
import supportIcon from '../../assets/support - icon.png'
import substanceIcon from '../../assets/substance - icon.png'
import { IconNavElement } from '@/components/Home/IconNavElement.tsx'
export const IconNav = () => {
    const details = [
        {
            title: 'Depression',
            link: '/tag/depression',
            image: depressionIcon,
        },
        {
            title: 'Anxiety',
            link: '/tag/anxiety',
            image: anxietyIcon,
        },
        {
            title: 'Support',
            link: '/tag/support',
            image: supportIcon,
        },
        {
            title: 'Substance Abuse',
            link: '/tag/substance+abuse',
            image: substanceIcon,
        },
    ]
    return (
        <section className="flex justify-center flex-col py-12">
            <h4 className="md:text-6xl text-4xl flex justify-center text-center">
                I need help with ...
            </h4>
            <br />
            <div className="h-100px flex justify-center md:flex-row flex-col items-center">
                {details.map((item) => {
                    return (
                        <IconNavElement
                            title={item.title}
                            image={item.image}
                            link={item.link}
                        />
                    )
                })}
            </div>
        </section>
    )
}
