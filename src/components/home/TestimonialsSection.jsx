import Container from "@/components/common/Container";
import SectionHeader from "@/components/common/SectionHeader";

const testimonials = [
  {
    name: "Ayesha Khan",
    role: "Student",
    quote:
      "The short audio lessons make learning possible during travel and daily breaks. The experience feels clean and focused.",
  },
  {
    name: "Hamza Ali",
    role: "Professional learner",
    quote:
      "I like that the courses are structured into small lectures. It helps me continue learning without sitting for long sessions.",
  },
  {
    name: "Sara Ahmed",
    role: "Course listener",
    quote:
      "The mobile-first experience is exactly what I need. I can continue a course anytime and follow the lecture list easily.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#fbfdff] py-20 sm:py-24">
      <Container>
        <SectionHeader
          title="Loved by learners"
          description="Simple, focused, and built for people who want to learn anywhere."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-[5px] border border-[#e3eaf3] bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.04)]"
            >
              <p className="text-[16px] leading-7 text-[#66788f]">
                “{testimonial.quote}”
              </p>

              <div className="mt-7 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef5ff] text-sm font-bold text-[#377dff]">
                  {testimonial.name.slice(0, 1)}
                </div>

                <div>
                  <h3 className="font-bold text-[#20242a]">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-[#8a9aad]">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}