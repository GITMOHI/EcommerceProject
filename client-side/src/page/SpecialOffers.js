import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function SpecialOffers() {
  const [currentOffers, setCurrentOffers] = useState([]);
  const eventOffers = [
    {
      id: 1,
      eventName: "New Year Bonanza",
      startDate: "2025-01-01",
      endDate: "2025-01-10",
      description: "Celebrate the new year with amazing discounts on all products.",
      discount: "50%",
      couponCode: "NEWYEAR50",
      image: "images/offer1.png",
    },
    {
      id: 2,
      eventName: "Valentine's Day Special",
      startDate: "2025-02-10",
      endDate: "2025-02-14",
      description: "Show your love with special gifts and exclusive discounts.",
      discount: "30%",
      couponCode: "LOVE30",
      image: "images/offer2.png",
    },
    {
      id: 3,
      eventName: "Summer Sale",
      startDate: "2025-06-01",
      endDate: "2025-06-15",
      description: "Get ready for summer with our cool deals on summer essentials.",
      discount: "40%",
      couponCode: "SUMMER40",
      image: "https://via.placeholder.com/600x400?text=Summer+Sale",
    },
  ];
  useEffect(() => {
    const today = new Date();
    console.log('Today:', today);
  
    const eventOffers = [
      {
        id: 1,
        eventName: "New Year Bonanza",
        startDate: "2025-01-01",
        endDate: "2025-01-10",
        description: "Celebrate the new year with amazing discounts on all products.",
        discount: "50%",
        couponCode: "NEWYEAR50",
        image: "https://via.placeholder.com/600x400?text=New+Year+Bonanza",
      },
      {
        id: 2,
        eventName: "Valentine's Day Special",
        startDate: "2025-02-10",
        endDate: "2025-02-14",
        description: "Show your love with special gifts and exclusive discounts.",
        discount: "30%",
        couponCode: "LOVE30",
        image: "https://via.placeholder.com/600x400?text=Valentine's+Day",
      },
      {
        id: 3,
        eventName: "Summer Sale",
        startDate: "2025-06-01",
        endDate: "2025-06-15",
        description: "Get ready for summer with our cool deals on summer essentials.",
        discount: "40%",
        couponCode: "SUMMER40",
        image: "https://via.placeholder.com/600x400?text=Summer+Sale",
      },
    ];
  
    const filteredOffers = eventOffers.filter((offer) => {
      const startDate = new Date(offer.startDate);
      const endDate = new Date(offer.endDate);
      console.log(`Offer: ${offer.eventName}, Start: ${startDate}, End: ${endDate}`);
      return today >= startDate && today <= endDate;
    });
  
    console.log('Filtered Offers:', filteredOffers);
    // setCurrentOffers(filteredOffers);
    setCurrentOffers(eventOffers)
  }, []);
  

  return (
    <section className="mt-20 py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Special Offers & Discounts
        </h2>
        {currentOffers.length > 0 ? (
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {currentOffers.map((offer,idx) => (
              <motion.div
                key={offer.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300"
              >
                <img
                  src={idx === 0 ? "/images/offer1.png" : "/images/offer2.png"}
                  alt={offer.eventName}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    {offer.eventName}
                  </h3>
                  <p className="text-gray-600 mb-4">{offer.description}</p>
                  <p className="text-lg font-bold text-red-500 mb-2">
                    {offer.discount} OFF
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    Use Code: <span className="font-semibold">{offer.couponCode}</span>
                  </p>
                  <a
                    href="/apply-coupon"
                    className="block text-center bg-red-500 text-white py-3 px-6 rounded hover:bg-red-600 transition-colors"
                  >
                    Shop Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No current offers available. Please check back later!
          </p>
        )}
      </div>
    </section>
  );
}

export default SpecialOffers;
