import { ReactNode } from "react"
import './loginCard.css'


const LoginCard = (props: any) => {
    const { children } = props
    return (
        <div className="card">
            {children}
        </div>
    )
}

export default LoginCard