import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-teal-900 text-gray-100 py-16">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        
        {/* Branding and Description */}
        <div>
          {/* <h2 className="text-2xl font-bold mb-4">ShopZen</h2> */}
          <img src="/images/logo.png" className='w-32'></img>
          <p className="text-gray-300 text-sm">
            Your one-stop shop for all your needs. From fashion to electronics, we bring the best to your doorstep.
          </p>
        </div>
        
        {/* Navigation Links */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Quick Links</h6>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Shop</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
          </ul>
        </div>
        
        {/* Contact Information */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Contact Us</h6>
          <ul className="space-y-2 text-gray-400">
            <li><FaPhoneAlt className="inline-block mr-2" /> +1 234 567 890</li>
            <li><FaEnvelope className="inline-block mr-2" /> support@shopzen.com</li>
            <li>123 ShopZen Street, Commerce City</li>
          </ul>
        </div>
        
        {/* Newsletter Signup */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h6>
          <p className="text-gray-300 text-sm mb-4">
            Get the latest updates on our products and offers.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-l-md bg-gray-700 text-white placeholder-gray-400"
            />
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-r-md hover:bg-yellow-600 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="border-t border-gray-700 mt-10 pt-6">
        <div className="container mx-auto flex justify-center items-center px-6">
          <p className="text-sm text-gray-400">&copy; 2025 ShopZen. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaLinkedinIn /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
