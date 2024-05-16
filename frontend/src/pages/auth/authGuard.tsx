import { PropsWithChildren } from "react";
import { AuthStatus, useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard(props: PropsWithChildren) {

    const {status, Authenticate } = useAuth()
    if(status === AuthStatus.Unknown)
        Authenticate()
    if(status === AuthStatus.Guest)
        return <Navigate to='/login' replace = {true}></Navigate>
    return <Outlet/>
}