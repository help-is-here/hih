import { FaUser } from 'react-icons/fa'
import client from '@/database/client'
import { Dropdown } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext, TAuthContext } from '@/context/AuthContext'

export default function ProfileMenu() {
    const { updateAuthenticated, updateAdmin } =
        useContext<TAuthContext>(AuthContext)

    const signOut = async () => {
        const { error } = await client.auth.signOut()
        if (!error) {
            updateAdmin(false)
            updateAuthenticated(false)
        } else {
            throw error
        }
    }

    const TriggerDropdown = (
        <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown-button"
            className="inline-flex items-center rounded-full bg-orange-500 p-4 text-center text-orange-50"
            type="button"
        >
            <FaUser />
        </button>
    )
    return (
        <div>
            <Dropdown
                label=""
                dismissOnClick={false}
                renderTrigger={() => TriggerDropdown}
            >
                <Dropdown.Item as={Link} to="/change-password">
                    Change Password
                </Dropdown.Item>
                <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
            </Dropdown>
        </div>
    )
}
