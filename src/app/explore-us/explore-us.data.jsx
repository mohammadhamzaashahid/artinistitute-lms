import {
  Building2,
  GraduationCap,
  ShieldCheck,
  Star,
  Newspaper,
  Phone,
  BookOpen,
  Video,
  Briefcase,
  LifeBuoy,
  Users,
  HelpCircle,
  BookMarked,
} from "lucide-react";

export const SECTION_GROUPS = [
  { id: "institute", label: "Institute" },
  { id: "resources", label: "Resources" },
  { id: "support", label: "Support" },
];

// ─── Add / edit sections here ─────────────────────────────────────────────────
// banner: path under /public, or null for the blue gradient fallback.
// body:   any JSX — paragraphs, grids, cards, etc.
export const SECTIONS = [
  // ── Institute ───────────────────────────────────────────────────────────────
  {
    id: "about",
    group: "institute",
    label: "About Us",
    icon: Building2,
    banner: "/assets/explore/About us Banner.png",
    bannerAlt: "About Artin Institute",
    title: "About Artin Institute",
    subtitle: "Empowering learners worldwide with world-class education",
    body: (
      <div className="space-y-4 text-[15px] leading-relaxed text-slate-600">
        <p>
          Artin Institute is a KHDA-certified online learning platform dedicated
          to delivering practical, career-focused education to learners around
          the world. Founded with a passion for accessible education, we bring
          together expert instructors and cutting-edge curriculum to help you
          unlock your full potential.
        </p>
        <p>
          Our courses span creative arts, technology, business, and professional
          development — all designed to fit your schedule and your ambitions.
          Whether you are starting fresh or levelling up an existing career, we
          have a path for you.
        </p>
      </div>
    ),
  },
  {
    id: "instructors",
    group: "institute",
    label: "Our Instructors",
    icon: GraduationCap,
    banner: "/assets/explore/Our Instructors.png",
    bannerAlt: "Our Instructors",
    title: "Meet Our Instructors",
    subtitle: "Learn from the best in the industry",
    body: (
      <div className="space-y-4 text-[15px] leading-relaxed text-slate-600">
        <p>
          Our instructors are seasoned professionals with real-world experience
          in their fields. Each one is hand-picked for their expertise, teaching
          ability, and genuine commitment to student success.
        </p>
        <p>
          From industry veterans to award-winning educators, every Artin
          instructor brings something unique to the table — ensuring you learn
          not just the theory, but the practical skills employers demand.
        </p>
      </div>
    ),
  },
  {
    id: "khda",
    group: "institute",
    label: "KHDA Certification",
    icon: ShieldCheck,
    banner: "/assets/explore/KHDA Certification Banner.png",
    bannerAlt: "KHDA Certification",
    title: "KHDA Certified Excellence",
    subtitle: "Recognised by the Knowledge and Human Development Authority",
    body: (
      <div className="space-y-4 text-[15px] leading-relaxed text-slate-600">
        <p>
          Artin Institute holds certification from the Knowledge and Human
          Development Authority (KHDA), Dubai — the regulatory body overseeing
          education quality in the UAE.
        </p>
        <p>
          This certification is your guarantee of world-class standards,
          accredited programmes, and certificates that are recognised by
          employers and institutions globally.
        </p>
      </div>
    ),
  },
  {
    id: "reviews",
    group: "institute",
    label: "Reviews",
    icon: Star,
    banner: "/assets/explore/Reviews Banner.png",
    bannerAlt: "Student Reviews",
    title: "What Our Students Say",
    subtitle: "Real stories from learners across the globe",
    body: (
      <p className="text-[15px] leading-relaxed text-slate-600">
        Thousands of students have transformed their careers through Artin
        Institute. Read their stories and discover how our courses have made a
        lasting difference in their lives — from landing dream jobs to launching
        their own businesses.
      </p>
    ),
  },
  {
    id: "news",
    group: "institute",
    label: "News & Updates",
    icon: Newspaper,
    banner: null,
    bannerAlt: "News and Updates",
    title: "News & Updates",
    subtitle: "Stay up to date with the latest from Artin Institute",
    body: (
      <p className="text-[15px] leading-relaxed text-slate-600">
        From new course launches to partnership announcements and upcoming
        webinars, this is your hub for everything happening at Artin Institute.
        Check back regularly to stay ahead of the curve.
      </p>
    ),
  },
  {
    id: "contact",
    group: "institute",
    label: "Contact Us",
    icon: Phone,
    banner: "/assets/explore/Contact us Banner.png",
    bannerAlt: "Contact Artin Institute",
    title: "Contact Us",
    subtitle: "Have questions or need assistance? We'd love to hear from you.",
    body: (
      <div className="space-y-6">
        <p className="text-[15px] leading-relaxed text-slate-600">
          Our support team is available to assist you with course enquiries,
          technical issues, billing questions, and everything in between. Reach
          out and we&apos;ll get back to you as quickly as possible.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Email", value: "support@artininstitute.com" },
            { label: "Phone", value: "+971 00 000 0000" },
            { label: "Working Hours", value: "Sun – Thu, 9 am – 6 pm GST" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-[#e6edf5] bg-[#f5f8fc] p-4">
              <p className="mb-1 text-[11px] font-bold tracking-widest text-[#377dff] uppercase">
                {label}
              </p>
              <p className="text-[14px] font-semibold text-slate-700">{value}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // ── Resources ────────────────────────────────────────────────────────────────
  {
    id: "study-guides",
    group: "resources",
    label: "Study Guides",
    icon: BookOpen,
    banner: "/assets/explore/Study Guides Banner.png",
    bannerAlt: "Study Guides",
    title: "Study Guides",
    subtitle: "Structured learning materials to accelerate your progress",
    body: (
      <p className="text-[15px] leading-relaxed text-slate-600">
        Our curated study guides break complex subjects into clear, digestible
        steps. Whether you are preparing for a certification or exploring a new
        field, our guides give you the framework to learn efficiently and
        confidently.
      </p>
    ),
  },
  {
    id: "webinars",
    group: "resources",
    label: "Webinars",
    icon: Video,
    banner: "/assets/explore/Webinnar Banner.png",
    bannerAlt: "Webinars",
    title: "Live Webinars",
    subtitle: "Interactive sessions with industry experts",
    body: (
      <p className="text-[15px] leading-relaxed text-slate-600">
        Join our regularly scheduled live webinars to interact directly with
        industry experts, ask questions in real time, and connect with fellow
        learners. Past webinar recordings are also available on demand for
        enrolled students.
      </p>
    ),
  },
  {
    id: "career-support",
    group: "resources",
    label: "Career Support",
    icon: Briefcase,
    banner: "/assets/explore/career Support Banner.png",
    bannerAlt: "Career Support",
    title: "Career Support",
    subtitle: "Helping you land the job you deserve",
    body: (
      <p className="text-[15px] leading-relaxed text-slate-600">
        From CV reviews and interview coaching to job placement assistance and
        portfolio guidance, our career support team is dedicated to helping you
        turn your new skills into real opportunities. Your success is our
        success.
      </p>
    ),
  },
  {
    id: "learning-support",
    group: "resources",
    label: "Learning Support",
    icon: LifeBuoy,
    banner: "/assets/explore/Learning Support Banner.png",
    bannerAlt: "Learning Support",
    title: "Learning Support",
    subtitle: "We're with you every step of the way",
    body: (
      <p className="text-[15px] leading-relaxed text-slate-600">
        Struggling with a concept or need extra guidance? Our learning support
        team is on hand to help you stay on track. From one-on-one tutor
        sessions to peer study groups, we provide the scaffolding you need to
        succeed.
      </p>
    ),
  },
  {
    id: "student-stories",
    group: "resources",
    label: "Student Stories",
    icon: Users,
    banner: "/assets/explore/Student Stories Banner.png",
    bannerAlt: "Student Stories",
    title: "Student Stories",
    subtitle: "Inspiration from our community of learners",
    body: (
      <p className="text-[15px] leading-relaxed text-slate-600">
        Hear directly from students who have completed our programmes and gone
        on to achieve remarkable things. Their journeys — from career changers
        to entrepreneurs — are proof that the right education can open any door.
      </p>
    ),
  },

  // ── Support ──────────────────────────────────────────────────────────────────
  {
    id: "help",
    group: "support",
    label: "Help Center",
    icon: HelpCircle,
    banner: "/assets/explore/Help Center Banner.png",
    bannerAlt: "Help Center",
    title: "Help Center",
    subtitle: "Find answers and get support fast",
    body: (
      <div className="space-y-4 text-[15px] leading-relaxed text-slate-600">
        <p>
          Our Help Center is packed with articles, tutorials, and FAQs covering
          everything from account setup and course access to billing and
          certificates.
        </p>
        <p>
          Can&apos;t find what you need? Our support team is just a message away
          — available Sunday through Thursday, 9 am to 6 pm GST.
        </p>
      </div>
    ),
  },
  {
    id: "books",
    group: "support",
    label: "Printed Books",
    icon: BookMarked,
    banner: "/assets/explore/Printed Books Banner.png",
    bannerAlt: "Printed Books",
    title: "Printed Books",
    subtitle: "Companion textbooks and reference materials",
    body: (
      <p className="text-[15px] leading-relaxed text-slate-600">
        Complement your online learning with our range of printed books and
        reference materials, carefully selected to deepen your understanding of
        each subject. Available for purchase alongside any course enrolment.
      </p>
    ),
  },
];
