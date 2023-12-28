import { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { FaTag } from 'react-icons/fa'

type TFilterButtons = {
    onHeartedFilter: (payload: boolean) => void
}
export const FilterButtons = ({ onHeartedFilter }: TFilterButtons) => {
    return (
        <div className="mt-2 flex flex-row gap-2">
            <HeartedButton
                onFilter={(toggle) =>
                    toggle ? onHeartedFilter(true) : onHeartedFilter(false)
                }
            />
            <FilterTagsButton />
        </div>
    )
}

type THeartedButton = {
    onFilter: (toggle: boolean) => void
}
const HeartedButton = ({ onFilter }: THeartedButton) => {
    const [toggle, setToggle] = useState(false)

    return (
        <button
            onClick={() => {
                onFilter(!toggle)
                setToggle(!toggle)
            }}
            className={`${
                toggle
                    ? 'bg-orange-600 text-white hover:bg-orange-500'
                    : 'bg-orange-200'
            } flex w-1/2 flex-row items-center rounded p-2 text-slate-900 hover:bg-orange-200 md:w-full`}
        >
            <div className="px-2">
                <FaHeart />
            </div>
            <span>Hearted Resources</span>
        </button>
    )
}

const FilterTagsButton = () => {
    return (
        <button className="flex w-1/2 flex-row items-center rounded bg-orange-200 p-2 text-slate-900 hover:bg-orange-300 md:hidden">
            <div className="px-2">
                <FaTag size="20px" />
            </div>
            Filter Tags
        </button>
    )
}
