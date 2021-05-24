import { ICv } from "../interfaces/cv";
import { Area } from "./area";
import { Category } from "./category";

export class Cv {
    id: number;
    name: string;
    cv: File;
    email: string;
    phone: number;
    gender: boolean;
    address: string;
    message: string;
    created_at: Date;
    updated_at: Date;
    updated_by_id: number;
    category: Category;
    area: Area;
    constructor(obj: ICv) {
        this.id = obj.id;
        this.name = obj.name;
        this.cv = obj.CV;
        this.email = obj.email;
        this.phone = obj.phone;
        this.gender = obj.gender;
        this.address = obj.address;
        this.message = obj.message || '';
        this.created_at = (obj.created_at) ? new Date(obj.created_at) : null;
        this.updated_at = (obj.updated_at) ? new Date(obj.updated_at) : null;
        this.updated_by_id = obj.updated_by_id;
        this.category = (obj.category) ? new Category(obj.category) : null;
        this.area = (obj.area) ? new Area(obj.area) : null;
    }
}
