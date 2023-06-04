import React, { useState } from 'react';
import './ExpenseForms.css';
import { useEffect } from 'react';

const getDatafromLS=()=>{
  const data=localStorage.getItem("vinodh")

  if(data){
    return JSON.parse(data);
  }
  else{
    return [];
  }
};

const ExpenseForms = () => {

  const [vinodh,setVinodh]=useState(getDatafromLS())
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const [editId, setEditId] = useState(null);
  const [date,setDate]=useState()
  
  const addTransaction = (e) => {
    e.preventDefault();

    let vinod={
      description,
      amount,
      date
    }
    setVinodh([...vinodh,vinod]);
    setDescription('')
    setAmount()
    setDate()

    
    if (editId) {
      const newTransactions = vinodh.map((t) =>
        t.id === editId ? { id: editId, description, amount,date } : t 
      );
      setVinodh(newTransactions);
      setEditId(null);
    } else {
      setVinodh([...vinodh, { id: Date.now(), description, amount,date}]);
    }
    setAmount();
    setDescription('');
    setDate('');
  };

  const handleEdit = (t) => {
    setEditId(t.id);
    setDescription(t.description);
    setAmount(t.amount);
    setDate(t.date);
  };

  const handleDelete = (id) => {
    setVinodh(vinodh.filter((t) => t.id !== id));
  }

    useEffect(()=>{
      localStorage.setItem("vinodh",JSON.stringify(vinodh))
    },[vinodh])

  return (
    <div className='app'>
      <div>
        <center><h2>Transactions</h2></center>

        {vinodh.length > 0 &&
        <div className='map'>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vinodh.map((t) => (
                <tr key={t.id}>
                  <td>{t.description}</td>
                  <td>{t.amount}</td>
                  <td> {t.date}</td>
                  <td>
                    <button onClick={() => handleEdit(t)}>Edit</button>
                    <button onClick={() => handleDelete(t.id)}>Delete</button>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
              }   {vinodh.length< 1 && <div> No Transaction added yet</div>}

        <div>
        <form onSubmit={addTransaction}>
            <br />
        
        <br />
            <input type='text' placeholder='Description' onChange={(e) => setDescription(e.target.value)} value={description} />
            <input type='number'  placeholder='Amount' onChange={(e) => setAmount(e.target.value)} value={amount} />
            <input type='date' onChange={(e) => setDate(e.target.value)} value={date} />
            <button type='submit'>Add Transaction</button>
        </form>

        </div>
      </div>
    </div>
  );
};
export default ExpenseForms;
