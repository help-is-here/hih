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
        <section className="flex flex-col justify-center py-12">
            <h4 className="flex justify-center text-center text-4xl md:text-6xl">
                I need help with ...
            </h4>
            <br />
            <div className="flex flex-col items-center justify-between md:flex-row md:justify-center">
                {details.map((item) => {
                    return (
                        <IconNavElement
                            key={item.title}
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
