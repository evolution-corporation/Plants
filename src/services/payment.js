import { NativeModules } from 'react-native'
import uuid from 'react-native-uuid';
import auth from '@react-native-firebase/auth';

const { TinkoffSDK } = NativeModules

class Tinkoff {
    constructor(TerminalKey, PublickKey, TestMode = false) {
        this.TerminalKey = TestMode ? "1635503669838DEMO" : TerminalKey
        this.PublickKey = TestMode ? "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv5yse9ka3ZQE0feuGtemYv3IqOlLck8zHUM7lTr0za6lXTszRSXfUO7jMb+L5C7e2QNFs+7sIX2OQJ6a+HG8kr+jwJ4tS3cVsWtd9NXpsU40PE4MeNr5RqiNXjcDxA+L4OsEm/BlyFOEOh2epGyYUd5/iO3OiQFRNicomT2saQYAeqIwuELPs1XpLk9HLx5qPbm8fRrQhjeUD5TLO8b+4yCnObe8vy/BMUwBfq+ieWADIjwWCMp2KTpMGLz48qnaD9kdrYJ0iyHqzb2mkDhdIzkim24A3lWoYitJCBrrB2xM05sm9+OdCI1f7nPNJbl5URHobSwR94IRGT7CJcUjvwIDAQAB" : PublickKey
        this.TestMode = TestMode
        
    }

    // async checkGooglePay () {
    //     this.isGooglePay = await TinkofSDK.checkGooglePay(this.TerminalKey)
    //     return this.isGooglePay
    // }

    // async openGooglePay (price) {
    //     await this.checkGooglePay()
    //     if (this.isGooglePay) {
    //         return await TinkofSDK.openGooglePay(price, this.TerminalKey, this.TestMode)
    //     } 
    //     return false
    // }

    async openTerminal(price, title, description, OrderId, userID) {
return await TinkoffSDK.openTerminal(price, title, description, OrderId, this.TerminalKey, this.PublickKey, userID)
    }
}


async function openTerminal ({ price, currency }, title, description) {
    const TerminalID = '1635503669838'
    const TerminalKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv5yse9ka3ZQE0feuGtemYv3IqOlLck8zHUM7lTr0za6lXTszRSXfUO7jMb+L5C7e2QNFs+7sIX2OQJ6a+HG8kr+jwJ4tS3cVsWtd9NXpsU40PE4MeNr5RqiNXjcDxA+L4OsEm/BlyFOEOh2epGyYUd5/iO3OiQFRNicomT2saQYAeqIwuELPs1XpLk9HLx5qPbm8fRrQhjeUD5TLO8b+4yCnObe8vy/BMUwBfq+ieWADIjwWCMp2KTpMGLz48qnaD9kdrYJ0iyHqzb2mkDhdIzkim24A3lWoYitJCBrrB2xM05sm9+OdCI1f7nPNJbl5URHobSwR94IRGT7CJcUjvwIDAQAB'
    const tinkoff = new Tinkoff(TerminalID, TerminalKey, false)
    if (currency == 'RUB') {
        //console.log(await tinkoff.openGooglePay(price))
        const status = await tinkoff.openTerminal(price, title, description, uuid.v4(), auth()._user.uid)
        if ( status == 'onSuccess') {
            return 'onSuccess'
        } else {
            console.log(status)
        }
        return 'error'
    }
}

export default {
    openTerminal
}


