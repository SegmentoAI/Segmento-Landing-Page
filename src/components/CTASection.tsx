import { Form } from "./Form";

export const CTASection = () => {
  return (
    <section id="cta" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent/10 blur-[140px]" />
      <div className="relative">
        <Form />
      </div>
    </section>
  );
};
