export class Page<T>{
    page: number;
    size: number;
    total: number;
    items: T[];

    constructor(page: number, size: number, total: number, items: T[]){
        this.page = page;
        this.size = size;
        this.total = total;
        this.items = items;
    }
}