"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingsTable = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);  // Start on page 1
    const [totalPages, setTotalPages] = useState(1);    // Total number of pages

    const pageSize = 20;  // Matches the Django pagination size

    useEffect(() => {
        fetchBookings(currentPage);
    }, [currentPage]);

    const fetchBookings = (page) => {
        setLoading(true);
        axios.get(`http://127.0.0.1:8020/api/bookings/?page=${page}`)
            .then(response => {
                setBookings(response.data.results);  // Results for the current page
                setTotalPages(Math.ceil(response.data.count / pageSize));  // Calculate total pages
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    }

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    style={{
                        margin: '0 5px',
                        padding: '5px 10px',
                        backgroundColor: currentPage === i ? 'lightblue' : 'white',
                        border: '1px solid #ccc',
                        cursor: 'pointer'
                    }}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Flat name</th>
                        <th>ID</th>
                        <th>Checkin</th>
                        <th>Checkout</th>
                        <th>Previous booking ID</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.flat}</td>
                            <td>{booking.id}</td>
                            <td>{booking.checkin}</td>
                            <td>{booking.checkout}</td>
                            <td>{booking.previous_booking_id || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: '20px' }}>
                {renderPageNumbers()}  {/* Display page numbers */}
            </div>
        </div>
    );
};

export default BookingsTable;
