import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

export const Footer = () => {
    return (
        <footer>
            <div className="flex justify-between p-8 text-center text-xs">
                <div className="justify-self-start">
                    <Link to="/">
                        <img src={logo} alt="logo" className="h-12" />
                    </Link>
                </div>
                <div>
                    © 2023 Help is Here
                    <br /> Made with love by Abi and Xue
                </div>
                <div className="flex">
                    <Link to="/privacy-policy" className="underline">
                        Privacy Policy
                    </Link>
                    <span className="mx-4">|</span>
                    <Link to="/contact" className="underline">
                        Contact Us
                    </Link>
                </div>
            </div>
        </footer>
    )
}
