import mainImage from '../../assets/hero - before dawn.svg'

export const HeroImage = () => {
    return (
        <div className="bg-white px-8 md:py-0 py-16 w-full md:h-fit bg-no-repeat bg-cover flex justify-center items-center flex-col md:flex-row">
            <div>
                <h1 className="md:text-8xl text-center mb-4 text-gray-800 text-6xl">
                    Help is here.
                </h1>
                <button className="rounded-full px-8 py-2 bg-orange-500 text-white mr-4 hover:bg-orange-600">
                    Get Started
                </button>
                <button className="rounded-full px-8 py-2 bg-gray-200 text-gray-900 hover:bg-gray-300">
                    I'm Panicking!
                </button>
            </div>
            <img src={mainImage} alt="Main Image" className="w-1/2" />
        </div>
    )
}
