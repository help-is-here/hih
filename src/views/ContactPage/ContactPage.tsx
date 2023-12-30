import ContactForm from '@/components/Contact/ContactForm'
import AuthPageLayout from '@/components/Layouts/AuthPageLayout'

export default function ContactPage() {
    return (
        <>
            <AuthPageLayout>
                <ContactForm />
            </AuthPageLayout>
        </>
    )
}
