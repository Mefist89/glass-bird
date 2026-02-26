export type FeatureIcon = "book-open" | "flask-conical" | "messages-square";
export type CourseIcon = "terminal" | "network" | "database";
export type SocialIcon = "twitter" | "github";

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export interface HeroCta {
  readonly label: string;
  readonly href: string;
  readonly variant: "primary" | "secondary";
}

export interface SocialProofPerson {
  readonly initials: string;
}

export interface FeatureItem {
  readonly title: string;
  readonly description: string;
  readonly icon: FeatureIcon;
}

export interface CourseItem {
  readonly title: string;
  readonly description: string;
  readonly duration: string;
  readonly level: string;
  readonly icon: CourseIcon;
  readonly href: string;
}

export interface StatItem {
  readonly value: string;
  readonly label: string;
}

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: SocialIcon;
}

export type ModuleIcon = "terminal" | "braces" | "bot" | "workflow";
export type LessonKind = "video" | "quiz" | "lab";
export type LessonState = "completed" | "current" | "locked";

export interface CourseLessonItem {
  readonly title: string;
  readonly meta: string;
  readonly kind: LessonKind;
  readonly state: LessonState;
  readonly actionLabel?: string;
  readonly actionHref?: string;
}

export interface CourseModuleItem {
  readonly title: string;
  readonly summary: string;
  readonly icon: ModuleIcon;
  readonly isExpanded: boolean;
  readonly lessons: readonly CourseLessonItem[];
}

export interface CourseDetailItem {
  readonly label: string;
  readonly value: string;
  readonly tone?: "success" | "default";
}

export interface CoursePageData {
  readonly brandName: string;
  readonly navLinks: readonly NavLink[];
  readonly user: {
    readonly name: string;
    readonly role: string;
  };
  readonly dashboardLabel: string;
  readonly dashboardHref: string;
  readonly breadcrumb: {
    readonly parentLabel: string;
    readonly parentHref: string;
    readonly currentLabel: string;
  };
  readonly syllabus: {
    readonly title: string;
    readonly versionLabel: string;
    readonly modules: readonly CourseModuleItem[];
  };
  readonly sidebar: {
    readonly progress: {
      readonly title: string;
      readonly percent: number;
      readonly completedLessons: number;
      readonly totalLessons: number;
      readonly buttonLabel: string;
      readonly buttonHref: string;
    };
    readonly instructor: {
      readonly title: string;
      readonly name: string;
      readonly role: string;
      readonly bio: string;
    };
    readonly details: {
      readonly title: string;
      readonly items: readonly CourseDetailItem[];
      readonly skillsTitle: string;
      readonly skills: readonly string[];
    };
  };
}

export interface LoginPageData {
  readonly brandName: string;
  readonly title: string;
  readonly subtitle: string;
  readonly emailLabel: string;
  readonly emailPlaceholder: string;
  readonly passwordLabel: string;
  readonly passwordPlaceholder: string;
  readonly forgotPasswordLabel: string;
  readonly forgotPasswordHref: string;
  readonly submitLabel: string;
  readonly signupPrompt: string;
  readonly signupLabel: string;
  readonly signupHref: string;
  readonly footerLinks: readonly {
    readonly label: string;
    readonly href: string;
  }[];
}

export interface RegisterPageData {
  readonly brandName: string;
  readonly title: string;
  readonly subtitle: string;
  readonly fullNameLabel: string;
  readonly fullNamePlaceholder: string;
  readonly emailLabel: string;
  readonly emailPlaceholder: string;
  readonly passwordLabel: string;
  readonly passwordPlaceholder: string;
  readonly submitLabel: string;
  readonly socialDividerLabel: string;
  readonly signinPrompt: string;
  readonly signinLabel: string;
  readonly signinHref: string;
  readonly footerLinks: readonly {
    readonly label: string;
    readonly href: string;
  }[];
}

export type LessonNavIcon = "learning" | "courses" | "community" | "resources";
export type LessonResourceIcon = "summary" | "code" | "transcript";
export type LessonModuleItemState = "completed" | "current" | "locked";

export interface LessonNavLink {
  readonly label: string;
  readonly href: string;
  readonly icon: LessonNavIcon;
  readonly active?: boolean;
}

export interface LessonResourceItem {
  readonly label: string;
  readonly icon: LessonResourceIcon;
  readonly href: string;
}

export interface LessonModuleItem {
  readonly title: string;
  readonly meta: string;
  readonly state: LessonModuleItemState;
  readonly href: string;
}

export interface LessonPageData {
  readonly brandName: string;
  readonly navLinks: readonly LessonNavLink[];
  readonly breadcrumb: {
    readonly courseLabel: string;
    readonly courseHref: string;
    readonly moduleLabel: string;
  };
  readonly video: {
    readonly title: string;
    readonly progressPercent: number;
    readonly currentTime: string;
    readonly totalTime: string;
  };
  readonly resources: readonly LessonResourceItem[];
  readonly lesson: {
    readonly title: string;
    readonly publishedText: string;
    readonly markCompleteLabel: string;
    readonly description: string;
    readonly keyTakeaways: readonly string[];
    readonly proTipTitle: string;
    readonly proTipText: string;
  };
  readonly sidebar: {
    readonly progress: {
      readonly title: string;
      readonly moduleLabel: string;
      readonly percentLabel: string;
      readonly progressPercent: number;
    };
    readonly moduleContentTitle: string;
    readonly moduleItems: readonly LessonModuleItem[];
    readonly instructor: {
      readonly title: string;
      readonly name: string;
      readonly role: string;
      readonly initials: string;
    };
  };
}

export const landingPageData = {
  brandName: "glassbird",
  navLinks: [
    { label: "Courses", href: "/courses" },
    { label: "Mentors", href: "#features" },
    { label: "Community", href: "#waitlist" },
    { label: "Pricing", href: "#" },
  ] as readonly NavLink[],
  authActions: {
    login: { label: "Log In", href: "/login" },
    signup: { label: "Sign Up", href: "/register" },
  },
  hero: {
    badge: "Now enrolling: Python, Networks, Databases",
    titleStart: "Master IT Skills with",
    titleAccent: "glassbird",
    description:
      "Unlock your potential in programming, networking, and data systems with mentor-led tracks built for real-world outcomes.",
    ctas: [
      { label: "Start Learning", href: "/courses", variant: "primary" },
      { label: "Explore Courses", href: "/courses", variant: "secondary" },
    ] as readonly HeroCta[],
    socialProof: {
      people: [{ initials: "AK" }, { initials: "ML" }, { initials: "RN" }] as readonly SocialProofPerson[],
      text: "Join 15,000+ students",
    },
    terminal: {
      heading: "glassbird_terminal_v2.0",
      lines: [
        "const future = async () => {",
        "  // Build your learning path",
        "  await glassbird.masterSkill('Python');",
        "  await glassbird.masterSkill('Networks');",
        "  return 'Career_Growth';",
        "};",
      ],
    },
  },
  features: {
    eyebrow: "Why Choose glassbird?",
    description:
      "We bridge theory and practical skills with a curriculum designed by working engineers.",
    ctaLabel: "View All Features",
    items: [
      {
        title: "Expert-Led Content",
        description:
          "Learn directly from senior engineers with practical field experience.",
        icon: "book-open",
      },
      {
        title: "Hands-On Labs",
        description:
          "Practice with realistic tasks in development, networking, and SQL workflows.",
        icon: "flask-conical",
      },
      {
        title: "Career Mentorship",
        description:
          "Get direct feedback and guidance to move from theory to a job-ready portfolio.",
        icon: "messages-square",
      },
    ] as readonly FeatureItem[],
  },
  courses: {
    title: "Featured Courses",
    description:
      "Explore our core learning tracks for future-ready IT specialists.",
    items: [
      {
        title: "Python Programming",
        description:
          "Master Python fundamentals, automation scripts, and practical problem solving.",
        duration: "8 Weeks - 40 hrs",
        level: "Beginner",
        icon: "terminal",
        href: "/courses/python",
      },
      {
        title: "Computer Networks",
        description:
          "Understand TCP/IP, routing, and secure network architecture from first principles.",
        duration: "10 Weeks - 55 hrs",
        level: "Intermediate",
        icon: "network",
        href: "/courses/networking",
      },
      {
        title: "Databases & SQL",
        description:
          "Design relational schemas, write efficient SQL, and compare modern NoSQL patterns.",
        duration: "12 Weeks - 60 hrs",
        level: "Advanced",
        icon: "database",
        href: "/courses/sql",
      },
    ] as readonly CourseItem[],
    enrollLabel: "Enroll Now",
  },
  stats: [
    { value: "15k+", label: "Active Students" },
    { value: "94%", label: "Course Completion" },
    { value: "89%", label: "Hired Graduates" },
  ] as readonly StatItem[],
  waitlist: {
    title: "Join the waitlist for our next cohort",
    description:
      "Be first to know when enrollment opens for the next advanced bootcamp.",
    inputPlaceholder: "Enter your email address",
    buttonLabel: "Notify Me",
    successMessage: "Thanks, you are on the list.",
    policyText: "We care about your data in our",
    policyLabel: "privacy policy",
    policyHref: "#",
  },
  footer: {
    copyright: "© 2026 glassbird Inc. All rights reserved.",
    socialLinks: [
      { label: "Twitter", href: "#", icon: "twitter" },
      { label: "GitHub", href: "#", icon: "github" },
    ] as readonly SocialLink[],
  },
} as const;

export const pythonCoursePageData: CoursePageData = {
  brandName: "glassbird",
  navLinks: [
    { label: "Courses", href: "/courses" },
    { label: "Mentors", href: "/#features" },
    { label: "Community", href: "/#waitlist" },
    { label: "Pricing", href: "/" },
  ] as readonly NavLink[],
  user: {
    name: "Alex M.",
    role: "Student",
  },
  dashboardLabel: "Dashboard",
  dashboardHref: "/courses",
  breadcrumb: {
    parentLabel: "Courses",
    parentHref: "/courses",
    currentLabel: "Python Programming",
  },
  syllabus: {
    title: "Course Syllabus",
    versionLabel: "v2.4 Updated",
    modules: [
      {
        title: "Module 1: Fundamentals",
        summary: "4 Lessons • 45m",
        icon: "terminal",
        isExpanded: true,
        lessons: [
          {
            title: "1.1 Introduction to Python Syntax",
            meta: "Video • 12m",
            kind: "video",
            state: "completed",
            actionLabel: "Review",
            actionHref: "/courses/python/lesson",
          },
          {
            title: "1.2 Variables and Data Types",
            meta: "Video • 15m",
            kind: "video",
            state: "current",
            actionLabel: "Resume",
            actionHref: "/courses/python/lesson",
          },
          {
            title: "1.3 Basic Operators Quiz",
            meta: "Quiz • 10 Questions",
            kind: "quiz",
            state: "locked",
          },
          {
            title: "1.4 Code Lab: First Script",
            meta: "Hands-on • 20m",
            kind: "lab",
            state: "locked",
          },
        ] as readonly CourseLessonItem[],
      },
      {
        title: "Module 2: Data Structures",
        summary: "6 Lessons • 1h 20m",
        icon: "braces",
        isExpanded: false,
        lessons: [],
      },
      {
        title: "Module 3: Advanced Automation",
        summary: "8 Lessons • 2h 15m",
        icon: "bot",
        isExpanded: false,
        lessons: [],
      },
      {
        title: "Module 4: Working with APIs",
        summary: "5 Lessons • 1h 45m",
        icon: "workflow",
        isExpanded: false,
        lessons: [],
      },
    ] as readonly CourseModuleItem[],
  },
  sidebar: {
    progress: {
      title: "Your Progress",
      percent: 5,
      completedLessons: 2,
      totalLessons: 24,
      buttonLabel: "Resume Learning",
      buttonHref: "/courses/python/lesson",
    },
    instructor: {
      title: "Instructor",
      name: "Sarah Chen",
      role: "Senior Python Developer",
      bio: "Ex-Google engineer with 10+ years of experience in automation and backend systems.",
    },
    details: {
      title: "Course Details",
      items: [
        { label: "Difficulty", value: "Beginner", tone: "success" },
        { label: "Lessons", value: "24 Total" },
        { label: "Duration", value: "8 Weeks" },
        { label: "Students", value: "1,204" },
      ] as readonly CourseDetailItem[],
      skillsTitle: "Skills You'll Gain",
      skills: ["Python 3", "Automation", "Scripting", "Debugging"] as readonly string[],
    },
  },
};

export const networkingCoursePageData: CoursePageData = {
  brandName: "glassbird",
  navLinks: [
    { label: "Courses", href: "/courses" },
    { label: "Mentors", href: "/#features" },
    { label: "Community", href: "/#waitlist" },
    { label: "Pricing", href: "/" },
  ],
  user: {
    name: "Alex M.",
    role: "Student",
  },
  dashboardLabel: "Dashboard",
  dashboardHref: "/courses",
  breadcrumb: {
    parentLabel: "Courses",
    parentHref: "/courses",
    currentLabel: "Computer Networks",
  },
  syllabus: {
    title: "Course Syllabus",
    versionLabel: "v1.9 Updated",
    modules: [
      {
        title: "Module 1: Network Foundations",
        summary: "5 Lessons • 58m",
        icon: "terminal",
        isExpanded: true,
        lessons: [
          {
            title: "1.1 OSI and TCP/IP Models",
            meta: "Video • 14m",
            kind: "video",
            state: "completed",
            actionLabel: "Review",
            actionHref: "/courses/networking/lesson",
          },
          {
            title: "1.2 IPv4 Addressing and Subnetting",
            meta: "Video • 18m",
            kind: "video",
            state: "current",
            actionLabel: "Resume",
            actionHref: "/courses/networking/lesson",
          },
          {
            title: "1.3 Subnetting Checkpoint Quiz",
            meta: "Quiz • 12 Questions",
            kind: "quiz",
            state: "locked",
          },
          {
            title: "1.4 Packet Tracer Lab: LAN Setup",
            meta: "Hands-on • 26m",
            kind: "lab",
            state: "locked",
          },
          {
            title: "1.5 ARP and ICMP Essentials",
            meta: "Video • 11m",
            kind: "video",
            state: "locked",
          },
        ],
      },
      {
        title: "Module 2: Routing and Switching",
        summary: "7 Lessons • 1h 35m",
        icon: "workflow",
        isExpanded: false,
        lessons: [],
      },
      {
        title: "Module 3: Network Security Basics",
        summary: "6 Lessons • 1h 20m",
        icon: "bot",
        isExpanded: false,
        lessons: [],
      },
      {
        title: "Module 4: Troubleshooting and Monitoring",
        summary: "5 Lessons • 1h 10m",
        icon: "braces",
        isExpanded: false,
        lessons: [],
      },
    ],
  },
  sidebar: {
    progress: {
      title: "Your Progress",
      percent: 8,
      completedLessons: 2,
      totalLessons: 23,
      buttonLabel: "Resume Learning",
      buttonHref: "/courses/networking/lesson",
    },
    instructor: {
      title: "Instructor",
      name: "Daniel Park",
      role: "Network Architect",
      bio: "Cisco-certified architect with 12+ years building enterprise and cloud network infrastructure.",
    },
    details: {
      title: "Course Details",
      items: [
        { label: "Difficulty", value: "Intermediate", tone: "success" },
        { label: "Lessons", value: "23 Total" },
        { label: "Duration", value: "10 Weeks" },
        { label: "Students", value: "978" },
      ],
      skillsTitle: "Skills You'll Gain",
      skills: ["TCP/IP", "Subnetting", "Routing", "Network Security"],
    },
  },
};

export const sqlCoursePageData: CoursePageData = {
  brandName: "glassbird",
  navLinks: [
    { label: "Courses", href: "/courses" },
    { label: "Mentors", href: "/#features" },
    { label: "Community", href: "/#waitlist" },
    { label: "Pricing", href: "/" },
  ],
  user: {
    name: "Alex M.",
    role: "Student",
  },
  dashboardLabel: "Dashboard",
  dashboardHref: "/courses",
  breadcrumb: {
    parentLabel: "Courses",
    parentHref: "/courses",
    currentLabel: "Databases & SQL",
  },
  syllabus: {
    title: "Course Syllabus",
    versionLabel: "v3.1 Updated",
    modules: [
      {
        title: "Module 1: SQL Foundations",
        summary: "5 Lessons • 52m",
        icon: "terminal",
        isExpanded: true,
        lessons: [
          {
            title: "1.1 Relational Model and Tables",
            meta: "Video • 13m",
            kind: "video",
            state: "completed",
            actionLabel: "Review",
            actionHref: "/courses/sql/lesson",
          },
          {
            title: "1.2 SELECT, WHERE, ORDER BY",
            meta: "Video • 16m",
            kind: "video",
            state: "current",
            actionLabel: "Resume",
            actionHref: "/courses/sql/lesson",
          },
          {
            title: "1.3 Filtering and Aggregates Quiz",
            meta: "Quiz • 10 Questions",
            kind: "quiz",
            state: "locked",
          },
          {
            title: "1.4 Hands-on Lab: Sales Reports",
            meta: "Hands-on • 18m",
            kind: "lab",
            state: "locked",
          },
          {
            title: "1.5 Primary and Foreign Keys",
            meta: "Video • 9m",
            kind: "video",
            state: "locked",
          },
        ],
      },
      {
        title: "Module 2: Joins and Subqueries",
        summary: "7 Lessons • 1h 28m",
        icon: "workflow",
        isExpanded: false,
        lessons: [],
      },
      {
        title: "Module 3: Indexes and Optimization",
        summary: "6 Lessons • 1h 18m",
        icon: "bot",
        isExpanded: false,
        lessons: [],
      },
      {
        title: "Module 4: Transactions and Isolation",
        summary: "5 Lessons • 1h 6m",
        icon: "braces",
        isExpanded: false,
        lessons: [],
      },
    ],
  },
  sidebar: {
    progress: {
      title: "Your Progress",
      percent: 6,
      completedLessons: 2,
      totalLessons: 23,
      buttonLabel: "Resume Learning",
      buttonHref: "/courses/sql/lesson",
    },
    instructor: {
      title: "Instructor",
      name: "Maria Lopez",
      role: "Senior Data Engineer",
      bio: "Data engineer with 11+ years of experience in PostgreSQL, analytics, and high-load query optimization.",
    },
    details: {
      title: "Course Details",
      items: [
        { label: "Difficulty", value: "Advanced", tone: "success" },
        { label: "Lessons", value: "23 Total" },
        { label: "Duration", value: "12 Weeks" },
        { label: "Students", value: "1,087" },
      ],
      skillsTitle: "Skills You'll Gain",
      skills: ["SQL", "Schema Design", "Indexes", "Query Optimization"],
    },
  },
};

export const loginPageData: LoginPageData = {
  brandName: "glassbird",
  title: "Welcome Back",
  subtitle: "Sign in to continue your learning journey",
  emailLabel: "Email Address",
  emailPlaceholder: "name@company.com",
  passwordLabel: "Password",
  passwordPlaceholder: "••••••••",
  forgotPasswordLabel: "Forgot Password?",
  forgotPasswordHref: "#",
  submitLabel: "Sign In",
  signupPrompt: "Don't have an account?",
  signupLabel: "Sign Up",
  signupHref: "/register",
  footerLinks: [
    { label: "Help Center", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export const registerPageData: RegisterPageData = {
  brandName: "glassbird",
  title: "Create Account",
  subtitle: "Start your IT mastery today",
  fullNameLabel: "Full Name",
  fullNamePlaceholder: "John Doe",
  emailLabel: "Email Address",
  emailPlaceholder: "name@company.com",
  passwordLabel: "Password",
  passwordPlaceholder: "••••••••",
  submitLabel: "Create Account",
  socialDividerLabel: "or sign up with",
  signinPrompt: "Already have an account?",
  signinLabel: "Sign In",
  signinHref: "/login",
  footerLinks: [
    { label: "Help Center", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export const pythonLessonPageData: LessonPageData = {
  brandName: "glassbird",
  navLinks: [
    { label: "My Learning", href: "/courses", icon: "learning", active: true },
    { label: "Courses", href: "/courses", icon: "courses" },
    { label: "Community", href: "/#waitlist", icon: "community" },
    { label: "Resources", href: "/#features", icon: "resources" },
  ],
  breadcrumb: {
    courseLabel: "Python Programming",
    courseHref: "/courses/python",
    moduleLabel: "Module 4: Advanced Concurrency",
  },
  video: {
    title: "Understanding AsyncIO Event Loops",
    progressPercent: 35,
    currentTime: "12:45",
    totalTime: "45:30",
  },
  resources: [
    { label: "Brief Summary (PDF)", icon: "summary", href: "/courses/python" },
    { label: "Lesson Code", icon: "code", href: "/courses/python" },
    { label: "Full Transcript", icon: "transcript", href: "/courses/python" },
  ],
  lesson: {
    title: "Understanding AsyncIO Event Loops",
    publishedText: "Published on Oct 14, 2023 • Last updated 2 days ago",
    markCompleteLabel: "Mark Complete",
    description:
      "In this lesson, we dive deep into the core of Python's asynchronous programming model: the Event Loop. We will explore how asyncio manages tasks, handles I/O operations without blocking the main thread, and ensures your applications remain responsive under load.",
    keyTakeaways: [
      "The role of the event loop as the central execution device.",
      "Differences between multi-threading and asynchronous I/O.",
      "Implementation of custom event loop policies for specific OS requirements.",
    ],
    proTipTitle: "Pro Tip",
    proTipText:
      "Always remember to use asyncio.run() as the main entry point for your async programs in Python 3.7+, rather than manually managing loop instantiation unless absolutely necessary.",
  },
  sidebar: {
    progress: {
      title: "Your Progress",
      moduleLabel: "Module 4 of 12",
      percentLabel: "65% Complete",
      progressPercent: 65,
    },
    moduleContentTitle: "Module Content",
    moduleItems: [
      {
        title: "Introduction to Concurrency",
        meta: "10 min • Video",
        state: "completed",
        href: "/courses/python/lesson",
      },
      {
        title: "Threads vs Processes",
        meta: "25 min • Video",
        state: "completed",
        href: "/courses/python/lesson",
      },
      {
        title: "Understanding AsyncIO Event Loops",
        meta: "45 min • Video • Current",
        state: "current",
        href: "/courses/python/lesson",
      },
      {
        title: "Coroutines and Tasks",
        meta: "30 min • Video",
        state: "locked",
        href: "/courses/python",
      },
      {
        title: "Lab: Building a Chat Server",
        meta: "60 min • Interactive Lab",
        state: "locked",
        href: "/courses/python",
      },
      {
        title: "Error Handling in Async",
        meta: "20 min • Video",
        state: "locked",
        href: "/courses/python",
      },
    ],
    instructor: {
      title: "Instructor",
      name: "Sarah Jenkins",
      role: "Sr. Python Engineer @ Google",
      initials: "SJ",
    },
  },
};

export const networkingLessonPageData: LessonPageData = {
  brandName: "glassbird",
  navLinks: [
    { label: "My Learning", href: "/courses", icon: "learning", active: true },
    { label: "Courses", href: "/courses", icon: "courses" },
    { label: "Community", href: "/#waitlist", icon: "community" },
    { label: "Resources", href: "/#features", icon: "resources" },
  ],
  breadcrumb: {
    courseLabel: "Computer Networks",
    courseHref: "/courses/networking",
    moduleLabel: "Module 2: Routing and Switching",
  },
  video: {
    title: "Configuring Static and Dynamic Routing",
    progressPercent: 42,
    currentTime: "18:10",
    totalTime: "43:20",
  },
  resources: [
    { label: "Brief Summary (PDF)", icon: "summary", href: "/courses/networking" },
    { label: "Lesson Code", icon: "code", href: "/courses/networking" },
    { label: "Full Transcript", icon: "transcript", href: "/courses/networking" },
  ],
  lesson: {
    title: "Configuring Static and Dynamic Routing",
    publishedText: "Published on Nov 5, 2023 • Last updated 1 week ago",
    markCompleteLabel: "Mark Complete",
    description:
      "In this lesson, we compare static and dynamic routing strategies, and configure routing behavior in practical scenarios. You will understand route propagation, failover behavior, and when each protocol is appropriate in real networks.",
    keyTakeaways: [
      "Difference between static routes and dynamic routing protocols.",
      "How to reason about route convergence and failover.",
      "Practical setup patterns for small and medium topologies.",
    ],
    proTipTitle: "Pro Tip",
    proTipText:
      "In production networks, document route intent before implementation. Clear intent prevents drift and speeds up troubleshooting under incident pressure.",
  },
  sidebar: {
    progress: {
      title: "Your Progress",
      moduleLabel: "Module 2 of 10",
      percentLabel: "72% Complete",
      progressPercent: 72,
    },
    moduleContentTitle: "Module Content",
    moduleItems: [
      {
        title: "Routing Fundamentals",
        meta: "12 min • Video",
        state: "completed",
        href: "/courses/networking/lesson",
      },
      {
        title: "Static Routes in Practice",
        meta: "20 min • Video",
        state: "completed",
        href: "/courses/networking/lesson",
      },
      {
        title: "Configuring Static and Dynamic Routing",
        meta: "43 min • Video • Current",
        state: "current",
        href: "/courses/networking/lesson",
      },
      {
        title: "OSPF Basics",
        meta: "28 min • Video",
        state: "locked",
        href: "/courses/networking",
      },
      {
        title: "Lab: Multi-router Topology",
        meta: "55 min • Interactive Lab",
        state: "locked",
        href: "/courses/networking",
      },
      {
        title: "Route Troubleshooting",
        meta: "24 min • Video",
        state: "locked",
        href: "/courses/networking",
      },
    ],
    instructor: {
      title: "Instructor",
      name: "Daniel Park",
      role: "Network Architect",
      initials: "DP",
    },
  },
};

export const sqlLessonPageData: LessonPageData = {
  brandName: "glassbird",
  navLinks: [
    { label: "My Learning", href: "/courses", icon: "learning", active: true },
    { label: "Courses", href: "/courses", icon: "courses" },
    { label: "Community", href: "/#waitlist", icon: "community" },
    { label: "Resources", href: "/#features", icon: "resources" },
  ],
  breadcrumb: {
    courseLabel: "Databases & SQL",
    courseHref: "/courses/sql",
    moduleLabel: "Module 2: Joins and Subqueries",
  },
  video: {
    title: "Mastering Joins for Real Data Models",
    progressPercent: 39,
    currentTime: "14:30",
    totalTime: "37:40",
  },
  resources: [
    { label: "Brief Summary (PDF)", icon: "summary", href: "/courses/sql" },
    { label: "Lesson Code", icon: "code", href: "/courses/sql" },
    { label: "Full Transcript", icon: "transcript", href: "/courses/sql" },
  ],
  lesson: {
    title: "Mastering Joins for Real Data Models",
    publishedText: "Published on Dec 2, 2023 • Last updated 4 days ago",
    markCompleteLabel: "Mark Complete",
    description:
      "This lesson focuses on writing reliable JOIN queries against normalized schemas. We will compare JOIN types, prevent duplicate inflation, and validate results using practical data checks.",
    keyTakeaways: [
      "When to use INNER, LEFT, and FULL joins in analytics flows.",
      "How to avoid accidental cartesian products and duplicated rows.",
      "How to verify correctness of complex join pipelines.",
    ],
    proTipTitle: "Pro Tip",
    proTipText:
      "When queries grow, build them incrementally with CTEs and validate row counts at each step. This catches logic bugs earlier and keeps SQL maintainable.",
  },
  sidebar: {
    progress: {
      title: "Your Progress",
      moduleLabel: "Module 2 of 12",
      percentLabel: "61% Complete",
      progressPercent: 61,
    },
    moduleContentTitle: "Module Content",
    moduleItems: [
      {
        title: "Relational Modeling Recap",
        meta: "11 min • Video",
        state: "completed",
        href: "/courses/sql/lesson",
      },
      {
        title: "Join Types and Use Cases",
        meta: "17 min • Video",
        state: "completed",
        href: "/courses/sql/lesson",
      },
      {
        title: "Mastering Joins for Real Data Models",
        meta: "37 min • Video • Current",
        state: "current",
        href: "/courses/sql/lesson",
      },
      {
        title: "Subqueries and EXISTS",
        meta: "26 min • Video",
        state: "locked",
        href: "/courses/sql",
      },
      {
        title: "Lab: Reporting Query Pack",
        meta: "48 min • Interactive Lab",
        state: "locked",
        href: "/courses/sql",
      },
      {
        title: "Performance Tuning Basics",
        meta: "22 min • Video",
        state: "locked",
        href: "/courses/sql",
      },
    ],
    instructor: {
      title: "Instructor",
      name: "Maria Lopez",
      role: "Senior Data Engineer",
      initials: "ML",
    },
  },
};

export const lessonPageData = pythonLessonPageData;
