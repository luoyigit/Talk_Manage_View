import http from 'utils/http'

export default function({data, loading, nomessage}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/UserApi/api/Department/CreateDepartment',
            data: {
                parentId: data.parentId,
                name: data.name,
                sortIndex: data.sortIndex,
                leaderIds: data.leaders.map(item => item.id),
                higherLeader: data.higherLeaders.map(item => item.id)
            },
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null,
            nomessage: nomessage
        }
        http.post(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}