import { useEffect, useState } from 'react'
import { ITag } from '@/types'
import { Tag } from '../Resources/Tag'

type TTypeahead = {
    allResults: ITag[]
    onAdd: (tag: ITag) => void
}
export default function TagTypeahead({ allResults, onAdd }: TTypeahead) {
    const [val, setVal] = useState('')
    const [filtered, setFiltered] = useState<ITag[]>([])
    const [toggled, setToggled] = useState(false)

    useEffect(() => {
        if (val.trim()) {
            setToggled(true)
            setFiltered(allResults.filter((r) => r.name.includes(val)))
        } else {
            setToggled(false)
            setFiltered(allResults)
        }
    }, [allResults, val])
    return (
        <div className="relative">
            <input
                value={val}
                onChange={(e) => setVal(e.target.value)}
                className="block w-24 w-full rounded-full border border-solid px-2 "
            />
            <div
                className={`z-10 ${
                    toggled ? 'absolute' : 'hidden'
                } mt-1 w-60 rounded-lg bg-white p-4 shadow dark:bg-gray-700`}
            >
                {filtered.map((f) => {
                    return (
                        <button
                            key={f.name}
                            className="block w-full"
                            onClick={() => onAdd(f)}
                        >
                            <div className="w-fit">
                                <Tag tag={f} />
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
