export class OperationLogData {
    constructor({id, employeeName, operationTime, logContent}) {
        this.id = id
        this.employeeName = employeeName // 操作人
        this.operationTime = operationTime // 操作时间
        this.logContent = logContent //操作内容
    }
}
// 系统日志
export function createOperationLogData(data) {
    return new OperationLogData(data)
}

export function initOperationLogData() {
    return new OperationLogData({
        id: '',
        employeeName: '',
        operationTime: '',
        logContent: ''
    })
}