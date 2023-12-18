import { H1 } from '@/components/Text/Headings.tsx'
import ResourceTable from '@/components/Resources/ResourceTable.tsx'
import preventImage from '../../assets/panic - prevent.svg'

export const PanicPrevent = () => {
    return (
        <div className="p-8 flex justify-center items-center flex-col">
            <img src={preventImage} alt="Prevention" className="w-1/2" />
            <H1 title="Prevention" />
            <span className="text-center mb-6">
                Here are a few resources for you if you're feeling safe but
                still need to reach out to someone
            </span>
            <ResourceTable />
        </div>
    )
}
