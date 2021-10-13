import { v1 } from "@datadog/datadog-api-client";
import {
    EventsApiCreateEventRequest,
    MetricsApiSubmitMetricsRequest
} from "@codefresh-io/datadog-api-client-10-1/dist/packages/datadog-api-client-v1";
// import * as fs from "fs";
// import {ApiKeyConfiguration} from "@datadog/datadog-api-client/dist/packages/datadog-api-client-v1/auth/auth";
const DD_SITE="datadoghq.com"
const DD_API_KEY="c63300c80c1dea10386eedfb3c1b83a6"
const DD_APP_KEY="5ed7234648daec96054c58951bed3c00ba90260e"

const configuration = v1.createConfiguration({
    authMethods:{
        apiKeyAuth: DD_API_KEY,
        appKeyAuth: DD_APP_KEY,     // for events - can use DD-API-KEY value
    }}
);
const test1 = async () => {
    const apiInstance = new v1.AuthenticationApi(configuration);

    const data = await apiInstance.validate()

    console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
    );
}
const test2 = async () => {
    const apiInstance = new v1.MetricsApi(configuration);
    const payload : MetricsApiSubmitMetricsRequest = {
        body: {
            "series" : [
                {
                    "metric": "system.load.1",
                    "points": [
                        [
                            (new Date()).getTime(),
                            1234.5
                        ]
                    ]
                }
            ]
        }
    }
    const data = await apiInstance.submitMetrics(payload)
    console.log(`Response ${JSON.stringify(data)}`)
    // const apiInstance = new v1.MonitorsApi(configuration);
    // let params:v1.MonitorsApiGetMonitorRequest = {
    //     // number | The ID of the monitor
    //     monitorId: 1,
    // };
    //
    // const data = await apiInstance.getMonitor(params)
    // console.log('API called successfully. Returned data: ' + data);
}
const testEvent = async () => {
    const apiInstance = new v1.EventsApi(configuration);
    const payload : EventsApiCreateEventRequest = {
        body: {
            title: "Did you hear the news today?",
            text: "Oh boy!",
            aggregationKey: "adip",
            alertType: "info",
            deviceName: "ut cillum occaecat amet eu",
            host: "do ani",
            priority: "normal",
            // relatedEventId: -20896850,
            sourceTypeName: "in in sit",
            tags: [
                "environment:test"
            ]     ,
            payload: " {x:1}"
        }
    }
    const delay = 30
    const startTime = Math.floor((new Date()).getTime()/1000)
    const endTime = startTime+delay
    const data = await apiInstance.createEvent(payload)
    console.log(`start ${startTime} end ${endTime} Response ${JSON.stringify(data)}`)
    const lst0 = await apiInstance.listEvents({start:startTime, end:endTime})
    await new Promise((resolve,reject)=> setTimeout( resolve, delay*1000 ) )
    const lst = await apiInstance.listEvents({start:startTime, end:endTime})
   console.log(`lst start ${startTime} end ${endTime} Response ${JSON.stringify(lst)}`)

    // const apiInstance = new v1.MonitorsApi(configuration);
    // let params:v1.MonitorsApiGetMonitorRequest = {
    //     // number | The ID of the monitor
    //     monitorId: 1,
    // };
    //
    // const data = await apiInstance.getMonitor(params)
    // console.log('API called successfully. Returned data: ' + data);
}



async function main() {
    await test1()
    await test2()
    await testEvent()
}


main().then(
    ()=>{
        console.log('Done')
    }).catch((error)=>{
        console.error(error)
    })

