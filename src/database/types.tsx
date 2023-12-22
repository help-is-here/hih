export type TJson =
    | string
    | number
    | boolean
    | null
    | { [key: string]: TJson | undefined }
    | TJson[]

export interface IDatabase {
    public: {
        Tables: {
            resources: {
                Row: {
                    // the data expected from .select()
                    id: number
                    name: string
                    data: TJson | null
                }
                Insert: {
                    // the data to be passed to .insert()
                    id?: never // generated columns must not be supplied
                    name: string // `not null` columns with no default must be supplied
                    data?: TJson | null // nullable columns can be omitted
                }
                Update: {
                    // the data to be passed to .update()
                    id?: never
                    name?: string // `not null` columns are optional on .update()
                    data?: TJson | null
                }
            }
            tags: {
                Row: {
                    // the data expected from .select()
                    id: number
                    name: string
                    data: TJson | null
                }
                Insert: {
                    // the data to be passed to .insert()
                    id?: never // generated columns must not be supplied
                    name: string // `not null` columns with no default must be supplied
                    data?: TJson | null // nullable columns can be omitted
                }
                Update: {
                    // the data to be passed to .update()
                    id?: never
                    name?: string // `not null` columns are optional on .update()
                    data?: TJson | null
                }
            }
            tag_resource: {
                Row: {
                    // the data expected from .select()
                    id: number
                    name: string
                    data: TJson | null
                }
                Insert: {
                    // the data to be passed to .insert()
                    id?: never // generated columns must not be supplied
                    name: string // `not null` columns with no default must be supplied
                    data?: TJson | null // nullable columns can be omitted
                }
                Update: {
                    // the data to be passed to .update()
                    id?: never
                    name?: string // `not null` columns are optional on .update()
                    data?: TJson | null
                }
            }
        }
    }
}
