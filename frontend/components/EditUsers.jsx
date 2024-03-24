import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const admintoken = localStorage.getItem('admintoken');
        
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/users`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${admintoken}`,
                        },
                    }
                );
                setUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (index, userId) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this user?");
            if (!confirmDelete) return;

            await axios.delete(
                `http://localhost:3000/users/${userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('admintoken')}`,
                    },
                }
            );
            alert("User deleted successfully!");
            const updatedUsers = [...users];
            updatedUsers.splice(index, 1);
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
            alert("Failed to delete user!");
        }
    };

    return (
        <div className='background-image'>
            <br /><br />
            <div className="heading">Edit Users</div>
            {users.map((user, index) => (
                <div key={index} className="edituser">
                    <div>{user.username}</div>
                    <button onClick={() => handleDelete(index, user.customer_id)}>Delete User</button>
                </div>
            ))}
        </div>
    );
}

export default EditUsers;
