import Image from "next/image";

export default function CoursesHeroBanner() {
  return (
    <section className="overflow-hidden rounded-[5px]">
      <Image
        src="/assets/course-banner/Website Banner.png"
        alt="Courses banner"
        width={1600}
        height={400}
        className="w-full object-cover"
        priority
      />
    </section>
  );
}