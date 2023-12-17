import { Navigation } from '@/components/Navigation/Navigation.tsx'
import { H1 } from '@/components/Text/Headings.tsx'
import ResourceTable from '@/components/Resources/ResourceTable.tsx'
import { SearchBar } from '@/components/Resources/SearchBar.tsx'

export const ResourcesPage = () => {
    return (
        <div className="relative w-screen min-h-screen bg-orange-50">
            <Navigation />
            <section className="p-8">
                <H1 title="Resources" />
            </section>
            <section className="flex justify-center">
                <div className="w-1/2">
                    <SearchBar />
                </div>
            </section>
            <section className="p-8">
                <ResourceTable />
            </section>
        </div>
    )
}
