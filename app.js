/* ==========================================================================
   INTERACTIVE PORTFOLIO ENGINE - CHEVELI SAI KUMAR
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileNav();
    initTypewriter();
    initProjectModals();
    initProjectFilters();
    initRagTerminal();
    initScrollAnimations();
    initContactForm();
});

/* --------------------------------------------------------------------------
   1. Header scroll effect & Active Spy Link
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky compact navbar
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll spy active class
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        navbar.classList.toggle('open');
        const icon = mobileToggle.querySelector('i');
        if (navbar.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars-staggered';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('open');
            mobileToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
        });
    });
}

/* --------------------------------------------------------------------------
   3. Hero Subtitle Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    const roles = [
        "an AI & Generative AI Engineer.",
        "a Full-Stack Systems Specialist.",
        "a RAG Architect & Systems Builder.",
        "a Spring Boot & React Developer."
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            textElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            textElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at the end of the sentence
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next sentence
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* --------------------------------------------------------------------------
   4. Projects Filtration
   -------------------------------------------------------------------------- */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue || (filterValue === 'fullstack' && category === 'fullstack') || (filterValue === 'ai' && category === 'ai')) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   5. Interactive Project Detail Modals
   -------------------------------------------------------------------------- */
const PROJECT_DATABASE = {
    ragg: {
        title: "AI Policy Intelligence & Document RAG Platform",
        subtitle: "Enterprise Generative AI & Semantic Retrieval",
        icon: "fa-solid fa-brain",
        tech: "React 18, Vite, NestJS, TypeScript, PostgreSQL (pgvector), Hugging Face, NVIDIA NIM, Ollama",
        features: [
            "<strong>Retrieval-Augmented Generation (RAG)</strong> pipeline connecting local documents to state-of-the-art LLMs.",
            "<strong>Semantic Vector Search</strong> powered by PostgreSQL and pgvector for ultra-precise multi-document indexing.",
            "<strong>Document Ingestion Pipeline</strong> that ingests, cleanses, chunks, and indexes PDF, DOCX, TXT, and web content.",
            "<strong>Metadata Extraction</strong> using agentic prompt workflows for automatic structural tagging.",
            "<strong>JWT Security</strong> & Role-Based Access Control (RBAC) ensuring data siloing and strict query authorization.",
            "<strong>Multilingual Translation Support</strong> allowing policy query resolution across international dialects."
        ],
        outcomes: [
            "Achieved near-instant query matching against thousands of PDF policy pages.",
            "Eliminated LLM hallucinations through scoped system-prompt grounding and strict source citing.",
            "Delivered standard enterprise authorization mechanisms (RBAC) and clean client-server RESTful APIs."
        ],
        architecture: [
            { name: "Document Upload (PDF/DOCX)", type: "client" },
            { name: "Chunking & Embedded Vectors (Hugging Face / Ollama)", type: "process" },
            { name: "Vector Index Storage (PostgreSQL + pgvector)", type: "db" },
            { name: "Context Retrieval + LLM Synthesis (NVIDIA NIM)", type: "ai" },
            { name: "Cited Response Display", type: "client" }
        ]
    },
    labour: {
        title: "Labourly Pro — Contractor & Workforce Management",
        subtitle: "Enterprise Next.js SaaS & AI Operations",
        icon: "fa-solid fa-people-roof",
        tech: "Next.js 15, Supabase, PostgreSQL, React, Tailwind CSS, NVIDIA LLM API, Recharts",
        features: [
            "<strong>Workforce Directory</strong>: Robust tracking profiles for construction contractors, operational teams, and skills logs.",
            "<strong>Payroll & Expense Automation</strong>: Algorithmic invoice generators with automatic tax deduction calculators.",
            "<strong>AI Business Assistant</strong>: An integrated chatbot translating natural-language queries (e.g., '/total spending last month') into instant SQL queries against the DB.",
            "<strong>Interactive Analytics Dashboards</strong>: Live financial data and attendance statistics plotted beautifully via Recharts.",
            "<strong>PDF/Excel Exporters</strong>: Rapid downloads for transaction sheets, audits, and contractor logs."
        ],
        outcomes: [
            "Minimized administrative payroll overhead by roughly 40% using automated workflows.",
            "Empowered non-technical coordinators to fetch database answers instantly via natural language AI integrations.",
            "Engineered a ultra-responsive responsive dashboard loading key metrics within 200ms."
        ],
        architecture: [
            { name: "Operational Client Dashboard (Next.js)", type: "client" },
            { name: "Supabase Authentication & Core Syncing", type: "process" },
            { name: "PostgreSQL Database Structures", type: "db" },
            { name: "NVIDIA LLM Text-to-SQL Compiler", type: "ai" },
            { name: "Recharts Visualizations & Excel Reports", type: "client" }
        ]
    },
    ybr360: {
        title: "YBR 360 Cricket Arena — Booking & Payments",
        subtitle: "Full-Stack Online Reservation & Scheduling Hub",
        icon: "fa-solid fa-medal",
        tech: "React 19, TypeScript, NestJS, PostgreSQL, TypeORM, Tailwind CSS, JWT Auth, OTP Service",
        features: [
            "<strong>Real-time Slot Calendars</strong>: Dynamic booking selectors showcasing current arena occupancy with immediate synchronization.",
            "<strong>Strict Scheduling Conflict Prevention</strong>: Multi-threaded transaction isolation preventing overlap slot reservations.",
            "<strong>UPI Payment & Screenshot Validation</strong>: Seamless checkout capturing UTR codes and verifying uploads.",
            "<strong>Multi-Tiered Admin Panel</strong>: Interactive dashboards for managing tournament matches, setting dynamic peak pricing, and reviewing logs.",
            "<strong>JWT Session Integrity</strong>: Secure access controls utilizing temporary access tokens and sliding refresh tokens."
        ],
        outcomes: [
            "Automated slot management, eliminating manual phone inquiries and double-booking errors.",
            "Accelerated cashier verification speed through the centralized UTR and payment screenshot reviewer panel.",
            "Supported thousands of active players registering, reviewing tournaments, and checking schedules."
        ],
        architecture: [
            { name: "Live Booking Page (React 19)", type: "client" },
            { name: "NestJS APIs & Dynamic Price Calculators", type: "process" },
            { name: "TypeORM Entities & Relational PostgreSQL", type: "db" },
            { name: "OTP Verification Gateway", type: "process" },
            { name: "UTR / Screenshot Approvals Admin Panel", type: "client" }
        ]
    },
    kunjara: {
        title: "Kunjara Travels — Fleet Booking & Management",
        subtitle: "Interactive Geolocation & Booking Portal",
        icon: "fa-solid fa-route",
        tech: "Next.js, React 19, TypeScript, Tailwind CSS, OpenStreetMap API, OSRM API, WhatsApp API",
        features: [
            "<strong>Real-Time Location Queries</strong>: Autofill search fields powered by OpenStreetMap coordinates.",
            "<strong>Interactive Trip Router</strong>: Seamless mapping coordinates with accurate OSRM mileage calculations.",
            "<strong>Automated Fare Estimator</strong>: Real-time price quotes based on vehicle capacity, travel hours, and route distance.",
            "<strong>Vehicle Recommendations</strong>: Recommends sedans, SUVs, or buses based on group sizes and luggage requirements.",
            "<strong>WhatsApp API Hook</strong>: Automatically bundles booking details and opens a pre-composed message for direct dispatcher validation."
        ],
        outcomes: [
            "Streamlined customer transit bookings, saving time spent during negotiations.",
            "Enabled recruiters and clients to get precise price transparency based on real road miles rather than coordinate radii.",
            "Improved reservation closure rates by transitioning users from query to direct WhatsApp agent connection."
        ],
        architecture: [
            { name: "Next.js Vehicle Booking Page", type: "client" },
            { name: "OpenStreetMap Location Search API", type: "process" },
            { name: "OSRM Route & Fare Engines", type: "process" },
            { name: "WhatsApp Booking Relay API", type: "client" }
        ]
    }
};

function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const modalContent = document.getElementById('modal-project-details');
    const triggerButtons = document.querySelectorAll('.btn-project-details');

    function openModal(projectId) {
        const data = PROJECT_DATABASE[projectId];
        if (!data) return;

        // Generate architecture diagram HTML
        let archHTML = '';
        data.architecture.forEach((node, i) => {
            const activeClass = node.type === 'ai' ? 'active-cyan' : node.type === 'db' ? 'active-violet' : '';
            archHTML += `
                <div class="arch-node ${activeClass}">
                    ${node.name}
                </div>
            `;
            if (i < data.architecture.length - 1) {
                archHTML += `<div class="arch-arrow-down"><i class="fa-solid fa-chevron-down"></i></div>`;
            }
        });

        // Generate feature items
        let featuresHTML = '';
        data.features.forEach(f => {
            featuresHTML += `<li>${f}</li>`;
        });

        // Generate outcomes items
        let outcomesHTML = '';
        data.outcomes.forEach(o => {
            outcomesHTML += `<li><i class="fa-solid fa-circle-check"></i> <span>${o}</span></li>`;
        });

        // Inject content
        modalContent.innerHTML = `
            <div class="modal-header-section">
                <div class="modal-title-row">
                    <i class="${data.icon}"></i>
                    <h2>${data.title}</h2>
                </div>
                <div class="modal-subtitle-tech">
                    <strong>Tech Stack:</strong> ${data.tech}
                </div>
            </div>
            
            <div class="modal-grid-layout">
                <!-- Left Detail Column -->
                <div class="modal-left-details">
                    <div class="modal-section-box">
                        <h4>Key System Features</h4>
                        <ul class="modal-feature-list">
                            ${featuresHTML}
                        </ul>
                    </div>
                    
                    <div class="modal-section-box modal-outcome-box">
                        <h4>Business Impact & Outcomes</h4>
                        <ul class="modal-outcome-list">
                            ${outcomesHTML}
                        </ul>
                    </div>
                </div>
                
                <!-- Right Architecture Column -->
                <div class="modal-right-architecture">
                    <div class="arch-card-glass">
                        <h4><i class="fa-solid fa-network-wired text-cyan"></i> Conceptual Architecture</h4>
                        <div class="arch-visual-container">
                            ${archHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }

    triggerButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    
    // Close modal on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
}

/* --------------------------------------------------------------------------
   6. Vector Database & RAG Simulator Console
   -------------------------------------------------------------------------- */
const VECTOR_CHUNKS = [
    {
        id: "chunk_01",
        source: "Sai Kumar Biography",
        score: "0.985",
        text: "Cheveli Sai Kumar is an AI and Full-Stack Engineer from Hyderabad, TS. He specializes in Generative AI, Retrieval-Augmented Generation (RAG), Spring Boot, Next.js, and PostgreSQL vector operations."
    },
    {
        id: "chunk_02",
        source: "AI Policy Platform (ragg)",
        score: "0.962",
        text: "ragg is an AI Policy Intelligence document system utilizing pgvector semantic search, Hugging Face/NVIDIA NIM embeddings, and NestJS, enabling secure chat-with-PDF inquiries."
    },
    {
        id: "chunk_03",
        source: "Labourly Pro Platform",
        score: "0.957",
        text: "Labourly Pro is an enterprise Next.js 15 workforce portal integrating Supabase, automated payroll pipelines, analytical charts via Recharts, and NVIDIA LLM natural language analytics queries."
    },
    {
        id: "chunk_04",
        source: "YBR 360 Cricket Arena",
        score: "0.932",
        text: "YBR 360 is a booking app with instant transaction selectors, Spring/Nest backend schemas, transaction isolation for double-booking checks, and secure UPI UTR checks with screenshot uploads."
    },
    {
        id: "chunk_05",
        source: "Kunjara Travels Portal",
        score: "0.914",
        text: "Kunjara Travels leverages NextJS, React, OpenStreetMap locations, and OSRM router engines to deliver dynamic trip mileage maps, automatic price quotes, and direct WhatsApp relays."
    },
    {
        id: "chunk_06",
        source: "Zensark Technologies Internship",
        score: "0.945",
        text: "Since March 2026, Cheveli Sai Kumar works as a Software Development Intern at Zensark Technologies in Hyderabad, building scalable Java backend systems, REST endpoints, and dynamic React frontends."
    },
    {
        id: "chunk_07",
        source: "Engineering Education & Training",
        score: "0.912",
        text: "Graduated with a Bachelor of Engineering in Civil Engineering from Matrusri Engineering College (2019-2023) and holds professional certifications in Java Full Stack development (Hibernate, Spring Boot, JDBC)."
    },
    {
        id: "chunk_08",
        source: "Sai Kumar Contact Details",
        score: "0.992",
        text: "Contact info: saichevelly@gmail.com, Phone: 9550017985, Location: Hyderabad, Telangana."
    }
];

function initRagTerminal() {
    const inputField = document.getElementById('terminal-input-field');
    const sendBtn = document.getElementById('terminal-send-btn');
    const outputConsole = document.getElementById('terminal-output');
    const chunksContainer = document.getElementById('retrieved-chunks-container');
    const queryChips = document.querySelectorAll('.query-chip');

    let isTypingResponse = false;

    function formatSystemMessage(msg) {
        return `<div class="console-line system-msg">[SYSTEM] ${msg}</div>`;
    }

    function formatUserMessage(msg) {
        return `<div class="console-line user-query">guest@saikumar:~$ query --prompt "${msg}"</div>`;
    }

    function formatThinkingMessage() {
        return `<div class="console-line ai-thinking" id="thinking-indicator">&gt; Analyzing query embeddings, searching vector index...</div>`;
    }

    function formatResponseLine(text) {
        return `<div class="console-line ai-response">${text}</div>`;
    }

    function formatErrorLine(err) {
        return `<div class="console-line error-response">[ERROR] ${err}</div>`;
    }

    function addChunkCard(chunk) {
        return `
            <div class="chunk-card">
                <div class="chunk-card-meta">
                    <span>Src: ${chunk.source}</span>
                    <span class="chunk-card-score">Sim: ${chunk.score}</span>
                </div>
                <div class="chunk-card-text">
                    "${chunk.text}"
                </div>
            </div>
        `;
    }

     const RAG_INTENTS = [
        {
            name: "bio",
            keywords: ['who', 'about', 'sai', 'kumar', 'bio', 'summary', 'profile', 'background', 'yourself', 'introduce', 'identity', 'person', 'cheveli'],
            chunks: ["chunk_01", "chunk_06", "chunk_07"],
            response: "Cheveli Sai Kumar is an AI & Full-Stack Systems Specialist based in Hyderabad. He specializes in Generative AI, Retrieval-Augmented Generation (RAG) pipelines, Spring Boot, React, Next.js, and PostgreSQL. He is currently a Software Development Intern at Zensark Technologies and a graduate of Matrusri Engineering College (Bachelor of Engineering in Civil Engineering)."
        },
        {
            name: "education",
            keywords: ['education', 'college', 'study', 'studied', 'degree', 'university', 'matrusri', 'engineering', 'bachelor', 'school', 'academy', 'learn', 'certifications', 'certification', 'training', 'graduate', 'graduated', 'qualification', 'qualifications'],
            chunks: ["chunk_07", "chunk_01"],
            response: "Sai Kumar graduated with a Bachelor of Engineering in Civil Engineering from Matrusri Engineering College (2019-2023). He also completed professional training and holds certifications in Java Full Stack development, specializing in Hibernate, Spring Boot, and JDBC structures."
        },
        {
            name: "experience",
            keywords: ['work', 'experience', 'job', 'intern', 'internship', 'zensark', 'company', 'career', 'current', 'employed', 'history', 'role', 'roles', 'employer', 'office'],
            chunks: ["chunk_06", "chunk_07"],
            response: "Since March 2026, Sai Kumar works as a Software Development Intern at Zensark Technologies in Hyderabad. In this role, he designs scalable Java backend systems, REST endpoints, and dynamic React frontends, while collaborating within agile development lifecycles."
        },
        {
            name: "skills",
            keywords: ['skill', 'skills', 'stack', 'tech', 'language', 'languages', 'database', 'databases', 'tool', 'tools', 'programming', 'technologies', 'react', 'nextjs', 'nestjs', 'spring', 'java', 'sql', 'typescript', 'postgresql', 'vector', 'pgvector', 'supabase', 'mongodb', 'mysql', 'hibernate', 'node', 'nodejs', 'css', 'html', 'tailwind', 'git'],
            chunks: ["chunk_01", "chunk_06", "chunk_08"],
            response: "Sai Kumar's robust tech stack spans: Languages (Java, TypeScript, SQL), Frontends (React 19, Next.js 15, Tailwind, Shadcn), Backends (Spring Boot, NestJS, Hibernate, NodeJS), Databases (PostgreSQL with pgvector, Supabase, MySQL, MongoDB), and Generative AI (RAG, vector search, NVIDIA NIM APIs)."
        },
        {
            name: "contact",
            keywords: ['contact', 'email', 'phone', 'mail', 'reach', 'number', 'location', 'live', 'address', 'hyderabad', 'portfolio', 'connect', 'github', 'linkedin', 'tel', 'gmail', 'call', 'message', 'mobile', 'site', 'website'],
            chunks: ["chunk_08", "chunk_01"],
            response: "You can connect with Cheveli Sai Kumar via email at saichevelly@gmail.com, or by phone at +91 9550017985. He is based in Hyderabad, Telangana, India."
        },
        {
            name: "ragg",
            keywords: ['ragg', 'policy', 'document', 'pdf', 'hugging', 'nvidia', 'ollama', 'intel', 'intelligence', 'semantic', 'rag'],
            chunks: ["chunk_02", "chunk_01"],
            response: "The AI Policy Intelligence & Document RAG Platform (ragg) is an advanced tool utilizing pgvector semantic search, Hugging Face/Ollama embeddings, and NestJS, enabling secure chat-with-PDF inquiries using scoped system-prompts and strict source citations."
        },
        {
            name: "labourly",
            keywords: ['labour', 'labourly', 'workforce', 'contractor', 'payroll', 'invoice', 'supabase', 'recharts', 'saas'],
            chunks: ["chunk_03", "chunk_01"],
            response: "Labourly Pro is a next-generation workforce and contractor portal built with Next.js 15, Supabase, and PostgreSQL. It features automated payroll calculators, analytics charts powered by Recharts, and an NVIDIA LLM text-to-SQL chatbot."
        },
        {
            name: "ybr360",
            keywords: ['ybr', '360', 'cricket', 'arena', 'booking', 'slot', 'payment', 'screenshot', 'utr', 'slots'],
            chunks: ["chunk_04", "chunk_07"],
            response: "YBR 360 Cricket Arena is a booking system built with React 19, NestJS, and TypeORM. It resolves reservation conflicts using database transaction isolation, integrates secure UPI checkouts, and reviews receipts using an admin reviewer panel."
        },
        {
            name: "kunjara",
            keywords: ['kunjara', 'travel', 'travels', 'fleet', 'distance', 'route', 'map', 'openstreetmap', 'osrm', 'whatsapp'],
            chunks: ["chunk_05", "chunk_07"],
            response: "Kunjara Travels is a transit booking application utilizing Next.js and Tailwind CSS. It integrates OpenStreetMap search fields and OSRM mapping engines to calculate real road distance fares, automatically generating WhatsApp dispatch requests."
        }
    ];

    function getDynamicScore(chunkText, queryText) {
        const queryWords = queryText.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 2);
        if (queryWords.length === 0) return (0.85 + Math.random() * 0.05).toFixed(3);
        
        let matches = 0;
        const cleanText = chunkText.toLowerCase();
        queryWords.forEach(w => {
            if (cleanText.includes(w)) matches++;
        });
        
        const baseScore = 0.85 + (matches / queryWords.length) * 0.14;
        return Math.min(0.999, baseScore + (Math.random() * 0.005)).toFixed(3);
    }

    async function handleQuery(queryText) {
        if (isTypingResponse || !queryText.trim()) return;
        isTypingResponse = true;

        const normalizedQuery = queryText.trim().toLowerCase();

        // Print User Query
        outputConsole.innerHTML += formatUserMessage(queryText);
        outputConsole.scrollTop = outputConsole.scrollHeight;

        // Print Thinking Indicator
        outputConsole.innerHTML += formatThinkingMessage();
        outputConsole.scrollTop = outputConsole.scrollHeight;

        // Reset sidebar message
        chunksContainer.innerHTML = `<div class="empty-chunks-msg">Retrieving nearest neighbors...</div>`;

        // Simulate network / vector match search time (750ms)
        setTimeout(() => {
            // Remove thinking indicator
            const indicator = document.getElementById('thinking-indicator');
            if (indicator) indicator.remove();

            let matchedChunks = [];
            let responseText = "";

            if (normalizedQuery === 'help') {
                matchedChunks = [VECTOR_CHUNKS[0], VECTOR_CHUNKS[7]];
                responseText = "Welcome to the interactive RAG simulator! You can ask natural language questions about Cheveli Sai Kumar. Supported topics include: 'Biography' (who is Sai Kumar), 'Education' (where did you study), 'Experience' (Zensark internship), 'Skills' (languages/frameworks), 'Contact Info', or details about any of his projects: 'ragg', 'Labourly Pro', 'YBR 360', or 'Kunjara Travels'.";
            } else {
                // Perform robust intent categorization via keyword matching
                let bestIntent = null;
                let maxScore = 0;

                RAG_INTENTS.forEach(intent => {
                    let score = 0;
                    intent.keywords.forEach(kw => {
                        const hasKeyword = normalizedQuery.includes(kw);
                        if (hasKeyword) {
                            score += kw.length > 4 ? 2 : 1;
                        }
                    });
                    if (score > maxScore) {
                        maxScore = score;
                        bestIntent = intent;
                    }
                });

                if (bestIntent && maxScore > 0) {
                    matchedChunks = VECTOR_CHUNKS.filter(c => bestIntent.chunks.includes(c.id));
                    responseText = bestIntent.response;
                } else {
                    // Fallback keyword-overlap matching over all VECTOR_CHUNKS
                    VECTOR_CHUNKS.forEach(chunk => {
                        const words = normalizedQuery.split(/\s+/);
                        let matches = 0;
                        words.forEach(w => {
                            if (w.length > 3 && chunk.text.toLowerCase().includes(w)) matches++;
                        });
                        if (matches > 0) {
                            matchedChunks.push(chunk);
                        }
                    });

                    if (matchedChunks.length === 0) {
                        matchedChunks = [VECTOR_CHUNKS[0], VECTOR_CHUNKS[7]];
                        responseText = "I've scanned the knowledge base, but couldn't find a high-confidence semantic match. Cheveli Sai Kumar is an expert Full-Stack & AI Systems Specialist specializing in Generative AI, RAG platforms, Spring Boot, React, and PostgreSQL. Try asking: 'who is Sai Kumar?', 'what is your tech stack?', or 'where do you work?'.";
                    } else {
                        matchedChunks = matchedChunks.slice(0, 3);
                        responseText = "Retrieval Synthesis: Found matches in local vector index. Cheveli Sai Kumar is a Full-Stack Systems Specialist currently interning at Zensark Technologies and graduating from Matrusri Engineering College, with deep expertise in RAG architectures and pgvector tools.";
                    }
                }
            }

            // Populate Sidebar Chunks
            chunksContainer.innerHTML = "";
            matchedChunks.forEach(chunk => {
                const dynamicScore = getDynamicScore(chunk.text, queryText);
                chunksContainer.innerHTML += `
                    <div class="chunk-card">
                        <div class="chunk-card-meta">
                            <span>Src: ${chunk.source}</span>
                            <span class="chunk-card-score">Sim: ${dynamicScore}</span>
                        </div>
                        <div class="chunk-card-text">
                            "${chunk.text}"
                        </div>
                    </div>
                `;
            });

            // Print Retrieval success system info
            const topScore = matchedChunks[0] ? getDynamicScore(matchedChunks[0].text, queryText) : '0.000';
            outputConsole.innerHTML += formatSystemMessage(`pgvector Search Returned ${matchedChunks.length} documents. Index Score: ${topScore}`);
            outputConsole.scrollTop = outputConsole.scrollHeight;

            // Stream AI Response character by character (Simulating live streaming API)
            let textIdx = 0;
            const containerDiv = document.createElement('div');
            containerDiv.className = "console-line ai-response";
            containerDiv.innerHTML = "<strong>AI Response: </strong>";
            outputConsole.appendChild(containerDiv);

            const timer = setInterval(() => {
                if (textIdx < responseText.length) {
                    containerDiv.innerHTML += responseText[textIdx];
                    textIdx++;
                    outputConsole.scrollTop = outputConsole.scrollHeight;
                } else {
                    clearInterval(timer);
                    isTypingResponse = false;
                    outputConsole.innerHTML += `<div class="console-line system-msg">&gt; Session waiting...</div>`;
                    outputConsole.scrollTop = outputConsole.scrollHeight;
                }
            }, 12); // Stream speed

        }, 750);
    }

    // Trigger on send click
    sendBtn.addEventListener('click', () => {
        const txt = inputField.value;
        inputField.value = "";
        handleQuery(txt);
    });

    // Trigger on enter key
    inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const txt = inputField.value;
            inputField.value = "";
            handleQuery(txt);
        }
    });

    // Quick Chips click listeners
    queryChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.getAttribute('data-query');
            handleQuery(query);
        });
    });
}

/* --------------------------------------------------------------------------
   7. Scroll Animations (Fade/Slide-in on Viewport Enter)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
    const animElements = document.querySelectorAll(
        '.project-card, .skill-category-card, .timeline-item, .contact-info, .contact-card-container, .rag-section'
    );

    // Initial setup for CSS transition animation states
    animElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Unobserve after showing to prevent continuous triggering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animElements.forEach(el => {
        observer.observe(el);
    });
}

/* --------------------------------------------------------------------------
   8. Connect Form Submit Simulation
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const statusMsg = document.getElementById('form-status-msg');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('form-name').value;
        const email = document.getElementById('form-email').value;
        const subject = document.getElementById('form-subject').value;
        const message = document.getElementById('form-message').value;

        // Loading button state
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Sending Message...`;
        statusMsg.className = "form-status";
        statusMsg.textContent = "";

        // Asynchronous form submission via FormSubmit AJAX service
        fetch("https://formsubmit.co/ajax/saichevelly@gmail.com", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Submission failed');
        })
        .then(data => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            // Check if FormSubmit requires a one-time activation click for this email
            if (data.success === "false" || data.success === false) {
                statusMsg.className = "form-status success";
                statusMsg.style.color = "#f59e0b"; // Golden/Yellow warning color
                statusMsg.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Action Required: FormSubmit sent an activation link to <strong>saichevelly@gmail.com</strong>. Please check your inbox (or Spam folder) and click the link to activate submissions!`;
                return;
            }
            
            // Successful result
            statusMsg.className = "form-status success";
            statusMsg.style.color = "#10b981";
            statusMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> Connection query sent successfully! Thank you ${name}.`;
            
            // Clear inputs
            form.reset();

            // Clear status after 10s for activation warnings or 5s for successes
            setTimeout(() => {
                statusMsg.innerHTML = "";
            }, 6000);
        })
        .catch(error => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            // Error result
            statusMsg.className = "form-status error";
            statusMsg.style.color = "#f87171";
            statusMsg.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Failed to send request. Please email directly.`;
        });
    });
}
