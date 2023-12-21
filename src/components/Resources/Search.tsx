export const Search = () => {
    return (
        <div className="relative">
            <input
                type="text"
                placeholder="search"
                className="w-full rounded-lg border-none py-2 pl-10 pr-4"
            />
            <div
                className="pointer-events-none absolute inset-y-0 left-0
                    flex items-center
                    pl-3"
            >
                <i className="fa fa-search text-gray-400"></i>
            </div>
        </div>
    )
}
