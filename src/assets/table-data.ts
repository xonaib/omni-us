import { Book } from '../app/Interfaces/Book-interface';

function generateRandomBooks(count: number) {
    let books: Book[] = [];

    for (let i = 0; i < count; i++) {
        books.push({
            id: i,
            title: `Random title ${i}`,
            author: `Random author ${i}`,
            releaseDate: new Date(),
            price: 1100,
            rating: 3
        });
    }
}
export const books: Book[] = [
    {
        id: 1,
        title: 'Book 1',
        author: 'Random 1',
        releaseDate: new Date(),
        price: 1100,
        rating: 3,
    },
    {
        id: 2,
        title: 'Book 2',
        author: 'Random 2',
        releaseDate: new Date(),
        price: 1100,
        rating: 3,
    },
    {
        id: 3,
        title: 'Book 3',
        author: 'Random 3',
        releaseDate: new Date(),
        price: 1100,
        rating: 3,
    },
    {
        id: 4,
        title: 'Book 5',
        author: 'Random 5',
        releaseDate: new Date(),
        price: 1100,
        rating: 3,
    },
    {
        id: 5,
        title: 'Book 5',
        author: 'Random 5',
        releaseDate: new Date(),
        price: 1100,
        rating: 3,
    },
    {
        id: 5,
        title: 'Book 5',
        author: 'Random 5',
        releaseDate: new Date(),
        price: 1100,
        rating: 3,
    },
    {
        id: 5,
        title: 'Book 5',
        author: 'Random 5',
        releaseDate: new Date(),
        price: 1100,
        rating: 3,
    },
    {
        id: 5,
        title: 'Book 5',
        author: 'Random 5',
        releaseDate: new Date(),
        price: 1100,
        rating: 3,
    }, {
        id: 5,
        title: 'Book 5',
        author: 'Random 5',
        releaseDate: new Date(),
        price: 1100,
        rating: 3,
    },
    {
        id: 5,
        title: 'Book 5',
        author: 'Random 5',
        releaseDate: new Date(),
        price: 1100,
        rating: 3,
    },
    {
        id: 5,
        title: 'Book 5',
        author: 'Random 5',
        releaseDate: new Date(),
        price: 1100,
        rating: 3,
    },
    {
        id: 5,
        title: 'Book 5',
        author: 'Random 5',
        releaseDate: new Date(),
        price: 1100,
        rating: 3,
    },
    {
        id: 5,
        title: 'Book 5',
        author: 'Random 5',
        releaseDate: new Date(),
        price: 1100,
        rating: 3,
    },
    {
        id: 5,
        title: 'Book 5',
        author: 'Random 5',
        releaseDate: new Date(),
        price: 1100,
        rating: 3,
    },
    {
        id: 5,
        title: 'Book 5',
        author: 'Random 5',
        releaseDate: new Date(),
        price: 1100,
        rating: 3,
    },
    {
        id: 5,
        title: 'Book 5',
        author: 'Random 5',
        releaseDate: new Date(),
        price: 1100,
        rating: 3,
    },
    {
        id: 5,
        title: 'Book 5',
        author: 'Random 5',
        releaseDate: new Date(),
        price: 1100,
        rating: 3,
    }
];
