import { User } from "./user";

export class Group {
        _id!: string;
        owner!: string;
        invitedUser!: User[];
        projectAs!: string;
        groupName!: string;
        description!: string;
      }
      