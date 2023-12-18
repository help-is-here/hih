import client from '@/database/client'
export default function LogoutButton() {
    const signOut = async () => {
        const { error } = await client.auth.signOut()
        if (error) throw error
    }
    return (
        <a className="m-1 rounded-full bg-orange-500 px-8 py-3 font-bold text-white hover:bg-orange-600">
            <button onClick={signOut}>Logout</button>
        </a>
    )
}
