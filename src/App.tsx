import './App.css'
import { FaInfoCircle } from 'react-icons/fa'
import Tag from './Tag'
import data from './data'
import MiniTag from './MiniTag'
import { Navigation } from './components/Navigation/Navigation'

function App() {
    return (
        <div className="relative w-screen min-h-screen bg-orange-50">
            <Navigation />
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
                <table className="w-full bg-white rounded-lg">
                    <thead className="border border-solid border-0 border-b-8 border-orange-50 ">
                        <th className="text-left p-4">Resource</th>
                        <th className="text-left p-4">Description</th>
                        <th className="text-left p-4">Tags</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {data.map((d) => {
                            return (
                                <tr className="border-orange-50">
                                    <td className="p-4">
                                        <a
                                            className="text-orange-900 underline"
                                            href={d.link}
                                        >
                                            {d.name}
                                        </a>
                                    </td>
                                    <td className="p-4 w-96">
                                        {d.description}
                                    </td>
                                    <td className="flex w-96 flex-wrap p-4 gap-1">
                                        {d.tags.map((t) => {
                                            return <MiniTag>{t.name}</MiniTag>
                                        })}
                                    </td>
                                    <td className="text-xs p-4">
                                        This resource helped{' '}
                                        <span className="text-lg bg-orange-200 rounded-full px-2 py-1">
                                            {d.helped_num}
                                        </span>
                                        people
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default App
