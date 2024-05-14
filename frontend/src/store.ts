import {create} from 'zustand';
import {combine, persist} from 'zustand/middleware';
import User from './types/user';

 export const useAccountStore = create(
    persist(
        combine({
            account: null as undefined | null | string,
        }, (set) => ({
            setAccount: (account: string | null) => set({account}),
        })),
        {name: "account"}
    )
)