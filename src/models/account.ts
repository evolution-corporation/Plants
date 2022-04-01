import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import validator from 'validator'

import Plant from './plant'
import User from './user'
import { AuthAccountData, AuthType } from './type'
import { AuthStatus } from '~constant'


import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import type { FirebaseStorageTypes } from '@react-native-firebase/storage'
import type { FirebaseAuthTypes } from '@react-native-firebase/auth'

interface PhoneAuth {
    (code: string ): Promise<void>
}

interface AccountState {
    authStatus: AuthStatus,
    account?: Account,
    setAccount: Function,
    delAccount: Function,
}

export const accountState: AccountState = {
    authStatus: AuthStatus.NOT_DEFINITELY,
    account: undefined,
    setAccount: (account: Account) => {
        accountState.account = account
        accountState.authStatus = AuthStatus.AUTHORIZED
    },
    delAccount: () => {
        accountState.account = undefined
        accountState.authStatus = AuthStatus.NO_AUTHORIZED
    }
}

export async function Auth(authData: AuthAccountData): Promise<void | PhoneAuth> {
        let userCredintal: FirebaseAuthTypes.UserCredential | undefined
        switch (authData.type) {
            case AuthType.GOOGLE:
                const googleCredential: FirebaseAuthTypes.AuthCredential = auth.GoogleAuthProvider.credential(authData.googleId)
                userCredintal = await auth().signInWithCredential(googleCredential) 
                break;
            case AuthType.PHONE:
                if (!validator.isMobilePhone(authData.phone)) throw new Error('Mobile phone no validate')
                const confirmationResult: FirebaseAuthTypes.ConfirmationResult = await auth().signInWithPhoneNumber(authData.phone)
                return async (code) => {
                    const userCredintal: FirebaseAuthTypes.UserCredential | null = await confirmationResult.confirm(code)
                    if (userCredintal?.user){
                        accountState.setAccount(new Account(userCredintal?.user.uid))
                    }
                }
        }
        if (userCredintal?.user) {
            accountState.setAccount(new Account(userCredintal?.user.uid))
        }
    }

export function userCheckAuth(): Function {
        const subsctibe = auth().onAuthStateChanged((user)=>{
            if (user) {
                accountState.setAccount(new Account(user.uid))
            } else {
                accountState.delAccount()
            }
        })
        return () => subsctibe()
    }

export default class Account extends User {
    public plants: Array<Plant> = []

    constructor(id: string){
        super(id)
        Plant.getUserPlant(id).then((plants) => {
            this.plants.push(...plants)
        })
    }
    
}