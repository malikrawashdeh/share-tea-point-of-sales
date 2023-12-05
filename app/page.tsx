"use client"
// Import required modules
import React from 'react';
import Link from 'next/link';

// Define component
const HomePage: React.FC = () => {
  // Array of slide images
  const slideImages = [
    'https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1683020655204-3RXUZ7PVG45OXI0MU3KX/Snapinsta.app_1080_118732368_827654431104579_7726909057187588258_n.jpg?format=500w',
    'https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1692067321171-VB2FLO17X37D9M6QVZOO/Snapinsta.app_357033011_599696162350237_1079239035560307716_n_1080.jpg?format=500w',
    'https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1692067756188-BGJGGINJVLZ2J7BEIA0T/Snapinsta.app_350137305_1845512162511432_406585343924819281_n_1080.jpg?format=500w',
  ];

  // JSX structure
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minHeight: '100vh' }}>
      {/* Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        {/* Fading Slide Show */}
        <div className="slideshow-container" style={{}}>
          <div className="slideshow" style={{justifyContent: 'center'}}>
            {slideImages.map((slideSrc, index) => (
              <img
                key={index}
                src={slideSrc}
                alt={`Slide ${index + 1}`}
                className="slide"
              />
            ))}
          </div>
        </div>

        {/* Title and Description */}
        <div style={{ display: 'block', alignItems: 'center', marginBottom: '20px', textAlign: 'center', marginTop: '60px' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '5px' }}>Delicious</h1> 


            <h1 style={{ fontSize: '48px', marginBottom: '5px' }}>Boba Drinks</h1>

            <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Since 1992</h1>

            <p style={{ marginBottom: '20px', fontSize: '18px', textAlign: 'center', alignItems: 'center', marginRight: '200px', marginLeft: '200px'}}>
              ShareTea has been your go-to destination for the best boba tea experience.
              Our cozy, vibrant spot offers a diverse menu of freshly brewed teas and creative flavors, paired with perfectly chewy tapioca pearls.
              Whether you&aposre a boba enthusiast or a newcomer, indulge in our delightful concoctions and sip your way to bliss!
            </p>
          
        </div>

        {/* Larger Order Now Button */}
        <Link href="/order">
          <button style={{ textDecoration: 'none', color: 'white', backgroundColor: '#ce0e2d', padding: '15px 30px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '20px', marginBottom: '40px' }}>
            Order Now
          </button>
        </Link>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#ce0e2d', padding: '50px',width: '100vw', textAlign: 'center' }}>
        <h2>Contact Us</h2>
        <p>Phone: (979) 330-4078</p>

        {/* Social Media Icons */}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <a href="https://www.facebook.com/shareteausa" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white', marginRight: '20px', fontWeight: 'bold' }}>
            Facebook
          </a>
          <a href="https://www.instagram.com/sharetea/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white', marginRight: '20px', fontWeight: 'bold' }}>
            Instagram
          </a>
          <a href="mailto:service@1992sharetea.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
            Email
          </a>
        </div>
      </footer>

      {/* Add the CSS for the animation and footer */}
      <style jsx>{`
        .slideshow-container {
          overflow: hidden;
          position: relative;
          width: 100%; // Make the slideshow span the entire width
          margin: 0 auto;
        }

        .slideshow {
          display: flex;
          animation: fade 8s linear infinite;
          width: auto; // Make the slideshow container twice as wide to accommodate two images side by side
        }

        .slide {
          width: 450px; // Each image takes up 50% of the slideshow container
          flex-shrink: 0;
          height: auto;
        }

        .footer {
          background-color: red;
          padding: 20px;
          width: 100%; // Make the footer span the entire width
          text-align: center;
        }

        .footer h2 {
          margin-bottom: 10px;
        }

        .footer p {
          margin: 5px 0;
        }

        .footer a {
          color: white;
          text-decoration: none;
          margin-right: 20px;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
};

// Export component
export default HomePage;
