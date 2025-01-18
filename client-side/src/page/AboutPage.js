import React from 'react';
import { FaHeart, FaUsers, FaLeaf } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="p-8 bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="hero min-h-screen bg-gradient-to-r from-red-600 to-pink-600 text-white"
        aria-label="Welcome to ShopZen"
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://via.placeholder.com/400"
            alt="ShopZen Products Display"
            className="max-w-sm rounded-lg shadow-2xl"
            loading="lazy"
          />
          <div>
            <h1 className="text-5xl font-bold leading-tight">Welcome to ShopZen</h1>
            <p className="py-6 text-lg">
              Your one-stop online destination for quality home goods, fashion, electronics, and more.
              Experience seamless shopping like never before!
            </p>
            <a href="/shop" className="btn bg-red-600 hover:bg-red-700 text-white border-none">
              Explore Now
            </a>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-16" aria-labelledby="our-journey">
        <div className="text-center">
          <h2 id="our-journey" className="text-4xl font-bold text-red-600 mb-4">
            Our Journey
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            Founded in <strong>2020</strong>, <strong>ShopZen</strong> started with a simple vision: to create
            a marketplace where customers can find everything they need without compromising on quality or price.
            Today, we serve thousands of happy customers globally.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-100" aria-labelledby="why-choose-us">
        <div className="text-center mb-12">
          <h2 id="why-choose-us" className="text-4xl font-bold text-red-600">
            Why Choose Us?
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            {
              icon: <FaHeart className="text-5xl text-red-600" />,
              title: "Wide Range of Products",
              description:
                "From fashion to electronics, we offer a diverse selection to cater to all your needs.",
            },
            {
              icon: <FaUsers className="text-5xl text-blue-600" />,
              title: "Customer First",
              description:
                "Our customers are at the heart of everything we do. Excellent service guaranteed.",
            },
            {
              icon: <FaLeaf className="text-5xl text-green-600" />,
              title: "Sustainable Practices",
              description:
                "Committed to sustainability and ethical sourcing for a better tomorrow.",
            },
          ].map((feature, index) => (
            <div key={index} className="card w-96 bg-white shadow-xl">
              <div className="card-body items-center text-center">
                {feature.icon}
                <h3 className="text-2xl font-semibold mt-4">{feature.title}</h3>
                <p className="mt-2">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16" aria-labelledby="our-values">
        <div className="text-center">
          <h2 id="our-values" className="text-4xl font-bold text-red-600 mb-4">
            Our Values
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            <strong>Innovation</strong>, <strong>Integrity</strong>, and <strong>Community</strong> are the
            pillars that define our work. We aim to bring the latest trends while fostering a trustworthy and
            supportive community.
          </p>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 bg-gray-100" aria-labelledby="meet-the-team">
        <div className="text-center">
          <h2 id="meet-the-team" className="text-4xl font-bold text-red-600 mb-4">
            Meet the Team
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            Our team of passionate professionals works tirelessly to ensure your shopping experience is
            nothing short of amazing.
          </p>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16" aria-labelledby="join-us">
        <div className="text-center">
          <h2 id="join-us" className="text-4xl font-bold text-red-600 mb-4">
            Join Us on Our Journey
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you're a long-time customer or just discovering us, we invite you to be part of the{' '}
            <strong>ShopZen</strong> community. Follow us on social media and subscribe to our newsletter.
          </p>
          <a href="/subscribe" className="btn bg-blue-600 hover:bg-blue-700 text-white border-none mt-4">
            Subscribe Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
