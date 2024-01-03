import React, { useState, Fragment } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import data from './mock-data.json';
import { ReadOnlyRow } from './components/ReadOnlyRow';
import { EditableRow } from './components/EditableRow';

const App = () => {
  const [sales, setSales] = useState(data);
  const [addFormData, setAddFormData] = useState({
    name: '',
    email: '',
    address: '',
    product: '',
    status: '',
  });

  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    address: '',
    product: '',
    status: '',
  });

  const [editSaleId, setEditSaleId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newSale = {
      id: nanoid(),
      name: addFormData.name,
      email: addFormData.email,
      address: addFormData.address,
      product: addFormData.product,
      status: addFormData.status,
    };

    const newSales = [...sales, newSale];
    setSales(newSales);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedSale = {
      id: editSaleId,
      name: editFormData.name,
      email: editFormData.email,
      address: editFormData.address,
      product: editFormData.product,
      status: editFormData.status,
    };

    const newSales = [...sales];

    const index = sales.findIndex((sale) => sale.id === editSaleId);

    newSales[index] = editedSale;

    setSales(newSales);
    setEditSaleId(null);
  };

  const handleEditClick = (event, sale) => {
    event.preventDefault();
    setEditSaleId(sale.id);

    const formValues = {
      name: sale.name,
      email: sale.email,
      address: sale.address,
      product: sale.product,
      status: sale.status,
    };

    setEditFormData(formValues);
  };

  const handleDeleteClick = (saleId) => {
    const newSales = [...sales];

    const index = sales.findIndex((sale) => sale.id === saleId);

    newSales.splice(index, 1);

    setSales(newSales);
  };

  const handleShowAllClick = async (e) => {
    e.preventDefault();
    try {
    const results = await fetch('/getAllData', {
      method: 'GET', 
      headers: {
        'Content-type': 'application/json'
      }
    })
    const data = results.json();
    }
    catch (err) {
      console.log(err)
    }

  }

  return (
    <div className="app-container">
      <form className="input-container" onSubmit={handleAddFormSubmit}>
        <div class="form-group">
          <label htmlFor="name">Name </label>
          <input
            type="text"
            id="name"
            name="name"
            required="required"
            placeholder="John Doe"
            onChange={handleAddFormChange}
          />
        </div>

        <div class="form-group">
          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            name="email"
            required="required"
            placeholder="john@gmail.com"
            onChange={handleAddFormChange}
          />
        </div>

        <div class="form-group">
          <label htmlFor="address">Address </label>
          <input
            type="text"
            id="address"
            name="address"
            required="required"
            onChange={handleAddFormChange}
          />
        </div>

        <div class="form-group">
          <label htmlFor="product">Product </label>
          <input
            type="text"
            id="product"
            name="product"
            required="required"
            onChange={handleAddFormChange}
          />
        </div>

        <div class="form-group">
          <label htmlFor="status">Status </label>
          <input
            type="text"
            id="status"
            name="status"
            required="required"
            onChange={handleAddFormChange}
          />
        </div>
        <button className="add" type="submit">
          Add
        </button>
        <button className="add" type="button" onClick = {(e)=>handleShowAllClick(e)}>
          Show all
        </button>
      </form>

      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Product</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <Fragment>
                {editSaleId === sale.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                  />
                ) : (
                  <ReadOnlyRow
                    sale={sale}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default App;
