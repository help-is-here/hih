export enum EAction {
    Add = 'ADD',
    Remove = 'REMOVE',
    None = 'NONE',
}

export enum EAssessments {
    Precaution = 'precaution',
    Prevention = 'prevent',
    Predicament = 'predicament',
}

export enum EDecisions {
    None = 'none',
    Suicidality = 'Suicidality',
    Depression = 'Depression',
    Anxiety = 'Anxiety',
    Other = 'Other',
}

export interface IOption {
    id: string
    value: string | number
    label: string
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
