export default function PromptGenerator() {
    return (
        <div>
            <div>
                Let us help you reach out to your loved ones. Consider texting
                or calling someone using the prompts generated here.
            </div>
            <div className="border-gray flex rounded-full border border-4 border-solid">
                <input className="w-full rounded-s-full px-4 py-2" />
                <button className="bg-orange-300 px-4 py-2">Generate</button>
                <button className="rounded-e-full bg-orange-800 px-4 py-2 text-white">
                    Copy
                </button>
            </div>
        </div>
    )
}
