"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingsTable = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOrder, setSortOrder] = useState('none');

    const pageSize = 20;  // Must match the Django pagination size.

    useEffect(() => {
        fetchBookings(currentPage, sortOrder);
    }, [currentPage, sortOrder]);

    const fetchBookings = (page, order = 'none') => {
        setLoading(true);

        const sortParam = order === 'asc' ? 'checkin' : order === 'desc' ? '-checkin' : undefined;
        const baseUrl = 'http://127.0.0.1:8020/api/bookings/?';
        const getParams = new URLSearchParams();
        getParams.append("page", page)
        getParams.append("ordering", sortParam);
        const completeUrl = baseUrl + getParams.toString();

        axios.get(completeUrl)
            .then(response => {
                setBookings(response.data.results);
                setTotalPages(Math.ceil(response.data.count / pageSize));
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    const handleSort = () => {
        var newSortOrder = 'none';
        if (sortOrder === 'asc') {
            newSortOrder = 'desc';
        } else if (sortOrder === 'desc') {
            newSortOrder = 'none';
        } else if (sortOrder === 'none') {
            newSortOrder = 'asc';
        }
        setSortOrder(newSortOrder);
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    }

    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Flat name</th>
                        <th style={{ width: '200px' }}>ID</th>
                        <th onClick={handleSort} style={{ cursor: 'pointer', width: '200px' }}>
                            Checkin {sortOrder === 'asc' ? '▲' : sortOrder === 'desc' ? '▼' : ''}
                        </th>
                        <th style={{ width: '200px' }}>Checkout</th>
                        <th>Previous booking ID</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.flat_name}</td>
                            <td><div style={{ textAlign: "center" }}>{booking.id}</div></td>
                            <td>{booking.checkin}</td>
                            <td>{booking.checkout}</td>
                            <td>{booking.previous_booking || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: '20px' }}>
                {renderPageNumbers()}
            </div>
        </div>
    );
};

export default BookingsTable;
