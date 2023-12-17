import { Auth } from '@supabase/auth-ui-react'
import client from '@/database/client'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const LoginPage = () => (
  <Auth
    supabaseClient={client}
    appearance={{theme: ThemeSupa}}
  />
)
export default LoginPage