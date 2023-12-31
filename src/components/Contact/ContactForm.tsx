'use client'

import ValidatedInput from '../Form/ValidatedInput'
import { validateEmail } from '../Form/Validators'
import { useEffect, useState } from 'react'
import ValidatedTextarea from '@/components/Form/ValidatedTextarea'
import SubmitButton from '../Form/SubmitButton'
import { Octokit } from 'octokit'
import { Alert } from 'flowbite-react'
import { FaCheck, FaExclamationCircle } from 'react-icons/fa'

export default function ContactForm() {
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [formValid, setValid] = useState(false)
    const [successAlert, setSuccessAlert] = useState<boolean>(false)
    const [errorAlert, setErrorAlert] = useState<boolean>(false)

    useEffect(() => {
        if (
            validateEmail(email) &&
            subject.trim().length > 0 &&
            message.trim().length > 0
        ) {
            setValid(true)
        } else {
            setValid(false)
        }
    }, [email, subject, message])

    const createIssue = async () => {
        const octokit = new Octokit({
            auth: String(import.meta.env.VITE_GH_TOKEN),
        })

        const data = await octokit.request(
            'POST /repos/help-is-here/hih/issues',
            {
                owner: 'help-is-here',
                repo: 'hih',
                title: subject,
                body: `from:${email} message: ${message}`,
                labels: ['info request'],
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            }
        )
        const addQuery = `
                mutation {
                    addProjectV2ItemById(
                        input: {
                            projectId: "PVT_kwDOCTO1FM4AZ1WC"
                            contentId: "${data.data.node_id}"
                        }
                    ) {
                        item {
                            id
                        }
                    }
                }
            `
        await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + import.meta.env.VITE_GH_TOKEN,
            },
            body: JSON.stringify({ query: addQuery }),
        })
    }
    return (
        <div className="flex h-screen w-screen justify-center bg-orange-950">
            <form
                name="contact"
                data-netlify-recaptcha="true"
                data-netlify="true"
                onSubmit={() => setSuccessAlert(true)}
                onError={() => setErrorAlert(true)}
                className="mt-24 flex h-fit w-96 max-w-md flex-col gap-2 rounded-lg bg-orange-50 p-12"
            >
                <Alert
                    className={`${successAlert ? 'block' : 'hidden'} mb-4  `}
                    color="success"
                    icon={FaCheck}
                    onDismiss={() => setSuccessAlert(false)}
                >
                    Thanks for contacting us! We'll be in touch shortly.
                </Alert>
                <Alert
                    className={`${errorAlert ? 'block' : 'hidden'} mb-4  `}
                    color="failure"
                    icon={FaExclamationCircle}
                    onDismiss={() => setErrorAlert(false)}
                >
                    We're sorry, an error occurred. Try again later or contact
                    us.
                </Alert>

                <input type="hidden" name="form-name" value="contact" />
                <div className="mb-8 text-center text-xl">Contact us!</div>
                <ValidatedInput
                    name="email"
                    placeholder="me@example.com"
                    validator={validateEmail}
                    onChange={setEmail}
                    type="text"
                    value={email}
                />
                <ValidatedInput
                    name="subject"
                    placeholder="Subject"
                    validator={null}
                    onChange={setSubject}
                    type="text"
                    value={subject}
                />
                <ValidatedTextarea
                    name="message"
                    placeholder="Message"
                    validator={null}
                    onChange={setMessage}
                    value={message}
                />
                <div className="my-2" data-netlify-recaptcha="true"></div>

                <SubmitButton
                    onClick={(e) => {
                        e.preventDefault()
                        createIssue()
                    }}
                    disabled={formValid}
                >
                    Send us an email
                </SubmitButton>
            </form>
        </div>
    )
}
