import React from 'react';

export const ReadOnlyRow = ({ sale, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{sale.name}</td>
      <td>{sale.email}</td>
      <td>{sale.address}</td>
      <td>{sale.product}</td>
      <td>{sale.status}</td>
      <td>
        <button type="button" onClick={(event) => handleEditClick(event, sale)}>
          Edit
        </button>
        <button type="button" class="delete" onClick={() => handleDeleteClick(sale.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};
