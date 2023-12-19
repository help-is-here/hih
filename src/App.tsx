import './App.css'
import { Navigation } from '@/components/Navigation/Navigation'
import { HomePage } from '@/views/HomePage/HomePage.tsx'
import { Footer } from '@/components/Footer/Footer.tsx'

function App() {
    return (
        <div className="relative min-h-screen w-screen bg-orange-50">
            <Navigation />
            <HomePage />
            <Footer />
        </div>
    )
}

export default App
