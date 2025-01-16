import React from 'react';

function Duck({duck}) {
    return (
        <tr>
            <td>{duck._id}</td>
            <td>{duck.color}</td>
            <td>{duck.size}</td>
            <td>{duck.price}</td>
            <td>{duck.quantity}</td>            
        </tr>
    )
}

export default Duck;