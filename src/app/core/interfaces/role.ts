export interface IRole {
    id: number;
    name: string;
    created_at: Date;
    update_at: Date;
    permissions: Array<string>;
}
