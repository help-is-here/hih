import aboutImage from '../../assets/about.svg'
export const About = () => {
    return (
        <section className="flex justify-center flex-col py-12 bg-white px-8">
            <h4 className="md:text-6xl text-4xl flex justify-center">About</h4>
            <div className="flex md:flex-row flex-col justify-center">
                <img src={aboutImage} alt="About" className="md:w-1/3" />
                <span className="p-12 md:w-1/3 flex justify-center flex-col leading-8">
                    Help is Here is more than just a website; it's a
                    community-curated sanctuary dedicated to supporting mental
                    well-being.
                    <br />
                    <br />
                    Born from the understanding that everyone has moments where
                    they need a helping hand, our platform serves as a
                    comprehensive database of mental health resources tailored
                    for those times when you need some extra first-aid for your
                    mental health.
                </span>
            </div>
        </section>
    )
}
