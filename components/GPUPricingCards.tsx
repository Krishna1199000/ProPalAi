import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, Zap, CheckCircle } from 'lucide-react';

const pricingPlans = [
  {
    name: "Starter",
    gpu: "1× NVIDIA L40S",
    gpuMemory: "4GB GPU",
    cpu: "2× CPU",
    ram: "23GB RAM",
    price: "₹999",
    period: "/month",
    features: ["High-performance inference", "Global edge locations", "24/7 monitoring", "API access"]
  },
  {
    name: "Professional",
    gpu: "2× NVIDIA L40S",
    gpuMemory: "9GB GPU",
    cpu: "3× CPU",
    ram: "46GB RAM",
    price: "₹9999",
    period: "/month",
    featured: true,
    features: ["Everything in Starter", "Priority support", "Advanced analytics", "Custom model deployment"]
  },
  {
    name: "Enterprise",
    gpu: "2× NVIDIA L40S",
    gpuMemory: "19GB GPU",
    cpu: "6× CPU",
    ram: "92GB RAM",
    price: "₹2499",
    period: "/month",
    features: ["Everything in Professional", "Dedicated account manager", "SLA guarantee", "Custom integrations"]
  }
];

export default function GPUPricingCards() {
  return (
    <section id="pricing" className="py-24 px-6 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Use dedicated GPUs to scale custom models and production apps
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect GPU configuration for your AI workloads with our flexible pricing plans
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.featured 
                  ? 'border-orange-500 shadow-orange-500/20 shadow-lg' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium px-4 py-2 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-white mb-1">
                  {plan.price}
                  <span className="text-lg text-gray-400 font-normal">{plan.period}</span>
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{plan.gpu}</div>
                    <div className="text-gray-400 text-sm">{plan.gpuMemory}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{plan.cpu}</div>
                    <div className="text-gray-400 text-sm">Processing Power</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <HardDrive className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{plan.ram}</div>
                    <div className="text-gray-400 text-sm">System Memory</div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-xl font-medium text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  plan.featured
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-orange-700'
                    : 'bg-gray-700 text-white hover:bg-gray-600 border border-gray-600 hover:border-gray-500'
                }`}
              >
                <Zap className="w-5 h-5" />
                <span>Order Now</span>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400">
            All plans include 99.9% uptime SLA, global CDN, and 24/7 technical support
          </p>
        </motion.div>
      </div>
    </section>
  );
}