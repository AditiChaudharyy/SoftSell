import React from 'react';
import { ChevronRight, Download, ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="pt-28 pb-20 md:pt-32 md:pb-28 opacity-0 transition-opacity duration-1000"
      style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(37, 99, 235, 0.05) 0%, rgba(37, 99, 235, 0) 50%)' }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Transform Your Unused Software into 
              <span className="text-blue-600"> Real Value</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
              SoftSell helps Indian businesses recover costs from unused software licenses with our secure, transparent marketplace. Turn idle assets into revenue today.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => {
                  const contactSection = document.querySelector('#contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 group"
              >
                <span>Get a Quote</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <span>Learn More</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-10 flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <Download className="w-4 h-4 mr-1" />
              <span>Helped businesses recover</span> 
              <span className="font-semibold text-blue-600">$8.3M</span> 
              <span>in unused software value</span>
            </div>
          </div>

          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 opacity-30 blur-lg filter"></div>
              <div className="relative bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <img 
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Team celebrating software sale success" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;