export const SITE_CONFIG = {
  name: "Clayton Medical Centre",
  description: "Modern, comprehensive medical care for the Clayton community.",
  url: "https://claytonfmc.com.au/",
  logo: "https://res.cloudinary.com/dwjdykbck/image/upload/v1774175604/logo_jvjpmz.png",
  contact: {
    phone: "(03) 9000 0000",
    email: "info@claytonfmc.com.au",
    address: "273A Clayton Rd, Clayton VIC 3168",
  },
  socials: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  },
};

export const NAVIGATION_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Our Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

export const HERO_SLIDES = [
  {
    id: "slide-1",
    title: "Compassionate Healthcare for Your Family",
    subtitle: "Experience modern medical care tailored to your unique needs.",
    image: "url('https://res.cloudinary.com/dwjdykbck/image/upload/v1774175349/doctor-with-face-mask-against-covid19-discussing-with-nurse-hospital-waiting-area-disabled-senior-woman-wheelchair-waiting-examination-assistant-working-reception-computer_ojlv7y.jpg')", 
  },
  {
    id: "slide-2",
    title: "State-of-the-Art Facilities",
    subtitle: "Equipped with the latest medical technology for accurate diagnoses.",
    image: "url('https://res.cloudinary.com/dwjdykbck/image/upload/v1774175344/close-up-african-american-hand-holding-stethoscope_h9es4h.jpg')",
  },
  {
    id: "slide-3",
    title: "Expert Specialists On Call",
    subtitle: "A multi-disciplinary team ensuring comprehensive care.",
    image: "url('https://res.cloudinary.com/dwjdykbck/image/upload/v1774175341/indian-doctor-receives-patient-tells-him-about-results-tests-medicine-health_ahewrw.jpg')",
  },
  {
    id: "slide-4",
    title: "Dedicated to Your Well-being",
    subtitle: "Focusing on preventative care to keep you and your family healthy.",
    image: "url('https://res.cloudinary.com/dwjdykbck/image/upload/v1774175334/young-handsome-physician-medical-robe-with-stethoscope_abjksz.jpg')",
  }
];

export const ABOUT_DATA = {
  title: "A Legacy of Care in Clayton",
  description: "For over 20 years, Clayton Medical Centre has been at the forefront of community health. Our patient-first philosophy ensures you're heard, respected, and treated with the highest medical standards.",
  stats: [
    { label: "Years Experience", value: "20+" },
    { label: "Happy Patients", value: "10k+" },
    { label: "Specialists", value: "25" },
  ]
};

export const SERVICES_DATA = [
  { id: "general-dentistry", title: "General Dentistry", description: "Comprehensive dental care for all ages.", icon: "🦷" },
  { id: "antenatal-care", title: "Antenatal Shared Care", description: "Expert support during pregnancy.", icon: "🤰" },
  { id: "minor-surgical", title: "Minor Surgical Procedures", description: "Safe and effective in-clinic surgeries.", icon: "🏥" },
  { id: "vaccinations", title: "Vaccinations", description: "Immunization for children and adults.", icon: "💉" },
  { id: "general-practice", title: "General Practice", description: "Comprehensive medical care.", icon: "⚕️" },
  { id: "pathology", title: "On-site Pathology", description: "Fast and accurate blood tests.", icon: "🔬" },
];

export const DOCTORS_DATA = [
  {
    name: "Dr. Deepani Perera",
    title: "FRACGP",
    specialty: "General Practitioner",
    languages: ["English", "Sinhalese"],
    interests: ["Preventative Health", "Chronic Disease", "Mental Health", "Women's Health", "Paediatrics"],
    shortBio: "FRACGP with 12+ years of experience in both metropolitan and rural Australia.",
    photo: "https://res.cloudinary.com/dwjdykbck/image/upload/v1774175341/indian-doctor-receives-patient-tells-him-about-results-tests-medicine-health_ahewrw.jpg",
    fullBio: [
      "Dr Deepani is a fellow of the Royal Australian College of General Practitioners, and has been working as an experienced GP in both Metropolitan and rural Australia over 12 years.",
      "She completed her medical degree at Peradeniya University in Sri Lanka in 2001, gaining valuable experience working across a range of hospital specialties including medical and surgical disciplines, mental health, obstetrics and gynaecology, cardiology, paediatrics and General Practice. She practiced in Sri Lanka for several years before deciding to make the move to Australia with her husband and two daughters.",
      "She enjoys all aspects of general practice consulting, with clinical interests in preventative health and chronic disease management, mental health, paediatrics, and women's health.",
      "Dr Deepani enjoys meeting new patients and providing continuity of care to all. She has a friendly and caring approach and strives to deliver compassionate and personalised care for each and every patient.",
      "Outside of work she loves dancing and long walks in the sun discovering local sights. She enjoys exploring the food scene — particularly Thai food!",
    ],
  },
  {
    name: "Dr. Michael Chen",
    title: "MBBS, FRACGP",
    specialty: "Cardiologist & GP",
    languages: ["English", "Mandarin"],
    interests: ["Cardiovascular Health", "Preventative Care", "Diabetes Management"],
    shortBio: "Leading heart specialist focused on preventative care and chronic disease.",
    photo: "https://res.cloudinary.com/dwjdykbck/image/upload/v1774175334/young-handsome-physician-medical-robe-with-stethoscope_abjksz.jpg",
    fullBio: [
      "Dr Michael Chen brings over 15 years of experience in cardiology and general practice to Clayton Family Medical Centre.",
      "After completing his medical degree at the University of Melbourne, Dr Chen undertook specialist training in cardiology, developing expertise in cardiovascular risk management and preventive cardiology.",
      "He has a particular interest in helping patients manage chronic conditions such as hypertension, diabetes, and high cholesterol through evidence-based medicine and lifestyle interventions.",
      "Dr Chen is passionate about building long-term relationships with his patients, taking a holistic approach that addresses both physical and mental well-being.",
      "Outside of the clinic, he enjoys hiking, cooking, and spending time with his family.",
    ],
  },
  {
    name: "Dr. Emily Roberts",
    title: "MBBS, DCH",
    specialty: "Paediatrician & GP",
    languages: ["English"],
    interests: ["Child Development", "Immunisation", "Adolescent Health", "Behavioural Paediatrics"],
    shortBio: "Dedicated to the health and well-being of children and adolescents.",
    photo: "https://res.cloudinary.com/dwjdykbck/image/upload/v1774175349/doctor-with-face-mask-against-covid19-discussing-with-nurse-hospital-waiting-area-disabled-senior-woman-wheelchair-waiting-examination-assistant-working-reception-computer_ojlv7y.jpg",
    fullBio: [
      "Dr Emily Roberts has dedicated her career to the care of children and adolescents, bringing warmth and expertise to every consultation.",
      "She completed her medical training in London before relocating to Australia, where she gained her Diploma in Child Health and has been practising as a paediatric GP for over 10 years.",
      "Dr Roberts has a special interest in child development, immunisation schedules, and supporting families through adolescent health challenges including mental health and behavioural concerns.",
      "She is known for her patient, child-friendly approach that puts young patients and their families at ease from the very first visit.",
      "When not at work, Emily enjoys painting watercolours, going to the beach with her children, and volunteering at local community health drives.",
    ],
  },
];


export const BANNER_DATA = {
  title: "Ready to prioritize your health?",
  subtitle: "Book your appointment online or call our friendly reception team today.",
  buttonText: "Book Appointment Now"
};

export const COLORS = {
  primary: "#14b8a6",    // Modern Teal
  primaryDark: "#0f766e",
  secondary: "#0ea5e9",  // Modern Blue
  accent: "#f59e0b",     // Amber
  background: "#ffffff", // Light background defined
  surface: "#f8fafc",
  textHeader: "#0f172a",
  textBody: "#334155",
  border: "#e2e8f0",
};
