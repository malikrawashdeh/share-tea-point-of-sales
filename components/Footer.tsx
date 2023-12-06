'use client'

const Footer = () => {
    return (
        <>
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
      <style jsx>{`        
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
      `}</style></>
    )
}

export default Footer;