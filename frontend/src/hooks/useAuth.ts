import User from '../types/user';
import {useAccountStore} from '../store';
import { useCallback } from 'react';
import { getUser } from '../services/api/authApi';

export enum AuthStatus {
    Unknown = 0,
    Authenticated = 1,
    Guest = 2,
}

export function useAuth() {
    const { account, setAccount } = useAccountStore();
    let status = AuthStatus.Unknown;
    
    switch(account){
        case null:
            status = AuthStatus.Guest;
            break;
        case undefined:
            status = AuthStatus.Unknown;
            break;
        default:
            status = AuthStatus.Authenticated;
            break;
    }

    const Authenticate = useCallback(async () => {
        const response = await getUser()
        if (!response.ok) {
            setAccount(null)
        }
     }, [])
    
    return {
        account,
        status,
        Authenticate,
    };
}