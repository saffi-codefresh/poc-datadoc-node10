import { v1 } from "@datadog/datadog-api-client";
// import * as fs from "fs";
// import {ApiKeyConfiguration} from "@datadog/datadog-api-client/dist/packages/datadog-api-client-v1/auth/auth";
const DD_SITE="datadoghq.com"
const DD_API_KEY="c63300c80c1dea10386eedfb3c1b83a6"
const DD_APP_KEY="5ed7234648daec96054c58951bed3c00ba90260e"

const configuration = v1.createConfiguration({
    authMethods:{
        apiKeyAuth: DD_API_KEY,
        // appKeyAuth: DD_APP_KEY,
    }}
);
const apiInstance = new v1.AuthenticationApi(configuration);

apiInstance
    .validate()
    .then((data: any) => {
        console.log(
            "API called successfully. Returned data: " + JSON.stringify(data)
        );
    })
    .catch((error: any) => console.error(error));
