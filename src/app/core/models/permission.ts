import { IPermission } from "../interfaces/permission";

export class Permission {
    id: number;
    name: string;
    constructor(obj: IPermission) {
        this.id = obj.id;
        this.name = obj.name;
    }
}
