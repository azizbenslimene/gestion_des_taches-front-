import { tache } from "./tache";
import { User } from "./user";

export class replies {
  id!: any;
  _id!: any;
  desc!:string;
    tacheid!: tache;
  user?: User;
  cmnt!: Comment;
  dateR !: Date
}