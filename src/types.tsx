export interface ITag {
    id: number
    name: string
    category: string
}

export interface IResource {
    id: number
    name: string
    description: string
    link: string
    num_helped: number
    tag_resource: ITag[]
    in_review: boolean
}
