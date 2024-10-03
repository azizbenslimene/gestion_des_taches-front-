import { Group } from "./group";

export class Project {
    projectName!: string;
    dateStartProj!: string;
    dateEndProj!: string;
    groupId!: string;
    grp?: Group[];
}