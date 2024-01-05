import React from 'react';
import coke1 from "../assets/images/coke1.jpg";
import adidas from "../assets/images/adidas.jpg";
import starbucks from "../assets/images/starbucks.jpg";
import mcdonalds1 from "../assets/images/mcdonalds1.jpg";
import redbull from "../assets/images/redbull.jpg";
import nutella from "../assets/images/nutella.jpg";

export const OurClients = () => {
  const clients = [
    { name: 'Adidas', image: adidas },
    { name: 'Redbull', image: redbull },
    { name: 'Starbucks', image: starbucks },
    { name: 'Coca-Cola', image: coke1 },
    { name: 'McDonald\'s', image: mcdonalds1 },
  ];

  return (
    <div id='our-clients'>
      <h1 className='text-center  text-4xl font-extrabold p-3 rounded-lg text-white m-5'>Our Clients</h1>
      <div className="bg-[#9ac0c7] flex p-5 justify-between gap-x-3 flex-wrap rounded-lg">
        {clients.map((client, index) => (
          <div key={index} className="card mt-5 mx-5">
            <img src={client.image} alt={client.name} className='h-64 w-64  object-cover rounded-lg shadow-lg hover:shadow-xl transition duration-300'/>
            <p className='text-center text-lg mt-2 font-semibold'>{client.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
