import React from 'react'
import "./Siva.css"
import { useState } from 'react'

const Siva = () => {

  
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [transaction, setTransaction] = useState([]);
  const [editId, setEditId] = useState('');


  const addTransaction = (e) => {

    
    e.preventDefault ();
    if (editId) {
      const newTransaction = transaction.map((t) =>
        t.id === editId ? { id: editId, description, amount, date } : t
      );
      setTransaction(newTransaction);
      setEditId(null);

    }
    else {
      setTransaction([...transaction, { id: Date.now(), description, amount, date }])
     }
      setDescription('');
      setAmount();
      setDate('');
  };
  const handleEdit = (t) => {
    setEditId(t.id)
    setDescription(t.description)
    setAmount(t.amount)
    setDate(t.date)
  }
  const handleDelete = (id) => {

    setTransaction(transaction.filter((t) => t.id !== id));
  }

  return (
    <div>
      <div>
        <h1>Transaction</h1>
        <table className='table'>
          <thead>
            <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transaction.map((t) => (
              <tr key={t.id}>
                <td>{t.description}</td>
                <td>{t.amount}</td>
                <td>{t.date}</td>
                <td>
                  <button onClick={() => handleEdit(t)} >Edit</button>
                  <button onClick={() => handleDelete(t.id)}>Delete</button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <div>
      <form onSubmit={addTransaction}>
        <input type="text" placeholder='EnterDescriptions' onChange={e => setDescription(e.target.value)} value={description} />
        <input type="amount" placeholder='EnterAount' onChange={e => setAmount(e.target.value)} value={amount} />
        <input type="date" placeholder='Date' onChange={e => setDate(e.target.value)} value={date} />
        <center><button type='submit'>AddTransaction</button></center>
      </form>
      
    </div>
    </div>
    
    

  );

            }
export default Siva