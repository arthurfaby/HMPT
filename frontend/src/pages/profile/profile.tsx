import { useAuth } from "../../hooks/useAuth"

export default function Profile() {

    const { status } = useAuth()
    console.log(status)
    return (
        <div>
            <h1>Profile</h1>
        </div>
    )
}