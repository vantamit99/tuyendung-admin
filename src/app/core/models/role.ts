import { IRole } from "../interfaces/role";

export class Role {
    id: number;
    name: string;
    created_at: Date;
    update_at: Date;
    permissions: Array<string>;
    constructor(obj: IRole) {
        this.id = obj.id;
        this.name = obj.name;
        this.created_at = obj.created_at;
        this.update_at = obj.update_at;
        this.permissions = obj.permissions;
    }
}
