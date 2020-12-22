import http from 'utils/http'
import {createOperationLogData} from '../models/operation-log'

//获取系统日志列表数据
export default function({form, loading}) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: '/SystemBaseApi/api/OperationLog/FindList',
            data: form,
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.get(option).then(data => {
            let ret = {}
            ret.pageIndex = data.pageIndex
            ret.totalPage = data.totalPage
            ret.totalCount = data.totalCount
            ret.list = data.dataList ? data.dataList.map(item => createOperationLogData ({
                employeeName: item.employeeName,
                operationTime: item.operationTimeStr,
                logContent: item.logContent
            })) : []
            resolve(ret)
        }).catch(() => {
            reject()
        })
    })
}