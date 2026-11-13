export const portfolioData = {
  personal: {
    name: "Juan Sterling",
    role: "Software Developer",
    // tagline: "Interested in Web and Android Development. I am ready to contribute to projects that require technical expertise, problem-solving skills, and innovative solutions.",
    tagline: ["CURIOUS LIKE BABY",
      "CREATIVE LIKE MONSTER",
      "BUILT FOR TECHNOLOGY"
    ],
    email: "juansterling1409@gmail.com",
    github: "https://github.com/Juan-Sterling",
    github2: "https://github.com/juansterling",
    linkedin: "https://www.linkedin.com/in/juan-sterling-martua-1487b3287/",
    location: "North Jakarta, Indonesia",
    availability: "Under Development • Feel Free to Explore",
    resumeUrl: "https://drive.google.com/file/d/1JQx_EygR2_w3TFD-aB4nV1uyOE-D0yla/view?usp=sharing",
  },

  about: {
    title: "Behind The Stage",
    subtitle: "A backstage look into my background, core focus, and engineering journey.",
    passDetails: {
      name: "Juan Sterling",
      role: "Software Developer",
      photo: "/images/profile/pass-photo-dark.jpg",
      photoLight: "/images/profile/pass-photo-light.jpg",
    },
    headline: "Hi, I'm Juan Sterling Martua",
    narrative: [
      // "I am Juan Sterling, a software developer dedicated to crafting modern web and multiplatform applications. I bridge clean interface design with sturdy, scalable backend architectures.",
      // "Driven by curiosity and a problem-solving mindset, I enjoy transforming complex requirements into reliable, maintainable code and smooth digital experiences.",
      "A Full-Stack Developer passionate about building web and Android applications. I enjoy solving problems, exploring new technologies, and creating innovative solutions that bring ideas to life."
    ],
    quickFacts: [
      {
        id: "origin",
        label: "Origin",
        value: "Bandung, Indonesia",
        icon: "Home",
      },
      {
        id: "location",
        label: "Current Base",
        value: "North Jakarta, Indonesia",
        icon: "MapPin",
      },
      {
        id: "birth",
        label: "Birth Year",
        value: "2002",
        icon: "Calendar",
      },
      {
        id: "alias",
        label: "Alias",
        value: "juster / justermp",
        icon: "AtSign",
      },
      // {
      //   id: "focus",
      //   label: "Core Focus",
      //   value: "Web & Mobile Development",
      //   icon: "Code2",
      // },
    ],
  },

  education: [
    {
      degree: "Bachelor of Information Technology (S.Kom.)",
      institution: "Universitas Kristen Maranatha",
      location: "Bandung, Indonesia",
      period: "2020 — 2024",
      gpa: "3.82 / 4.00",
      logo: "https://res.cloudinary.com/og1jrvy3/image/upload/v1791910743/7d51e1d6-4dd7-4e33-a214-39e7c85e501e.png", // Path or URL to campus logo (e.g. "/images/education/maranatha.png")
      websiteUrl: "https://www.maranatha.edu/", // Campus website link
      achievements: [
        "6x Dean's List recipient for outstanding academic performance",
        "Participated in the MBKM program",
        "Participated in academic and non-academic competitions",
        "Participated in various workshops and seminars",
      ],
      relevantCourses: [
        "Full Stack Development",
        "Database Systems",
        "Software Engineering",
        "Computer Networks",
        "Cloud Computing",
        "Machine Learning",
        "Algorithms & Data Structures",
        "Multiplatform Programming",
        "Internet of Things (IoT)",
      ],
    },
  ],

  skills: [
    "Laravel",
    "PHP",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Bootstrap",
    "Python",
    "Odoo",
    "REST API",
    "SQL Server",
    "PostgreSQL",
    "MySQL",
    "Git",
    "GitLab",
    "React.js",
    "TypeScript",
    "Node.js",
    "Next.js",
    "Supabase",
    "Vercel",
    "Netlify",
    "GSAP",
    "Lenis",
    "jQuery",
    "Symfony",
    "Docker",
    "Linux",
    "Postman",
    "VS Code",
    "Figma",
    "Jira",
    "Java",
    "Kotlin",
    "Dart",
    "Flutter",
    "Github",
    "Cloudinary",
    "Cloudflare R2",
    "Firebase",
    "AWS",
  ],

  experience: [
    {
      period: "Jul 2025 — Present",
      position: "Full Stack Developer",
      organization: "Foxion Technologies",
      location: "North Jakarta, Indonesia",
      type: "Full-time",
      logo: "https://res.cloudinary.com/og1jrvy3/image/upload/v1791910302/572119152_17842297065610849_8356523802397087330_n.jpg", // Path or URL to company logo (e.g. "/images/experience/foxion.png")
      websiteUrl: "", // Company website link
      responsibilities: [
        "Collaborated with the development team to build and maintain NOGS (New One Gate System), a system designed to support the Survey Division of PT Biro Klasifikasi Indonesia (BUMN) in managing vessel classification admission and maintenance processes.",
      ],
      technologies: ["Laravel", "PHP", "PostgreSQL", "JavaScript", "REST API", "Bootstrap", "GitLab"],
    },
    {
      period: "Jul 2024 — Nov 2025",
      position: "Full Stack Developer",
      organization: "Stafbook (YCW22)",
      location: "North Jakarta, Indonesia",
      type: "Contract",
      logo: "https://res.cloudinary.com/og1jrvy3/image/upload/v1791910407/337771994_596027299089048_1317845282392533444_n.jpg", // Path or URL to company logo (e.g. "/images/experience/stafbook.png")
      websiteUrl: "", // Company website link
      responsibilities: [
        "Collaborated with the development team to build and maintain NOGS (New One Gate System), a system designed to support the Statutory Division of PT Biro Klasifikasi Indonesia (BUMN) in managing statutory certificates.",
        "Collaborated with the development team to build and maintain NOGS (New One Gate System), a system designed to support the Matkom Division of PT Biro Klasifikasi Indonesia (BUMN) in managing Service Supplier, Material Component, and Welding certificates.",
      ],
      technologies: ["Laravel", "PHP", "PostgreSQL", "JavaScript", "REST API", "Bootstrap", "GitLab"],
    },
    {
      period: "Feb 2023 — Jul 2024",
      position: "Software Programmer",
      organization: "i2c Studio",
      location: "Bandung, Indonesia",
      type: "Internship",
      logo: "https://res.cloudinary.com/og1jrvy3/image/upload/v1791910463/18b79f47-b52c-4ea2-a996-b3f1624ebfd0.png", // Path or URL to company logo (e.g. "/images/experience/i2c.png")
      websiteUrl: "", // Company website link
      responsibilities: [
        "Being an intern and part-time software programmer who assists i2c Studio in creating a project for LPPM Maranatha called SIPPM.",
        "The SIPPM project uses PHP, Laravel, and PostgreSQL as the main tools.",
        "Additionally, also helping with other i2c Studio projects, which use Odoo and Python as the main tools.",
        "During the time at i2c Studio, also learning other topics such as Linux and Cloud Computing.",
      ],
      technologies: ["PHP", "Laravel", "PostgreSQL", "HTML", "CSS", "Bootstrap", "JavaScript", "Odoo", "Python", "Linux", "Cloud Computing"],
    },
  ],

  personalProjects: [
    {
      title: "LOUIFOOTBALL CATALOG",
      period: "2026",
      description: "Developed a web-based product catalog for LOUIFOOTBALL, designed to showcase available products and editions while providing visitors with an intuitive way to browse and explore the merchandise collection.",
      technologies: ["Next.js", "React.js", "Tailwind CSS", "JavaScript", "Supabase", "Vercel", "Cloudinary", "REST API", "Cloudflare R2"],
      liveUrl: "https://louifootball.vercel.app/",
      githubUrl: "",
      image: "https://res.cloudinary.com/og1jrvy3/image/upload/v1791909210/fc6e70e8-d9c5-42d8-93a8-805ee800f4b0.png",
      details: {
        overview: `Developed a web-based product catalog for LOUIFOOTBALL, designed to showcase available products and editions while providing visitors with an intuitive way to browse and explore the merchandise collection.

                    The project consists of three main pages: Catalog Page, Admin Page, and Video Preview Page, each serving a specific purpose:

                    - Catalog Page: The main page of the website, featuring promotional advertisements displayed through an interactive carousel, product filtering based on categories, and pagination to help visitors easily navigate and explore the available merchandise.

                    - Admin Page: An exclusive page accessible only to administrators, designed to simplify the management of the main catalog page. It provides four key management sections: Product Management, Category Management, Advertisement Management, and Display Priority Management, allowing administrators to organize and control the content displayed on the website.

                    - Video Preview Page: A dedicated page accessed by visitors when scanning QR codes attached to selected LOUIFOOTBALL products. It displays product-related videos and provides convenient access to the main product catalog, along with LOUIFOOTBALL's contact information, allowing visitors to explore more products or get in touch with the brand.`,
        timeline: "2026",
        gallery: [
          {
            url: "https://res.cloudinary.com/og1jrvy3/image/upload/v1791909210/fc6e70e8-d9c5-42d8-93a8-805ee800f4b0.png",
            caption: "Catalog Page",
            description: "",
          },
        ],
      },
    },
    {
      title: "LOUI Portfolio",
      period: "2026",
      description: "Developed a web-based portfolio website for LOUI, designed to showcase and present LOUI's creative projects and completed works through an engaging and visually appealing gallery.",
      technologies: ["Next.js", "TypeScript", "React.js", "Tailwind CSS", "JavaScript", "Supabase", "Vercel", "Cloudinary", "Cloudflare R2", "REST API", "GSAP"],
      liveUrl: "https://www.louiportfolio.my.id/",
      githubUrl: "",
      image: "https://res.cloudinary.com/og1jrvy3/image/upload/v1791909609/bab4c30b-d53e-4ec8-a452-f0da70a478cd.png",
      details: {
        overview: `Developed a web-based portfolio website for LOUI, designed to showcase and present LOUI's creative projects and completed works through an engaging and visually appealing gallery.

                The project consists of two main pages: Portfolio Page and Admin Page, each serving a specific purpose:

                - Portfolio Page: Serves as the main page of the website, showcasing LOUI's creative works through a visually appealing gallery. It implements Masonry and Robin layouts to provide different gallery arrangements, along with filtering functionality to help visitors explore projects by category. The page also includes contact information, allowing visitors to easily get in touch with LOUI.

                - Admin Page: An exclusive page accessible only to administrators, designed to simplify the management and customization of the main portfolio page. It consists of four key sections: Overview, Project Management, Category & Subcategory Management, and Gallery Layout Management, allowing administrators to manage portfolio content, organize project categories, and customize how projects are displayed in the gallery.`,
        timeline: "2026",
        gallery: [
          {
            url: "https://res.cloudinary.com/og1jrvy3/image/upload/v1791909609/bab4c30b-d53e-4ec8-a452-f0da70a478cd.png",
            caption: "Portfolio Page",
            description: "",
          },
        ],
      },
    },
    {
      title: "FPS Aim Training",
      period: "2026",
      description: "As a fan of FPS games such as Valorant and Counter-Strike, I created a simple web-based aim trainer to practice and improve my aiming skills in FPS games.",
      technologies: ["HTML", "CSS", "JavaScript", "Netlify"],
      liveUrl: "https://aimtrainbyjuster.netlify.app/",
      githubUrl: "",
      image: "https://res.cloudinary.com/og1jrvy3/image/upload/v1791909681/6c2e6015-bccf-4abd-ad49-1597361fbaa0.png",
      details: {
        overview: "As a fan of FPS games such as Valorant and Counter-Strike, I created a simple web-based aim trainer to practice and improve my aiming skills in FPS games.",
        timeline: "2026",
        gallery: [
          {
            url: "https://res.cloudinary.com/og1jrvy3/image/upload/v1791909681/6c2e6015-bccf-4abd-ad49-1597361fbaa0.png",
            caption: "Target Arena & Scoreboard",
            description: "",
          },
        ],
      },
    },
    {
      title: "GAME PENALTY FOOTBALL",
      period: "2022-2023",
      description: "Developed a football penalty shootout game as a final course project in collaboration with a teammate, using Three.js to create an interactive 3D gaming experience.",
      technologies: ["HTML", "JavaScript", "Three.js", "JSON"],
      liveUrl: "https://github.com/kevinlau2102/tubes-grafkom",
      githubUrl: "https://github.com/kevinlau2102/tubes-grafkom",
      image: "",
      details: {
        overview: "Developed a football penalty shootout game as a final course project in collaboration with a teammate, using Three.js to create an interactive 3D gaming experience.",
        timeline: "2022 — 2023",
        gallery: [
          {
            url: "",
            caption: "3D Stadium & Penalty Spot",
            description: "Perspective from the penalty taker showing 3D goalpost, stadium environment, and goalkeeper model.",
          },
        ],
      },
    },
    {
      title: "UrGalon",
      period: "2022-2023",
      description: "Developed an Android application called UrGalon as a final course project in collaboration with a teammate, using Kotlin. The application allows users to find nearby water refill depots and place orders for purchasing or refilling water gallons.",
      technologies: ["Kotlin", "Firebase", "Figma"],
      liveUrl: "https://github.com/MichaelMathew/UAS_Mobile",
      githubUrl: "https://github.com/MichaelMathew/UAS_Mobile",
      image: "",
      details: {
        overview: "Developed an Android application called UrGalon as a final course project in collaboration with a teammate, using Kotlin. The application allows users to find nearby water refill depots and place orders for purchasing or refilling water gallons.",
        timeline: "2022 — 2023",
        gallery: [
          {
            url: "",
            caption: "UrGalon Depot Finder & Order Flow",
            description: "Mobile user interface showcasing nearby water refill station listings and direct order submission.",
          },
        ],
      },
    },
    {
      title: "Movie Ticket Ticketing Apps",
      period: "2022-2023",
      description: "Developed a mobile ticketing application as a final course project using Dart and Flutter. The application enables users to explore currently showing and upcoming movies, check available showtimes and cinemas, and purchase tickets for their preferred movie, schedule, and cinema.",
      technologies: ["Dart", "Flutter", "Firebase", "Figma"],
      liveUrl: "",
      githubUrl: "",
      image: "",
      details: {
        overview: "Developed a mobile ticketing application as a final course project using Dart and Flutter. The application enables users to explore currently showing and upcoming movies, check available showtimes and cinemas, and purchase tickets for their preferred movie, schedule, and cinema.",
        timeline: "2022 — 2023",
        gallery: [
          {
            url: "",
            caption: "Movie Catalog & Cinema Schedule",
            description: "Browse now playing movies with synopsis, ratings, and theater showtime schedules.",
          },
        ],

      },
    },
    // {
    //   title: "Berita Acara IT Maranatha",
    //   period: "2022-2023",
    //   description: "Developed a web-based teaching activity reporting system for Maranatha University as a final course project, in collaboration with a teammate. The system enables lecturers to report teaching sessions by recording meeting dates and times, student attendance, session notes, and supporting documentation.",
    //   technologies: ["PHP", "Laravel", "PostgreSQL", "Bootstrap"],
    //   liveUrl: "https://github.com/MartinWidarmadi/BeritaAcara",
    //   image: "",
    // },
  ],

  certificates: [
    {
      id: "cert-1",
      title: "AWS Academy Cloud Foundations course",
      issuer: "AWS",
      category: "Courses",
      issueDate: "May 2022",
      credentialId: "",
      credentialUrl: "https://www.credly.com/badges/b026cf57-f4c6-41cb-b54c-162e10c30873/print",
      description: "Completion of the AWS Academy Cloud Foundations course like AWS Architecture, AWS Cloud, AWS Core Services, AWS Pricing, AWS Support",
      skills: ["AWS"],
      image: "",
      verified: true,
    },
    {
      id: "cert-2",
      title: "Dicoding: Memulai Pemrograman Dengan Python",
      issuer: "Dicoding Indonesia",
      category: "Courses",
      issueDate: "Apr 2022",
      credentialId: "",
      credentialUrl: "https://www.dicoding.com/certificates/4EXG5Y20DXRL",
      description: "Fundamentals of python programming including syntax, basic data structures, control flow, functions, object-oriented programming concepts, and application development basics.",
      skills: ["Python"],
      image: "",
      verified: true,
    },
    {
      id: "cert-3",
      title: "MBKM Independent Internship",
      issuer: "i2c Studio",
      category: "MBKM",
      issueDate: "Aug 2023",
      credentialId: "",
      credentialUrl: "",
      description: "Successfully completed an industrial internship equivalent to 20 academic credits (SKS) through the MBKM program at i2c Studio. During the internship, I was involved in several projects and gained hands-on experience in software development. I also learned about cloud computing and Linux-based systems.",
      skills: ["PHP", "Laravel", "PostgreSQL", "HTML", "CSS", "Bootstrap", "JavaScript"],
      image: "",
      verified: true,
    },
    {
      id: "cert-4",
      title: "BASIC SKILL TO BECOME UI/UX DESIGNER AND PROTOTYPING WITH FIGMA",
      issuer: "Universitas Mercu Buana",
      category: "seminars",
      issueDate: "Oct 2021",
      credentialId: "",
      credentialUrl: "",
      description: "Successfully completed a 1-day seminar focused on the fundamentals of UI/UX design and Figma prototyping, gaining foundational knowledge and practical skills in user interface design and interactive prototyping.",
      skills: ["Figma"],
      image: "",
      verified: true,
    },
    {
      id: "cert-5",
      title: "Innovation Festival x Informatic Sport Festival (INVFEST X ISF) 8.0",
      issuer: "Institut Teknologi Telkom Purwokerto",
      category: "Honors",
      issueDate: "Dec 2023",
      credentialId: "",
      credentialUrl: "",
      description: "Reached the finals of an Android app competition with Pet Central, a veterinary-focused telemedicine application. Contributed ideas and feedback to the project and represented the team as the speaker and presenter during the competition.",
      skills: ["Flutter", "Firebase", "Figma"],
      image: "",
      verified: true,
    },
  ],

  contact: {
    email: "juansterling1409@gmail.com",
    whatsapp: "081809835640",
    whatsappUrl: "https://wa.me/6281809835640",
    github: "https://github.com/Juan-Sterling",
    github2: "https://github.com/juansterling",
    linkedin: "https://www.linkedin.com/in/juan-sterling-martua-1487b3287/",
    location: "North Jakarta, Indonesia",
    responseCommitment: "Typically responds within 24 hours",
  },
};
