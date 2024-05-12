import {create} from 'zustand';
import {combine} from 'zustand/middleware';
import User from './types/user';

 export const useAccountStore = create(
    combine({
        account: undefined as null | undefined | User,
    }, (set) => ({
        setAccount: (account: User | null) => set({account}),
    }))
)