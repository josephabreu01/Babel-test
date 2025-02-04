import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Link, useNavigate, useParams } from 'react-router-dom';

const EditOrderForm = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [errors, setErrors] = useState({});
const navigate = useNavigate()
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5152/api/Orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        await axios.put(`http://localhost:5152/api/Orders`, order);
        navigate("/")
      } catch (error) {
        console.error('Error updating order:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (order.customerName.length < 3) newErrors.customerName = 'El nombre del cliente debe tener al menos 3 caracteres';
    if (!order.orderDate) newErrors.orderDate = 'La fecha es obligatoria';
    if (parseFloat(order.totalAmount) <= 0) newErrors.totalAmount = 'El monto total debe ser mayor a 0';
    return newErrors;
  };

  if (!order) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Editar Orden <Link type="button" class="btn btn-warning p-2" to={'/'}>Volver a lista de Ordernes</Link></h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='form-label'>Customer Name:</label>
          <input
            type="text"
            className='form-control'
            value={order.customerName}
            onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
            required
          />
          {errors.customerName && <p>{errors.customerName}</p>}
        </div>

        <div>
          <label className='form-label'>Order Date:</label>
          <input
            type="text"
            className='form-control'
            value={order.orderDate}
            onChange={(e) => setOrder({ ...order, orderDate: e.target.value })}
            required
            disabled
          />
          {errors.orderDate && <p>{errors.orderDate}</p>}
        </div>

        <div>
          <label className='form-label'>Total Amount:</label>
          <input
            type="number"
            className='form-control'
            value={order.totalAmount}
            onChange={(e) => setOrder({ ...order, totalAmount: e.target.value })}
            required
            step="0.01"
          />
          {errors.totalAmount && <p>{errors.totalAmount}</p>}
        </div>

        <div>
          <button type="submit" class="btn btn-primary mt-3">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
};

export default EditOrderForm;
