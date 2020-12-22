import http from 'utils/http'
import {createStaff} from '../models/staff'
import {createDept} from '../models/department'

export default function({id, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/UserAPi/APi/Employee/GetDepartmentEmployeeList',
            data: {departmentId: id},
            loading: loading
        }
        http.get(option).then(data => {
            if (data) {
                let ret = data.map(item => createStaff({
                    id: item.id,
                    phone: item.cellPhone,
                    department: item.departments ? item.departments.map(item => createDept({
                        id: item.id,
                        name: item.name
                    })) : [],
                    createdOn: item.createdOn,
                    employeeNo: item.employeeNo,
                    loginId: item.loginId,
                    sex: item.sex,
                    status: item.status,
                    realName: item.realName,
                    userName: item.userName,
                    roleName: item.roleName
                }))
                resolve(ret)
            } else {
                reject()
            }
        }).catch(() => {
            reject()
        })
    })
}