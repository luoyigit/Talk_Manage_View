import {createDept} from '../models/department'
import http from 'utils/http'
import {createStaff} from '../models/staff'

export default function({data, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/UserApi/api/Department/GetDepartmentInfo',
            data: {departmentId: data},
            loading: loading
        }
        http.get(option).then(data => {
            let ret = createDept({
                id: data.id,
                parentId: data.parentId,
                name: data.name,
                sortIndex: data.sortIndex,
                leaders:data.leaders ? data.learders.map(item => createStaff({
                    id: item.employeeId,
                    realName: item.employeeName
                })): [],
                higherLeaders:data.higherLearders ?  data.higherLearders.map(item => createStaff({
                    id: item.employeeId,
                    realName: item.employeeName
                })):[],
            })
            resolve(ret)
        }).catch(() => {
            reject()
        })
    })
}