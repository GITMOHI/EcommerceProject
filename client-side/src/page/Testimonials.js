import { motion } from 'framer-motion';

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "ShopZen transformed my shopping experience. High-quality products and exceptional customer service!",
      name: "Emily R.",
      role: "Fashion Enthusiast",
      image: "/images/h1.png",
    },
    {
      id: 2,
      quote: "I found everything I needed and more. The website is easy to navigate, and the checkout process is seamless.",
      name: "John D.",
      role: "Regular Customer",
      image: "/images/h2.png",
    },
    {
      id: 3,
      quote: "Absolutely love the new arrivals. Always something fresh and exciting at ShopZen!",
      name: "Sophia L.",
      role: "Trend Follower",
      image: "/images/h3.png",
    },
  ];

  return (
    <div className="bg-white py-20 px-5 md:px-20">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800">What Our Customers Say</h2>
        <p className="text-gray-600 mt-4 text-lg">We are dedicated to providing the best shopping experience for our customers.</p>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            className="bg-gray-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mx-auto"
            />
            <p className="italic text-gray-700 mt-6">"{testimonial.quote}"</p>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
