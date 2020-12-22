<template>
    <span>{{itemText}}</span>
</template>

<script>
export default {
    name: 'processStatus-Item',
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
                    return '草稿';
                case 1:
                    return '审批中';
                case 3:
                    return '审批通过';
                default:
                    return '草稿';
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