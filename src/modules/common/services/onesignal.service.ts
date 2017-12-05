import { Component } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance, AxiosResponse } from 'axios';
const env = require('../../../../env.json')['oneSignal'];

export interface IOneSignalCreateRequest {
    app_id?: string;
    contents: any;
    included_segments: string[];
    send_after?: Date|string;
    delivery_time_of_day?: string;
    delayed_option?: string;
    subtitle?: string;
    headings?: string;
}

export interface IOneSignalCreateResponse {
    id?: number|string;
    recipients?: number;
    errors?: any;
}


@Component()
export class OneSignalService{

    private readonly url: string;
    private readonly appKey: string;
    private readonly userAuth: string;
    private readonly appId: string;
    private readonly http: AxiosInstance;

    constructor() {
        this.appKey = env['appKey'];
        this.userAuth = env['userAuth'];
        this.url = env['url'];
        this.appId = env['appId'];
        this.http = axios.create({
            baseURL: this.url,
            headers: {'Authorization': `Basic ${this.appKey}`}
        });
    }

    async createNotification(data : IOneSignalCreateRequest): Promise<IOneSignalCreateResponse> {
        data.app_id = this.appId;
        this.http.defaults.headers["Content-Type"] = "application/json; charset=utf-8";
        try {
            const axiosResponse: AxiosResponse = await this.http.post('/notifications', data);
            const response: IOneSignalCreateResponse = axiosResponse.data;
            return response;
        } catch(e) {
            return e;
        }
    }

}