import { Navigation } from '@/components/Navigation/Navigation.tsx'
import { H1 } from '@/components/Text/Headings.tsx'
import ResourceTable from '@/components/Resources/ResourceTable.tsx'
import { SearchBar } from '@/components/Resources/SearchBar.tsx'
import { Footer } from '@/components/Footer/Footer.tsx'
import { useState } from 'react'
import { FilterTags } from '@/components/Resources/FilterTags.tsx'

export const ResourcesPage = () => {
    const [search, setSearch] = useState<string>('')
    const [filterTags, setFilterTags] = useState<string[]>([])
    return (
        <div className="relative w-screen min-h-screen bg-orange-50">
            <Navigation />
            <section className="p-8">
                <H1 title="Resources" />
            </section>
            <section className="flex justify-center flex-col items-center">
                <div className="w-1/2">
                    <SearchBar setSearch={setSearch} />
                </div>
                <div className="w-1/2">
                    <FilterTags setFilterTags={setFilterTags} />
                </div>
            </section>
            <section className="p-8">
                <ResourceTable search={search} filterTags={filterTags} />
            </section>
            <Footer />
        </div>
    )
}
