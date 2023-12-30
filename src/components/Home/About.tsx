import aboutImage from '../../assets/about.svg'
export const About = () => {
    return (
        <section className="flex flex-col justify-center rounded-lg bg-white px-8 py-12">
            <h4 className="flex justify-center text-4xl md:text-6xl">About</h4>
            <div className="flex flex-col justify-center md:flex-row">
                <img src={aboutImage} alt="About" className="md:w-1/3" />
                <span className="flex flex-col justify-center p-12 leading-8 md:w-1/2">
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
