import {
    initTempNode,
    createTempNode,
    initTempLine,
    createTempLine,
    initSubProcess,
    createSubProcess,
    createMergingStep,
    initMergingStep,
    initFreeProcess,
    createFreeProcess,
} from 'model/process-temp'

export default {
    props: {
        formData: {
            type: Object,
        },
        designData: {
            type: String,
        },
    },
    data() {
        return {
            designer: null,
            currentNode: initTempNode(), // 当前节点
            nodeData: null, // 对节点数据对象进行缓存
            currentLine: initTempLine(), // 当前编辑连线
            lineData: null, // 对连线数据对象进行缓存
            freeProcess: initFreeProcess(), // 当前自由流程
            freeProcessData: null, // 对自由流程数据对象进行缓存
        }
    },
    methods: {
        // 刷新画布
        refresh() {
            let data = this.designer.getFlowData()
            this.designer.displayFlow(data)
        },
        setDecideNodeName(nodeName) {
            this.nodeData.text = nodeName
            this.$refs.setDecide.hide()
            this.refresh()
        },
        // 获取节点数据
        getNodeData() {
            // console.log('当前节点',this.currentNode.employeeList)
            // this.currentNode.employeeIds = this.currentNode.employeeList.map((item) => item.id)

            this.currentNode.employeeIds = this.currentNode.employeeList;

            // this.currentNode.departmentIds = this.currentNode.department.map((item) => item.id)
            this.nodeData = Object.assign(this.nodeData, this.currentNode)
           
            this.$refs.node.hide()
            this.refresh()
        },
        // 获取连线条件判断数据
        getLineData() {
            this.lineData = Object.assign(this.lineData, this.currentLine)
            this.$refs.line.hide()
            this.refresh()
        },
        // 获取自由流程数据
        getFreeProcessData() {
            this.freeProcessData = Object.assign(this.freeProcessData, this.freeProcess)
            this.$refs.freeProcess.hide()
            this.refresh()
        },
        // 检查合并步骤是否可以设置
        checkMergingStep(node) {
            // return new Promise((resolve, reject) => {
            //     let data = JSON.parse(this.designer.getFlowData())
            //     let lines = data.linkDataArray.filter(item => item.to === node.key)
            //     let nodes = data.nodeDataArray.filter(item => {
            //         return lines.some(line => line.from === item.key)
            //     })
            //     let ret = nodes.every(node => {
            //         return node.stepType === 5 || node.stepType === 4
            //     })
            //     if (nodes.length > 1) {
            //         if (ret) {
            //             resolve(nodes)
            //         } else {
            //             reject('转交步骤之前只能是并行步骤')
            //         }
            //     } else {
            //         reject('转交步骤之前至少有2个节点')
            //     }
            // })
            return Promise.resolve()
        },
        initNodeFieldSetting() {
            this.currentNode.fiedlSettings =this.formData.fieldList ? this.formData.fieldList.map((field) => {
                return {
                    fieldName: field.label,
                    fieldCode: field.code,
                    show: true,
                    change: false,
                }
            }):[]
        },
        //双击节点编辑
        editProcessInfo(node) {
            // console.log(node.data)
            let data = this.designer.getFlowData()
            let dataObj = JSON.parse(data)
            console.log('dataObj', dataObj)
            console.log('node.data', node.data)
            if (node.data.key) {
                // 双击审核步骤或并行步骤
                if (node.data.stepType === 2 || node.data.stepType === 5) {
                    this.nodeData = node.data
                    if (node.data.hasData) {
                        this.currentNode = createTempNode(node.data)
                        // 设置节点默认字段权限
                        if (this.currentNode.fiedlSettings.length === 0) {
                            this.initNodeFieldSetting()
                        }
                    } else {
                        this.currentNode = node.data.stepType === 5 ? initTempNode('并行步骤') : initTempNode()
                        this.initNodeFieldSetting()
                    }
                    this.$nextTick(() => {
                        this.$refs.node.show()
                    })
                }

                // 双击子流程或并行子流程
                if (node.data.stepType === 3) {
                    this.processData = node.data
                    if (node.data.hasData) {
                        this.currentProcess = createSubProcess(node.data)
                    } else {
                        this.currentProcess = node.data.stepType === 4 ? initSubProcess('并行子流程') : initSubProcess()
                    }
                    this.$nextTick(() => {
                        this.$refs.process.show()
                    })
                }

                // 双击转交步骤
                if (node.data.stepType === 7) {
                    this.checkMergingStep(node.data)
                        .then((nodes) => {
                            this.mergingNodes = nodes
                            this.mergingStepData = node.data
                            if (node.data.hasData) {
                                this.mergingStep = createMergingStep(node.data)
                            } else {
                                this.mergingStep = initMergingStep()
                            }
                            this.$nextTick(() => {
                                this.$refs.mergingStep.show()
                            })
                        })
                        .catch((msg) => {
                            this.$message({ type: 'warning', message: msg })
                        })
                }

                // 双击自由流程
                if (node.data.stepType === 6) {
                    this.freeProcessData = node.data
                    if (node.data.hasData) {
                        this.freeProcess = createFreeProcess(node.data)
                    } else {
                        this.freeProcess = initFreeProcess()
                    }
                    this.$nextTick(() => {
                        this.$refs.freeProcess.show()
                    })
                }
                // 双击判断节点
                if (node.data.stepType === 8) {
                    console.log('双击判断节点',node.data)
                    this.nodeData = node.data
                    this.$nextTick(() => {
                        this.$refs.setDecide.show()
                    })
                }
            } else {
                let data = this.designer.getFlowData()
                let nodeArr = JSON.parse(data).nodeDataArray
                let index = nodeArr.findIndex((item) => item.key === node.data.from)
                let fromNode = nodeArr[index]
                // 只有条件判断之后的连线可以设置
                if (fromNode.stepType === 8) {
                    this.lineData = node.data
                    if (node.data.hasData) {
                        this.currentLine = createTempLine(node.data)
                    } else {
                        this.currentLine = initTempLine()
                    }
                    this.$nextTick(() => {
                        this.$refs.line.show()
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: '只有条件判断之后的连线可以设置条件',
                    })
                }
            }
        },
        // 验证开始结束节点
        validateStartEnd(data) {
            return new Promise((resolve, reject) => {
                let startNodes = data.nodeDataArray.filter((item) => item.stepType === 1)
                let startLen = startNodes.length
                let endNodes = data.nodeDataArray.filter((item) => item.stepType === 9)
                let endLen = endNodes.length
                if (startLen > 1) {
                    reject('只能有一个开始节点')
                } else if (startLen < 1) {
                    reject('必须有一个开始节点')
                } else if (endLen > 1) {
                    reject('只能有一个结束节点')
                } else if (endLen < 1) {
                    reject('必须有一个结束节点')
                } else {
                    this.validateStartEndNodeLine(data)
                        .then(() => {
                            resolve()
                        })
                        .catch((msg) => {
                            reject(msg)
                        })
                }
            })
        },
        // 验证开始结束节点连线
        validateStartEndNodeLine(data) {
            return new Promise((resolve, reject) => {
                console.log(data)
                let startNode = data.nodeDataArray.filter((item) => item.stepType === 1)[0]
                let startNodeToLines = data.linkDataArray.filter((item) => item.from === startNode.key)
                let startNodeFromLines = data.linkDataArray.filter((item) => item.to === startNode.key)
                let endNode = data.nodeDataArray.filter((item) => item.stepType === 9)[0]
                let endNodeToLines = data.linkDataArray.filter((item) => item.from === endNode.key)
                let endNodeFromLines = data.linkDataArray.filter((item) => item.to === endNode.key)
                if (startNodeToLines.length < 1) {
                    reject('开始节点之后至少连接一个节点')
                } else if (startNodeFromLines.length > 0) {
                    reject('开始节点不能连入')
                } else if (endNodeToLines.length > 0) {
                    reject('结束节点不能连出')
                } else if (endNodeFromLines.length < 1) {
                    reject('结束节点之前必须有一个节点')
                } else {
                    resolve()
                }
            })
        },
        // 验证所有连线是否连接两端
        validateLines(data) {
            return new Promise((resolve, reject) => {
                let ret = data.linkDataArray.every((line) => {
                    return line.from && line.to
                })
                if (ret) {
                    resolve()
                } else {
                    reject('所有连线必须连接两端')
                }
            })
        },
        // 验证其他节点两端是否都有连线
        validateNodesLine(data) {
            return new Promise((resolve, reject) => {
                let otherNodes = data.nodeDataArray.filter((item) => {
                    return item.stepType !== 1 && item.stepType !== 9
                })
                let ret = true
                otherNodes.forEach((node) => {
                    let fromLines = data.linkDataArray.filter((item) => item.from === node.key)
                    let toLines = data.linkDataArray.filter((item) => item.to === node.key)
                    if (fromLines.length < 1 || toLines.length < 1) {
                        ret = false
                    }
                })
                if (ret) {
                    resolve()
                } else {
                    reject('节点两端必须都有连线')
                }
            })
        },
        // 验证转交步骤之前是否都是并行步骤
        validateMergingStep(data) {
            // return new Promise((resolve, reject) => {
            //     let mergingSteps = data.nodeDataArray.filter(item => item.stepType === 7)
            //     let ret = true
            //     let msg = ''
            //     mergingSteps.forEach(step => {
            //         let fromLines = data.linkDataArray.filter(item => item.to === step.key)
            //         let fromNodes = data.nodeDataArray.filter(item => {
            //             return fromLines.some(line => line.from === item.key)
            //         })
            //         let typeValid = fromNodes.every(node => {
            //             return node.stepType === 5 || node.stepType === 4
            //         })
            //         if (fromNodes.length < 2) {
            //             ret = false
            //             msg = '转交步骤之前至少有2个节点'
            //         } else if (!typeValid) {
            //             ret = false
            //             msg = '转交步骤之前必须是并行步骤'
            //         }
            //     })
            //     if (ret) {
            //         resolve()
            //     } else {
            //         reject(msg)
            //     }
            // })
            return Promise.resolve()
        },
        // 验证并行步骤和并行子流程之后是否都是合并步骤
        validateParallelNode(data) {
            return new Promise((resolve, reject) => {
                // let parallelNodes = data.nodeDataArray.filter((item) => {
                //     return item.stepType === 4 || item.stepType === 5
                // })
                // let parallelLines = data.linkDataArray.filter((item) => {
                //     return parallelNodes.some((node) => node.key === item.from)
                // })
                // let nextNodes = data.nodeDataArray.filter((item) => {
                //     return parallelLines.some((line) => line.to === item.key)
                // })
                // let ret = nextNodes.every((item) => item.stepType === 7)
                // if (ret) {
                resolve()
                // } else {
                //     reject('并行步骤必须连接转交步骤')
                // }
            })
        },
        // 验证流程图
        validate() {
            return new Promise((resolve, reject) => {
                let data = JSON.parse(this.designer.getFlowData())
                let promiseList = [
                    this.validateStartEnd(data),
                    this.validateLines(data),
                    this.validateNodesLine(data),
                    this.validateMergingStep(data),
                    this.validateParallelNode(data),
                ]
                Promise.all(promiseList)
                    .then(() => {
                        resolve()
                    })
                    .catch((msg) => {
                        reject(msg)
                    })
            })
        },
        // 传送数据
        sendData() {
            return new Promise((resolve, reject) => {
                this.validate()
                    .then(() => {
                        let data = this.designer.getFlowData()
                        resolve(data)
                    })
                    .catch((msg) => {
                        reject(msg)
                    })
            })
        },
    },
}
