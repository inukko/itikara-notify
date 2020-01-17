import axios from 'axios';
import moment from 'moment-timezone';

moment.tz.setDefault('Asia/Tokyo');

const ENDPOINT_URL = process.env.ENDPOINT_URL;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

const fetch = async (endpoint: string): Promise<any> => {
    try {
        const response = await axios.get(endpoint);
        const {status, data} = response.data;
        if (status == 'ok') {
            return {
                status,
                data,
            };
        }
        return '動画情報の取得に失敗しました(´；ω；｀)'
    } catch (error) {
        console.log(error); 
    }
}

const getLiverItems = async () => {
    const result = await fetch(ENDPOINT_URL).catch(error => console.log(error));
    const {events} = result.data;
    const now = moment();

    /**
     * 一時間以内のライブを抽出
     */
    const liveItems = events.filter((event: any) => {
        const isHourMatch = moment(event.start_date).diff(now, 'hour') === 0;
        const isAfter = moment(event.start_date).isAfter(now);
        return isHourMatch && isAfter;
    });

    return liveItems;
}

const makePostParams = async () => {
    const webHookItems = await getLiverItems();

    const postParams = webHookItems.map((item: any) => {
        const {livers, start_date} = item;
        const liveTime = moment(start_date).format('WW/DD   HH時mm分');
        const {name, avatar} = livers[0]

        return {
            avatar_url: avatar,
            username: name,
            content: `:small_orange_diamond: ${liveTime}〜 ライブ開始\r${item.url}`
        }
    })

    return postParams;
}

const postWebHook = async (): Promise<void> => {
    const postParams = await makePostParams();

    postParams.map(async (params: any) => {
        console.log(params)
        await axios.post(WEBHOOK_URL, params)
    })
}

postWebHook();