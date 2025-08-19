import React from 'react';

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "E-commerce Automation Success",
      company: "TechMart Inc.",
      industry: "Retail",
      challenge: "Manual order processing was causing delays and errors",
      solution: "Implemented AI-powered order management system",
      results: "85% reduction in processing time, 99.2% accuracy rate",
      image: "🛒"
    },
    {
      title: "Predictive Maintenance Revolution",
      company: "Manufacturing Corp",
      industry: "Manufacturing",
      challenge: "Unexpected equipment failures causing costly downtime",
      solution: "Deployed ML-based predictive maintenance system",
      results: "70% reduction in unplanned downtime, $2M annual savings",
      image: "🏭"
    },
    {
      title: "Customer Service Transformation",
      company: "ServicePro Ltd",
      industry: "Technology",
      challenge: "High customer support ticket volume overwhelming team",
      solution: "Intelligent chatbot and ticket routing system",
      results: "60% faster response times, 95% customer satisfaction",
      image: "💬"
    }
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Case Studies
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover how we've helped businesses transform their operations with AI-powered solutions.
          </p>
        </div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <div key={index} className="card">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="text-6xl mb-4">{study.image}</div>
                  <div className="text-sm text-primary-600 dark:text-primary-400 font-semibold mb-2">
                    {study.industry}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {study.company}
                  </p>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Challenge
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {study.challenge}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Solution
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {study.solution}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Results
                      </h4>
                      <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                        {study.results}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;