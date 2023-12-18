import { H1 } from '@/components/Text/Headings.tsx'
import ResourceTable from '@/components/Resources/ResourceTable.tsx'
import preventImage from '../../assets/panic - prevent.svg'

export const PanicPrevent = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <img src={preventImage} alt="Prevention" className="w-1/2" />
            <H1 title="Prevention" />
            <span className="mb-6 text-center">
                Here are a few resources for you if you're feeling safe but
                still need to reach out to someone
            </span>
            <ResourceTable />
        </div>
    )
}
