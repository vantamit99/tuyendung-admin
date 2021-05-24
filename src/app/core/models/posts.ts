import { IPosts } from "../interfaces/posts";
import { Area } from "./area";
import { Category } from "./category";

export class Posts {
    id: number;
    title: string;
    slug: string;
    image: string;
    content: string;
    status: number;
    expired: Date;
    created_at: Date;
    created_by_id: number;
    updated_at: Date;
    updated_by_id: number;
    category: Category;
    area: Area;
    constructor(obj: IPosts) {
        this.id = obj.id || null;
        this.title = obj.title;
        this.slug = obj.slug || '';
        this.image = obj.image;
        this.content = obj.content;
        this.status = obj.status;
        this.expired = (obj.expired) ? obj.expired : null;
        this.created_at = (obj.created_at) ? new Date(obj.created_at) : null;
        this.created_by_id = obj.created_by_id || null;
        this.updated_at = (obj.updated_at) ? new Date(obj.updated_at) : null;
        this.updated_by_id = obj.updated_by_id || null;
        this.category = (obj.category) ? new Category(obj.category) : null;
        this.area = (obj.area) ? new Area(obj.area) : null;
    }
}
