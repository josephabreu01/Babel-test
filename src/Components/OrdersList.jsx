import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5152/api/Orders');
      setOrders(response.data);
    } catch (error) {
      toast.error(error.response.data)
      
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5152/api/Orders/${id}`);
      fetchOrders(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };


  return (
<div className="container mt-4">
      <h2>Orders List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>{order.totalAmount}</td>
              <td>
                
                {/* Delete Button */}
                
                 <Link type="button" class="btn btn-warning" to={`/edit/${order.id}`}>Editar</Link> | 
                 <button type="button" class="btn btn-danger"onClick={() => handleDelete(order.id)}>Eliminar</button>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link type="button" class="btn btn-primary" to="/add">Agregar Orden</Link>
    </div>
  );
};



export default OrdersList;
