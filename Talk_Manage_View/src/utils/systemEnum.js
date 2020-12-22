class SystemEnum {
    
    constructor(){
        //文件类型
        this.fileType = {
            skill_ico : 1,
            vipUser_img : 2,
            project_img : 3,
            seller_img : 4,
            shop_img : 5,
            video:6
        }
        //用户类型
        this.userType = {
            average_person:0,
            owner:1,
            Foreman:2,
            worker:3,
            business:4

        }
        //工程类型
        this.projectType = {
            home_decoration:1,
            worker_decoration:2,
            pavement:3,
        }
    }
}

export default new SystemEnum()