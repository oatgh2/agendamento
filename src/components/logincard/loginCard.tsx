import { ReactNode } from "react"
import './loginCard.css'


const LoginCard = (props: any) => {
    const { children, style } = props
    return (
        <div style={style} className="card">
            {children}
        </div>
    )
}

export default LoginCard