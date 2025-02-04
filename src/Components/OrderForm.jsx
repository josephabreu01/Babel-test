import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



const OrderForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        await axios.post('http://localhost:5152/api/Orders', {
          customerName,
          orderDate,
          totalAmount,
        });
        // Redirect to the orders list after adding an order
        navigate("/")
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (customerName.length < 3) newErrors.customerName = 'El nombre del cliente debe tener al menos 3 caracteres';
    if (!orderDate) newErrors.orderDate = 'La fecha es obligatoria';
    if (parseFloat(totalAmount) <= 0) newErrors.totalAmount = 'El monto total debe ser mayor a 0';
    return newErrors;
  };


  return (
    <div className="container mt-4">
      <h2>{'Agregar Nueva Orden'} <Link type="button" class="btn btn-warning p-2" to={'/'}>Volver a lista de Ordernes</Link>        
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='form-label'>Customer Name:</label>
          <input
            type="text"
            className='form-control'
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
          {errors.customerName && <p>{errors.customerName}</p>}
        </div>

        <div>
          <label className='form-label'>Order Date:</label>
          <input
            type="date"
            className='form-control'
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            required
          />
          {errors.orderDate && <p>{errors.orderDate}</p>}
        </div>

        <div>
          <label className='form-label'>Total Amount:</label>
          <input
            type="number"
            className='form-control'
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
            step="0.01"
          />
          {errors.totalAmount && <p>{errors.totalAmount}</p>}
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <div className='container'>
          <button type="submit" class="btn btn-primary mt-3">Guardar Orden</button>
          </div>
      </form>
    </div>
  );
};

export default OrderForm;
