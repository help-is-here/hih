import './App.css'
import { FaInfoCircle } from 'react-icons/fa'
import Tag from './Tag'
import { Navigation } from '@/components/Navigation/Navigation'
import ResourceTable from '@/components/ResourceTable'
import { HomePage } from '@/views/HomePage/HomePage.tsx'

function App() {
    return (
        <div className="relative w-screen min-h-screen bg-orange-50">
            <Navigation />
            <HomePage />
            <div className="sticky top-0 w-full flex justify-between p-2 items-center">
                <FaInfoCircle size="3rem" color="black" />
                <div>
                    <img src="/abi.png" width="60px" height="60px" />
                </div>
            </div>
            <div className="w-full mt-48 justify-center flex">
                <button className="w-96 bg-orange-700 border-orange-700 text-white hover:text-zinc-800 hover:border hover:border-solid hover:bg-white rounded-full px-8 py-4">
                    Help Me
                </button>
            </div>

            <div className="mx-96 flex flex-wrap justify-center my-8 gap-2">
                <Tag>Depression</Tag>
                <Tag>Anxiety</Tag>
                <Tag>Subtance Abuse</Tag>
                <Tag>Support</Tag>
                <Tag>Hospitalization</Tag>
                <Tag>Partial Hospitalization</Tag>
                <Tag>Substance Abuse</Tag>
                <Tag>Crisis</Tag>
                <Tag>Psychosis</Tag>
                <Tag>Helping a Loved one</Tag>
                <Tag>Personality Disorders</Tag>
            </div>

            <div className="px-24 py-12">
                <ResourceTable />
            </div>
        </div>
    )
}

export default App
