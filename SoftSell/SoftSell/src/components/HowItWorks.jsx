import React from 'react';
import { Upload, LineChart, CreditCard } from 'lucide-react';
import { useEffect, useRef } from 'react';

const HowItWorks = () => {
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

  const steps = [
    {
      icon: <Upload className="w-10 h-10 text-blue-600" />,
      title: 'Upload License',
      description:
        'Securely upload your license details through our encrypted platform. We support all major software vendors.',
    },
    {
      icon: <LineChart className="w-10 h-10 text-blue-600" />,
      title: 'Get Valuation',
      description:
        'Our AI-powered algorithm analyzes the market to provide the most competitive valuation for your software license.',
    },
    {
      icon: <CreditCard className="w-10 h-10 text-blue-600" />,
      title: 'Get Paid',
      description:
        'Accept our offer and receive payment through your preferred method within 48 hours guaranteed.',
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-gray-800 opacity-0 transition-opacity duration-1000"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It <span className="text-blue-600">Works</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Our streamlined process makes selling your unused software licenses quick, secure, and profitable for Indian businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
          ))}

          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-24 left-[33%] right-[33%] h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 z-0"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;