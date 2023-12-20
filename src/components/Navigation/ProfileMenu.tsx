import { FaUser } from 'react-icons/fa'
import client from '@/database/client'

export default function ProfileMenu() {
    const signOut = async () => {
        const { error } = await client.auth.signOut()
        if (error) throw error
    }
    return (
        <div>
            <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown-button"
                className="inline-flex items-center rounded-full bg-orange-500 p-4 text-center text-orange-50"
                type="button"
            >
                <FaUser />
            </button>

            <div
                id="dropdown-button"
                className="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
            >
                <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                >
                    <li>
                        <a
                            href="/change-password"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Change password
                        </a>
                    </li>
                    <li>
                        <button
                            onClick={signOut}
                            className="block w-full px-4 py-2 text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
