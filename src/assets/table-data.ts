import { Book } from '../app/Interfaces/Book-interface';

function generateRandomBooks(count: number) {
    let books: Book[] = [];

    for (let i = 0; i < count; i++) {
        books.push({
            id: i,
            title: `Random title ${i}`,
            author: `Random author ${i}`,
            releaseDate: randomDateGenerator(),
            price: randomPriceGenerator(),
            rating: randomRatingGenerator(),
        });
    }

    return books;
}

function randomDateGenerator() {
    const year = 2000 + Math.round(Math.random() * 20); 
    const month = 1 + Math.round(Math.random() * 12);
    const day = 1 + Math.round(Math.random() * 30);

    return new Date(year, month, day);
}

function randomPriceGenerator() {
    return Math.round(1000 + Math.random() * 500);
}

function randomRatingGenerator() {
    return Math.round(Math.random() * 5);
}

export const books = generateRandomBooks(100);
