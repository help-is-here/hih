export enum EAction {
    Add = 'ADD',
    Remove = 'REMOVE',
    None = 'NONE',
}
export interface ITag {
    id: number
    name: string
    category: string
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
