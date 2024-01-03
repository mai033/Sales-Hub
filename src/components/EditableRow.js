import React from 'react';

export const EditableRow = ({ editFormData, handleEditFormChange }) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="John Doe"
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        ></input>
      </td>

      <td>
        <input
          type="email"
          required="required"
          placeholder="john@gmail.com"
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        ></input>
      </td>

      <td>
        <input
          type="address"
          required="required"
          name="address"
          value={editFormData.address}
          onChange={handleEditFormChange}
        ></input>
      </td>

      <td>
        <input
          type="text"
          required="required"
          name="product"
          value={editFormData.product}
          onChange={handleEditFormChange}
        ></input>
      </td>

      <td>
        <input
          type="status"
          required="required"
          name="status"
          value={editFormData.status}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
      </td>
    </tr>
  );
};
