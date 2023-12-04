"use client"
import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minHeight: '100vh' }}>
      {/* Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        {/* Fading Slide Show */}
        <div className="slideshow-container">
          <div className="slideshow">
            {[1, 2, 3].map((slideNumber) => (
              <img
                key={slideNumber}
                src={`https://static.vecteezy.com/system/resources/thumbnails/024/933/352/small/refreshing-milkshake-with-chocolate-and-fruit-on-wooden-table-background-generated-by-ai-free-photo.jpg`}
                alt={`Slide ${slideNumber}`}
                className="slide"
              />
            ))}
          </div>
        </div>

        {/* Title and Description */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', textAlign: 'center', marginTop: '60px'}}>
          <div style={{ marginRight: '150px' }}>
            <h1 style={{ fontSize: '28px', marginBottom: '5px' }}>Delicious</h1>
            <h1 style={{ fontSize: '48px', marginBottom: '5px' }}>Boba Drinks</h1>
            <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Since 1992</h1>
            <p style={{ marginBottom: '20px', maxWidth: '500px', fontSize: '18px' }}>
              ShareTea has been your go-to destination for the best boba tea experience. 
              Our cozy, vibrant spot offers a diverse menu of freshly brewed teas and creative flavors, paired with perfectly chewy tapioca pearls. 
              Whether you&aposre a boba enthusiast or a newcomer, indulge in our delightful concoctions and sip your way to bliss!
            </p>
          </div>
          <img src="https://static.vecteezy.com/system/resources/thumbnails/024/933/352/small/refreshing-milkshake-with-chocolate-and-fruit-on-wooden-table-background-generated-by-ai-free-photo.jpg" 
            alt="Logo" style={{ width: '500px', height: '300px' }} />
        </div>

        {/* Larger Order Now Button */}
        <Link href="/order">
          <button style={{ textDecoration: 'none', color: 'white', backgroundColor: '#ce0e2d', padding: '15px 30px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '20px', marginBottom: '40px' , marginLeft: '160px'}}>
            Order Now
          </button>
        </Link>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#ce0e2d', padding: '20px', width: '100%', textAlign: 'center' }}>
        <h2>Contact Us</h2>
        <p>Email: info@sharetea.com</p>
        <p>Phone: (123) 456-7890</p>

        {/* Social Media Icons */}
        <div style={{ marginTop: '20px' }}>
          <a href="https://www.facebook.com/sharetea" target="_blank" rel="noopener noreferrer">
            <img src="/facebook-icon.png" alt="Facebook" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
          </a>
          <a href="https://www.instagram.com/sharetea" target="_blank" rel="noopener noreferrer">
            <img src="/instagram-icon.png" alt="Instagram" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
          </a>
          <a href="https://twitter.com/sharetea" target="_blank" rel="noopener noreferrer">
            <img src="/twitter-icon.png" alt="Twitter" style={{ width: '30px', height: '30px' }} />
          </a>
        </div>
      </footer>

      {/* Add the CSS for the animation and footer */}
      <style jsx>{`
        @keyframes fade {
          0%, 100% {
            opacity: 0;
          }
          25%, 75% {
            opacity: 1;
          }
        }

        .slideshow-container {
          overflow: hidden;
          position: relative;
          width: 80%; // Adjust the width as needed
          margin: 0 auto; // Center the slideshow
          margin-bottom: 20px;
        }

        .slideshow {
          display: flex;
          animation: fade 9s linear infinite; // Adjust the duration as needed (fade duration = total duration - 1s)
        }

        .slide {
          width: 100%;
          flex-shrink: 0;
          height: auto; // Ensure the images maintain their aspect ratio
        }

        footer {
          background-color: red;
          padding: 20px;
          width: 100%;
          text-align: center;
        }

        footer h2 {
          margin-bottom: 10px;
        }

        footer p {
          margin: 5px 0;
        }

        footer img {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
