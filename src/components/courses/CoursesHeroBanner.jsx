export default function CoursesHeroBanner() {
  return (
    <section className="overflow-hidden rounded-[5px] bg-[#377dff]">
      <div className="relative min-h-[190px] overflow-hidden px-7 py-10 sm:min-h-[210px] sm:px-12 lg:px-14">
        <div className="absolute inset-0 bg-[#3da1f4]" />

        <div className="absolute left-[-6%] top-[26%] h-[130px] w-[115%] rotate-[-1.2deg] rounded-[50%] bg-[#1d71cf]" />

        <div className="absolute bottom-[-35%] left-[-7%] h-[140px] w-[115%] rotate-[1.6deg] rounded-[50%] bg-[#3a7bf6]" />

        <div className="relative z-10 flex min-h-[120px] flex-col justify-center">
          <h1 className="text-[46px] font-bold leading-none tracking-[-0.045em] text-white sm:text-[58px] lg:text-[68px]">
            All courses
          </h1>

          <p className="mt-5 max-w-2xl text-[17px] font-medium leading-7 text-white sm:text-[20px]">
            Choose what you’d like to learn from hundreds of topics.
          </p>
        </div>
      </div>
    </section>
  );
}