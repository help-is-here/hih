import { Auth } from '@supabase/auth-ui-react'
import client from '@/database/client'
import { Navigation } from '@/components/Navigation/Navigation'

const customTheme = {
    default: {
        colors: {
            brand: '#fb923c',
            brandAccent: '#c2410c',
            brandButtonText: 'white',
            inputBackground: 'white',
            defaultButtonBackground: 'white',
            defaultButtonBackgroundHover: '#eaeaea',
            defaultButtonBorder: 'lightgray',
            defaultButtonText: 'gray',
            dividerBackground: '#eaeaea',
        },
        space: {
            spaceSmall: '4px',
            spaceMedium: '8px',
            spaceLarge: '16px',
            labelBottomMargin: '8px',
            anchorBottomMargin: '4px',
            emailInputSpacing: '4px',
            socialAuthSpacing: '4px',
            buttonPadding: '10px 15px',
            inputPadding: '10px 15px',
        },
        borderWidths: {
            buttonBorderWidth: '0px',
            inputBorderWidth: '0px',
        },
        // borderStyles: {},
        radii: {
            borderRadiusButton: '12px',
            buttonBorderRadius: '12px',
            inputBorderRadius: '12px',
        },
    },
}

const LoginPage = () => (
    <>
        <Navigation />
        <div className="w-screen h-screen flex justify-center items-center bg-orange-950">
            <div className="w-96 bg-orange-50 rounded-lg p-8">
                <Auth
                    supabaseClient={client}
                    theme="default"
                    appearance={{ theme: customTheme }}
                    providers={['google']}
                />
            </div>
        </div>
    </>
)
export default LoginPage
