import { AuthContext } from '@/context/AuthContext'
import { useContext, useState } from 'react'
import { FaHeart } from 'react-icons/fa'

type TFilterButtons = {
    onHeartedFilter: (payload: boolean) => void
}
export const FilterButtons = ({ onHeartedFilter }: TFilterButtons) => {
    const { authenticated } = useContext(AuthContext)

    return (
        <div className="mt-2 flex w-full flex-row gap-2">
            {authenticated ? (
                <HeartedButton
                    onFilter={(toggle) =>
                        toggle ? onHeartedFilter(true) : onHeartedFilter(false)
                    }
                />
            ) : (
                <></>
            )}
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
            } flex w-full flex-row items-center justify-center rounded p-2 text-slate-900 hover:bg-orange-200`}
        >
            <div className="px-2">
                <FaHeart />
            </div>
            <span>Hearted Resources</span>
        </button>
    )
}
