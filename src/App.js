
import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import OrdersList from './Components/OrdersList';
import OrderForm from './Components/OrderForm';
import EditOrderForm from './Components/EditOrderForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (

    
    <BrowserRouter>
    <div className='container'>
      <Routes>
        
          <Route path="/"  exact element={<OrdersList />} />
          <Route path="/add" element={<OrderForm />} />
          <Route path="/edit/:id" element={<EditOrderForm />} />
          
      </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
