package com.plant;

import android.content.Intent;
import android.app.Activity;
import com.facebook.react.bridge.*;
import com.google.android.gms.wallet.WalletConstants;
import ru.tinkoff.acquiring.sdk.*;
import ru.tinkoff.acquiring.sdk.models.*;
import ru.tinkoff.acquiring.sdk.models.enums.CheckType;
import ru.tinkoff.acquiring.sdk.models.options.screen.PaymentOptions;
import ru.tinkoff.acquiring.sdk.payment.*;
import ru.tinkoff.acquiring.sdk.utils.*;
import ru.tinkoff.acquiring.sdk.models.options.*;
import java.util.*;
import kotlin.*;

public class TinkoffSDK extends ReactContextBaseJavaModule {
    private Promise ResultPromise = null;
    private static final int PAYMENT_REQUEST_CODE = 1;
    private static final int GOOGLE_PAY_REQUEST_CODE = 5;
    private static final int RESULT_ERROR = 500;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            if (requestCode == PAYMENT_REQUEST_CODE) {
                switch (resultCode) {
                    case (Activity.RESULT_OK): 
                        ResultPromise.resolve("onSuccess");
                        break;
                    case (RESULT_ERROR): 
                        if (data != null) {
                            ResultPromise.resolve(TinkoffAcquiring.RESULT_ERROR);
                        }
                        break;
                } 
            }
        }
    };

    TinkoffSDK(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    private PaymentOptions createPaymentOptions(Double Price, String Title, String Description, String OrderId, String UserUID) {
        // Данные заказа
        OrderOptions orderOptions = new OrderOptions();
        orderOptions.setAmount(Money.ofRubles(Price));
        orderOptions.setTitle(Title);
        orderOptions.setDescription(Description);
        orderOptions.setOrderId(OrderId);
        orderOptions.setRecurrentPayment(false);

        // Данные покупателя
        CustomerOptions customerOptions = new CustomerOptions();
        customerOptions.setCustomerKey(UserUID);
        customerOptions.setCheckType(CheckType.NO.toString());
        //customerOptions.setEmail("useremail@gmail.com");
        
        // Настройки для конфигурирования визуального отображения и функций экранов SDK
        FeaturesOptions featuresOptions = new FeaturesOptions();
        // featuresOptions.setLocalizationSource(new AsdkSource(Language.RU));
        // featuresOptions.setHandleCardListErrorInSdk(true);
        featuresOptions.setUseSecureKeyboard(true);
        // featuresOptions.setCameraCardScanner(new CameraCardIOScanner());
        // featuresOptions.setFpsEnabled(true);
        // featuresOptions.setDarkThemeMode(DarkThemeMode.AUTO);
        // featuresOptions.setTheme(R.style.Theme_MyApplication);
        // featuresOptions.setUserCanSelectCard(true);
        featuresOptions.setEmailRequired(false);
        // Настройки для проведения платежа
        PaymentOptions paymentOptions = new PaymentOptions();
        paymentOptions.setOrder(orderOptions);
        paymentOptions.setCustomer(customerOptions);
        paymentOptions.setFeatures(featuresOptions);

        return paymentOptions;
    }

    @Override
    public String getName() {
        return "TinkoffSDK";
    }


    @ReactMethod
    public void openTerminal(Double Price, String Title, String Description, String OrderId, String TerminalKey, String PublickKey, String UserUID, Promise promise) {
        final TinkoffAcquiring tinkoffAcquiring = new TinkoffAcquiring(TerminalKey, PublickKey);
        AcquiringSdk.AsdkLogger.setDeveloperMode(true);
        final Activity activity = getCurrentActivity();
        if (activity != null) {
            ResultPromise = promise;
            tinkoffAcquiring.openPaymentScreen(activity, createPaymentOptions(Price, Title, Description, OrderId, UserUID), PAYMENT_REQUEST_CODE);
        }
    }
}