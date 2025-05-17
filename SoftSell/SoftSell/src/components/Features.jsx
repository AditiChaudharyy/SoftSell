import React from 'react';
import { ShieldCheck, Clock, DollarSign, Users } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Features = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
      title: 'Secure Transactions',
      description:
        'End-to-end encryption and SOC 2 Type II compliance ensures your license information and payments are always protected.',
    },
    {
      icon: <Clock className="w-10 h-10 text-blue-600" />,
      title: 'Quick Turnaround',
      description:
        'From upload to payment in as little as 48 hours, our streamlined process gets you paid faster than any competitor.',
    },
    {
      icon: <DollarSign className="w-10 h-10 text-blue-600" />,
      title: 'Maximum Value',
      description:
        'Our market analysis algorithms ensure you get up to 70% more value compared to traditional software resellers.',
    },
    {
      icon: <Users className="w-10 h-10 text-blue-600" />,
      title: 'Dedicated Support',
      description:
        'Our team of software licensing experts is available 24/7 to assist with any questions or concerns during the selling process.',
    },
  ];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-20 opacity-0 transition-opacity duration-1000"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose <span className="text-blue-600">SoftSell</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            We've helped thousands of Indian businesses recover value from their unused software investments. Here's why they choose us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;