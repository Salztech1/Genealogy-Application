import React, { useState } from 'react';

const AddMember = () => {

  const [user, setUser] = useState(
    {

    }
  )

  let name, value
  console.log(user)
  const data = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value })
  }

  const getdata = async (e) => {
    const { Name, Email, DateOfBirth, PlaceOfBirth, PhoneNumber } = user
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Name, Email, DateOfBirth, PlaceOfBirth, PhoneNumber
      })
    }
    const res = await fetch('https://genealogy-application-5f3dd-default-rtdb.firebaseio.com/UserData.json',
      options
    )
    if (res) {
      alert('Message sent')
    }
    else {
      alert('Error occured')
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={user.Name} onChange={data} placeholder="Name" required />
      <input type="email" value={user.Email} onChange={data} placeholder="Email" required />
      <input type="date" value={user.DateOfBirth} onChange={data} placeholder="Date of Birth" required />
      <input type="text" value={user.PlaceOfBirth} onChange={data} placeholder="Place of Residence" required />
      <input type="tel" value={user.PhoneNumber} onChange={data} placeholder="Phone Number" required />
      <button onClick={getdata} type="submit">Add Member</button>
    </form>
  );
};

export default AddMember;




