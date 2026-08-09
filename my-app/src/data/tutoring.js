// Public-facing tutoring content for Ace the Academia.
// Sourced from the student-facing "Online Tutoring Plan" (not the internal strategy).

export const tutoring = {
  intro:
    "We offer online tutoring for learners and university students who need help understanding their work, preparing for tests and examinations, practising questions or getting proper guidance with assignments.",

  audiences: [
    {
      title: "Grade 11 learners",
      text: "Regular support, difficult topics, tests, examinations and practice questions.",
    },
    {
      title: "Grade 12 learners",
      text: "Schoolwork support, past papers, trial examination preparation and final examination revision.",
    },
    {
      title: "Matric upgrades",
      text: "Revision for subjects being upgraded, rebuilding difficult topics and preparing with past papers.",
    },
    {
      title: "University students",
      text: "Support for UWC students and students from other universities who provide their notes, scope and module information.",
    },
  ],

  highSchool: {
    main: ["Mathematics", "Mathematical Literacy", "Physical Sciences"],
    note: "Learners can also enquire about Life Sciences, English Home Language and Computer Applications Technology. These sessions depend on confirmed tutor availability.",
  },

  university: {
    note: "Our main university tutoring areas are Computer Science, Statistics and Mathematics. Mathematics support is currently mainly for first- and second-year work. Students from other universities are welcome to enquire, but must send their notes and scope so we can confirm whether we can assist.",
    computerScience: [
      { year: "First year", modules: "COS101", support: "Problem solving, algorithms, programming, understanding code and preparing for tests or examinations." },
      { year: "First year", modules: "COS114 / COS124", support: "Computing fundamentals, computer systems, software, data and files, basic architecture, networks, Internet concepts and practical computer skills." },
      { year: "Second year", modules: "CSC211", support: "Data structures, algorithms, complexity, efficiency, correctness and problem solving." },
      { year: "Second year", modules: "CSC212", support: "Algorithmic methods, recursion, searching, divide and conquer, greedy methods, dynamic programming and computer architecture." },
      { year: "Third year", modules: "CSC311", support: "Operating systems, computer networks and artificial intelligence." },
      { year: "Third year", modules: "CSC312", support: "Software engineering, UML, human-computer interaction, databases, SQL and machine learning." },
    ],
    statistics: [
      { year: "First year", modules: "STA111 / STA121 or STA151", support: "Descriptive statistics, probability, sampling, regression, confidence intervals, hypothesis testing, chi-square, ANOVA and statistical software. The module code depends on your programme." },
      { year: "Second year", modules: "STA211", support: "Probability theory, distributions, moments, sampling distributions and working with data using statistical software." },
      { year: "Second year", modules: "STA221", support: "Inference, estimation, hypothesis testing, regression, ANOVA and categorical data analysis." },
      { year: "Third year", modules: "STA331", support: "Multivariate distributions, advanced inference, hypothesis testing and statistical programming." },
      { year: "Third year", modules: "STA332", support: "Advanced linear models, regression, ANOVA, statistical software output and report writing." },
    ],
    mathematics:
      "Mathematics support is currently mainly for first- and second-year university work. Send your module outline and scope so we can confirm the topics we can cover.",
  },

  types: [
    { title: "One-on-one tutoring", text: "Individual online support based on your topic, module, test, examination or assignment question." },
    { title: "Group classes", text: "Online classes for learners or students who need help with the same subject, module or topic." },
    { title: "Weekend bootcamps", text: "Focused test or examination preparation, topic revision and past-paper practice." },
    { title: "Assignment guidance", text: "Help understanding the question, planning your approach, working through difficult parts and receiving feedback on your own work." },
  ],

  assignmentPolicy:
    "Ace the Academia provides assignment guidance and academic support. Tutors will not complete assignments on behalf of students, but will help and guide you with your work — explaining concepts, guiding your approach, helping you identify errors and giving feedback so you can complete your own work.",

  howItWorks: [
    "Classes are online through Zoom or Google Meet.",
    "Sessions can be arranged on weekdays or weekends, depending on learner and tutor availability.",
    "One-on-one session times are discussed directly with the learner.",
    "Group class times are agreed after learners needing the same support have registered.",
    "Group learners may be added to a WhatsApp group for reminders, discussion and practice questions.",
    "Tutors can send practice questions through WhatsApp; learners submit attempts and receive feedback.",
  ],

  register: [
    "Contact us on WhatsApp (or through this website) to start.",
    "Send your grade or university year, subject or module, and the topic you need help with.",
    "University students: send your notes, scope, module outline or assignment question where relevant.",
    "Tell us whether you prefer a weekday or weekend session, and one-on-one or group support.",
    "We confirm tutor availability, the session fee and the next steps.",
    "Your session is confirmed once the agreed booking and payment process is completed.",
  ],

  whatToSend: [
    "Your name and contact details",
    "Your grade, university and year of study",
    "Your subject or module code",
    "The topic, test, examination or assignment you need help with",
    "Your notes, scope or module outline (for university support)",
    "Whether you prefer a weekday or weekend session",
    "Whether you want one-on-one support, a group class or a bootcamp",
  ],

  team: "Our current tutoring team includes Mayimunah Nagayi and Arehone. Additional tutors are added only after their subjects, experience and availability have been confirmed.",
};
