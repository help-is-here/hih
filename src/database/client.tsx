import { createClient } from '@supabase/supabase-js'
import { IDatabase } from './types'

const client = createClient<IDatabase>(
    import.meta.env.VITE_DB_URL,
    import.meta.env.VITE_DB_SECRET
)
export default client
