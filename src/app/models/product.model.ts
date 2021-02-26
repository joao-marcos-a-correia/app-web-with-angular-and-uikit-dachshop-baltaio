export class Product {
    public _id: string;
    public title: string;
    public category: string;
    public description: string;
    public price: number;
    public images: string[];

    constructor(id: string, title: string, category: string, description: string, price: number, images: string[]) {
        this._id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.price = price;
        this.images = images;
    }
}