import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function createRoadmap(domain: string) {
  if (domain === "AI/ML") {
    return JSON.stringify([
      {
        phase_name: "Dataset Collection & Exploration",
        description: "Gather and understand the core data. This phase is critical to identifying potential bias, missing values, and the general shape of the required embeddings.",
        tasks: ["Gather user-item interaction data", "Clean missing values", "Normalize records", "Create train/test split"],
        deliverable: "Prepared & Cleaned Dataset",
        skills_learned: ["Pandas", "Data Cleaning", "EDA"],
        estimated_hours: 6,
        difficulty: "Easy",
        resume_impact: "Demonstrates fundamental data wrangling."
      },
      {
        phase_name: "Feature Engineering",
        description: "Transform raw data into meaningful vectors. You will implement embedding techniques to represent entities in dense vector space.",
        tasks: ["Generate entity embeddings", "Extract metadata features", "Compute similarity vectors"],
        deliverable: "Feature Store / Embeddings",
        skills_learned: ["PyTorch", "Word2Vec", "Feature Engineering"],
        estimated_hours: 12,
        difficulty: "Medium",
        resume_impact: "Crucial for modern ML roles."
      },
      {
        phase_name: "Model Training & Architecture",
        description: "Design and train the core algorithm. Whether using collaborative filtering or a deep neural network, this is the brain of your application.",
        tasks: ["Define model architecture", "Set up training loop", "Optimize hyperparameters", "Train on GPU"],
        deliverable: "Trained Model Weights",
        skills_learned: ["Deep Learning", "Optimization", "Model Training"],
        estimated_hours: 20,
        difficulty: "Hard",
        resume_impact: "Shows mastery of algorithmic implementation."
      },
      {
        phase_name: "Evaluation & Metrics",
        description: "Prove your model works. Use industry-standard metrics to validate performance against the test set.",
        tasks: ["Calculate Precision@K", "Calculate Recall@K", "Compute NDCG", "Generate ROC curves"],
        deliverable: "Comprehensive Evaluation Report",
        skills_learned: ["Statistics", "Model Validation", "Metrics"],
        estimated_hours: 8,
        difficulty: "Medium",
        resume_impact: "Proves you are a rigorous, data-driven engineer."
      },
      {
        phase_name: "Deployment & API Integration",
        description: "Bring your model to production. Wrap the model in a highly concurrent API and containerize it for cloud deployment.",
        tasks: ["Build FastAPI wrapper", "Write Dockerfile", "Deploy to AWS/GCP", "Set up monitoring endpoints"],
        deliverable: "Live Inference API",
        skills_learned: ["FastAPI", "Docker", "Cloud Deployment"],
        estimated_hours: 10,
        difficulty: "Medium",
        resume_impact: "Proves end-to-end MLOps capability."
      }
    ]);
  } else if (domain === "Web Development") {
    return JSON.stringify([
      {
        phase_name: "System Design & Schema",
        description: "Plan the architecture before writing code. Design the database schema and map out the API contracts.",
        tasks: ["Design ERD diagrams", "Define API contracts", "Choose tech stack", "Setup repository"],
        deliverable: "Architecture Document & Schema",
        skills_learned: ["System Design", "Database Modeling", "Planning"],
        estimated_hours: 8,
        difficulty: "Medium",
        resume_impact: "Shows senior-level planning skills."
      },
      {
        phase_name: "Backend Infrastructure",
        description: "Build the robust core API. Implement authentication, routing, and database connections.",
        tasks: ["Setup Node.js/Express server", "Implement JWT Auth", "Connect PostgreSQL", "Write core CRUD endpoints"],
        deliverable: "Functional API",
        skills_learned: ["Node.js", "PostgreSQL", "Authentication"],
        estimated_hours: 15,
        difficulty: "Medium",
        resume_impact: "Demonstrates solid backend fundamentals."
      },
      {
        phase_name: "Advanced Features (Caching/Sockets)",
        description: "Scale the application. Introduce Redis caching or WebSockets for real-time capabilities to handle heavy traffic.",
        tasks: ["Integrate Redis", "Implement rate limiting", "Add WebSocket support", "Optimize slow queries"],
        deliverable: "Highly Performant Backend",
        skills_learned: ["Redis", "WebSockets", "Performance Optimization"],
        estimated_hours: 20,
        difficulty: "Hard",
        resume_impact: "Critical for high-tier SWE roles."
      },
      {
        phase_name: "Frontend Integration",
        description: "Build the user interface. Consume the API and manage complex client-side state.",
        tasks: ["Setup React/Next.js", "Build UI components", "Integrate state management (Redux/Zustand)", "Connect to API"],
        deliverable: "Interactive Frontend",
        skills_learned: ["React", "State Management", "UI/UX"],
        estimated_hours: 15,
        difficulty: "Medium",
        resume_impact: "Shows full-stack capability."
      },
      {
        phase_name: "CI/CD & Deployment",
        description: "Automate testing and deployment. Ensure your application is highly available and scalable.",
        tasks: ["Write unit tests", "Setup GitHub Actions", "Containerize with Docker", "Deploy to Vercel/AWS"],
        deliverable: "Live Production Application",
        skills_learned: ["CI/CD", "Docker", "DevOps"],
        estimated_hours: 10,
        difficulty: "Medium",
        resume_impact: "Proves you can ship production code."
      }
    ]);
  } else {
    // Generic fallback for Data Science / Other
    return JSON.stringify([
      {
        phase_name: "Data Ingestion Pipeline",
        description: "Build pipelines to consume data from multiple disparate sources.",
        tasks: ["Write web scrapers", "Consume REST APIs", "Parse CSV/JSON", "Store in Data Lake"],
        deliverable: "Raw Data Repository",
        skills_learned: ["Python", "Requests", "Data Ingestion"],
        estimated_hours: 10,
        difficulty: "Medium",
        resume_impact: "Shows data engineering skills."
      },
      {
        phase_name: "Data Cleaning & Transformation",
        description: "Transform raw, messy data into a clean analytical dataset.",
        tasks: ["Handle missing values", "Normalize text", "Deduplicate records", "Format timestamps"],
        deliverable: "Clean Data Warehouse",
        skills_learned: ["Pandas", "SQL", "ETL"],
        estimated_hours: 15,
        difficulty: "Medium",
        resume_impact: "Crucial for Data Analyst/Scientist roles."
      },
      {
        phase_name: "Statistical Analysis",
        description: "Perform deep statistical analysis to find correlations and hidden insights.",
        tasks: ["Compute descriptive statistics", "Run hypothesis testing", "Identify correlations", "Perform clustering"],
        deliverable: "Statistical Insights Report",
        skills_learned: ["Statistics", "SciPy", "Math"],
        estimated_hours: 12,
        difficulty: "Hard",
        resume_impact: "Demonstrates strong analytical rigor."
      },
      {
        phase_name: "Data Visualization",
        description: "Communicate findings effectively using modern charting libraries.",
        tasks: ["Build interactive dashboards", "Create heatmaps", "Plot time-series", "Design executive summaries"],
        deliverable: "Interactive Dashboard",
        skills_learned: ["Tableau", "Matplotlib", "D3.js"],
        estimated_hours: 10,
        difficulty: "Medium",
        resume_impact: "Proves ability to communicate with stakeholders."
      },
      {
        phase_name: "Automated Reporting",
        description: "Automate the entire pipeline to generate reports on a schedule.",
        tasks: ["Set up Airflow/Cron", "Generate PDF reports", "Configure email alerts", "Monitor pipeline health"],
        deliverable: "Automated Pipeline",
        skills_learned: ["Airflow", "Automation", "Python"],
        estimated_hours: 8,
        difficulty: "Medium",
        resume_impact: "Shows production-level workflow automation."
      }
    ]);
  }
}

async function main() {
  console.log("Seeding database with dynamic roadmaps...");

  // Clean existing data
  await prisma.userProblemProgress.deleteMany({});
  await prisma.userProjectProgress.deleteMany({});
  await prisma.problemBank.deleteMany({});
  await prisma.projectBank.deleteMany({});

  // ----------------------------------------------------
  // BASE PROBLEMS
  // ----------------------------------------------------
  const baseProblems = [
    { title: "Two Sum", topic: "Arrays", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/two-sum", role_tags: "Software Engineer, Backend Engineer, Data Scientist, ML Engineer" },
    { title: "Best Time to Buy and Sell Stock", topic: "Arrays", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock", role_tags: "Software Engineer, Frontend Engineer" },
    { title: "LRU Cache", topic: "System Design", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/lru-cache", role_tags: "Software Engineer, Backend Engineer" },
    { title: "Implement Trie (Prefix Tree)", topic: "Trees", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/implement-trie-prefix-tree", role_tags: "Software Engineer" },
    { title: "Top K Frequent Elements", topic: "Hash Maps", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/top-k-frequent-elements", role_tags: "Software Engineer, ML Engineer" },
    { title: "Build a Neural Network from Scratch", topic: "Deep Learning", difficulty: "Hard", platform: "NeetCode", url: "https://neetcode.io", role_tags: "ML Engineer, Data Scientist" },
    { title: "SQL Basics: Select All", topic: "SQL", difficulty: "Easy", platform: "HackerRank", url: "https://hackerrank.com", role_tags: "Data Scientist, Data Analyst, Backend Engineer" },
    { title: "Design Twitter", topic: "System Design", difficulty: "Hard", platform: "CodeStudio", url: "https://codingninjas.com", role_tags: "Backend Engineer, Software Engineer" },
    { title: "Valid Anagram", topic: "Strings", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/valid-anagram", role_tags: "Software Engineer, Frontend Engineer" },
    { title: "Binary Search", topic: "Algorithms", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/binary-search", role_tags: "Software Engineer, ML Engineer, Data Scientist" },
  ];

  const topics = ["Arrays", "Strings", "Linked Lists", "Stacks", "Queues", "Trees", "BST", "Heap", "Graphs", "Greedy", "Dynamic Programming", "Backtracking", "System Design", "SQL", "Python", "ML Fundamentals", "Deep Learning", "Statistics"];
  const roles = ["Software Engineer", "ML Engineer", "Data Scientist", "Frontend Engineer", "Backend Engineer"];
  const diffs = ["Easy", "Medium", "Hard"];
  const plats = ["LeetCode", "GeeksForGeeks", "NeetCode", "Striver A2Z Sheet", "CodeStudio", "HackerRank", "InterviewBit"];

  const problemsToInsert = [];
  
  for (const bp of baseProblems) {
    problemsToInsert.push({ ...bp, estimated_time: Math.floor(Math.random() * 40) + 10 });
  }

  for (let i = baseProblems.length; i < 500; i++) {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    const diff = diffs[Math.floor(Math.random() * diffs.length)];
    const plat = plats[Math.floor(Math.random() * plats.length)];
    
    problemsToInsert.push({
      title: `${topic} Challenge ${i}`,
      topic: topic,
      difficulty: diff,
      platform: plat,
      url: `https://example.com/problem/${i}`,
      role_tags: `${role}, Software Engineer`,
      estimated_time: Math.floor(Math.random() * 40) + 10,
    });
  }

  console.log("Inserting 500 problems...");
  await prisma.problemBank.createMany({ data: problemsToInsert });

  // ----------------------------------------------------
  // BASE PROJECTS
  // ----------------------------------------------------
  const baseProjects = [
    {
      title: "Semantic Search Engine",
      description: "Build a highly scalable search engine using vector embeddings and Faiss to perform semantic search across millions of documents.",
      difficulty: "Advanced",
      role_tags: "ML Engineer, Data Scientist",
      tech_stack: "Python, FastAPI, SentenceTransformers, FAISS",
      estimated_duration: "3 Weeks",
      skills_covered: "Vector Databases, NLP, Embeddings, API Design",
      github_links: null,
      industry_category: "AI/ML",
      resume_value_score: 95,
      architecture_guide: createRoadmap("AI/ML")
    },
    {
      title: "Distributed Chat Application",
      description: "Create a real-time distributed chat system using WebSockets, Redis pub/sub, and horizontal scaling strategies.",
      difficulty: "Advanced",
      role_tags: "Software Engineer, Backend Engineer",
      tech_stack: "Node.js, WebSockets, Redis, React",
      estimated_duration: "4 Weeks",
      skills_covered: "System Design, Real-time Communication, Redis, React",
      github_links: null,
      industry_category: "Web Development",
      resume_value_score: 90,
      architecture_guide: createRoadmap("Web Development")
    },
    {
      title: "LLM RAG Assistant",
      description: "Develop a Retrieval-Augmented Generation chatbot that can answer questions based on a private knowledge base of PDF documents.",
      difficulty: "Intermediate",
      role_tags: "ML Engineer, Software Engineer",
      tech_stack: "LangChain, OpenAI API, Next.js, Pinecone",
      estimated_duration: "2 Weeks",
      skills_covered: "RAG, Prompt Engineering, LangChain, Next.js",
      github_links: null,
      industry_category: "AI/ML",
      resume_value_score: 88,
      architecture_guide: createRoadmap("AI/ML")
    },
    {
      title: "URL Shortener",
      description: "A highly concurrent URL shortener system designed to handle heavy read/write traffic with caching and distributed counters.",
      difficulty: "Intermediate",
      role_tags: "Backend Engineer, Software Engineer",
      tech_stack: "Next.js, Node.js, PostgreSQL, Redis",
      estimated_duration: "1 Week",
      skills_covered: "System Design, Caching, Database Schema, Rate Limiting",
      github_links: null,
      industry_category: "Web Development",
      resume_value_score: 85,
      architecture_guide: createRoadmap("Web Development")
    },
    {
      title: "Fraud Detection System",
      description: "Implement an end-to-end machine learning pipeline that ingests streaming transaction data and predicts fraudulent activity.",
      difficulty: "Advanced",
      role_tags: "Data Scientist, ML Engineer",
      tech_stack: "Python, XGBoost, Pandas, FastAPI",
      estimated_duration: "4 Weeks",
      skills_covered: "Machine Learning, Classification, XGBoost, Data Cleaning",
      github_links: null,
      industry_category: "FinTech",
      resume_value_score: 92,
      architecture_guide: createRoadmap("Data Science")
    }
  ];

  const projectTopics = [
    { title: "E-Commerce Platform", domain: "Web Development" },
    { title: "Analytics Dashboard", domain: "Data Science" },
    { title: "IoT Pipeline", domain: "Data Science" },
    { title: "Crypto Tracker", domain: "Web Development" },
    { title: "Social Media Clone", domain: "Web Development" },
    { title: "Video Streaming Service", domain: "Web Development" },
    { title: "Customer Churn Predictor", domain: "AI/ML" }
  ];
  
  const projectsToInsert = [];
  
  for (const bp of baseProjects) {
    projectsToInsert.push(bp);
  }

  // Generate up to 200
  for (let i = baseProjects.length; i < 200; i++) {
    const role = roles[Math.floor(Math.random() * roles.length)];
    const diff = diffs[Math.floor(Math.random() * diffs.length)];
    const pTopic = projectTopics[Math.floor(Math.random() * projectTopics.length)];

    projectsToInsert.push({
      title: `${pTopic.title} Version ${i}`,
      description: `A comprehensive project building a ${pTopic.title.toLowerCase()} to demonstrate skills in modern architectures.`,
      difficulty: diff,
      role_tags: `${role}, Software Engineer`,
      tech_stack: "React, Node.js, PostgreSQL",
      estimated_duration: `${Math.floor(Math.random() * 4) + 1} Weeks`,
      skills_covered: "Fullstack Development, API Design, Database Modeling",
      github_links: null,
      industry_category: pTopic.domain,
      resume_value_score: Math.floor(Math.random() * 30) + 60,
      architecture_guide: createRoadmap(pTopic.domain)
    });
  }

  console.log("Inserting 200 dynamic projects...");
  await prisma.projectBank.createMany({ data: projectsToInsert });

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
