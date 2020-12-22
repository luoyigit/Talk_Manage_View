import http from 'utils/http'

export default function() {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/UserApi/api/Department/GetDepartmentList'
        }
        http.get(option).then(data => {
            // data.forEach(item => {
            //     if(item.children.length == 0) {
            //         item.children = null
            //     }
            // });
            var result = [];
            data.forEach(item => {
                if(item.children.length > 0) {
                    result.push( {id: item.id, label:item.label, children: item.children.map(c => {
                        if(c.children.length > 0) {
                            return {
                                id: c.id,
                                label:c.label,
                                children:c.children
                            }
                        }
                        else {
                            return {
                                id: c.id,
                                label:c.label
                            }
                        }
                    })})
                } else {
                    result.push( {id: item.id, label:item.label})
                }
            });
            resolve(result)
        }).catch(() => {
            reject()
        })
    })
}