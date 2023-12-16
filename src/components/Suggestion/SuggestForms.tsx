import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import { useState } from 'react'
export const ResourceForm = () => {
    const [tags, setTags] = useState([])
    const handleChange = (input: any) => {
        setTags(input)
    }
    return (
        <div className="w-6/12">
            <form>
                <h1 className="text-2xl pb-2">Suggest a Resource</h1>
                <label htmlFor="title" className="font-bold">
                    Title
                </label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="w-full mb-6 p-2 rounded"
                />

                <br />
                <label htmlFor="url" className="font-bold">
                    URL
                </label>
                <br />
                <input
                    type="text"
                    id="url"
                    name="url"
                    className="w-full mb-6 p-2 rounded"
                />

                <br />
                <label htmlFor="description" className="font-bold">
                    Description
                </label>
                <br />
                <textarea
                    id="description"
                    name="description"
                    className="w-full mb-6 p-2 rounded"
                />

                <br />
                <label htmlFor="tags" className="font-bold">
                    Tags
                </label>
                <br />
                <TagsInput value={tags} onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
