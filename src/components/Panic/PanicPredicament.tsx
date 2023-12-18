import predicamentImage from '@/assets/panic - predicament.svg'
import { H1 } from '@/components/Text/Headings.tsx'
import ResourceTable from '@/components/Resources/ResourceTable.tsx'

export const PanicPredicament = () => {
    return (
        <div className="p-8 flex justify-center items-center flex-col">
            <img src={predicamentImage} alt="Prevention" className="w-1/2" />
            <H1 title="Predicament" />
            <span className="text-center mb-6">
                Here are a few resources for you if you're in crisis and need
                medical attention
            </span>
            <ResourceTable />
        </div>
    )
}
