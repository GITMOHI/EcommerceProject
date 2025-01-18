import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="p-8 bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="hero min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Get in Touch</h1>
            <p className="py-6">
              We're here to help! Reach out to us anytime, and we'll happily answer your questions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white" aria-labelledby="contact-form">
        <div className="text-center mb-8">
          <h2 id="contact-form" className="text-4xl font-bold text-blue-600">
            Contact Us
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="card w-full max-w-lg bg-white shadow-xl">
            <div className="card-body">
              <form action="/submit-form" method="POST" className="space-y-4">
                <div className="form-control">
                  <label className="label" htmlFor="name">
                    <span className="label-text">Your Name</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="email">
                    <span className="label-text">Your Email</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john.doe@example.com"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="message">
                    <span className="label-text">Your Message</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Type your message here..."
                    className="textarea textarea-bordered w-full"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <div className="form-control mt-4">
                  <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 text-white w-full">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Details */}
          <div className="card w-full max-w-lg bg-white shadow-xl">
            <div className="card-body text-center">
              <h3 className="text-2xl font-bold mb-4">Our Contact Details</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <FaPhone className="text-3xl text-blue-600 mr-4" />
                  <p className="text-lg">+1 (800) 123-4567</p>
                </div>
                <div className="flex items-center justify-center">
                  <FaEnvelope className="text-3xl text-blue-600 mr-4" />
                  <p className="text-lg">support@shopzen.com</p>
                </div>
                <div className="flex items-center justify-center">
                  <FaMapMarkerAlt className="text-3xl text-blue-600 mr-4" />
                  <p className="text-lg">
                    123 ShopZen Blvd, Suite 100, San Francisco, CA 94103
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 bg-gray-100" aria-labelledby="location-map">
        <div className="text-center mb-8">
          <h2 id="location-map" className="text-4xl font-bold text-blue-600">
            Our Location
          </h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-300 rounded-lg h-64 flex items-center justify-center">
            <p className="text-lg text-gray-600">Map Placeholder (Google Maps Embed Here)</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
