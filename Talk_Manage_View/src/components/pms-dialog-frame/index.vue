<template>
    <el-dialog
        :visible.sync="showDialog"
        :title="title"
        :width="width"
        :fullscreen="fullscreen"
        :top="top"
        :modal="modal"
        :modal-append-to-body="modalAppendToBody"
        :append-to-body="appendToBody"
        :lock-scroll="lockScroll"
        :custom-class="customClass"
        :close-on-click-modal="closeOnClickModal"
        :close-on-press-escape="closeOnPressEscape"
        :show-close="showClose"
        :before-close="beforeClose"
        :center="center"
        @open="open"
        @opened="opened"
        @close="close"
        @closed="closed"
    >
        <slot></slot>
        <template slot="title">
            <slot name="title"></slot>
        </template>
        <template slot="footer">
            <slot name="footer"></slot>
        </template>
    </el-dialog>
</template>

<script>
export default {
    name: 'pms-dialog-frame',
    props: {
        title: {type: String},
        width: {type: String, default: '50%'},
        fullscreen: {type: Boolean, default: false},
        top: {type: String, default: '15vh'},
        modal: {type: Boolean, default: true},
        modalAppendToBody: {type: Boolean, default: true},
        appendToBody: {type: Boolean, default: 
        true},
        lockScroll: {type: Boolean, default: true},
        customClass: {type: String},
        closeOnClickModal: {type: Boolean, default: false},
        closeOnPressEscape: {type: Boolean, default: true},
        showClose: {type: Boolean, default: true},
        beforeClose: {type: Function},
        center: {type: Boolean, default: false}
    },
    data() {
        return {
            showDialog: false
        }
    },
    methods: {
        show() {
            this.showDialog = true
        },
        hide() {
            this.showDialog = false
        },
        open() {
            this.$emit('open')
        },
        opened() {
            this.$emit('opened')
        },
        close() {
            this.$emit('close')
        },
        closed() {
            this.$emit('closed')
        }
    }
}
</script>