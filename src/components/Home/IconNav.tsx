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
        <section className="flex justify-center mt-6">
            <div className="columns-4 w-1/2 h-100px ">
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
