import React, { createContext } from 'react';
import auth from '@react-native-firebase/auth';
import validator from 'validator';

import Plant from './plant';
import User from './user';
import { AuthAccountData, AuthType } from './type';
import { AuthStatus } from '~constant';

import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface PhoneAuth {
	(code: string): Promise<void>;
}

class Account extends User {
	public plants: Array<Plant> = [];
	constructor(id: string) {
		super(id);
		// Plant.getUserPlant(id).then((plants) => {
		// 	this.plants.push(...plants);
		// });
	}
}

export class AccountState {
	authStatus: AuthStatus;
	account?: Account;

	constructor(authStatus: AuthStatus) {
		this.authStatus = authStatus;
	}

	userCheckAuth(callback: { (status: AuthStatus): void }): Function {
		const subsctibe = auth().onAuthStateChanged((user) => {
			if (user) {
				this.account = new Account(user.uid);
				this.authStatus = AuthStatus.AUTHORIZED;
			} else {
				this.account = undefined;
				this.authStatus = AuthStatus.NO_AUTHORIZED;
			}
			callback(this.authStatus);
		});
		return () => subsctibe();
	}

	async Auth(authData: AuthAccountData): Promise<void | PhoneAuth> {
		switch (authData.type) {
			case AuthType.GOOGLE:
				const googleCredential: FirebaseAuthTypes.AuthCredential = auth.GoogleAuthProvider.credential(
					authData.googleId,
				);
				const userCredintal = await auth().signInWithCredential(googleCredential);
				this.account = new Account(userCredintal?.user.uid);
				this.authStatus = AuthStatus.AUTHORIZED;
				break;
			case AuthType.PHONE:
				if (!validator.isMobilePhone(authData.phone)) throw new Error('Mobile phone no validate');
				const confirmationResult: FirebaseAuthTypes.ConfirmationResult = await auth().signInWithPhoneNumber(
					authData.phone,
				);
				return async (code) => {
					const userCredintal: FirebaseAuthTypes.UserCredential | null = await confirmationResult.confirm(code);
					if (userCredintal?.user) {
						this.account = new Account(userCredintal?.user.uid);
						this.authStatus = AuthStatus.AUTHORIZED;
					}
				};
		}
	}
}

const AccountContext = createContext<AccountState>(new AccountState(AuthStatus.NOT_DEFINITELY));
AccountContext.displayName = 'AccountState';
export default AccountContext;
