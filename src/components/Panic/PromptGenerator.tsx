export default function PromptGenerator() {
    return (
        <div className="flex w-full flex-col justify-center gap-4 rounded-lg bg-orange-200 p-4 md:px-12 md:py-12">
            <div>
                Want to reach out to loved ones but not sure how to start? Use
                our prompt generator.
            </div>
            <div className="flex w-full flex-wrap justify-center gap-4 sm:gap-0">
                <input className="w-full rounded-full border border-2 border-e-0 border-gray-700 px-4 py-2 sm:w-72 sm:rounded-none sm:rounded-s-full lg:w-48 xl:w-72" />
                <button className="rounded-full border border-2 border-solid border-orange-500 bg-orange-500  px-4 py-2 text-white sm:rounded-none">
                    Generate
                </button>
                <button className="rounded-full border border-2 border-solid border-orange-800 bg-orange-800 px-4 py-2 text-white sm:rounded-none sm:rounded-e-full">
                    Copy
                </button>
            </div>
        </div>
    )
}
