import { Link } from 'react-router-dom'
import mainImage from '../../assets/hero - before dawn.svg'

export const HeroImage = () => {
    return (
        <section className="flex w-full flex-col items-center justify-center bg-white bg-cover bg-no-repeat px-8 py-16 md:h-fit md:flex-row md:py-0">
            <div className="flex flex-col items-center gap-5">
                <h1 className="text-center text-6xl text-gray-800 md:text-8xl">
                    Help is here.
                </h1>
                <div className="p-4">
                    <Link
                        to="/resources"
                        className="me-4 rounded-full bg-gray-200 px-6 py-2 text-gray-900 hover:bg-orange-600 md:px-8"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/panic"
                        className="rounded-full bg-orange-500 px-6 py-2 text-white hover:bg-gray-300 md:px-8"
                    >
                        Help me!
                    </Link>
                </div>
            </div>
            <img src={mainImage} alt="Main Image" className="md:w-1/2" />
        </section>
    )
}
