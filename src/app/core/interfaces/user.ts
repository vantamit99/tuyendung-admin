import { IPosts } from "./posts";
import { IRole } from "./role";

export interface IUser {
    id?: number;
    name: string;
    email: string;
    created_at: Date;
    created_by_id: number;
    updated_at: Date;
    update_by_id: number;
    role: IRole;
    posts: Array<IPosts>;
}
