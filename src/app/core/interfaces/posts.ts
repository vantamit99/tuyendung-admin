import { IArea } from "./area";
import { ICategory } from "./category";

export interface IPosts {
    id?: number;
    title: string;
    slug?: string;
    image: string;
    content: string;
    status: number;
    expired?: Date;
    created_at?: string;
    created_by_id?: number;
    updated_at?: string;
    updated_by_id?: number;
    category?: ICategory;
    area?: IArea;
}

