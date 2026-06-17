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
  FileText,
  Flag,
  Shield,
  RefreshCcw,
  Sparkles,
  Radio,
  History,
  Flame,
} from "lucide-react";

export const SECTION_GROUPS = [
  { id: "institute", label: "Institute" },
  { id: "resources", label: "Learning" },
  { id: "emirati", label: "Emirati Arabic" },
  { id: "support", label: "Support" },
];

const Paragraphs = ({ children }) => (
  <div className="space-y-4 text-[15px] leading-7 text-slate-600">
    {children}
  </div>
);

const InfoBlock = ({ title, children }) => (
  <div>
    <h3 className="mb-2 text-[16px] font-bold text-slate-800">{title}</h3>
    {children}
  </div>
);
const BulletList = ({ items }) => (
  <ul className="grid gap-2 pl-1 text-[15px] leading-relaxed text-slate-600 sm:grid-cols-2">
    {items.map((item) => (
      <li key={item} className="flex gap-2">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#377dff]" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export const SECTIONS = [
  // ── Institute ───────────────────────────────────────────────────────────────
  {
    id: "about",

    group: "institute",

    label: "About Us",

    icon: Building2,

    banner: "/assets/explore/About Us banner page.png",

    bannerAlt: "About Artin Institute",

    title: "About Artin Institute",

    subtitle: "Learn. Grow. Achieve. Your success starts with Artin Institute.",

    body: (
      <Paragraphs>
        <p>
          Founded in August 2025, Artin Institute is a KHDA-certified online
          learning institute dedicated to providing high-quality education and
          professional training to learners around the world. We believe that
          education should be accessible, flexible, and practical, enabling
          students to develop valuable skills from anywhere, at any time.
        </p>

        <p>
          As a fully online institute, we deliver interactive learning
          experiences through live virtual classes, private coaching sessions,
          group courses, digital learning resources, audiobooks, and educational
          publications. Our goal is to empower students with the knowledge and
          confidence needed to succeed in their personal and professional lives.
        </p>

        <p>
          In addition to instructor-led training, we develop and provide
          educational books, digital learning materials, and audio courses that
          support self-paced learning and help students continue their
          educational journey beyond the classroom.
        </p>

        <p>
          Since our establishment, we have proudly helped numerous students
          achieve their learning objectives through our private and group
          training programs. Our growing community of learners includes
          professionals, students, business owners, and individuals seeking to
          enhance their skills, advance their careers, and expand their
          knowledge.
        </p>

        <InfoBlock title="Our Mission">
          <p>
            Our mission is to provide accessible, high-quality, and practical
            education that empowers individuals to achieve their personal,
            academic, and professional goals. We strive to create engaging
            learning experiences through innovative online teaching methods,
            expert instructors, and industry-relevant content that prepares
            learners for real-world success.
          </p>
        </InfoBlock>

        <InfoBlock title="Our Vision">
          <p>
            Our vision is to become a leading online education provider in the
            UAE and beyond, recognized for excellence in language education,
            technology training, and professional development. We aim to build a
            global learning community where students can continuously develop
            their skills, unlock new opportunities, and thrive in an
            ever-evolving world.
          </p>
        </InfoBlock>

        <InfoBlock title="Why Choose Artin Institute?">
          <BulletList
            items={[
              "KHDA-Certified Training Provider",

              "Flexible Online Learning Environment",

              "Expert and Experienced Instructors",

              "Private and Group Course Options",

              "Practical, Career-Focused Training",

              "Digital Audio Courses and Educational Books",

              "Student-Centered Learning Approach",

              "Diverse Course Portfolio Across Languages and Technology",
            ]}
          />
        </InfoBlock>

        <p>
          At Artin Institute, we are passionate about helping learners succeed.
          Whether you want to master a new language, develop technical
          expertise, explore artificial intelligence, or advance your
          professional skills, we are committed to supporting you every step of
          the way.
        </p>

        <p className="font-semibold text-slate-700">
          Learn. Grow. Achieve. Your success starts with Artin Institute.
        </p>
      </Paragraphs>
    ),
  },
  {
    id: "our-history",
    group: "institute",
    label: "Our History",
    icon: History,
    banner: "/assets/explore/Our History.png",
    bannerAlt: "Our History",
    title: "Our History",
    subtitle: "Empowering learners through knowledge, skills, and opportunity.",

    body: (
      <Paragraphs>
        <p>
          Artin Institute was established in August 2025 with a clear vision: to
          make quality education more accessible through modern online learning.
          From the beginning, our goal has been to provide practical, flexible,
          and professional training that helps students develop valuable skills
          and achieve their personal and career objectives.
        </p>

        <p>
          What started as an online educational initiative quickly grew into a
          learning community serving students from different backgrounds,
          professions, and countries. By combining experienced instructors,
          innovative teaching methods, and accessible digital learning
          resources, Artin Institute has helped learners gain new knowledge and
          build confidence in their abilities.
        </p>

        <p>
          As the institute expanded, we introduced a variety of programs
          covering language education, technology, and professional development.
          Our offerings now include Emirati Arabic, English, Artificial
          Intelligence, Computer Programming, Networking, and other specialized
          training programs designed to meet the evolving needs of today&apos;s
          learners.
        </p>

        <p>
          In addition to live online classes, Artin Institute has developed
          educational books, digital learning materials, audio courses, study
          guides, webinars, and self-paced learning resources to support
          students both inside and outside the virtual classroom.
        </p>

        <p>
          A significant milestone in our journey was obtaining KHDA
          certification (Permit No. 632354), reflecting our commitment to
          maintaining high educational standards and delivering quality learning
          experiences. This achievement strengthened our mission to provide
          trusted and professional educational services to students in the UAE
          and beyond.
        </p>

        <p>
          Today, Artin Institute continues to grow while remaining focused on
          its core values of quality, accessibility, innovation, and student
          success. We are proud of the progress we have made in a short period
          of time and grateful to the students, instructors, and partners who
          have contributed to our journey.
        </p>

        <p>
          As we look to the future, we remain committed to expanding our
          educational offerings, embracing new technologies, and helping even
          more learners achieve their goals through high-quality online
          education.
        </p>

        <p className="font-semibold text-slate-700">
          From our founding in 2025 to today, our mission remains the same:
          empowering learners through knowledge, skills, and opportunity.
        </p>
      </Paragraphs>
    ),
  },
  {
    id: "khda",
    group: "institute",
    label: "KHDA Certification",
    icon: ShieldCheck,
    banner: "/assets/explore/KHDA Certification Banner.png",
    bannerAlt: "KHDA Certification",
    title: "KHDA Certified Training Provider",
    subtitle: "Learn with confidence. Learn with a KHDA-certified institute.",
    body: (
      <Paragraphs>
        <p>
          Artin Institute is proud to be a KHDA-certified educational
          institution in Dubai, operating under Permit Number: 632354.
        </p>

        <p>
          The Knowledge and Human Development Authority (KHDA) is the government
          authority responsible for regulating and overseeing the quality of
          private education and training providers in Dubai. KHDA certification
          demonstrates that an institution meets the required standards for
          educational services, training delivery, and operational excellence.
        </p>

        <p>
          Our KHDA certification reflects our commitment to providing
          high-quality learning experiences, professional training programs, and
          student-focused educational services. It gives our students confidence
          that they are learning from a recognized and approved training
          provider that adheres to established educational standards.
        </p>

        <InfoBlock title="What Our KHDA Certification Means for Students">
          <BulletList
            items={[
              "Training provided by a recognized and approved institution",

              "Commitment to quality education and continuous improvement",

              "Professional and structured learning programs",

              "High standards of student support and service",

              "Transparent and reliable educational practices",

              "Confidence in the credibility and professionalism of the institute",
            ]}
          />
        </InfoBlock>

        <div className="rounded-2xl border border-[#e6edf5] bg-[#f8fafc] p-5">
          <p className="text-[12px] font-bold tracking-widest text-[#377dff] uppercase">
            KHDA Permit Number
          </p>

          <p className="mt-1 text-[18px] font-bold text-slate-800">632354</p>
        </div>

        <p>
          At Artin Institute, we continuously strive to maintain the highest
          standards of educational excellence while helping learners develop
          valuable skills, advance their careers, and achieve their personal
          goals. Our KHDA certification is a reflection of our dedication to
          quality, integrity, and student success.
        </p>

        <p className="font-semibold text-slate-700">
          Learn with confidence. Learn with a KHDA-certified institute.
        </p>
      </Paragraphs>
    ),
  },

  {
    id: "instructors",
    group: "institute",
    label: "Our Instructors",
    icon: GraduationCap,
    banner: "/assets/explore/Our Instructors.png",
    bannerAlt: "Our Instructors",
    title: "Our Instructors",
    subtitle: "Dedicated. Experienced. Passionate. Committed to Your Success.",

    body: (
      <Paragraphs>
        <p>
          At Artin Institute, we believe that exceptional education begins with
          exceptional instructors. Our teaching team consists of highly
          qualified professionals from diverse nationalities and cultural
          backgrounds, bringing a wealth of knowledge, experience, and global
          perspectives to the learning environment.
        </p>

        <p>
          Our instructors are carefully selected based on their academic
          qualifications, professional expertise, teaching abilities, and
          commitment to student success. Many have years of experience teaching
          learners from different backgrounds, skill levels, and age groups,
          both online and in traditional classroom settings.
        </p>

        <p>
          Beyond their qualifications, our instructors are passionate educators
          who genuinely enjoy helping students learn and grow. They understand
          that every learner is unique and adapt their teaching methods to suit
          individual learning styles, goals, and pace.
        </p>

        <InfoBlock title="What Makes Our Instructors Exceptional?">
          <BulletList
            items={[
              "Extensive teaching and industry experience",

              "Strong academic and professional backgrounds",

              "Expertise in language training, technology, and professional development",

              "Student-focused and results-oriented approach",

              "Friendly, patient, and supportive teaching style",

              "Experience working with multicultural learners",

              "Commitment to continuous learning and professional growth",
            ]}
          />
        </InfoBlock>

        <p>
          Our instructors create a positive and encouraging learning environment
          where students feel comfortable asking questions, practicing new
          skills, and building confidence. They are dedicated to providing clear
          explanations, constructive feedback, and ongoing support throughout
          each learner&apos;s educational journey.
        </p>

        <p>
          Whether you are studying a language, exploring artificial
          intelligence, learning computer programming, developing networking
          skills, or pursuing professional development, our instructors are
          committed to helping you achieve your goals and reach your full
          potential.
        </p>

        <p>
          At Artin Institute, education is more than teaching—it is about
          inspiring, motivating, and empowering students to succeed. Our
          instructors take pride in seeing their students progress, gain
          confidence, and achieve meaningful results both personally and
          professionally.
        </p>
      </Paragraphs>
    ),
  },
  {
    id: "reviews",
    group: "institute",
    label: "Reviews",
    icon: Star,
    banner: "/assets/explore/Reviews.png",
    bannerAlt: "Student Reviews",
    title: "Student Reviews & Feedback",
    subtitle:
      "Your feedback drives our improvement. Your success is our greatest achievement.",
    body: (
      <div className="space-y-4 text-[15px] leading-relaxed text-slate-600">
        <p>
          At Artin Institute, student satisfaction is at the heart of everything
          we do. We are proud to have received positive feedback from many of
          our students who have successfully achieved their learning goals
          through our courses, training programs, and educational resources.
        </p>

        <p>
          Our students appreciate the quality of our instruction, the
          flexibility of our online learning environment, the dedication of our
          instructors, and the support they receive throughout their educational
          journey.
        </p>

        <p>
          We highly value feedback from our students and community. Every
          suggestion, comment, and review helps us improve our courses, enhance
          our services, and better meet the needs of our learners.
        </p>

        <p>
          Our commitment to excellence means that we are constantly evaluating
          and refining our programs, learning materials, teaching methods, and
          support services.
        </p>

        <p className="font-semibold text-slate-700">
          Your feedback drives our improvement. Your success is our greatest
          achievement.
        </p>
      </div>
    ),
  },

  {
    id: "contact",

    group: "support",

    label: "Contact Us",

    icon: Phone,

    banner: "/assets/explore/Contact Us.png",

    bannerAlt: "Contact Artin Institute",

    title: "Contact Us",

    subtitle: "Empowering learners through quality online education.",

    body: (
      <Paragraphs>
        <p>Thank you for your interest in Artin Institute.</p>

        <p>
          We are dedicated to providing exceptional support and assistance to
          all current and prospective students. Whether you have questions about
          our courses, enrollment process, learning materials, schedules,
          certifications, or any of our services, our team is always happy to
          help.
        </p>

        <p>
          At Artin Institute, we believe that great education begins with great
          support. That is why we strive to respond to all inquiries promptly
          and provide clear, helpful guidance every step of the way. Whether you
          are interested in Emirati Arabic, English, Artificial Intelligence,
          Computer Programming, Networking, or any of our other training
          programs, we are here to assist you in finding the learning solution
          that best meets your needs.
        </p>

        <p>
          You can contact us by telephone, email, or WhatsApp. Our support team
          is committed to providing friendly, professional, and timely
          assistance to ensure a smooth and enjoyable learning experience.
        </p>

        <InfoBlock title="Get in Touch">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Telephone", value: "+971 4 268 7710" },

              { label: "WhatsApp", value: "+971 54 201 9791" },

              { label: "Email", value: "support@artinstitute.com" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-[#e6edf5] bg-[#f8fafc] p-4"
              >
                <p className="mb-1 text-[11px] font-bold tracking-widest text-[#377dff] uppercase">
                  {label}
                </p>

                <p className="text-[14px] font-semibold text-slate-700">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </InfoBlock>

        <p>
          We welcome inquiries from students, professionals, businesses, and
          organizations from around the world. Whether you are looking to
          develop new skills, advance your career, or learn a new language, our
          team is ready to help you get started.
        </p>

        <p>
          Thank you for choosing Artin Institute. We look forward to hearing
          from you and supporting you throughout your learning journey.
        </p>

        <p className="font-semibold text-slate-700">
          Artin Institute — Empowering learners through quality online
          education.
        </p>
      </Paragraphs>
    ),
  },

  {
    id: "news",
    group: "resources",
    label: "News & Updates",
    icon: Newspaper,
    banner: "/assets/explore/News&Updates.png",
    bannerAlt: "News and Updates",
    title: "News & Updates",
    subtitle:
      "Follow us, stay informed, and continue learning with Artin Institute.",

    body: (
      <Paragraphs>
        <p>
          Stay connected with Artin Institute and be the first to know about our
          latest announcements, new course launches, special offers, educational
          resources, webinars, and upcoming events.
        </p>

        <p>
          We regularly share important updates to keep our students and
          community informed about everything happening at the institute.
          Whether it&apos;s a new training program, learning opportunity,
          student success story, or exciting development, you&apos;ll find the
          latest information right here.
        </p>

        <p>
          We also share updates through our social media channels and WhatsApp
          communications, ensuring that our students never miss important news,
          promotions, or educational content.
        </p>

        <p>
          We encourage you to follow our social media pages and stay connected
          with our growing learning community. By staying informed, you&apos;ll
          gain access to valuable learning tips, industry insights, course
          announcements, and exclusive opportunities available to our students.
        </p>

        <p>
          Thank you for being part of the Artin Institute community. We look
          forward to sharing our journey, achievements, and exciting updates
          with you.
        </p>
      </Paragraphs>
    ),
  },

  // ── Resources ────────────────────────────────────────────────────────────────
  {
    id: "study-guides",
    group: "resources",
    label: "Study Guides",
    icon: BookOpen,
    banner: "/assets/explore/Study Guides.png",
    bannerAlt: "Study Guides",
    title: "Study Guides",
    subtitle:
      "Study smarter, learn faster, and achieve more with Artin Institute.",
    body: (
      <div className="space-y-5 text-[15px] leading-relaxed text-slate-600">
        <p>
          At Artin Institute, we understand that successful learning requires
          the right resources and guidance. Our Study Guides are designed to
          help students learn more effectively, stay organized, and make steady
          progress toward their educational goals.
        </p>

        <p>
          Our study guides provide structured learning support, practical tips,
          recommended learning strategies, and additional resources to
          complement our courses.
        </p>

        <p>
          Whether you are studying Emirati Arabic, English, Artificial
          Intelligence, Computer Programming, Networking, or any of our other
          training programs, these guides can help you maximize your learning
          experience.
        </p>

        <div className="rounded-2xl border border-[#e6edf5] bg-[#f8fafc] p-5">
          <h3 className="mb-3 text-[16px] font-bold text-slate-800">
            Benefits of Our Study Guides
          </h3>

          <BulletList
            items={[
              "Structured learning pathways",
              "Practical study tips and techniques",
              "Additional learning resources",
              "Guidance for self-paced learning",
              "Improved retention and understanding",
              "Support for exam and assessment preparation",
              "Strategies to help students stay motivated and focused",
            ]}
          />
        </div>

        <p>
          Whether you are just beginning your learning journey or looking to
          advance your existing skills, our study guides are here to support
          your success every step of the way.
        </p>
      </div>
    ),
  },
  {
    id: "webinars",

    group: "resources",

    label: "Webinars",

    icon: Video,

    banner: "/assets/explore/Webinnar Banner.png",

    bannerAlt: "Webinars",

    title: "Webinars",

    subtitle: "Learn, interact, and grow with Artin Institute webinars.",

    body: (
      <div className="space-y-5 text-[15px] leading-relaxed text-slate-600">
        <p>
          At Artin Institute, we regularly organize educational webinars
          designed to help learners improve their skills, gain valuable
          knowledge, and stay connected with our learning community.
        </p>

        <p>
          Our webinars provide an excellent opportunity for students and
          prospective learners to experience our teaching approach, interact
          with instructors, and learn useful tips and techniques in a live
          online environment.
        </p>

        <p>
          We frequently host webinars related to our language programs,
          including Emirati Arabic and English language courses, covering topics
          such as pronunciation, conversation skills, vocabulary building,
          grammar, cultural understanding, and effective communication
          techniques.
        </p>

        <div className="rounded-2xl border border-[#e6edf5] bg-[#f8fafc] p-5">
          <h3 className="mb-3 text-[16px] font-bold text-slate-800">
            What You Can Expect From Our Webinars
          </h3>

          <BulletList
            items={[
              "Live online learning sessions",

              "Language learning tips and strategies",

              "Emirati Arabic conversation practice",

              "English communication skills development",

              "Interactive question-and-answer sessions",

              "Guidance from experienced instructors",

              "Updates on new courses and learning opportunities",
            ]}
          />
        </div>

        <p>
          We regularly announce upcoming webinars through our website, WhatsApp,
          and social media channels, so be sure to stay connected and join us
          for future events.
        </p>
      </div>
    ),
  },
  {
    id: "learning-path",
    group: "resources",
    label: "Learning Path",
    icon: BookMarked,
    banner: "/assets/explore/Your Learning Path.png",
    bannerAlt: "Learning Path",
    title: "Learning Path",
    subtitle:
      "Start your journey. Follow your path. Achieve your goals with Artin Institute.",
    body: (
      <Paragraphs>
        <p>
          At Artin Institute, we believe that successful learning is achieved
          through a clear and structured pathway. Our Learning Path is designed
          to guide students step by step, helping them progress from
          foundational concepts to advanced skills with confidence and clarity.
        </p>

        <p>
          Whether you are learning a new language, exploring Artificial
          Intelligence, studying Computer Programming, developing Networking
          skills, or participating in professional development programs, our
          courses are carefully organized to support continuous growth and
          measurable progress.
        </p>

        <InfoBlock title="A Structured Approach to Learning">
          <p className="mb-3">
            Our learning pathways are designed to help students:
          </p>

          <BulletList
            items={[
              "Build a strong foundation of knowledge",

              "Progress through clearly defined levels",

              "Develop practical and real-world skills",

              "Track their learning achievements",

              "Gain confidence as they advance",

              "Achieve personal and professional goals",
            ]}
          />
        </InfoBlock>

        <p>
          Each course level is designed to prepare students for the next stage
          of learning, ensuring a smooth and effective educational journey.
        </p>

        <InfoBlock title="Learn at Your Own Pace">
          <p className="mb-3">
            Every student has different goals, experience levels, and learning
            styles. Our flexible online learning environment allows students to
            follow a learning path that matches their individual needs.
          </p>

          <p className="mb-3">Students can benefit from:</p>

          <BulletList
            items={[
              "Private one-to-one training",

              "Interactive group classes",

              "Self-paced learning resources",

              "Audio courses and educational materials",

              "Instructor guidance and support",

              "Practice activities and assessments",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="Continuous Progress and Development">
          <p>
            Learning is a journey, not a destination. Our goal is to help
            students continuously develop their knowledge, skills, and
            confidence through structured learning experiences and ongoing
            support.
          </p>
        </InfoBlock>

        <p>
          Whether you are starting as a beginner or advancing toward higher
          levels of expertise, Artin Institute provides the guidance, resources,
          and support needed to help you succeed.
        </p>

        <InfoBlock title="Your Journey Starts Here">
          <p>
            No matter where you are today, there is a path forward. Our Learning
            Path is designed to help you move from learning fundamentals to
            achieving mastery, one step at a time.
          </p>
        </InfoBlock>

        <p>
          With expert instructors, practical learning materials, and a
          supportive educational environment, Artin Institute is committed to
          helping you reach your full potential.
        </p>

        <p className="font-semibold text-slate-700">
          Start your journey. Follow your path. Achieve your goals with Artin
          Institute.
        </p>
      </Paragraphs>
    ),
  },

  {
    id: "books",
    group: "resources",
    label: "Books",
    icon: BookMarked,
    banner: "/assets/explore/Books.png",
    bannerAlt: "Books",
    title: "Books",
    subtitle:
      "Learn anytime. Study anywhere. Grow with Artin Institute publications.",

    body: (
      <Paragraphs>
        <p>
          At Artin Institute, we are committed to creating high-quality
          educational resources that support learners both inside and outside
          the classroom. As part of this commitment, we have developed a growing
          collection of books designed to help students learn more effectively
          and achieve their educational goals.
        </p>

        <p>
          Our books cover a variety of subjects and are carefully created to
          provide practical, engaging, and easy-to-follow learning experiences.
          Whether you are studying a language, developing professional skills,
          or exploring new areas of knowledge, our publications are designed to
          support your learning journey.
        </p>

        <p>
          Many of our books are available for purchase directly through our
          website and can be used as standalone learning resources or as
          valuable companions to our courses and training programs.
        </p>

        <InfoBlock title="Books with Audio Support">
          <p>
            Some of our books include accompanying audio files that allow
            students to listen to lessons, dialogues, vocabulary, pronunciation
            examples, and other learning materials while following along with
            the text. This combination of reading and listening helps improve
            comprehension, pronunciation, retention, and overall learning
            effectiveness.
          </p>

          <p className="mt-3 mb-3">Depending on the publication, books may:</p>

          <BulletList
            items={[
              "Include downloadable audio files",

              "Provide access to online audio content",

              "Contain listening exercises and dialogues",

              "Offer pronunciation practice materials",

              "Be available with or without audio support",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="Designed for Effective Learning">
          <p>
            Our educational materials are developed with a focus on practical
            learning and student success. We continuously work to improve and
            expand our collection of books to meet the needs of modern learners.
          </p>

          <p className="mt-3">
            Whether you are studying independently or alongside one of our
            courses, our books are designed to provide clear explanations,
            structured learning pathways, and valuable educational content that
            helps you progress with confidence.
          </p>
        </InfoBlock>

        <p>
          We invite you to explore our growing collection of books and discover
          resources that can support your personal, academic, and professional
          development.
        </p>

        <p className="font-semibold text-slate-700">
          Learn anytime. Study anywhere. Grow with Artin Institute publications.
        </p>
      </Paragraphs>
    ),
  },
  {
    id: "learning-support",
    group: "support",
    label: "Learning Support",
    icon: LifeBuoy,
    banner: "/assets/explore/Learning Support Banner.png",
    bannerAlt: "Learning Support",
    title: "Learning Support",
    subtitle:
      "Learn with confidence, knowing that our team is here to support you every step of the way.",
    body: (
      <Paragraphs>
        <p>
          At Artin Institute, we believe that learning does not end when a class
          finishes. We are committed to providing continuous support to our
          students throughout their educational journey, helping them stay
          motivated, confident, and on track to achieve their goals.
        </p>

        <p>
          Our students have access to both private one-to-one classes and group
          learning sessions, allowing them to choose the learning format that
          best suits their needs and schedule. Whether you prefer personalized
          instruction or learning alongside other students, our instructors are
          available to guide and support you every step of the way.
        </p>

        <p>
          We understand that every learner progresses at a different pace. That
          is why our instructors take the time to answer questions, provide
          explanations, offer constructive feedback, and ensure that students
          fully understand the topics being covered.
        </p>

        <InfoBlock title="Our learning support services include">
          <BulletList
            items={[
              "Live online private classes",

              "Interactive group classes",

              "Instructor guidance and mentoring",

              "Academic and course-related support",

              "Practice exercises and learning resources",

              "Progress monitoring and feedback",

              "Assistance with learning challenges and questions",
            ]}
          />
        </InfoBlock>

        <p>
          Our friendly and experienced instructors are dedicated to creating a
          supportive learning environment where students feel comfortable asking
          questions, practicing new skills, and building confidence.
        </p>

        <p>
          Whether you are studying Emirati Arabic, English, Artificial
          Intelligence, Computer Programming, Networking, or any of our other
          courses, our goal is to provide the guidance and support you need to
          succeed.
        </p>

        <p>
          At Artin Institute, your success is our priority. We are committed to
          helping you learn effectively, overcome challenges, and reach your
          full potential through continuous support and personalized learning
          assistance.
        </p>

        <p className="font-semibold text-slate-700">
          Learn with confidence, knowing that our team is here to support you
          every step of the way.
        </p>
      </Paragraphs>
    ),
  },
  {
    id: "student-stories",
    group: "resources",
    label: "Student Stories",
    icon: Users,
    banner: "/assets/explore/Student Stories.png",
    bannerAlt: "Student Stories",
    title: "Student Stories",
    subtitle: "Your journey could be our next success story.",

    body: (
      <div className="space-y-4 text-[15px] leading-relaxed text-slate-600">
        <p>
          Every student has a unique learning journey, and at Artin Institute,
          we are proud to be part of those success stories.
        </p>

        <p>
          Our students come from different countries, backgrounds, professions,
          and age groups, but they all share one common goal: the desire to
          learn, grow, and achieve more.
        </p>

        <p>
          The Student Stories section celebrates the achievements and
          experiences of our learners. Here, we share inspiring stories from
          students who have completed courses, reached important milestones,
          overcome challenges, and achieved meaningful results through their
          studies at Artin Institute.
        </p>

        <p>
          Whether learning Emirati Arabic to better connect with the local
          culture, improving English communication skills, exploring Artificial
          Intelligence, mastering programming concepts, or developing
          professional expertise, our students continue to demonstrate what is
          possible through commitment and continuous learning.
        </p>

        <p className="font-semibold text-slate-700">
          Every success story begins with a single step. Your journey could be
          our next success story.
        </p>
      </div>
    ),
  },

  {
    id: "uae-national-day",
    group: "emirati",
    label: "UAE National Day",
    icon: Flag,
    banner: "/assets/explore/UAE National Day.png",
    bannerAlt: "UAE National Day",
    title: "UAE National Day",
    subtitle:
      "Celebrate the history. Honor the heritage. Discover the spirit of the United Arab Emirates.",
    body: (
      <div className="space-y-5 text-[15px] leading-relaxed text-slate-600">
        <p>
          UAE National Day is one of the most important and celebrated occasions
          in the United Arab Emirates. It commemorates the historic unification
          of the Emirates and the founding of the UAE.
        </p>

        <p>
          Every year, UAE National Day brings together citizens, residents, and
          visitors to celebrate the country&apos;s achievements, heritage,
          leadership, and remarkable journey.
        </p>

        <div>
          <h3 className="mb-3 text-[16px] font-bold text-slate-800">
            The History of UAE National Day
          </h3>

          <p>
            On 2 December 1971, the United Arab Emirates was officially
            established through the union of six Emirates. Shortly afterward,
            Ras Al Khaimah joined the federation, completing the seven Emirates
            that form the UAE today.
          </p>
        </div>

        <BulletList
          items={[
            "Abu Dhabi",

            "Dubai",

            "Sharjah",

            "Ajman",

            "Umm Al Quwain",

            "Fujairah",

            "Ras Al Khaimah",
          ]}
        />

        <div>
          <h3 className="mb-3 text-[16px] font-bold text-slate-800">
            How UAE National Day Is Celebrated
          </h3>

          <BulletList
            items={[
              "Fireworks displays",

              "Cultural performances",

              "Traditional music and dance",

              "National parades",

              "Family gatherings",

              "Community events",

              "Heritage exhibitions",

              "Special activities in schools, malls, and public spaces",
            ]}
          />
        </div>

        <p>
          For students learning Emirati Arabic and exploring Emirati culture,
          UAE National Day offers valuable insight into the history, values, and
          identity of the nation.
        </p>

        <p className="font-semibold text-slate-700">
          UAE National Day is a celebration of unity, heritage, progress, and
          hope for the future.
        </p>
      </div>
    ),
  },

  {
    id: "why learn-emirati-arabic",
    group: "emirati",
    label: "Why Emirati Arabic Is Important in UAE",
    icon: Flag,
    banner: "/assets/explore/whyearabic.png",
    bannerAlt: "UAE National Day",
    title: "UAE National Day",
    subtitle:
      "Celebrate the history. Honor the heritage. Discover the spirit of the United Arab Emirates.",
    body: (
      <div className="space-y-5 text-[15px] leading-relaxed text-slate-600">
        <p>
          UAE National Day is one of the most important and celebrated occasions
          in the United Arab Emirates. It commemorates the historic unification
          of the Emirates and the founding of the UAE.
        </p>

        <p>
          Every year, UAE National Day brings together citizens, residents, and
          visitors to celebrate the country&apos;s achievements, heritage,
          leadership, and remarkable journey.
        </p>

        <div>
          <h3 className="mb-3 text-[16px] font-bold text-slate-800">
            The History of UAE National Day
          </h3>

          <p>
            On 2 December 1971, the United Arab Emirates was officially
            established through the union of six Emirates. Shortly afterward,
            Ras Al Khaimah joined the federation, completing the seven Emirates
            that form the UAE today.
          </p>
        </div>

        <BulletList
          items={[
            "Abu Dhabi",

            "Dubai",

            "Sharjah",

            "Ajman",

            "Umm Al Quwain",

            "Fujairah",

            "Ras Al Khaimah",
          ]}
        />

        <div>
          <h3 className="mb-3 text-[16px] font-bold text-slate-800">
            How UAE National Day Is Celebrated
          </h3>

          <BulletList
            items={[
              "Fireworks displays",

              "Cultural performances",

              "Traditional music and dance",

              "National parades",

              "Family gatherings",

              "Community events",

              "Heritage exhibitions",

              "Special activities in schools, malls, and public spaces",
            ]}
          />
        </div>

        <p>
          For students learning Emirati Arabic and exploring Emirati culture,
          UAE National Day offers valuable insight into the history, values, and
          identity of the nation.
        </p>

        <p className="font-semibold text-slate-700">
          UAE National Day is a celebration of unity, heritage, progress, and
          hope for the future.
        </p>
      </div>
    ),
  },

  {
    id: "terms-of-use",
    group: "support",
    label: "Terms of Use",
    icon: FileText,
    banner: "/assets/explore/Terms of Use.png",
    bannerAlt: "Terms of Use",
    title: "Terms of Use",
    subtitle: "Effective Date: June 2026",
    body: (
      <div className="space-y-5 text-[15px] leading-relaxed text-slate-600">
        <p>
          Welcome to Artin Institute. By accessing or using our website,
          courses, digital products, educational materials, and services, you
          agree to comply with and be bound by the following Terms of Use.
        </p>

        {[
          {
            title: "Acceptance of Terms",

            text: "By accessing our website, enrolling in our courses, purchasing our products, or using any services provided by Artin Institute, you acknowledge that you have read, understood, and agreed to these Terms of Use.",
          },

          {
            title: "User Accounts",

            text: "Users are responsible for maintaining the confidentiality of their account information and are responsible for all activities that occur under their account. Artin Institute reserves the right to suspend or terminate accounts that violate these Terms of Use.",
          },

          {
            title: "Educational Services",

            text: "Artin Institute strives to provide accurate, professional, and high-quality educational services. However, we do not guarantee specific educational, professional, financial, or career outcomes.",
          },

          {
            title: "Payments and Refunds",

            text: "All purchases and enrollments are subject to our Refund Policy. By making a purchase, you agree to the terms outlined in our Refund Policy.",
          },

          {
            title: "Limitation of Liability",

            text: "Artin Institute shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from the use of our website, educational materials, or services.",
          },

          {
            title: "Changes to Terms",

            text: "We reserve the right to amend these Terms of Use at any time. Updated versions will be posted on this page and will become effective immediately upon publication.",
          },
        ].map((item) => (
          <div key={item.title}>
            <h3 className="mb-1 text-[16px] font-bold text-slate-800">
              {item.title}
            </h3>

            <p>{item.text}</p>
          </div>
        ))}

        <div className="rounded-2xl border border-[#e6edf5] bg-[#f8fafc] p-5">
          <h3 className="mb-3 text-[16px] font-bold text-slate-800">
            Restrictions on Use
          </h3>

          <BulletList
            items={[
              "Copy, reproduce, distribute, or republish any content",

              "Upload course materials to websites, social media platforms, or file-sharing services",

              "Share, sell, transfer, or sublicense any course content to third parties",

              "Record, duplicate, or redistribute live classes or webinars",

              "Publish any part of our educational materials on the internet",

              "Modify, adapt, or create derivative works based on our content",

              "Use our content for commercial purposes",
            ]}
          />
        </div>
      </div>
    ),
  },

  // ── Support ──────────────────────────────────────────────────────────────────
  {
    id: "popular-courses",
    group: "resources",
    label: "Popular Courses",
    icon: Flame,
    banner: "/assets/explore/Popular Courses.png",
    bannerAlt: "Popular Courses",
    title: "Popular Courses",
    subtitle:
      "Join our most popular courses and take the next step toward your future success.",
    body: (
      <Paragraphs>
        <p>
          Discover some of the most popular and highly rated courses offered by
          Artin Institute. These programs have helped students from diverse
          backgrounds develop valuable skills, improve their knowledge, and
          achieve their personal and professional goals.
        </p>
        <p>
          Our popular courses are chosen by learners who are looking for
          practical, flexible, and high-quality training delivered by
          experienced instructors in a supportive online learning environment.
        </p>
        <InfoBlock title="Courses Students Love">
          <p className="mb-3">Our most popular programs include:</p>
          <BulletList
            items={[
              "Emirati Arabic Language Courses",
              "English Language Courses",
              "Artificial Intelligence (AI) Training",
              "Computer Programming Courses",
              "Networking and IT Training",
              "Professional Development Programs",
              "Private One-to-One Training",
              "Group Learning Programs",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="Why Students Choose These Courses">
          <p className="mb-3">
            Students consistently choose our popular courses because they offer:
          </p>

          <BulletList
            items={[
              "Structured and easy-to-follow learning paths",

              "Experienced and supportive instructors",

              "Flexible online learning options",

              "Practical and career-focused content",

              "Interactive learning experiences",

              "Access to additional educational resources",

              "Opportunities for continuous skill development",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="Learning That Delivers Results">
          <p>
            Our popular courses are designed to help students gain confidence,
            improve performance, and build skills that are relevant in
            today&apos;s world. Whether your goal is to learn a new language,
            enhance your technical expertise, or advance your career, these
            programs provide a strong foundation for success.
          </p>
        </InfoBlock>

        <InfoBlock title="Find the Right Course for You">
          <p>
            Whether you are a beginner starting a new learning journey or an
            experienced professional looking to expand your expertise, our
            popular courses offer something for everyone.
          </p>
        </InfoBlock>
      </Paragraphs>
    ),
  },
  {
    id: "new-arrivals",
    group: "resources",
    label: "New Arrivals",
    icon: Sparkles,
    banner: "/assets/explore/New Arrivals.png",
    bannerAlt: "New Arrivals",
    title: "New Arrivals",
    subtitle: "Explore our newest additions from Artin Institute.",
    body: (
      <Paragraphs>
        <p>
          Welcome to our New Arrivals section, where you can discover the latest
          courses, educational resources, books, audio programs, and learning
          materials recently added to Artin Institute.
        </p>

        <p>
          At Artin Institute, we are committed to continuously expanding and
          improving our educational offerings. As industries evolve and learner
          needs change, we regularly update our content to ensure that students
          have access to the most relevant, practical, and up-to-date learning
          resources available.
        </p>

        <InfoBlock title="Always Growing, Always Improving">
          <p>
            Our team constantly develops new lessons, training materials, study
            resources, and educational programs to help students stay ahead in
            today&apos;s rapidly changing world. We listen carefully to student
            feedback, monitor learning trends, and identify the skills that are
            most in demand.
          </p>
        </InfoBlock>

        <InfoBlock title="Courses Driven by Student Demand">
          <p>
            Many of the new courses added to our platform are based on the
            topics and skills most requested by our students and learning
            community. We carefully evaluate market trends and learner interests
            to ensure that our course offerings remain relevant, practical, and
            valuable.
          </p>
        </InfoBlock>

        <InfoBlock title="What You'll Find in New Arrivals">
          <BulletList
            items={[
              "Newly launched courses",

              "Updated learning materials",

              "New educational books and publications",

              "Audio learning programs",

              "Webinars and special training sessions",

              "Additional study resources and guides",

              "New language and technology programs",
            ]}
          />
        </InfoBlock>

        <p>
          At Artin Institute, learning never stands still. We are constantly
          creating, improving, and expanding our educational resources to help
          our students succeed.
        </p>
      </Paragraphs>
    ),
  },
  {
    id: "live-online-classes",

    group: "resources",

    label: "Live Online Classes",

    icon: Radio,

    banner: "/assets/explore/Live Online Classes.png",

    bannerAlt: "Live Online Classes",

    title: "Live Online Classes",

    subtitle:
      "Learn live. Interact with experts. Achieve your goals with Artin Institute.",

    body: (
      <Paragraphs>
        <p>
          At Artin Institute, we believe that interactive learning creates the
          best educational experience. Our Live Online Classes allow students to
          learn directly from experienced instructors in a real-time virtual
          classroom environment, regardless of their location.
        </p>

        <p>
          Through our live sessions, students can actively participate in
          lessons, ask questions, receive immediate feedback, and engage with
          instructors and fellow learners just as they would in a traditional
          classroom setting.
        </p>

        <InfoBlock title="Learn from Anywhere">
          <p className="mb-3">
            Our live online classes are designed to provide maximum flexibility
            and convenience. Whether you are studying from home, the office, or
            while traveling, you can join your classes from anywhere with an
            internet connection.
          </p>

          <BulletList
            items={[
              "Emirati Arabic Language Courses",

              "English Language Courses",

              "Artificial Intelligence (AI)",

              "Computer Programming",

              "Networking and IT Training",

              "Professional Development Courses",

              "Private One-to-One Classes",

              "Group Learning Sessions",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="Interactive and Engaging Learning">
          <p className="mb-3">
            Our instructors use modern teaching methods to create engaging and
            effective learning experiences. Students are encouraged to
            participate, ask questions, complete activities, and practice their
            skills in a supportive learning environment.
          </p>

          <BulletList
            items={[
              "Real-time interaction with instructors",

              "Immediate feedback and guidance",

              "Structured learning experience",

              "Opportunities for discussion and collaboration",

              "Flexible learning from any location",

              "Access to experienced and qualified trainers",

              "Supportive and engaging classroom environment",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="Private and Group Learning Options">
          <p>
            Students can choose between private one-to-one classes for
            personalized instruction or group classes that offer a collaborative
            learning experience with other students.
          </p>
        </InfoBlock>

        <InfoBlock title="Your Learning Journey Starts Here">
          <p>
            Whether you are learning a new language, developing technical
            skills, or advancing your professional knowledge, our live online
            classes provide the structure, interaction, and support needed to
            help you succeed.
          </p>
        </InfoBlock>
      </Paragraphs>
    ),
  },
  {
    id: "refund-policy",

    group: "support",

    label: "Refund Policy",

    icon: RefreshCcw,

    banner: "/assets/explore/Privacy Policy.png",

    bannerAlt: "Refund Policy",

    title: "Refund Policy",

    subtitle:
      "All payments made to Artin Institute are final and non-refundable.",

    body: (
      <Paragraphs>
        <p>
          At Artin Institute, we are committed to delivering high-quality
          educational services, online training programs, digital learning
          materials, and professional development opportunities. We encourage
          all students to carefully review course descriptions, learning
          objectives, schedules, and requirements before completing their
          enrollment or purchase.
        </p>

        <p>
          Due to the nature of our educational services and the immediate access
          provided to course materials, digital content, learning resources, and
          training programs, all payments made to Artin Institute are final and
          non-refundable.
        </p>

        <p>
          Once a student has enrolled in a course, registered for a training
          program, purchased digital content, or made any payment for services
          offered by Artin Institute, no refunds, cancellations, credits, or
          exchanges will be provided.
        </p>

        <InfoBlock title="This policy applies to all products and services offered by Artin Institute, including but not limited to:">
          <BulletList
            items={[
              "Online courses and training programs",

              "Private one-to-one classes",

              "Group classes and workshops",

              "Digital audio courses",

              "E-books and downloadable materials",

              "Study guides and educational resources",

              "Webinars and special training events",

              "Registration, enrollment, and administrative fees",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="Student Acknowledgement">
          <p>
            By completing a purchase or enrolling in any course or program
            offered by Artin Institute, the student acknowledges that they have
            reviewed the relevant course information and agree to the terms of
            this Refund Policy.
          </p>
        </InfoBlock>

        <InfoBlock title="Course Access and Digital Products">
          <p>
            Many of our services include immediate access to proprietary
            educational content, digital resources, and intellectual property.
            For this reason, refunds cannot be granted once access has been
            provided, regardless of the extent to which the materials have been
            used or completed.
          </p>
        </InfoBlock>

        <InfoBlock title="Exceptional Circumstances">
          <p>
            Any request for consideration outside the terms of this policy shall
            be reviewed solely at the discretion of Artin Institute. Any review
            of exceptional circumstances does not create an obligation to issue
            a refund, credit, or compensation.
          </p>
        </InfoBlock>

        <InfoBlock title="Policy Changes">
          <p>
            Artin Institute reserves the right to amend or update this Refund
            Policy at any time. Any changes will be published on this page and
            will become effective immediately upon posting.
          </p>
        </InfoBlock>
      </Paragraphs>
    ),
  },

  {
    id: "privacy-policy",
    group: "support",
    label: "Privacy Policy",
    icon: Shield,
    banner: "/assets/explore/Contact Us.png",
    bannerAlt: "Privacy Policy",
    title: "Privacy Policy",
    subtitle: "Effective Date: June 2026",
    body: (
      <Paragraphs>
        <p>
          At Artin Institute, we are committed to protecting the privacy and
          personal information of our students, website visitors, and customers.
          This Privacy Policy explains how we collect, use, store, and protect
          your information when you visit our website, enroll in our courses,
          purchase our products, or interact with our services.
        </p>
        <p>
          By using our website and services, you agree to the practices
          described in this Privacy Policy.
        </p>
        <InfoBlock title="Information We Collect">
          <p className="mb-3">
            We may collect personal information that you voluntarily provide to
            us, including:
          </p>
          <BulletList
            items={[
              "Full name",

              "Email address",

              "Telephone number",

              "WhatsApp number",

              "Billing and payment information",

              "Course enrollment information",

              "Communication preferences",

              "Any information submitted through contact forms, registration forms, or support requests",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="Technical Information">
          <p className="mb-3">
            We may also collect certain technical information automatically when
            you visit our website, including:
          </p>

          <BulletList
            items={[
              "IP address",

              "Browser type and version",

              "Device information",

              "Website usage data",

              "Pages visited and time spent on the website",

              "Cookies and similar technologies",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="How We Use Your Information">
          <BulletList
            items={[
              "Process course registrations and enrollments",

              "Deliver educational services and learning materials",

              "Provide customer support",

              "Respond to inquiries and requests",

              "Communicate important course updates and announcements",

              "Improve our website, services, and user experience",

              "Process payments and transactions",

              "Comply with legal and regulatory obligations",

              "Send promotional information about courses, events, and educational opportunities where permitted",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="Protection of Your Information">
          <p>
            We take reasonable administrative, technical, and organizational
            measures to protect your personal information against unauthorized
            access, misuse, disclosure, alteration, or destruction.
          </p>
        </InfoBlock>

        <InfoBlock title="Sharing of Information">
          <p className="mb-3">
            Artin Institute does not sell, rent, or trade personal information
            to third parties. We may share information only when necessary to:
          </p>

          <BulletList
            items={[
              "Provide educational services",

              "Process payments",

              "Comply with legal obligations",

              "Protect the rights, property, or safety of Artin Institute, our students, or others",

              "Work with trusted service providers who assist in operating our website and services",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="Cookies and Website Analytics">
          <p>
            Our website may use cookies and similar technologies to improve
            functionality, enhance user experience, and analyze website
            performance. For more information, please refer to our Cookie
            Policy.
          </p>
        </InfoBlock>

        <InfoBlock title="Student Communications">
          <p>
            By providing your contact information, you may receive
            communications from Artin Institute regarding course updates,
            enrollment information, educational content, service announcements,
            and promotional offers. You may opt out of marketing communications
            at any time.
          </p>
        </InfoBlock>

        <InfoBlock title="Third-Party Websites">
          <p>
            Our website may contain links to third-party websites or services.
            Artin Institute is not responsible for the privacy practices or
            content of external websites.
          </p>
        </InfoBlock>

        <InfoBlock title="Children's Privacy">
          <p>
            Our services are not intended for children under the age required by
            applicable law without parental or guardian consent. We do not
            knowingly collect personal information from children without
            appropriate authorization.
          </p>
        </InfoBlock>

        <InfoBlock title="Updates to This Policy">
          <p>
            Artin Institute reserves the right to modify or update this Privacy
            Policy at any time. Any changes will be published on this page and
            become effective immediately upon posting.
          </p>
        </InfoBlock>
      </Paragraphs>
    ),
  },
  {
    id: "help",
    group: "support",
    label: "Help Center",
    icon: HelpCircle,
    banner: "/assets/explore/Help center.png",
    bannerAlt: "Help Center",
    title: "Help Center",
    subtitle:
      "Need help? Contact us today and our team will be happy to assist you.",
    body: (
      <Paragraphs>
        <p>Welcome to the Artin Institute Help Center.</p>
        <p>
          Our Help Center is designed to provide quick answers, guidance, and
          support for students, prospective learners, and website visitors.
          Whether you have questions about our courses, enrollment process,
          payments, learning materials, certificates, or technical issues, we
          are here to help.
        </p>
        <p>
          At Artin Institute, we are committed to making your learning
          experience as smooth and enjoyable as possible. Our support team works
          closely with students to ensure they receive the assistance they need
          throughout their educational journey.
        </p>

        <InfoBlock title="How Can We Help?">
          <p className="mb-3">Our team can assist you with:</p>

          <BulletList
            items={[
              "Course information and recommendations",

              "Enrollment and registration support",

              "Access to online classes and learning materials",

              "Audio course and digital product assistance",

              "Account and login issues",

              "Payment and billing inquiries",

              "Certificate and course completion questions",

              "Technical support and troubleshooting",

              "General student support and guidance",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="Frequently Asked Questions">
          <p>
            Before contacting us, you may find answers to common questions
            regarding course access, schedules, learning resources, and student
            services throughout our website.
          </p>

          <p className="mt-3">
            If you cannot find the information you need, our support team will
            be happy to assist you directly.
          </p>
        </InfoBlock>

        <InfoBlock title="Contact Our Support Team">
          <p className="mb-4">
            You can reach us through any of the following channels:
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Telephone", value: "+971 4 268 7710" },

              { label: "WhatsApp", value: "+971 54 201 9791" },

              { label: "Email", value: "support@artinstitute.com" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-[#e6edf5] bg-[#f8fafc] p-4"
              >
                <p className="mb-1 text-[11px] font-bold tracking-widest text-[#377dff] uppercase">
                  {label}
                </p>

                <p className="text-[14px] font-semibold text-slate-700">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4">
            Our team aims to respond to inquiries as quickly as possible and
            provide clear, professional assistance to help resolve your
            questions or concerns.
          </p>
        </InfoBlock>

        <InfoBlock title="We're Here for You">
          <p>
            Whether you are considering enrolling in a course, currently
            studying with us, or simply looking for more information about our
            programs, the Artin Institute team is ready to support you.
          </p>
        </InfoBlock>

        <p>
          Your success is important to us, and we are committed to providing the
          guidance, resources, and assistance you need to achieve your learning
          goals.
        </p>

        <p className="font-semibold text-slate-700">
          Need help? Contact us today and our team will be happy to assist you.
        </p>
      </Paragraphs>
    ),
  },

  {
    id: "free-lessons",
    group: "resources",
    label: "Free Lessons",
    icon: BookOpen,
    banner: "/assets/explore/Free Lessons.png",
    bannerAlt: "Free Lessons",
    title: "Free Lessons",
    subtitle:
      "Explore. Learn. Experience. Start your journey with our free lessons today.",
    body: (
      <Paragraphs>
        <p>
          At Artin Institute, we believe that quality education should be
          accessible to everyone. That is why we offer a selection of free
          learning resources and introductory lessons designed to help students
          experience our teaching approach before enrolling in a course.
        </p>

        <p>
          Through our free content, learners can explore different subjects,
          gain valuable knowledge, and get a better understanding of the quality
          and style of education we provide. These resources are an excellent
          way to begin your learning journey and discover the courses that best
          match your goals and interests.
        </p>

        <InfoBlock title="Free Learning Resources">
          <p className="mb-3">
            We regularly provide free educational materials that may include:
          </p>

          <BulletList
            items={[
              "Sample lessons",

              "Learning tips and study guides",

              "Language practice content",

              "Educational articles and resources",

              "Webinar recordings and learning materials",

              "Course previews and demonstrations",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="Free Demo Classes">
          <p>
            We also offer free demo classes for selected courses. These sessions
            allow prospective students to experience a live class, meet our
            instructors, and understand how our online learning environment
            works.
          </p>
        </InfoBlock>

        <InfoBlock title="During a demo class, students can">
          <BulletList
            items={[
              "Experience our teaching methods firsthand",

              "Interact with instructors and ask questions",

              "Explore course content and learning materials",

              "Understand the structure of our classes",

              "Determine whether the course is suitable for their learning objectives",
            ]}
          />
        </InfoBlock>

        <p>
          Our goal is to help students make informed decisions before enrolling
          in a program. We want every learner to feel confident about their
          educational investment and comfortable with our teaching approach.
        </p>

        <p>
          After attending a free lesson or demo class, students are welcome to
          enroll in any of our courses if they feel that Artin Institute is the
          right fit for their learning needs.
        </p>

        <p>
          Whether you are interested in Emirati Arabic, English, Artificial
          Intelligence, Computer Programming, Networking, or other professional
          development courses, our free lessons provide a great opportunity to
          start learning and experience the Artin Institute difference.
        </p>

        <p className="font-semibold text-slate-700">
          Explore. Learn. Experience. Start your journey with our free lessons
          today.
        </p>
      </Paragraphs>
    ),
  },

  {
    id: "emirati-traditions",
    group: "emirati",
    label: "Emirati Traditions",
    icon: Users,
    banner: "/assets/explore/Emirati Traditions.png",
    bannerAlt: "Emirati Traditions",
    title: "Emirati Traditions",
    subtitle:
      "Discover the traditions. Appreciate the heritage. Connect with the culture of the UAE.",
    body: (
      <Paragraphs>
        <p>
          Emirati traditions are an important part of the identity and heritage
          of the United Arab Emirates. While the UAE has become one of the
          world&apos;s most modern and innovative nations, its people continue
          to take great pride in preserving the customs, values, and traditions
          that have been passed down through generations.
        </p>

        <p>
          Understanding Emirati traditions provides valuable insight into the
          culture, history, and way of life of the Emirati people. For anyone
          living, working, or learning in the UAE, becoming familiar with these
          traditions can help build stronger connections and a deeper
          appreciation for the country&apos;s rich heritage.
        </p>

        <InfoBlock title="Hospitality and Generosity">
          <p>
            Hospitality is one of the most respected traditions in Emirati
            culture. Welcoming guests with warmth, kindness, and generosity is
            deeply rooted in Emirati society.
          </p>

          <p className="mt-3">
            It is common for visitors to be offered Arabic coffee (Gahwa),
            dates, and refreshments as a gesture of respect and hospitality.
            Making guests feel comfortable and valued remains an important
            cultural tradition throughout the UAE.
          </p>
        </InfoBlock>

        <InfoBlock title="Family and Community">
          <p>
            Family is at the heart of Emirati life. Strong family bonds, respect
            for elders, and support for relatives are values that continue to
            shape daily life and social interactions.
          </p>

          <p className="mt-3">
            Community relationships are also highly valued, and traditions often
            emphasize cooperation, mutual respect, and helping others whenever
            possible.
          </p>
        </InfoBlock>

        <InfoBlock title="Traditional Clothing">
          <p>
            Traditional Emirati clothing reflects the country&apos;s heritage,
            climate, and cultural values.
          </p>

          <p className="mt-3">
            Men commonly wear the Kandura, a long white garment, while women
            often wear the Abaya, a graceful black cloak worn over regular
            clothing. These traditional garments remain widely worn and are an
            important symbol of national identity and pride.
          </p>
        </InfoBlock>

        <InfoBlock title="Celebrations and Special Occasions">
          <p>
            The UAE celebrates a variety of cultural, religious, and national
            occasions throughout the year. Family gatherings, community events,
            and festive celebrations are important opportunities for people to
            come together and strengthen social connections.
          </p>

          <p className="mt-3">
            These occasions often feature traditional foods, cultural
            performances, and activities that reflect Emirati heritage and
            customs.
          </p>
        </InfoBlock>

        <InfoBlock title="Traditional Food">
          <p>
            Food plays an important role in Emirati traditions and hospitality.
            Traditional Emirati cuisine includes a variety of flavorful dishes
            influenced by the region&apos;s history and trade connections.
          </p>

          <p className="mt-3">
            Meals are often shared with family and guests, reflecting the
            importance of generosity, togetherness, and community.
          </p>
        </InfoBlock>

        <InfoBlock title="Respect and Etiquette">
          <p>
            Respect is a fundamental part of Emirati tradition. Politeness,
            courtesy, and consideration for others are highly valued in both
            personal and professional settings.
          </p>

          <p className="mt-3">
            Greeting others warmly, showing respect to elders, and demonstrating
            good manners are important aspects of daily life in the UAE.
          </p>
        </InfoBlock>

        <InfoBlock title="Preserving Heritage for Future Generations">
          <p>
            Despite rapid modernization, the UAE remains committed to preserving
            its traditions and cultural heritage. Museums, cultural centers,
            festivals, educational programs, and community initiatives help
            ensure that future generations continue to appreciate and celebrate
            Emirati customs and values.
          </p>
        </InfoBlock>

        <InfoBlock title="Learn More Through Language">
          <p>
            Understanding Emirati traditions becomes even more meaningful when
            combined with learning the local language. Many traditional
            expressions, greetings, and cultural references are deeply connected
            to Emirati Arabic and everyday life.
          </p>

          <p className="mt-3">
            At Artin Institute, we believe that learning the language and
            understanding the traditions go hand in hand, helping students gain
            a richer and more authentic experience of life in the UAE.
          </p>
        </InfoBlock>

        <p className="font-semibold text-slate-700">
          Discover the traditions. Appreciate the heritage. Connect with the
          culture of the UAE.
        </p>
      </Paragraphs>
    ),
  },

  {
    id: "emirati-hospitality",
    group: "emirati",
    label: "Emirati Hospitality",
    icon: Users,
    banner: "/assets/explore/Emirati Hospitality.png",
    bannerAlt: "Emirati Hospitality",
    title: "Emirati Hospitality",
    subtitle:
      "Experience the language. Understand the culture. Discover the spirit of Emirati hospitality.",
    body: (
      <Paragraphs>
        <p>
          Emirati hospitality is one of the most admired and respected aspects
          of the culture of the United Arab Emirates. Rooted in tradition,
          generosity, and respect, hospitality has been an important part of
          Emirati life for generations and continues to play a significant role
          in modern society.
        </p>

        <p>
          Whether welcoming family members, friends, neighbors, business
          associates, or visitors from around the world, Emiratis are known for
          their warmth, kindness, and genuine desire to make guests feel
          comfortable and valued.
        </p>

        <InfoBlock title="A Tradition of Generosity">
          <p>
            Hospitality in Emirati culture goes far beyond simply welcoming
            guests. It reflects values such as generosity, respect, kindness,
            and community spirit. Offering food, drinks, and assistance to
            visitors is considered an important social responsibility and a
            symbol of good character.
          </p>

          <p className="mt-3">
            Guests are often treated with great care and respect, regardless of
            whether they are close friends or first-time visitors.
          </p>
        </InfoBlock>

        <InfoBlock title="Arabic Coffee and Dates">
          <p>
            One of the most recognizable symbols of Emirati hospitality is the
            serving of Arabic coffee (Gahwa) and dates. Offering coffee and
            dates is a traditional gesture of welcome and friendship that
            continues to be practiced in homes, offices, and social gatherings
            throughout the UAE.
          </p>

          <p className="mt-3">
            This tradition represents generosity, respect, and a sincere welcome
            to guests.
          </p>
        </InfoBlock>

        <InfoBlock title="Making Guests Feel Welcome">
          <p>
            Emiratis place great importance on ensuring that guests feel
            comfortable and appreciated. Visitors are often greeted warmly,
            invited to sit, offered refreshments, and treated with courtesy and
            respect.
          </p>

          <p className="mt-3">
            This welcoming attitude is one of the reasons why many people living
            and working in the UAE describe Emirati society as friendly and
            inclusive.
          </p>
        </InfoBlock>

        <InfoBlock title="Hospitality in Everyday Life">
          <p>
            Hospitality is not limited to special occasions. It is a part of
            everyday life in the UAE and can be seen in homes, workplaces,
            community events, and social gatherings.
          </p>

          <p className="mt-3">
            Whether hosting a family meal, welcoming a colleague, or meeting a
            new acquaintance, acts of generosity and kindness are deeply valued
            within Emirati culture.
          </p>
        </InfoBlock>

        <InfoBlock title="Hospitality and Business Culture">
          <p>
            Understanding Emirati hospitality can be especially valuable for
            professionals and business owners. Building strong relationships is
            an important part of doing business in the UAE, and hospitality
            often plays a role in creating trust, respect, and long-term
            partnerships.
          </p>

          <p className="mt-3">
            Showing appreciation for local customs and traditions can help
            foster positive professional and personal relationships.
          </p>
        </InfoBlock>

        <InfoBlock title="Learning the Culture Through Language">
          <p>
            Many Emirati greetings, expressions, and social customs reflect the
            culture&apos;s strong emphasis on hospitality. By learning Emirati
            Arabic, students gain a deeper understanding of how hospitality is
            expressed in everyday conversations and social interactions.
          </p>

          <p className="mt-3">
            At Artin Institute, we believe that language learning should include
            cultural understanding. Learning about Emirati hospitality helps
            students appreciate not only the words but also the values and
            traditions behind them.
          </p>
        </InfoBlock>

        <InfoBlock title="A Reflection of Emirati Values">
          <p>
            Emirati hospitality is more than a cultural tradition—it is a
            reflection of the values that have shaped Emirati society for
            generations. Generosity, respect, kindness, and a welcoming spirit
            continue to define the way people interact with one another
            throughout the UAE.
          </p>

          <p className="mt-3">
            Understanding these values helps learners build meaningful
            connections and gain a deeper appreciation for the people and
            culture of the Emirates.
          </p>
        </InfoBlock>

        <p className="font-semibold text-slate-700">
          Experience the language. Understand the culture. Discover the spirit
          of Emirati hospitality.
        </p>
      </Paragraphs>
    ),
  },

  {
    id: "emirati-culture",
    group: "emirati",
    label: "Emirati Culture",
    icon: Users,
    banner: "/assets/explore/Emirati Culture.png",
    bannerAlt: "Emirati Culture",
    title: "Emirati Culture",
    subtitle:
      "Learn the language. Understand the culture. Connect with the UAE.",
    body: (
      <Paragraphs>
        <p>
          The United Arab Emirates is a country rich in history, traditions, and
          cultural values. Understanding Emirati culture is an important part of
          learning the Emirati Arabic language, as language and culture are
          closely connected. At Artin Institute, we believe that learning the
          local culture helps students communicate more naturally, build
          stronger relationships, and gain a deeper appreciation for life in the
          UAE.
        </p>

        <InfoBlock title="A Culture Built on Hospitality">
          <p>
            One of the most recognized aspects of Emirati culture is
            hospitality. Emiratis are known for their generosity, warmth, and
            respect for guests. Offering Arabic coffee, dates, and a warm
            welcome is a long-standing tradition that reflects the importance of
            kindness and community in Emirati society.
          </p>

          <p className="mt-3">
            Visitors and residents often experience the welcoming nature of
            Emirati people, making the UAE a comfortable and diverse place to
            live and work.
          </p>
        </InfoBlock>

        <InfoBlock title="Respect and Family Values">
          <p>
            Family plays a central role in Emirati culture. Strong family
            relationships, mutual respect, and support for relatives are highly
            valued. Respect for parents, elders, and community members is deeply
            rooted in everyday life and social interactions.
          </p>

          <p className="mt-3">
            These values influence the way people communicate and interact with
            one another, making politeness and respect important elements of
            Emirati Arabic conversations.
          </p>
        </InfoBlock>

        <InfoBlock title="Traditions and Heritage">
          <p>
            Although the UAE is a modern and rapidly developing nation, Emiratis
            take great pride in preserving their heritage and traditions.
            Traditional customs, clothing, music, poetry, and celebrations
            continue to play an important role in daily life and national
            identity.
          </p>

          <p className="mt-3">
            Cultural events and national celebrations provide opportunities to
            experience the rich heritage of the Emirates and learn more about
            its history.
          </p>
        </InfoBlock>

        <InfoBlock title="Language and Cultural Connection">
          <p>
            Learning Emirati Arabic allows students to connect more closely with
            the culture and people of the UAE. Many local expressions,
            greetings, and everyday phrases carry cultural meanings that are
            best understood through knowledge of Emirati traditions and values.
          </p>

          <p className="mt-3">
            By understanding the culture behind the language, students can
            communicate more effectively and confidently in social and
            professional settings.
          </p>
        </InfoBlock>

        <InfoBlock title="Living and Working in the UAE">
          <p>
            For expatriates, professionals, and business owners, understanding
            Emirati culture can be extremely valuable. Cultural awareness helps
            build stronger relationships, improves communication, and
            demonstrates respect for local customs and traditions.
          </p>

          <p className="mt-3">
            Whether in the workplace, business meetings, social gatherings, or
            everyday interactions, cultural understanding contributes to more
            meaningful connections and positive experiences.
          </p>
        </InfoBlock>

        <InfoBlock title="Learn Beyond the Language">
          <p>
            At Artin Institute, our Emirati Arabic courses go beyond vocabulary
            and grammar. We introduce students to important aspects of Emirati
            culture, traditions, customs, and communication styles to help them
            better understand the society in which the language is spoken.
          </p>

          <p className="mt-3">
            Our goal is to help learners not only speak Emirati Arabic but also
            appreciate the values, traditions, and unique identity of the UAE.
          </p>
        </InfoBlock>

        <p className="font-semibold text-slate-700">
          Learn the language. Understand the culture. Connect with the UAE.
        </p>
      </Paragraphs>
    ),
  },

  {
    id: "emirati-clothing",
    group: "emirati",
    label: "Emirati Clothing",
    icon: Users,
    banner: "/assets/explore/Emirati Clothing.png",
    bannerAlt: "Emirati Clothing",
    title: "Emirati Clothing",
    subtitle:
      "Learn the language. Discover the culture. Appreciate the heritage of the UAE.",

    body: (
      <Paragraphs>
        <p>
          Traditional Emirati clothing is an important part of the culture,
          heritage, and identity of the United Arab Emirates. These garments
          reflect the country&apos;s history, values, climate, and traditions
          while continuing to play a significant role in modern Emirati society.
        </p>

        <p>
          Although the UAE is a modern and international nation, traditional
          clothing remains widely worn and is a source of pride for Emiratis. It
          represents respect for cultural heritage and helps preserve traditions
          that have been passed down through generations.
        </p>

        <InfoBlock title="Traditional Clothing for Men">
          <p>
            The traditional attire worn by Emirati men is known as the Kandura
            also called Dishdasha in some regions. The Kandura is a long,
            loose-fitting garment that is typically white, making it comfortable
            and suitable for the UAE&apos;s warm climate.
          </p>

          <p className="mt-3 mb-3">Emirati men often wear the Kandura with:</p>

          <BulletList
            items={[
              "Ghutra – the traditional headscarf",

              "Agal – the black cord used to secure the Ghutra",

              "Traditional footwear suitable for the local environment",
            ]}
          />

          <p className="mt-3">
            The Kandura is commonly worn in daily life, at work, during social
            gatherings, and at formal events.
          </p>
        </InfoBlock>

        <InfoBlock title="Traditional Clothing for Women">
          <p>
            The traditional attire worn by Emirati women is the Abaya, a
            graceful and elegant black cloak worn over regular clothing. The
            Abaya is widely recognized as a symbol of Emirati culture and
            identity.
          </p>

          <p className="mt-3 mb-3">Women may also wear:</p>

          <BulletList
            items={[
              "Sheila – a headscarf traditionally worn with the Abaya",

              "Elegant embroidery and decorative designs on special occasions",

              "Traditional accessories that reflect Emirati heritage",
            ]}
          />

          <p className="mt-3">
            The Abaya combines cultural tradition with modern style and remains
            an important part of daily life for many Emirati women.
          </p>
        </InfoBlock>

        <InfoBlock title="Designed for the Climate">
          <p>
            Traditional Emirati clothing is not only culturally significant but
            also practical. The loose-fitting design and lightweight fabrics
            help provide comfort in the hot desert climate of the Arabian
            Peninsula.
          </p>

          <p className="mt-3">
            For generations, these garments have been adapted to suit local
            weather conditions while maintaining their traditional appearance.
          </p>
        </InfoBlock>

        <InfoBlock title="Clothing as a Symbol of Identity">
          <p>
            Traditional dress is an important expression of national identity
            and cultural pride. Many Emiratis wear traditional clothing every
            day, reflecting their connection to their heritage and respect for
            long-standing customs.
          </p>

          <p className="mt-3">
            During national celebrations, cultural events, family gatherings,
            and official occasions, traditional clothing is often worn as a
            symbol of unity and pride in Emirati culture.
          </p>
        </InfoBlock>

        <InfoBlock title="Modern Life and Tradition">
          <p>
            The UAE is home to people from many different countries and
            cultures. While modern fashion is widely available, Emiratis
            continue to embrace their traditional attire, demonstrating how
            tradition and modernity can exist together.
          </p>

          <p className="mt-3">
            Traditional clothing remains an important part of both personal
            identity and cultural preservation in the UAE.
          </p>
        </InfoBlock>

        <InfoBlock title="Understanding Culture Through Language">
          <p>
            When learning Emirati Arabic, students often encounter vocabulary
            and expressions related to traditional clothing and customs.
            Understanding the cultural significance of these garments helps
            learners appreciate the language in a deeper and more meaningful
            way.
          </p>

          <p className="mt-3">
            At Artin Institute, we believe that learning a language involves
            understanding the people, traditions, and culture behind it.
            Exploring traditional Emirati clothing is one of the many ways
            students can connect with the rich heritage of the UAE.
          </p>
        </InfoBlock>

        <InfoBlock title="A Proud Symbol of Emirati Heritage">
          <p>
            Traditional Emirati clothing represents elegance, practicality,
            cultural identity, and respect for heritage. It remains one of the
            most visible and admired aspects of Emirati culture and continues to
            be worn with pride throughout the United Arab Emirates.
          </p>
        </InfoBlock>

        <p className="font-semibold text-slate-700">
          Learn the language. Discover the culture. Appreciate the heritage of
          the UAE.
        </p>
      </Paragraphs>
    ),
  },

  {
    id: "emirati-arabic",
    group: "emirati",
    label: "Emirati Arabic",
    icon: BookOpen,
    banner: "/assets/explore/Emirati Arabic.png",
    bannerAlt: "Emirati Arabic Courses",
    title: "Emirati Arabic Courses",
    subtitle:
      "Learn Pure Emirati Arabic. Speak with Confidence. Connect with the UAE.",
    body: (
      <Paragraphs>
        <p>
          Welcome to Artin Institute&apos;s Emirati Arabic Program, a
          comprehensive learning pathway designed for anyone who wants to speak
          and understand authentic Emirati Arabic with confidence.
        </p>

        <p>
          Unlike many Arabic courses that focus on Modern Standard Arabic Fusha
          or a mixture of different dialects, our program is dedicated to
          teaching pure Emirati dialect, the language spoken by Emiratis in
          their daily lives. This allows students to communicate naturally and
          confidently in real-life situations throughout the UAE.
        </p>

        <InfoBlock title="Why Learn Emirati Arabic?">
          <p>
            For anyone living, working, or doing business in the United Arab
            Emirates, learning Emirati Arabic can be a valuable and rewarding
            skill. Understanding the local dialect helps you build stronger
            relationships, communicate more effectively, gain deeper cultural
            insight, and connect with Emirati society on a more personal level.
          </p>

          <p className="mt-3">
            Whether you are an expatriate, professional, entrepreneur, student,
            or simply someone interested in Emirati culture, learning the local
            dialect can significantly enhance your experience in the UAE.
          </p>
        </InfoBlock>

        <InfoBlock title="A Complete Learning Path from A1 to D3">
          <p className="mb-3">
            Our Emirati Arabic program is structured into 12 carefully designed
            levels, allowing students to progress from complete beginner to
            advanced fluency.
          </p>
        </InfoBlock>

        <InfoBlock title="Beginner Levels">
          <BulletList items={["A1", "A2", "A3"]} />

          <p className="mt-3">
            Learn essential vocabulary, common phrases, pronunciation,
            greetings, introductions, and everyday conversations.
          </p>
        </InfoBlock>

        <InfoBlock title="Intermediate Levels">
          <BulletList items={["B1", "B2", "B3"]} />

          <p className="mt-3">
            Expand your speaking ability, improve listening comprehension, and
            communicate more confidently in social and practical situations.
          </p>
        </InfoBlock>

        <InfoBlock title="Upper Intermediate Levels">
          <BulletList items={["C1", "C2", "C3"]} />

          <p className="mt-3">
            Develop deeper conversational skills, understand authentic speech,
            and communicate naturally in a wider variety of situations.
          </p>
        </InfoBlock>

        <InfoBlock title="Advanced Levels">
          <BulletList items={["D1", "D2", "D3"]} />

          <p className="mt-3">
            Master advanced Emirati expressions, cultural nuances, natural
            conversation patterns, and sophisticated communication skills used
            by native speakers.
          </p>
        </InfoBlock>

        <InfoBlock title="Flexible Learning Options">
          <p className="mb-3">
            We understand that many people have busy schedules and may not
            always have time to attend regular classes. That is why we offer
            flexible learning solutions designed to fit around your lifestyle.
          </p>

          <p className="mb-3">Students can choose from:</p>

          <BulletList
            items={[
              "Live online private classes",

              "Interactive group classes",

              "Self-paced audio courses",

              "Educational books and learning materials",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="Learn Anytime, Anywhere">
          <p>
            One of the most popular features of our program is our Emirati
            Arabic audio courses. These professionally designed audio lessons
            allow you to learn wherever and whenever it is convenient for you.
          </p>

          <p className="mt-3 mb-3">You can listen while:</p>

          <BulletList
            items={[
              "Driving",

              "Walking",

              "Exercising",

              "Traveling",

              "Relaxing at home",

              "During breaks at work",
            ]}
          />

          <p className="mt-3">
            This flexibility makes learning Emirati Arabic easier and more
            accessible than ever before.
          </p>
        </InfoBlock>

        <InfoBlock title="High-Quality Learning at Affordable Prices">
          <p>
            At Artin Institute, we believe that quality education should be
            accessible to everyone. Our courses are designed to provide
            exceptional value while remaining highly affordable and
            cost-effective compared to many traditional language learning
            options.
          </p>

          <p className="mt-3">
            Students receive professionally developed learning materials,
            structured lessons, expert guidance, and practical language training
            without the need for expensive classroom-based programs.
          </p>
        </InfoBlock>

        <InfoBlock title="Learn the Language of the UAE">
          <p>
            Our goal is not simply to teach vocabulary and grammar. We help
            students understand how Emiratis truly communicate in everyday life.
            Through authentic dialogues, real-world examples, listening
            practice, and practical conversations, students learn to speak the
            dialect naturally and confidently.
          </p>

          <p className="mt-3">
            Whether your goal is personal growth, professional development,
            business communication, or cultural understanding, our Emirati
            Arabic program provides a clear and effective path to success.
          </p>
        </InfoBlock>

        <p className="font-semibold text-slate-700">
          Learn Pure Emirati Arabic. Speak with Confidence. Connect with the
          UAE. Start your journey today with Artin Institute&apos;s complete
          A1–D3 Emirati Arabic Program.
        </p>
      </Paragraphs>
    ),
  },

  {
    id: "emirati-arabic-alphabet-pronunciation",
    group: "emirati",
    label: "Alphabet & Pronunciation",
    icon: BookMarked,
    banner: "/assets/explore/Emirati Arabic Alphabet & Pronunciation.png",
    bannerAlt: "Emirati Arabic Alphabet and Pronunciation",
    title: "Emirati Arabic Alphabet & Pronunciation",
    subtitle:
      "Master the alphabet. Improve your pronunciation. Speak Emirati Arabic with confidence.",
    body: (
      <Paragraphs>
        <p>
          Learning the Emirati Arabic alphabet and pronunciation is the first
          step toward speaking confidently and understanding the language as it
          is used in everyday life across the United Arab Emirates.
        </p>

        <p>
          While Emirati Arabic uses the same Arabic alphabet as Modern Standard
          Arabic Fusha, some letters and sounds may be pronounced differently in
          daily conversation. Understanding these pronunciation patterns will
          help you improve your listening skills, develop a more natural accent,
          and communicate more effectively with native Emirati speakers.
        </p>

        <InfoBlock title="The Arabic Alphabet">
          <p>
            The Arabic language consists of 28 letters, written from right to
            left. Each letter may have different forms depending on its position
            within a word.
          </p>

          <p className="mt-3">
            Students learning Emirati Arabic begin by recognizing the letters,
            understanding their sounds, and learning how they connect to form
            words and sentences.
          </p>
        </InfoBlock>

        <InfoBlock title="Why Pronunciation Matters">
          <p>
            Good pronunciation is essential for effective communication. Even
            when using the correct vocabulary, incorrect pronunciation can
            sometimes make words difficult to understand.
          </p>

          <p className="mt-3 mb-3">
            Our Emirati Arabic program focuses on helping students:
          </p>

          <BulletList
            items={[
              "Recognize Arabic sounds accurately",

              "Develop clear pronunciation",

              "Improve listening comprehension",

              "Build confidence in speaking",

              "Understand authentic Emirati speech patterns",

              "Reduce common pronunciation mistakes",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="Unique Features of Emirati Pronunciation">
          <p>
            Like many Arabic dialects, Emirati Arabic has its own accent and
            pronunciation characteristics. Some words may sound different from
            their Modern Standard Arabic equivalents, and certain expressions
            are spoken more naturally in everyday Emirati conversations.
          </p>

          <p className="mt-3">
            Students are introduced to these authentic pronunciation patterns
            from the beginning, allowing them to develop a more natural and
            practical speaking style.
          </p>
        </InfoBlock>

        <InfoBlock title="Learn Through Listening">
          <p>
            One of the most effective ways to improve pronunciation is through
            listening and repetition. Many of our Emirati Arabic learning
            materials include audio support, allowing students to hear
            native-style pronunciation and practice at their own pace.
          </p>

          <p className="mt-3 mb-3">By listening regularly, students can:</p>

          <BulletList
            items={[
              "Improve pronunciation accuracy",

              "Understand natural speech rhythm",

              "Develop a better Emirati accent",

              "Increase speaking confidence",

              "Improve overall communication skills",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="Practical Learning Approach">
          <p>
            At Artin Institute, we teach pronunciation through real
            conversations, everyday vocabulary, useful expressions, and
            interactive exercises rather than focusing only on theory. This
            practical approach helps students use the language naturally in
            real-life situations.
          </p>

          <p className="mt-3">
            Whether you are learning Emirati Arabic for work, business, travel,
            cultural understanding, or personal development, mastering the
            alphabet and pronunciation will provide a strong foundation for your
            learning journey.
          </p>
        </InfoBlock>

        <InfoBlock title="Start Speaking with Confidence">
          <p>
            The Arabic alphabet may seem challenging at first, but with the
            right guidance, practice, and exposure to authentic Emirati speech,
            students can quickly build strong reading, listening, and speaking
            skills.
          </p>

          <p className="mt-3">
            Our goal is to help learners move beyond memorizing letters and
            develop the ability to understand and communicate in genuine Emirati
            Arabic.
          </p>
        </InfoBlock>

        <p className="font-semibold text-slate-700">
          Master the alphabet. Improve your pronunciation. Speak Emirati Arabic
          with confidence.
        </p>
      </Paragraphs>
    ),
  },

  {
    id: "emirati-arabic-vs-fusha",
    group: "emirati",
    label: "Emirati Arabic vs Fusha",
    icon: BookOpen,
    banner:
      "/assets/explore/Difference between Emirati Arabic and Modern Standard Arabic Fusha Banner.png",
    bannerAlt:
      "Difference Between Emirati Arabic and Modern Standard Arabic Fusha",
    title:
      "Difference Between Emirati Arabic and Modern Standard Arabic (Fusha)",
    subtitle:
      "Learn the language of the people. Learn Pure Emirati Arabic with Artin Institute.",
    body: (
      <Paragraphs>
        <p>
          Many people are surprised to discover that the Arabic spoken in
          everyday life in the UAE is quite different from the Arabic taught in
          most textbooks and language courses. Understanding the difference
          between Emirati Arabic and Modern Standard Arabic Fusha can help
          learners choose the right path for their goals.
        </p>

        <InfoBlock title="What is Modern Standard Arabic (Fusha)?">
          <p>
            Modern Standard Arabic, commonly known as Fusha, is the formal
            version of the Arabic language used throughout the Arab world. It is
            the language of:
          </p>

          <div className="mt-3">
            <BulletList
              items={[
                "News broadcasts",

                "Newspapers and magazines",

                "Official documents",

                "Formal speeches",

                "Literature and books",

                "Academic and educational materials",
              ]}
            />
          </div>

          <p className="mt-3">
            Fusha is understood across Arabic-speaking countries and serves as a
            common written language. However, it is rarely used in everyday
            conversations between native speakers.
          </p>
        </InfoBlock>

        <InfoBlock title="What is Emirati Arabic?">
          <p>
            Emirati Arabic is the local dialect spoken by Emiratis in the United
            Arab Emirates. It is the language used in daily life, including:
          </p>

          <div className="mt-3">
            <BulletList
              items={[
                "Conversations with friends and family",

                "Social gatherings",

                "Everyday business interactions",

                "Local markets and shops",

                "Community events",

                "Informal workplace communication",
              ]}
            />
          </div>

          <p className="mt-3">
            If you want to communicate naturally with Emiratis, understand local
            expressions, and become more integrated into Emirati culture,
            learning Emirati Arabic is often more practical than learning only
            Fusha.
          </p>
        </InfoBlock>

        <InfoBlock title="Key Differences">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-slate-800">
                Everyday Communication
              </h4>

              <p>
                Most Emiratis speak Emirati Arabic in their daily lives, not
                Fusha. While they understand Fusha, it is generally reserved for
                formal situations.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800">Pronunciation</h4>

              <p>
                Many words are pronounced differently in Emirati Arabic compared
                to Fusha. The accent, sounds, and speech patterns are unique to
                the UAE and form an important part of local identity.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800">Vocabulary</h4>

              <p>
                Emirati Arabic includes words and expressions that are not
                commonly used in Fusha. It also contains cultural phrases and
                local terminology that reflect the traditions and lifestyle of
                the UAE.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800">
                Natural Conversations
              </h4>

              <p>
                Learning only Fusha may help you read and understand formal
                Arabic, but it often does not prepare learners for real-life
                conversations with Emiratis. Emirati Arabic focuses on how
                people actually speak in everyday situations.
              </p>
            </div>
          </div>
        </InfoBlock>

        <InfoBlock title="Which One Should You Learn?">
          <p>The answer depends on your goals.</p>
        </InfoBlock>

        <InfoBlock title="Learn Fusha If You Want To">
          <BulletList
            items={[
              "Read Arabic books and literature",

              "Understand formal media and news",

              "Study classical Arabic",

              "Learn a standardized form of Arabic used across the Arab world",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="Learn Emirati Arabic If You Want To">
          <BulletList
            items={[
              "Live and work in the UAE",

              "Communicate with Emiratis",

              "Build stronger local relationships",

              "Understand Emirati culture",

              "Speak naturally in everyday situations",

              "Improve your practical communication skills",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="Why Artin Institute Focuses on Emirati Arabic">
          <p>
            At Artin Institute, our Emirati Arabic program focuses on teaching
            authentic Emirati dialect, not just formal Arabic. Our goal is to
            help students understand how Emiratis genuinely communicate in daily
            life.
          </p>

          <p className="mt-3">
            Through structured lessons, audio courses, practical dialogues, and
            real-world examples, students learn the language used in homes,
            workplaces, social gatherings, and everyday interactions across the
            UAE.
          </p>

          <p className="mt-3">
            We believe that learning the local dialect is one of the most
            effective ways to connect with the culture, people, and lifestyle of
            the Emirates.
          </p>
        </InfoBlock>

        <InfoBlock title="The Best of Both Worlds">
          <p>
            While Fusha remains important for reading and formal communication,
            Emirati Arabic is the key to natural conversation and cultural
            integration in the UAE. Many learners choose to study Emirati Arabic
            first to improve their practical communication skills and later
            expand their knowledge of Fusha if needed.
          </p>

          <p className="mt-3">
            If your goal is to communicate confidently in the UAE, Emirati
            Arabic is the language you will hear, use, and benefit from every
            day.
          </p>
        </InfoBlock>

        <p className="font-semibold text-slate-700">
          Learn the language of the people. Learn Pure Emirati Arabic with Artin
          Institute.
        </p>
      </Paragraphs>
    ),
  },

  {
    id: "cookie-policy",
    group: "support",
    label: "Cookie Policy",
    icon: FileText,
    banner: "/assets/explore/Cookie Policy.png",
    bannerAlt: "Cookie Policy",
    title: "Cookie Policy",
    subtitle: "Last Updated: June 2026",

    body: (
      <Paragraphs>
        <p>
          At Artin Institute, we are committed to protecting your privacy and
          providing a secure and user-friendly online experience. This Cookie
          Policy explains how we use cookies and similar technologies when you
          visit our website.
        </p>

        <InfoBlock title="What Are Cookies?">
          <p>
            Cookies are small text files that are stored on your computer,
            tablet, or mobile device when you visit a website. They help
            websites remember your preferences, improve functionality, analyze
            website performance, and enhance the overall user experience.
          </p>
        </InfoBlock>

        <InfoBlock title="How We Use Cookies">
          <p className="mb-3">
            Artin Institute uses cookies for a variety of purposes, including:
          </p>

          <BulletList
            items={[
              "Ensuring the website functions properly",

              "Remembering your preferences and settings",

              "Improving website performance and user experience",

              "Analyzing website traffic and visitor behavior",

              "Enhancing website security",

              "Supporting website features and functionality",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="Types of Cookies We May Use">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-slate-800">Essential Cookies</h4>

              <p>
                These cookies are necessary for the operation of our website and
                enable core functionality such as navigation, security, and
                access to certain features.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800">
                Performance and Analytics Cookies
              </h4>

              <p>
                These cookies help us understand how visitors interact with our
                website by collecting anonymous information about website usage,
                page visits, and user behavior. This information helps us
                improve our services and website performance.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800">Functional Cookies</h4>

              <p>
                These cookies allow the website to remember choices you make,
                such as language preferences and other settings, providing a
                more personalized experience.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800">Marketing Cookies</h4>

              <p>
                In some cases, cookies may be used to help deliver relevant
                content, promotions, or advertisements based on user interests.
              </p>
            </div>
          </div>
        </InfoBlock>

        <InfoBlock title="Managing Cookies">
          <p>
            Most web browsers allow you to control and manage cookies through
            your browser settings. You may choose to block, delete, or restrict
            cookies at any time. Please note that disabling certain cookies may
            affect the functionality and performance of some parts of the
            website.
          </p>
        </InfoBlock>

        <InfoBlock title="Third-Party Services">
          <p>
            Our website may use trusted third-party services, such as analytics
            tools, payment processors, social media integrations, or other
            services that may place cookies on your device. These third parties
            have their own privacy and cookie policies.
          </p>
        </InfoBlock>

        <InfoBlock title="Updates to This Policy">
          <p>
            Artin Institute may update this Cookie Policy from time to time to
            reflect changes in technology, legal requirements, or our business
            practices. Any updates will be posted on this page with the revised
            effective date.
          </p>
        </InfoBlock>

        <InfoBlock title="Contact Us">
          <p className="mb-4">
            If you have any questions regarding this Cookie Policy or our
            website practices, please contact us:
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Email", value: "support@artinstitute.com" },

              { label: "Telephone", value: "+971 4 268 7710" },

              { label: "WhatsApp", value: "+971 54 201 9791" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-[#e6edf5] bg-[#f8fafc] p-4"
              >
                <p className="mb-1 text-[11px] font-bold tracking-widest text-[#377dff] uppercase">
                  {label}
                </p>

                <p className="text-[14px] font-semibold text-slate-700">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </InfoBlock>

        <p className="font-semibold text-slate-700">
          By continuing to use our website, you acknowledge and agree to the use
          of cookies as described in this Cookie Policy.
        </p>
      </Paragraphs>
    ),
  },

  {
    id: "certificates",

    group: "support",

    label: "Certificates",

    icon: ShieldCheck,

    banner: "/assets/explore/Certificates.png",

    bannerAlt: "Certificates",

    title: "Certificates",

    subtitle:
      "Learn with confidence. Complete your training. Earn recognition for your achievement.",

    body: (
      <Paragraphs>
        <p>
          At Artin Institute, we recognize the hard work, dedication, and
          achievements of our students. Upon successful completion of eligible
          courses and training programs, students may request a certificate to
          formally recognize their learning accomplishments.
        </p>

        <p>We offer two types of certificates:</p>

        <InfoBlock title="Artin Institute Certificate of Completion">
          <p>
            Students who successfully complete their training program may
            receive an official Artin Institute Certificate of Completion. This
            certificate confirms that the student has completed the specified
            course and participated in the training provided by Artin Institute.
          </p>

          <p className="mt-3">
            The certificate serves as a valuable record of learning and
            demonstrates a commitment to personal and professional development.
          </p>
        </InfoBlock>

        <InfoBlock title="KHDA Certificate">
          <p>
            For eligible courses, students may also request a KHDA Certificate.
            As a KHDA-certified training provider, Artin Institute can
            facilitate the issuance of KHDA-recognized certificates for
            qualifying programs, subject to applicable requirements and
            regulations.
          </p>

          <p className="mt-3">
            A KHDA certificate provides additional recognition of the training
            completed and may be beneficial for professional development and
            career advancement purposes.
          </p>
        </InfoBlock>

        <InfoBlock title="Certificate Processing Fees">
          <p>
            While course enrollment includes access to training and learning
            materials, certificates may be subject to a small administrative and
            processing fee.
          </p>

          <p className="mt-3">
            The applicable fee may vary depending on the type of certificate
            requested and any associated processing requirements. Students will
            be informed of the relevant fee at the time of their certificate
            request.
          </p>
        </InfoBlock>

        <InfoBlock title="Eligibility Requirements">
          <p className="mb-3">
            To qualify for a certificate, students may be required to:
          </p>

          <BulletList
            items={[
              "Successfully complete the course or training program",

              "Meet attendance requirements, where applicable",

              "Complete any required assessments or course activities",

              "Fulfill any additional requirements specified for the program",
            ]}
          />
        </InfoBlock>

        <InfoBlock title="Celebrate Your Achievement">
          <p>
            A certificate is more than just a document—it is recognition of your
            commitment to learning, growth, and professional development. We are
            proud to celebrate the achievements of our students and support them
            in reaching their educational and career goals.
          </p>

          <p className="mt-3">
            For more information about certificate eligibility, processing
            times, and applicable fees, please contact our support team.
          </p>
        </InfoBlock>

        <p className="font-semibold text-slate-700">
          Learn with confidence. Complete your training. Earn recognition for
          your achievement.
        </p>
      </Paragraphs>
    ),
  },

  {
    id: "career-support",

    group: "resources",

    label: "Career Support",

    icon: Briefcase,

    banner: "/assets/explore/Career Support.png",

    bannerAlt: "Career Support",

    title: "Career Support",

    subtitle:
      "Invest in your skills today and create new opportunities for tomorrow.",

    body: (
      <Paragraphs>
        <p>
          At Artin Institute, we believe that education should create real
          opportunities and deliver meaningful results. Our courses are designed
          not only to help students gain knowledge but also to develop practical
          skills that can support career growth, professional advancement, and
          long-term success.
        </p>

        <p>
          Many of our students have used the skills and knowledge gained through
          our training programs to improve their job performance, expand their
          professional capabilities, qualify for new opportunities, and increase
          their confidence in the workplace. Whether learning a new language,
          developing technical expertise, or acquiring in-demand digital skills,
          our students benefit from training that is relevant to today&apos;s
          professional environment.
        </p>

        <p>
          Our courses focus on practical, real-world applications that help
          learners become more effective in their careers. Students can develop
          valuable competencies in areas such as Emirati Arabic, English
          communication, Artificial Intelligence, Computer Programming,
          Networking, and other professional disciplines that are increasingly
          sought after by employers.
        </p>

        <InfoBlock title="How Our Courses Support Career Development">
          <BulletList
            items={[
              "Build valuable and marketable skills",

              "Improve workplace communication and confidence",

              "Enhance professional knowledge and expertise",

              "Support career progression and promotion opportunities",

              "Increase employability in competitive job markets",

              "Develop practical skills applicable to real-world situations",

              "Encourage continuous professional growth and learning",
            ]}
          />
        </InfoBlock>

        <p>
          In addition to course content, our instructors share practical
          insights and industry knowledge that help students better understand
          how to apply their learning in professional settings. We encourage
          lifelong learning and continuous skill development as essential
          components of career success.
        </p>

        <p>
          Whether you are a student preparing for your future career, a
          professional looking to enhance your expertise, or an individual
          seeking new opportunities, Artin Institute is committed to supporting
          your professional development journey.
        </p>

        <p>
          We take pride in the achievements of our students and are honored to
          contribute to their personal and professional success.
        </p>

        <p className="font-semibold text-slate-700">
          Invest in your skills today and create new opportunities for tomorrow.
        </p>
      </Paragraphs>
    ),
  },
];
