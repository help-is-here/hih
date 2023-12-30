import './App.css'
import { HomePage } from '@/views/HomePage/HomePage.tsx'
import HomeLayout from '@/components/Layouts/HomeLayout'

function App() {
    return (
        <HomeLayout>
            <HomePage />
        </HomeLayout>
    )
}

export default App
