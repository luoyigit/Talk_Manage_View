import http from 'utils/http'
import {createStaff} from '../models/staff'
import {createDept} from '../models/department'

export default function({keyword, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Employee/FindEmployee',
            data: {keyword},
            loading
        }
        http.get(option).then(data => {
            if (data && data.DataList) {
                let ret = data.DataList.map(item => createStaff({
                    id: item.Id,
                    phone: item.CellPhone,
                    department: item.Departments ? item.Departments.map(item => createDept({
                        id: item.Id,
                        name: item.Name
                    })) : [],
                    createdOn: item.CreatedOn,
                    employeeNo: item.EmployeeNo,
                    loginId: item.LoginId,
                    sex: item.Sex,
                    status: item.Status,
                    realName: item.RealName,
                    userName: item.UserName
                }))
                resolve(ret)
            } else {
                reject()
            }
        })
    })
}