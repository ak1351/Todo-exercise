// Get form inputs
const bookNameInput = document.getElementById('book-name');
const authorNameInput = document.getElementById('author-name');
const bookPriceInput = document.getElementById('book-price');

// Get book list element
const bookList = document.getElementById('book-list');

// Get filter input
const filterInput = document.getElementById('filter-input');

// Array to store book data
let books = [];

// Add book function
function addBook(event) {
  // Prevent form submission
  event.preventDefault();
  
  // Get input values
  const bookName = bookNameInput.value;
  const authorName = authorNameInput.value;
  const bookPrice = bookPriceInput.value;
  
  // Create book object
  const book = {
    id: Date.now(),
    name: bookName,
    author: authorName,
    price: bookPrice
  };
  
  // Add book to array
  books.push(book);
  
  // Clear form inputs
  bookNameInput.value = '';
  authorNameInput.value = '';
  bookPriceInput.value = '';
  
  // Refresh book list
  displayBooks();
}

// Display books function
function displayBooks() {
  // Clear book list
  bookList.innerHTML = '';
  
  // Filter books by name
  const filteredBooks = books.filter(book => book.name.toLowerCase().includes(filterInput.value.toLowerCase()));
  
  // Populate book list with filtered books
  filteredBooks.forEach(book => {
    // Create table row
    const row = document.createElement('tr');
    
    // Add book data to row
    row.innerHTML = `
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td>${book.price}</td>
      <td>
        <button data-id="${book.id}" class="edit-btn">Edit</button>
        <button data-id="${book.id}" class="delete-btn">Delete</button>
      </td>
    `;
    
    // Add row to book list
    bookList.appendChild(row);
  });
}

// Delete book function
function deleteBook(event) {
  // Get book ID
  const bookId = parseInt(event.target.getAttribute('data-id'));
  
  // Remove book from array
  books = books.filter(book => book.id !== bookId);
  
  // Refresh book list
  displayBooks();
}

// Edit book function
function editBook(event) {
  // Get book ID
  const bookId = parseInt(event.target.getAttribute('data-id'));
  
  // Find book in array
  const book = books.find(book => book.id === bookId);
  
  // Populate form inputs with book data
  bookNameInput.value = book.name;
  authorNameInput.value = book.author;
  bookPriceInput.value = book.price;
  
  // Remove book from array
  books = books.filter(book => book.id !== bookId);
  
  // Refresh book list
  displayBooks();
}

// Add event listeners
document.querySelector('form').addEventListener('submit', addBook);
filterInput.addEventListener('input', displayBooks);
bookList.addEventListener('click', event => {
  if (event.target.classList.contains('delete-btn')) {
    deleteBook(event);
  } else if (event.target.classList.contains('edit-btn')) {
    editBook(event);
  }
});

// Initialize book list
displayBooks();
