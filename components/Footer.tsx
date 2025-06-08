import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Send, ExternalLink } from 'lucide-react';

const footerLinks = {
  Products: [
    'CDN',
    'Cloud Hosting',
    'Streaming Platform',
    'Object Storage',
    'DNS',
    'DDoS Protection',
    'Load Balancer',
    'Web Security'
  ],
  Company: [
    'About Us',
    'Careers',
    'Legal',
    'Privacy Policy',
    'Terms of Service',
    'Sitemap',
    'Contact',
    'Blog'
  ],
  Resources: [
    'API Documentation',
    'Product Documentation',
    'Developer Tools',
    'Status Page',
    'Community',
    'Support Center',
    'Tutorials',
    'Changelog'
  ]
};

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:contact@propalai.com', label: 'Email' }
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold text-white">Pro Pal AI</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Powering the future of AI inference with our global edge network. 
              Lightning-fast performance for your AI applications worldwide.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="md:col-span-1">
              <h3 className="text-white font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-12 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Subscribe to discover the latest updates
            </h3>
            <p className="text-gray-400 mb-8">
              Get the latest news, updates, and insights delivered directly to your inbox
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubscribed}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isSubscribed
                    ? 'bg-green-600 text-white'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                }`}
              >
                {isSubscribed ? (
                  <>
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Subscribe</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Pro Pal AI. All rights reserved.
            </div>
            
            {/* Powered by Krishna */}
            <div className="text-gray-400 text-sm flex items-center space-x-1">
              <span>Powered by</span>
              <a
                href="https://portfolio-krishna-psi.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 transition-colors duration-300 flex items-center space-x-1"
              >
                <span className="font-medium">Krishna</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span>• Mumbai</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}