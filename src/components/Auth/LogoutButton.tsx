import client from '@/database/client'
export default function LogoutButton() {
    const signOut = async () => {
        const { error } = await client.auth.signOut()
        if (error) throw error
    }
    return (
        <a className="py-3 px-8 m-1 rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600">
            <button onClick={signOut}>Logout</button>
        </a>
    )
}
