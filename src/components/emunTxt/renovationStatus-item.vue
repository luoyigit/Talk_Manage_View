<template>
    <span>{{itemText}}</span>
</template>

<script>
export default {
    name: 'renovationStatus-item',
    props: {
        formValue: {
            // type: [Number, String],
            type: [Number, String],
            default: ''
        }
    },
    computed: {
        itemText() {
            switch(this.formValue) {
                case 0 :
                    return '未开始';
                case 1:
                    return '进行中';
                case 10:
                    return '已完成';
                default:
                    return '未知';
            }
        }
    },
    data() {
        return {
            itemList: []
        }
    },
    created() {
        // this.itemList = storage.getBaseData(this.codeString)
       console.log('sdfsf',this.formValue)
    }
}
</script>