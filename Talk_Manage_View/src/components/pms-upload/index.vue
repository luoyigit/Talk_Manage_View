<template>
    <el-upload
        ref="upload"
        :action="action"
        :headers="headers"
        :multiple="multiple"
        :data="data"
        :name="name"
        :with-credentials="withCredentials"
        :show-file-list="showFileList"
        :drag="drag"
        :accept="accept"
        :on-preview="onPreview"
        :on-remove="onRemove"
        :on-success="onSuccess"
        :on-error="onError"
        :on-progress="onProgress"
        :on-change="onChange"
        :before-upload="beforeUpload"
        :before-remove="beforeRemove"
        :list-type="listType"
        :auto-upload="autoUpload"
        :file-list="fileList"
        :http-request="httpRequest"
        :disabled="disabled"
        :limit="limit"
        :on-exceed="onExceed"
    >
        <slot></slot>
        <template slot="trigger">
            <slot name="trigger"></slot>
        </template>
        <template slot="tip">
            <slot name="tip"></slot>
        </template>
    </el-upload>
</template>

<script>
export default {
    name: 'pms-upload',
    props: {
        action: {type: String},
        headers: {type: Object},
        multiple: {type: Boolean},
        data: {type: Object},
        name: {type: String, default: 'file'},
        withCredentials: {type: Boolean, default: false},
        showFileList: {type: Boolean, default: false},
        drag: {type: Boolean, default: false},
        accept: {type: String},
        onPreview: {type: Function},
        onRemove: {type: Function},
        onSuccess: {type: Function},
        onError: {type: Function},
        onProgress: {type: Function},
        onChange: {type: Function},
        beforeUpload: {type: Function},
        beforeRemove: {type: Function},
        listType: {type: String, default: 'text'},
        autoUpload: {type: Boolean, default: true},
        fileList: {type: Array, default: () => []},
        httpRequest: {type: Function},
        disabled: {type: Boolean, default: false},
        limit: {type: Number},
        onExceed: {type: Function}
    },
    methods: {
        clearFiles() {
            this.$refs.upload.clearFiles()
        },
        abort(...args) {
            this.$refs.upload.abort(...args)
        },
        submit() {
            this.$refs.upload.submit()
        }
    }
}
</script>