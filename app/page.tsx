import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      {/* Moving Slide Show */}
      <div style={{ overflow: 'hidden', position: 'relative', width: '100%', marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          animation: 'slide 10s infinite',  // Adjust the duration as needed
        }}>
          {[1, 2, 3].map((slideNumber) => (
            <img
              key={slideNumber}
              src={`https://static.vecteezy.com/system/resources/thumbnails/024/933/352/small/refreshing-milkshake-with-chocolate-and-fruit-on-wooden-table-background-generated-by-ai-free-photo.jpg`}
              alt={`Slide ${slideNumber}`}
              style={{ width: '100%', height: 'auto' }}
            />
          ))}
        </div>
      </div>

      {/* Title and Description */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', textAlign: 'center' }}>
        <div style={{ marginRight: '150px' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '5px' }}>Delicious</h1>
          <h1 style={{ fontSize: '48px', marginBottom: '5px' }}>Boba Drinks</h1>
          <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Since 1992</h1>
          <p style={{ marginBottom: '20px', maxWidth: '500px', fontSize: '18px' }}>
            Since 1992, ShareTea has been your go-to destination for the best boba tea experience. 
            Our cozy, vibrant spot offers a diverse menu of freshly brewed teas and creative flavors, paired with perfectly chewy tapioca pearls. 
            Whether you're a boba enthusiast or a newcomer, indulge in our delightful concoctions and sip your way to bliss!
          </p>
        </div>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/024/933/352/small/refreshing-milkshake-with-chocolate-and-fruit-on-wooden-table-background-generated-by-ai-free-photo.jpg" 
          alt="Logo" style={{ width: '500px', height: '300px' }} />
      </div>

      {/* Larger Order Now Button */}
      <Link href="/order">
        <button style={{ textDecoration: 'none', color: 'white', backgroundColor: 'red', padding: '15px 30px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '20px' }}>
          Order Now
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
