import { FaHeart } from 'react-icons/fa'
import { FaTag } from 'react-icons/fa'

export const FilterButtons = () => {
    return (
        <div className="mt-2 flex flex-row gap-2">
            <HeartedButton />
            <FilterTagsButton />
        </div>
    )
}

const HeartedButton = () => {
    return (
        <div className="flex w-1/2 flex-row items-center rounded bg-orange-100 p-2 text-slate-900 hover:bg-orange-200">
            <div className="px-2">
                <FaHeart />
            </div>
            Hearted
        </div>
    )
}

const FilterTagsButton = () => {
    return (
        <div className="flex w-1/2 flex-row items-center rounded bg-orange-200 p-2 text-slate-900 hover:bg-orange-300">
            <div className="px-2">
                <FaTag size="20px" />
            </div>
            Filter Tags
        </div>
    )
}
