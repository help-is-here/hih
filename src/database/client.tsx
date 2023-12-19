import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

const client = createClient<Database>(
    import.meta.env.VITE_DB_URL,
    import.meta.env.VITE_DB_SECRET
)
export default client
