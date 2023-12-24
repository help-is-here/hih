import AdminTabs from '@/components/Admin/AdminTabs'
import { Footer } from '@/components/Footer/Footer'
import { Navigation } from '@/components/Navigation/Navigation'

export default function AdminPage() {
    return (
        <>
            <Navigation />
            <AdminTabs />
            <Footer />
        </>
    )
}
