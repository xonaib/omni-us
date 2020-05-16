import { Book } from '../app/Interfaces/Book-interface';

const authors = ['Stephen Hawking', 'Ian Goodfellow', 'J k Rowling', 'Fyodor Dostoevsky', 'John Steinbeck'];
const titles = ['A breif history of time', 'Generator adversial nets', 'The prisoner of Azkaban',
    'The Brothers Karamazov', 'The grapes of wrath'];


function generateRandomBooks(count: number) {
    let books: Book[] = [];

    for (let i = 0; i < count; i++) {
        const randomIndex = (Math.round(Math.random() * (authors.length - 1)));

        books.push({
            id: i,
            title: authors[randomIndex],
            author: titles[randomIndex],
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
