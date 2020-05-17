export class Book {
    id: number;
    author: string;
    title: string;
    releaseDate: Date;
    price: number;
    rating: number;

    constructor() {
        this.id = 0;
        this.author = '';
        this.title = '';
        this.releaseDate = null;
        this.price = 0;
        this.rating = 0;
    }
}
