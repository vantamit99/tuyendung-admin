import { IPosts } from "../interfaces/posts";
import { IUser } from "../interfaces/user";
import { Posts } from "./posts";
import { Role } from "./role";

export class User {
    id: number;
    name: string;
    email: string;
    created_at: Date;
    created_by_id: number;
    updated_at: Date;
    update_by_id: number;
    role: Role;
    posts: Array<Posts>;
    constructor(obj: IUser) {
        this.id = obj.id || null;
        this.name = obj.name;
        this.email = obj.email;
        this.created_at = obj.created_at;
        this.created_by_id = obj.created_by_id;
        this.updated_at = obj.updated_at;
        this.update_by_id = obj.update_by_id;
        this.role = new Role(obj.role);
        this.posts = obj.posts.map((data: IPosts) => new Posts(data));
    }
}
