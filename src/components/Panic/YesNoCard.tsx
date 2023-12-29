import { Label, Radio } from 'flowbite-react'
import AssessmentCard from './AssessmentCard'
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

type TYesNoCard = {
    title: string
    val: string
    onSet: (val: string) => void
}
export default function YesNoCard({ title, val, onSet }: TYesNoCard) {
    return (
        <AssessmentCard>
            <div>
                <fieldset className="flex max-w-md flex-col gap-4">
                    <legend className="mb-4">{title} </legend>
                    <div className="flex items-center gap-2">
                        <Radio
                            theme={radioTheme}
                            id="yes"
                            name="yesno"
                            value="yes"
                            checked={val === 'yes'}
                            onChange={() => onSet('yes')}
                        />
                        <Label theme={labelTheme} htmlFor="yes">
                            Yes
                        </Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Radio
                            theme={radioTheme}
                            id="no"
                            name="yesno"
                            value="no"
                            checked={val === 'no'}
                            onChange={() => onSet('no')}
                        />
                        <Label theme={labelTheme} htmlFor="no">
                            No
                        </Label>
                    </div>
                </fieldset>
            </div>
        </AssessmentCard>
    )
}
