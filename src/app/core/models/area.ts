import { IArea } from "../interfaces/area";

export class Area {
    id: number;
    name: string;
    slug: string;
    status: number;
    created_at: Date;
    created_by_id: number;
    updated_at: Date;
    updated_by_id: number;
    constructor(obj: IArea) {
        this.id = obj.id || null;
        this.name = obj.name;
        this.slug = obj.slug;
        this.status = obj.status || 0;
        this.created_at = obj.created_at ? new Date(obj.created_at) : null;
        this.created_by_id = obj.created_by_id || null;
        this.updated_at = obj.updated_at ? new Date(obj.updated_at) : null;
        this.updated_by_id = obj.updated_by_id || null;
    }
}
