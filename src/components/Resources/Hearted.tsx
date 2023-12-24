import { FaHeart } from 'react-icons/fa'

type THearted = {
    num: number
}
export default function Hearted({ num }: THearted) {
    return (
        <div className="flex flex-row items-center justify-end text-right">
            <span className="pr-1">
                <FaHeart color="#FF5B1F" />
            </span>
            {String(num)}
        </div>
    )
}
