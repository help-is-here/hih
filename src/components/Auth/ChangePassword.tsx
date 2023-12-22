'use client'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { validatePassword } from '../Form/Validators'
import client from '@/database/client'
import ValidatedInput from '../Form/ValidatedInput'

export default function ChangePassword() {
    const [password, setPassword] = useState<string>('')
    const [formValid, setValid] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (validatePassword(password)) {
            setValid(true)
        } else {
            setValid(false)
        }
    }, [password])

    const updatePassword = async () => {
        const { error } = await client.auth.updateUser({
            password: password,
        })
        if (!error) {
            navigate('/')
        } else {
            alert("We're so sorry, an error occured.")
        }
    }

    return (
        <>
            <ValidatedInput
                type="password"
                validator={validatePassword}
                onChange={setPassword}
                placeholder="my-special-password"
            />
            <div className="text-sm">
                Password must be 8 characters long and have at least one of each
                of these: <br />
                - lowercase letters <br />
                - uppercase letters <br />
                - numbers <br />- symbols
            </div>
            <button
                title={!formValid ? 'All fields must be valid' : ''}
                className="my-4 block w-full rounded-full bg-orange-400 py-2 disabled:bg-orange-200 disabled:text-gray-600"
                disabled={!formValid}
                onClick={updatePassword}
            >
                Change Password
            </button>
        </>
    )
}
