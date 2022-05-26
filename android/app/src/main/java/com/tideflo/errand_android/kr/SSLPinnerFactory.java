package com.tideflo.errand_android.kr;

import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;


import okhttp3.CertificatePinner;
import okhttp3.OkHttpClient;

public class SSLPinnerFactory implements OkHttpClientFactory{
    private static String hostname = "appdev.tideflo.work";

    public OkHttpClient createNewNetworkModuleClient () {
        CertificatePinner certificatePinner = new CertificatePinner.Builder()
                .add(hostname, "sha256/Mm4JrpNCR5gkIQQkMhiYjaixt1V2XFT9g1DGiNXOgac=")
                .build();
        OkHttpClient.Builder clientBuilder = OkHttpClientProvider.createClientBuilder();
        return clientBuilder.certificatePinner(certificatePinner).build();
    }
}
