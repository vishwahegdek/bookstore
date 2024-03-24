import React, { useState, useEffect } from "react";
import axios from "axios";

const EditBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const admintoken = localStorage.getItem('admintoken');
        
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/books`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${admintoken}`,
                        },
                    }
                );
                setBooks(response.data.book);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        }
        fetchData();
    }, []);

    const handlePriceChange = (index, event) => {
        const updatedBooks = [...books];
        updatedBooks[index].price = event.target.value;
        setBooks(updatedBooks);
    };

    const handleSubmit = async (index, bookId, newPrice) => {
        try {
            alert("Updating book price...");
            await axios.put(
                `http://localhost:3000/books/${bookId}`,
                { price: newPrice },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('admintoken')}`,
                    },
                }
            );
            alert("Book price updated successfully!");
            // Optionally, you can fetch updated data from the server
            // and update the state to reflect the changes
        } catch (error) {
            console.error('Error updating book price:', error);
            alert("Failed to update book price!");
        }
    };

    const handleDelete = async (index, bookId) => {
        try {
            alert("Do you want to delete this book?");
            await axios.delete(
                `http://localhost:3000/books/${bookId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('admintoken')}`,
                    },
                }
            );
            alert("Book deleted successfully!");
            const updatedBooks = [...books];
            updatedBooks.splice(index, 1);
            setBooks(updatedBooks);
        } catch (error) {
            console.error('Error deleting book:', error);
            alert("Failed to delete book!");
        }
    };

    return (
        <div className='background-image'>
            <br /><br />
            <div className="heading">Edit Books</div>
            {books.map((book, index) => (
                <div key={index} className="editbook">
                    <div>{book.book_id}.{book.title}</div>
                    <input
                        type="text"
                        value={book.price}
                        onChange={(event) => handlePriceChange(index, event)}
                    />
                    <button onClick={() => handleSubmit(index, book.book_id, books[index].price)}>Submit</button>
                    <button onClick={() => handleDelete(index, book.book_id)}>Delete Book</button>
                </div>
            ))}
        </div>
    );
}

export default EditBooks;
