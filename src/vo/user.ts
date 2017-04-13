export class userVO{
    id:string;
    email:string;
    phone:string;
    addr:string;
    intro:string;
    c_date:Date;

    constructor(id:string, email:string, phone:string, addr:string, intro:string, c_date:Date){
        this.id = id;
        this.email = email;
        this.phone = phone;
        this.addr = addr;
        this.intro = intro;
        this.c_date = c_date;
    }
}
