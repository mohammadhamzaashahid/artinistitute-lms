import { BookOpenCheck, Glasses, Headphones } from "lucide-react";
import Container from "@/components/common/Container";

const features = [
  {
    title: "On-the-go Learning",
    description:
      "Listen to 5-minute audio lessons anytime, anywhere, even with both hands full.",
    icon: Headphones,
    color: "bg-[#f3f8ff] text-[#377dff]",
  },
  {
    title: "Topics You’ll Love",
    description:
      "Explore hundreds of courses covering everything from Health to Psychology.",
    icon: BookOpenCheck,
    color: "bg-[#fff7dd] text-[#e5a900]",
  },
  {
    title: "Taught by the Best",
    description:
      "Each course has been built by industry experts with a knack for teaching.",
    icon: Glasses,
    color: "bg-[#eef5ff] text-[#377dff]",
  },
];

export default function FeatureStrip() {
  return (
    <section className="bg-white pb-20 pt-4 sm:pb-24 lg:pt-8">
      <Container>
        <div className="grid gap-10 sm:grid-cols-3 lg:gap-12">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="text-center">
                <div
                  className={`mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-2xl ${feature.color}`}
                >
                  <Icon className="h-9 w-9 stroke-[1.8]" />
                </div>

                <h3 className="mt-5 text-[18px] font-bold tracking-[-0.02em] text-[#20242a]">
                  {feature.title}
                </h3>

                <p className="mx-auto mt-3 max-w-[360px] text-[16px] leading-7 text-[#66788f]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}