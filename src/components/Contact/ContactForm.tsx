'use client'

import { Button, Label, TextInput, Textarea } from 'flowbite-react'
import ValidatedInput from '../Form/ValidatedInput'
import { validateEmail } from '../Form/Validators'
import { useState } from 'react'

export default function ContactForm() {
    const [formValid, setValid] = useState(false)
    const [email, setEmail] = useState('')

    return (
        <div className="flex h-screen w-screen justify-center bg-orange-950">
            <form className="mt-24 flex h-fit w-96 max-w-md flex-col gap-4 bg-orange-50 p-12">
                <ValidatedInput
                    placeholder="me@example.com"
                    validator={validateEmail}
                    onInvalid={() => setValid(false)}
                    onValid={(val) => {
                        setEmail(val)
                        setValid(true)
                    }}
                    type="text"
                />
                <ValidatedInput
                    placeholder="Subject"
                    validator={null}
                    onInvalid={() => setValid(false)}
                    onValid={(val) => {
                        setEmail(val)
                        setValid(true)
                    }}
                    type="text"
                />
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="message" value="Subject" />
                    </div>
                    <Textarea id="message" required />
                </div>
                <Button type="submit">Send us an email</Button>
            </form>
        </div>
    )
}
