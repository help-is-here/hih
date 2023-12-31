import { EAction, ICategory, ITag } from '@/types'
import { Alert } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { FaExclamationCircle } from 'react-icons/fa'
import RemovableTag from './RemovableTag'

type TTagUpdater = {
    initTags: ITag[]
    onSet: (newTags: ITag[]) => void
    category?: ICategory
    notAllowed?: ITag[]
    allowed?: ITag[]
}
export default function TagUpdater({
    initTags,
    onSet,
    category,
    notAllowed = [],
    allowed = [],
}: TTagUpdater) {
    const [tags, setTags] = useState<ITag[]>([])
    const [newTag, setNewTag] = useState('')
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        setTags(initTags)
    }, [initTags])

    const addTag = (tagName: string) => {
        const temp = [...tags]
        if (
            notAllowed.map((t) => t.name).includes(tagName) ||
            (allowed &&
                allowed.length &&
                !allowed.map((t) => t.name).includes(tagName))
        ) {
            setAlert(true)
        }
        // If the original tags included this tag, add it back in to reduce load on db
        else if (initTags.map((t) => t.name).includes(tagName)) {
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
                    id: category?.id ? category.id : -1,
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
            const ogTag = initTags.find((t) => t.name === tagName)
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
        <div>
            <Alert
                className={`${alert ? 'block' : 'hidden'} mb-4  `}
                color="failure"
                icon={FaExclamationCircle}
                onDismiss={() => setAlert(false)}
            >
                That tag is not allowed.
            </Alert>
            <div className="flex flex-wrap gap-1">
                {tags.length === 0 ? (
                    <span>Add a tag...</span>
                ) : (
                    tags
                        .filter((t) => t.action !== EAction.Remove)
                        .map((t) => {
                            return (
                                <RemovableTag
                                    key={t.name}
                                    tag={t}
                                    category={category}
                                    onRemove={removeTag}
                                />
                            )
                        })
                )}
                <input
                    className={`w-24 rounded-full border border-solid border-gray-600 px-2 py-1`}
                    onKeyUp={(e) => (e.key === 'Enter' ? addTag(newTag) : null)}
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                />
            </div>
        </div>
    )
}
