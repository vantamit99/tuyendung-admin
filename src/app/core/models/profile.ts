import { IProfile } from "../interfaces/profile";
import { User } from "./user";

export class Profile {
    user: User;
    constructor(obj: IProfile) {
        this.user = new User(obj.user)
    }
}
