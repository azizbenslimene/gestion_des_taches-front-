import { replies } from "./replies";
import { User } from "./user";

export class Comment {
    _id!: string;
    descCmnt!: string;
    dateCmnt!: Date;
    replies!: replies[];
    user?: User;
    userCmnt?:User

}