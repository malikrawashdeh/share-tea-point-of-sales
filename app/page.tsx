import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ marginRight: '50px', marginLeft: '50px' }}>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/024/933/352/small/refreshing-milkshake-with-chocolate-and-fruit-on-wooden-table-background-generated-by-ai-free-photo.jpg" 
        alt="Logo" style={{ width: '500px', height: '250px' }} />
      </div>
      <div>
        <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Welcome to ShareTea!</h1>
        <p style={{ marginBottom: '30px'}}>
          ShareTea is your go-to destination for the best boba tea experience. 
          Our cozy, vibrant spot offers a diverse menu of freshly brewed teas and creative flavors, paired with perfectly chewy tapioca pearls. 
          Whether you're a boba enthusiast or a newcomer, indulge in our delightful concoctions and sip your way to bliss!
        </p>
        <Link href="/order">
          <button style={{ textDecoration: 'none', color: 'white', backgroundColor: 'red', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
            Order Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

