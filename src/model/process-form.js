class ProcessForm {
    constructor({id, type, name, remark}) {
        this.id = id
        this.type = type
        this.name = name
        this.remark = remark
    }
}

export function createForm(data) {
    return new ProcessForm(data)
}

export function initForm() {
    return new ProcessForm({
        id: '',
        type: '',
        name: '',
        remark: ''
    })
}