export class User {
    id!: string;
    _id!: string;
    userName!: string;
    userLastName!: string;
    emailUser!: string;
    mtpUser!: string;
    role!: 'user' | 'admin';
    connectedUser!:string;
    avatarUrl!: string;
    verificationToken!: string; 
    verifyUser!: number;  
    lastLoginIp!: string[];

}  