import { ChevronDownIcon } from "lucide-react";
export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            <span className="block">Get ROI for $ spent on KOLs</span>
          </h1>
          <p className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto">
            Segmento connects acquisition tracking with on-chain behavior, so
            teams can see which KOLs drive valuable users instead of just raw
            traffic.
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="https://calendly.com/marek-hauzr/segmento "
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 shadow-md"
            >
              Request a Demo
            </a>
            <a
              href="#problem"
              className="ml-4 px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 shadow-md"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="mt-20 text-center">
          <a href="#problem" className="inline-block animate-bounce">
            <ChevronDownIcon className="h-10 w-10 text-blue-600" />
          </a>
        </div>
      </div>
    </section>
  );
};
