export enum EAction {
    Add = 'ADD',
    Remove = 'REMOVE',
    None = 'NONE',
}

export interface ITag {
    id: number
    name: string
    tag_category?: ICategory
    action?: EAction
}

export interface IResource {
    id: number
    name: string
    description: string
    link: string
    num_helped: number
    tag_resource?: ITag[]
    in_review: boolean
}

export interface ICategory {
    id: number
    name: string
    color: string
    tags?: ITag[]
}
