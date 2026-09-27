
import Image from "next/image";

export default function BooksHeroBanner() {
  return (
    <section className="overflow-hidden rounded-[5px]">
      <Image
        src="/assets/explore/Books.png"
        alt="Books banner"
        width={1600}
        height={400}
        className="w-full object-cover"
        priority
      />
    </section>
  );
}