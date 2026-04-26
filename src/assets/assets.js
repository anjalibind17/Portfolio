import { FaLightbulb, FaPaintBrush, FaCode, FaReact, FaServer, FaDatabase, FaRobot, FaSearch, FaShieldAlt, FaShoppingBag, FaNodeJs } from 'react-icons/fa'
import { SiCodechef, SiCodeforces, SiLeetcode } from 'react-icons/si'

import profileImg from './profile.png'
import projectImg1 from './project1.avif'
import projectImg2 from './project2.avif'
import projectImg3 from './project3.avif'
import projectImg4 from './project4.avif'
import projectImg5 from './project5.avif'
import projectImg6 from './project6.avif'

export const assets = {
  profileImg,
}

export const aboutInfo = [
  {
    icon: FaLightbulb,
    title: 'Innovative',
    description: 'I love creating unique solutions to complex problems with cutting-edge technologies.',
    color: 'text-purple',
  },
  {
    icon: FaPaintBrush,
    title: 'Design Oriented',
    description: 'Beautiful design and user experience are at the heart of everything I create.',
    color: 'text-pink',
  },
  {
    icon: FaCode,
    title: 'Clean Code',
    description: 'I write maintainable, efficient code following best practices and modern patterns.',
    color: 'text-purple',
  },
]

export const skills = [
  {
    title: 'Frontend Development',
    icon: FaReact,
    description: 'Building responsive, accessible, and polished user interfaces for real projects.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    title: 'Backend Development',
    icon: FaServer,
    description: 'Creating secure server-side logic, APIs, authentication flows, and scalable project backends.',
    tags: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'Clerk', 'Inngest', 'Gemini API'],
  },
  {
    title: 'Database Management',
    icon: FaDatabase,
    description: 'Handling application data, schema design, persistence, and efficient data access.',
    tags: ['MongoDB', 'Mongoose', 'Collections', 'CRUD', 'Data Modeling', 'Validation'],
  },
]

export const projects = [
  {
    title: 'Axis AI',
    description: 'AI-powered career guidance platform with ATS resume analysis, personalized roadmaps, real-time AI chat, and mock interviews.',
    image: projectImg5,
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Clerk', 'Gemini API'],
    icons: [FaRobot, FaReact, FaNodeJs],
    highlights: [
      'Engineered ATS-based resume analysis, roadmap generation, AI chat, and AI-driven mock interview workflows.',
      'Integrated Gemini API with prompt engineering, context-aware responses, and structured JSON parsing.',
      'Built a secure RESTful backend with JWT/Clerk authentication, session management, and MongoDB data handling.',
    ],
    demo: 'https://github.com/anjalibind17/axis-ai-career',
    code: 'https://github.com/anjalibind17/axis-ai-career',
  },
  {
    title: 'DesiDeal',
    description: 'Scalable full-stack e-commerce platform with secure authentication, optimized product browsing, seller tools, and checkout workflows.',
    image: projectImg1,
    tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Clerk', 'Inngest'],
    icons: [FaShoppingBag, FaReact, FaDatabase],
    highlights: [
      'Engineered product browsing, cart, checkout, and authentication flows for a full-stack shopping experience.',
      'Developed a Seller Dashboard for product management, inventory control, dynamic pricing, and order tracking.',
      'Implemented Inngest event workflows for order lifecycle automation, stock synchronization, and email notifications.',
    ],
    demo: 'https://desi-deal.vercel.app',
    code: 'https://github.com/anjalibind17/DesiDeal',
  },
  {
    title: 'AI-Network-Intrusion-Detection',
    description: 'Cybersecurity project for detecting network intrusion patterns and analyzing malicious traffic with machine learning workflows.',
    image: projectImg4,
    tech: ['Python', 'Machine Learning', 'Cybersecurity', 'Data Analysis'],
    icons: [FaShieldAlt, FaDatabase, FaCode],
    highlights: [
      'Built an intrusion detection workflow to classify suspicious network activity and security events.',
      'Processed network traffic data for model-ready features and threat pattern analysis.',
      'Focused on practical cybersecurity monitoring for abnormal connection and attack behavior.',
    ],
    demo: 'https://ai-network-intrusion-detection-vfgvzwebx87mi8g4ktgglq.streamlit.app/',
    code: 'https://github.com/anjalibind17/AI-Network-Intrusion-Detection',
  },
  {
    title: 'SearchImage',
    description: 'A simple image search web app using the Unsplash API with image preview, external open, and direct download support.',
    image: projectImg6,
    tech: ['HTML', 'CSS', 'JavaScript', 'Unsplash API'],
    icons: [FaSearch, FaRobot, FaReact],
    demo: 'https://search-image-peach.vercel.app',
    code: 'https://github.com/anjalibind17/SearchImage',
  },
  {
    title: 'Portfolio',
    description: 'A responsive personal portfolio website showcasing skills, projects, experience, and contact details with a polished UI.',
    image: projectImg2,
    tech: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Responsive UI'],
    icons: [FaReact, FaPaintBrush, FaCode],
    highlights: [
      'Built a responsive portfolio layout with hero, skills, projects, experience, and contact sections.',
      'Added smooth animations and modern styling for a polished personal brand presentation.',
      'Structured project data and reusable components for easy future updates.',
    ],
    demo: '#',
    code: 'https://github.com/anjalibind17',
  },
  {
    title: 'Project Management',
    description: 'A project management web app for organizing tasks, tracking progress, and managing team workflows efficiently.',
    image: projectImg3,
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    icons: [FaReact, FaServer, FaDatabase],
    highlights: [
      'Created task and project workflows for tracking work across different stages.',
      'Designed clean dashboards for project visibility, progress monitoring, and team coordination.',
      'Built reusable frontend and backend structure for scalable project features.',
    ],
    demo: '#',
    code: 'https://github.com/anjalibind17',
  },
]

export const codingPlatforms = [
  {
    name: 'LeetCode',
    icon: SiLeetcode,
    profile: 'https://leetcode.com/u/anjalibind15/',
    handle: 'anjalibind15',
    solved: 'Auto update',
    rating: 'Auto update',
    highlight: 'Track DSA problems, streaks, and contest progress.',
    stats: ['Problems Solved', 'Contest Rating', 'Global Rank'],
    color: 'text-yellow-400',
  },
  {
    name: 'CodeChef',
    icon: SiCodechef,
    profile: 'https://www.codechef.com/users/anjali_bind17',
    handle: 'anjali_bind17',
    solved: 'Auto update',
    rating: 'Auto update',
    highlight: 'Keep competitive programming ratings and contest records in one place.',
    stats: ['Stars', 'Rating', 'Best Rank'],
    color: 'text-orange-300',
  },
  {
    name: 'Codeforces',
    icon: SiCodeforces,
    profile: 'https://codeforces.com/profile/anjalibind17',
    handle: 'anjalibind17',
    solved: 'Auto update',
    rating: 'Auto update',
    highlight: 'Show Codeforces handle, rating history, and regular practice growth.',
    stats: ['Current Rating', 'Max Rating', 'Problems Solved'],
    color: 'text-sky-300',
  },
]

export const workData = [
  {
    role: 'Cybersecurity Intern',
    company: 'Vodafone Idea Foundation',
    duration: 'Dec 2025 - Jan 2026',
    location: 'Remote',
    description: 'Worked on network traffic analysis and built an AI-based Network Intrusion Detection System prototype.',
    certificate: 'https://drive.google.com/file/d/1u-UIiDWMtotReoWAz9Wu1hOrJX7Pyj4n/view?usp=drive_link',
    project: 'https://ai-network-intrusion-detection-vfgvzwebx87mi8g4ktgglq.streamlit.app/',
    bullets: [
      'Analyzed network traffic patterns to identify vulnerabilities, suspicious activities, and unauthorized access attempts.',
      'Evaluated existing security protocols and controls to strengthen threat detection and mitigation strategies.',
      'Developed a prototype AI-based Network Intrusion Detection System (NIDS) to automate monitoring and enable early detection of potential threats.',
    ],
    color: 'purple',
  },
  {
    role: 'Open Source Contributor',
    company: 'GirlScript Summer of Code',
    duration: 'Aug 2025 - Oct 2025',
    location: 'Remote',
    description: 'Contributed to open-source projects by improving code, fixing issues, and collaborating through GitHub workflows.',
    certificate: '#',
    project: 'https://github.com/anjalibind17?tab=repositories',
    color: 'pink',
  },
]
