import { ITag } from '@/types'
import { useEffect, useState } from 'react'
import ValidatedInput from '../Form/ValidatedInput'
import TagUpdater from '../Form/TagUpdater'
import { defaultStaleTime, getTags, insertResource } from '@/api/api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Alert } from 'flowbite-react'
import { FaCheck, FaTag } from 'react-icons/fa'
import ValidatedTextarea from '../Form/ValidatedTextarea'

type TResourceForm = {
    onUpdate: (val: string) => void
}
export const ResourceForm = ({ onUpdate }: TResourceForm) => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState<ITag[]>([])
    const [isDisabled, setIsDisabled] = useState(false)
    const [alert, setAlert] = useState(false)
    const queryClient = useQueryClient()
    const saveResourceMut = useMutation({
        mutationFn: insertResource,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['resources'] })
            setAlert(true)
        },
    })

    useEffect(() => {
        if (title.trim() || description.trim()) {
            onUpdate(`${title} ${description}`)
        }
        if (title && url && description && tags.length > 0) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [title, url, description, tags.length, onUpdate])

    const { isLoading, isError, data } = useQuery('allTags', getTags, {
        staleTime: defaultStaleTime,
    })

    if (isLoading) {
        return <FaTag className="animate-spin" />
    }
    if (isError) {
        return <div>Oops, an error occured</div>
    }
    return (
        <div className="w-full rounded-lg bg-orange-800 px-12 py-8">
            <Alert
                className={`${alert ? 'block' : 'hidden'} mb-4  `}
                color="success"
                icon={FaCheck}
                onDismiss={() => setAlert(false)}
            >
                An email with a password reset link has been sent.
            </Alert>
            <div>
                <h1 className="mb-4 text-3xl text-white">Suggest a resource</h1>
                <ValidatedInput
                    type="text"
                    name="Title"
                    value={title}
                    validator={(val) => val.trim().length > 0}
                    placeholder="Extra special title"
                    onChange={(value) => setTitle(value)}
                />
                <ValidatedInput
                    type="text"
                    name="url"
                    value={url}
                    validator={(val) => val.trim().length > 0}
                    placeholder="https://url.com"
                    onChange={(value) => setUrl(value)}
                />
                <ValidatedTextarea
                    name="url"
                    value={description}
                    validator={(val) => val.trim().length > 0}
                    placeholder="A description"
                    onChange={(value) => setDescription(value)}
                />
                <div className="rounded-lg bg-orange-300 px-8 py-4">
                    <TagUpdater
                        // @ts-expect-error: supabase join problems
                        allowed={data && data.data ? data.data : []}
                        initTags={[]}
                        onSet={(val) => setTags(val)}
                    />
                </div>
                <button
                    disabled={isDisabled}
                    onClick={() =>
                        saveResourceMut.mutate({
                            id: -1,
                            name: title,
                            link: url,
                            description: description,
                            in_review: true,
                            tag_resource: tags,
                            num_helped: -1,
                        })
                    }
                    className="mt-2 w-full rounded-lg bg-orange-100 px-4 py-2 text-black"
                >
                    Save
                </button>
            </div>
        </div>
    )
}
