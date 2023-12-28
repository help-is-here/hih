import { EAction, ITag } from '@/types'
import { Alert } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { FaExclamationCircle, FaTimes } from 'react-icons/fa'

type TTagUpdater = {
    initTags: ITag[]
    onSet: (newTags: ITag[]) => void
    categoryId?: number
    notAllowed?: ITag[]
}
export default function TagUpdater({
    initTags,
    onSet,
    categoryId,
    notAllowed = [],
}: TTagUpdater) {
    const originalTags = initTags
    const [tags, setTags] = useState<ITag[]>([])
    const [newTag, setNewTag] = useState('')
    const [valid, setValid] = useState(true)
    const [alert, setAlert] = useState(true)

    useEffect(() => {
        if (initTags.length) {
            setTags(initTags)
        }
    }, [initTags])

    const addTag = (tagName: string) => {
        const temp = [...tags]
        setValid(true)
        if (notAllowed.map((t) => t.name).includes(tagName)) {
            setAlert(true)
        }
        // If the original tags included this tag, add it back in to reduce load on db
        else if (originalTags.map((t) => t.name).includes(tagName)) {
            reAddTag(tagName, temp)
        } else if (tags.map((t) => t.name).includes(tagName)) {
            setNewTag('')
        } else {
            temp.push({
                name: tagName,
                action: EAction.Add,
                id: -1,
                tag_category: {
                    name: '',
                    id: categoryId ? categoryId : -1,
                    color: '',
                },
            })
            setTags(temp)
            setNewTag('')
        }
        onSet(temp)
    }

    const reAddTag = (tagName: string, temp: ITag[]) => {
        // If original tags included this tag but it was removed, add it back in
        if (
            tags
                .filter((t) => t.action === EAction.Remove)
                .map((t) => t.name)
                .includes(tagName)
        ) {
            const ogTag = originalTags.find((t) => t.name === tagName)
            if (ogTag) {
                temp.push(ogTag)
            }
            setTags(temp)
        }
        setNewTag('')
    }

    const removeTag = (tag: ITag) => {
        const temp = [...tags]
        temp.splice(temp.indexOf(tag), 1, { ...tag, action: EAction.Remove })
        setTags(temp)
        onSet(temp)
    }

    return (
        <div className="flex flex-wrap gap-1">
            <Alert
                className={`${alert ? 'block' : 'hidden'} mb-4  `}
                color="failure"
                icon={FaExclamationCircle}
                onDismiss={() => setAlert(false)}
            >
                That tag is already assigned to another category.
            </Alert>
            {tags.length === 0 ? (
                <span>Add a tag...</span>
            ) : (
                tags
                    .filter((t) => t.action !== EAction.Remove)
                    .map((t) => {
                        return (
                            <div
                                key={t.name}
                                className="align-center flex justify-between rounded-full px-2 py-1 "
                                style={{
                                    background:
                                        t.tag_category &&
                                        t.tag_category.color.trim()
                                            ? t.tag_category.color
                                            : '#fdba74',
                                }}
                            >
                                {t.name}
                                <button
                                    className="ms-3"
                                    onClick={() => removeTag(t)}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        )
                    })
            )}
            <input
                className={`${
                    !valid ? 'bg-red' : 'bg-white'
                } w-24 rounded-full border border-solid border-gray-600 px-2 py-1`}
                onKeyUp={(e) => (e.key === 'Enter' ? addTag(newTag) : null)}
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
            />
        </div>
    )
}
