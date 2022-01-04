const {v4: uuidv4} = require('uuid');

class Book {
  constructor(title, author, description) {
    this.title = title;
    this.author = author;
    this.id = uuidv4();
    this.picture = 'https://picsum.photos/200';
    this.description = description;
  }
}

class Renting {
  constructor(user, bookId, bookTitle) {
    const initDate = new Date();
    this.user = user;
    this.rentDate = new Date(
      Date.UTC(initDate.getFullYear(), initDate.getMonth(), initDate.getDate())
    );
    this.returnDeadline = new Date(
      Date.UTC(
        initDate.getFullYear(),
        initDate.getMonth(),
        initDate.getDate() + 7
      )
    );
    this.returnDate = null;
    this.bookId = bookId;
    this.bookTitle = bookTitle;
    this.daysOfDelay = null;
    this.fine = null;
  }
}

class Library {
  constructor() {
    this.bookList = [];
    this.rentHistory = [];
    this.currentlyRentedBooks = [];
  }
  addBook(title, author, description) {
    const createdBook = new Book(title, author, description);
    this.bookList.push(createdBook);
  }
  removeBook(bookId) {
    this.bookList = this.bookList.filter(book => book.id !== bookId);
  }
  rentBook(user, bookId) {
    if (!this.currentlyRentedBooks.find(book => book.bookId === bookId)) {
      const book = this.bookList.find(book => book.id === bookId);
      this.currentlyRentedBooks.push(new Renting(user, book.id, book.title));
    } else {
      console.log('Book is currently rented');
    }
  }
  returnBook(bookId) {
    const initDate = new Date('2022-01-05T22:16:25.673Z');
    const returnDate = new Date(
      Date.UTC(initDate.getFullYear(), initDate.getMonth(), initDate.getDate())
    );
    if (this.currentlyRentedBooks.find(book => book.bookId === bookId)) {
      const book = this.currentlyRentedBooks.find(
        book => book.bookId === bookId
      );
      book.returnDate = returnDate;
      const delay =
        (new Date(returnDate).getTime() - book.returnDeadline.getTime()) /
        (1000 * 3600 * 24);
      book.daysOfDelay = delay > 0 ? delay : 0;
      book.fine = book.daysOfDelay * 2;
      this.currentlyRentedBooks = this.currentlyRentedBooks.filter(
        book => book.bookId !== bookId
      );
      this.rentHistory.push(book);
    } else {
      console.log('Book is not rented');
    }
  }
}

const library1 = new Library();

library1.addBook(
  'Pan Tadeusz',
  'Adam Mickiewicz',
  'Epopeja o ostatnim zajeździe na Litwie'
);

library1.addBook(
  'Lalka',
  'Bolesław Prus',
  'powieść z elementami romantyzmu i pozytywizmu'
);

library1.addBook(
  'Harry Potter',
  'J.K. Rowling',
  'Opowieść o mały czarodzieju i jego wesołej ekipie'
);

library1.rentBook('Eddy Gordo', library1.bookList[0].id);
library1.rentBook('Lars Alexanderson', library1.bookList[1].id);
library1.returnBook(library1.bookList[0].id);

console.log('books: ', library1.bookList);
console.log('history: ', library1.rentHistory);
console.log('current: ', library1.currentlyRentedBooks);
