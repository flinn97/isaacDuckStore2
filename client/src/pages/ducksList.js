import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Duck from '../components/Duck.js';

function DucksList(props) {
    const [ducks, setDucks] = useState([]);
    const [selectedDuck, setSelectedDuck] = useState(null);
    const [formData, setFormData] = useState({
        color: 'Red',    // default
        size: 'Small',   // default
        price: 0,
        quantity: 0
    });

    // Fetch ducks on component mount
    useEffect(() => {
        fetchDucks();
    }, []);

    const fetchDucks = () => {
        axios.get('http://localhost:3001/api/ducks')
            .then(res => setDucks(res.data))
            .catch(err => console.error(err));
    };

    // Form input handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Edit
        if (selectedDuck) {
            axios.put(`http://localhost:3001/api/ducks/${selectedDuck._id}`, {
                price: formData.price,
                quantity: formData.quantity
            })
                .then(() => {
                    setSelectedDuck(null);
                    resetForm();
                    fetchDucks();
                })
                .catch(err => console.error(err));
        }


        // Add
        else {
            axios.post('http://localhost:3001/api/ducks', formData)
                .then(() => {
                    resetForm();
                    fetchDucks();
                })
                .catch(err => console.error(err));
        }
    };

    // Pre-fill
    const handleEdit = (duck) => {
        setSelectedDuck(duck);
        setFormData({
            color: duck.color,
            size: duck.size,
            price: duck.price,
            quantity: duck.quantity
        });
    };

    // Logical delete (confirmation)
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this duck?')) {
            axios.delete(`http://localhost:3001/api/ducks/${id}`)
                .then(() => fetchDucks())
                .catch(err => console.error(err));
        }
    };

    // Reset form fields
    const resetForm = () => {
        setFormData({ color: 'Red', size: 'Small', price: 0, quantity: 0 });
    };

    function getSoftBackground(color) {
        switch (color) {
          case 'Red':
            return 'rgba(255, 0, 0, 0.15)';
          case 'Green':
            return 'rgba(0, 128, 0, 0.15)';
          case 'Yellow':
            return 'rgba(255, 255, 0, 0.15)';
          case 'Black':
            return 'rgba(0, 0, 0, 0.15)';
          default:
            return '#ffffff';
        }
      }

      var title = props.mode === 'warehouse' ?"Duck Warehouse":"Duck Store";

    return (<div className="page-colored">
        <h1 className='h1'>{title}</h1> 

        {props.mode === 'warehouse' &&
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', marginLeft:"22px", alignSelf:"flex-start", display:"flex" }}>
            <label  className='input1'>Color:</label>
            <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                disabled={!!selectedDuck}
            >
                {['Red', 'Green', 'Yellow', 'Black'].map(c => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>

            <label  className='input1'>Size:</label>
            <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                disabled={!!selectedDuck} // read-only
            >
                {['XLarge', 'Large', 'Medium', 'Small', 'XSmall'].map(s => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>

            <label  className='input1'>Price:</label>
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
            />

            <label  className='input1'>Quantity:</label>
            <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
            />

            <button type="submit" className='pointer button2'>
                {selectedDuck ? "Update" : "Add"}
            </button>

            {selectedDuck && (
                <button className='pointer button3'
                    type="button"
                    onClick={() => {
                        setSelectedDuck(null);
                        resetForm();
                    }}
                >
                    Cancel
                </button>
            )}
        </form>}

        <table className='table'>
            <thead className='header-row'>
                <tr className='table-row'>
                    <th className='cell'>Id</th>
                    <th className='cell'>Color</th>
                    <th className='cell'>Size</th>
                    <th className='cell'>Price</th>
                    <th className='cell'>Quantity</th>
                    <th className='cell'>Actions</th>
                </tr>
            </thead>

            <tbody className='main-row'>
                {ducks.map(duck => (
                    <tr key={duck._id} className='table-row'>
                        <td className='cell'>{duck._id}</td>
                        <td className='cell' style={{backgroundColor:getSoftBackground(duck.color), fontWeight:"600"}}>{duck.color}</td>
                        <td className='cell'>{duck.size}</td>
                        <td className='cell'>${duck.price}</td>
                        <td className='cell'>{duck.quantity}</td>
                        {props.mode === 'warehouse' &&
                        (<td className='cell'>
                            <button className='pointer button1' onClick={() => handleEdit(duck)}>
                                Edit
                            </button>
                            <button className='pointer button3' onClick={() => handleDelete(duck._id)} style={{marginLeft:"12px"}}>
                                Delete
                            </button>
                        </td>)||(
                            <td className='cell'>
                            <button className='pointer button1'>
                                Add to Cart
                            </button>

                        </td>
                        )}
                       
                    </tr>
                ))}
            </tbody>
        </table></div>
    );
};

export default DucksList;
