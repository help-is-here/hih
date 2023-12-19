import { Navigation } from '@/components/Navigation/Navigation.tsx'
import { H1 } from '@/components/Text/Headings.tsx'
import ResourceTable from '@/components/Resources/ResourceTable.tsx'
import { SearchBar } from '@/components/Resources/SearchBar.tsx'
import { Footer } from '@/components/Footer/Footer.tsx'

export const ResourcesPage = () => {
    return (
        <div className="relative min-h-screen w-screen bg-orange-50">
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
            <Footer />
        </div>
    )
}
