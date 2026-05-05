import { CalendarIcon } from "lucide-react";
export const Calendly = () => (
  <div className="max-w-7xl mx-auto">
    <div className="text-center">
      <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
        Ready to Get Started?
      </h2>
      <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
        Book a demo to see how Segmento can transform your protocol's
        understanding of user behavior and optimize your growth strategies.
      </p>
      <div className="mt-10">
        <a
          href="https://calendly.com/marek-hauzr/segmento"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:text-lg md:px-10 shadow-lg"
        >
          <CalendarIcon className="mr-2 h-5 w-5" />
          Schedule a Demo Call
        </a>
      </div>
      <p className="mt-6 text-blue-100">
        Our team will walk you through Segmento's capabilities and discuss how
        it can be tailored to your specific needs.
      </p>
    </div>
  </div>
);
