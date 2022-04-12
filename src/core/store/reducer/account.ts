import { createReducer, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { UserData } from '~models/type';
import { AuthStatus } from '~constant';

interface AccountState {
	document?: FirebaseFirestoreTypes.DocumentReference;
	uid?: string;
	userData?: UserData;
	userState: AuthStatus;
}

const initState: AccountState = {
	userState: AuthStatus.NOT_DEFINITELY,
};

type SigInReturnData = { uid: string; document: FirebaseFirestoreTypes.DocumentReference };

export const signIn = createAsyncThunk(
	'account/signIn',
	async (_, { fulfillWithValue, rejectWithValue }): Promise<SigInReturnData | Error> => {
		try {
			const user = auth().currentUser;
			if (user == null) throw new Error('[no user signed in]');
			const document = firestore().collection('User').doc(user.uid);
			const userData = await document.get();
			return {
				uid: user.uid,
				document: document,
			};
		} catch (error) {
			if (error instanceof Error) return error;
			return new Error('[no standart Error] ' + error);
		}
	},
);

export default createReducer(initState, (builder) => {
	builder.addCase(signIn.fulfilled, (state, { payload }) => {
		if (!(payload instanceof Error)) {
			state.uid = payload.uid;
			state.document = payload.document;
		}
	});
});
