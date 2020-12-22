import {createAgentData} from '../models/agent'
import http from 'utils/http'

//获取代理商列表
export default function({from, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Agent/GetAgentPageList',
            data: from,
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.get(option).then(data => {
            let ret = {
                dataList: data.dataList,
                goodsTypeCount: data.goodsTypeCount, //货物类别数量
                projectTypeCount: data.projectTypeCount, //工程类别数量
                serviceTypeCount: data.serviceTypeCount, //服务类别数量
                comprehensiveCount: data.comprehensiveCount, //综合类别数量
                pageIndex: data.pageIndex,
                totalCount: data.totalCount
            }
            resolve(ret)
        }).catch(() => {
            reject()
        })
    })
}
