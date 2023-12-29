import { Label, Radio } from 'flowbite-react'
import AssessmentCard from './AssessmentCard'
import { IOption } from '@/types'
import { useEffect, useState } from 'react'
const radioTheme = {
    root: {
        base: 'h-4 w-4 border border-gray-300 focus:ring-2 focus:ring-orange text-orange-600',
    },
}
const labelTheme = {
    root: {
        base: 'text-sm font-medium',
        disabled: 'opacity-50',
        colors: {
            default: 'text-white',
            info: 'text-cyan-500 dark:text-cyan-600',
            failure: 'text-red-700 dark:text-red-500',
            warning: 'text-yellow-500 dark:text-yellow-600',
            success: 'text-green-700 dark:text-green-500',
        },
    },
}

type TMultiOptionCard = {
    title: string
    options: IOption[]
    value: string | number
    onSet: (val: string | number) => void
}
export default function YesNoCard({
    title,
    options,
    onSet,
    value,
}: TMultiOptionCard) {
    const [val, setVal] = useState<string | number>('')

    useEffect(() => {
        if (value) {
            setVal(value)
        }
    }, [value])
    return (
        <AssessmentCard>
            <div>
                <fieldset className="flex max-w-md flex-col gap-4">
                    <legend className="mb-4">{title} </legend>
                    {options.map((o) => {
                        return (
                            <div className="flex items-center gap-2">
                                <Radio
                                    theme={radioTheme}
                                    id={o.id}
                                    name={`multiOption${title}`}
                                    value={o.value}
                                    defaultChecked={Boolean(val)}
                                    onChange={() => {
                                        setVal(o.value)
                                        onSet(o.value)
                                    }}
                                />
                                <Label theme={labelTheme} htmlFor={o.id}>
                                    {o.label}
                                </Label>
                            </div>
                        )
                    })}
                </fieldset>
            </div>
        </AssessmentCard>
    )
}
