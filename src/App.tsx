import './App.css'
import { Navigation } from '@/components/Navigation/Navigation'
import { HomePage } from '@/views/HomePage/HomePage.tsx'
import { Footer } from '@/components/Footer/Footer.tsx'

function App() {
    return (
        <div className="min-w-screen min-h-screen bg-orange-50">
            <Navigation />
            <HomePage />
            <Footer />
        </div>
    )
}

export default App
