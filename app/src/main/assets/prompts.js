/**
 * Prompts Data Array
 * Contains all prompt objects with structure:
 * { id, category, icon, title, prompt }
 * 
 * Categories: 'app', 'android', 'prompt', 'document', 'tool', 'image-enhancing'
 */

const prompts = [
  // ===== APP CATEGORY =====
  { id: 1, category: 'app', icon: '📝', title: 'Offline-First Note App', prompt: 'Build a complete offline-first note app with robust search capabilities, tagging, seamless cloud synchronization, and flexible storage options. Include real-time sync, conflict resolution, and end-to-end encryption.' },
  { id: 2, category: 'app', icon: '🎙️', title: 'Premium Podcast Player', prompt: 'Create a premium podcast player featuring advanced playlist management, an intelligent sleep timer, precise chapter markers, variable playback speeds, and queue management. Include downloading for offline listening.' },
  { id: 3, category: 'app', icon: '👻', title: 'Horror Story Reader', prompt: 'Design an immersive horror story reader app with chilling audio narration, atmospheric visual effects (e.g., subtle parallax, dynamic shadows), and interactive story branching with multiple endings.' },
  { id: 4, category: 'app', icon: '🔐', title: 'Secure Password Vault', prompt: 'Build a highly secure password vault app incorporating biometric authentication (fingerprint/face ID), military-grade encryption, password generation, and secure sharing with expiration options.' },
  { id: 5, category: 'app', icon: '🎯', title: 'Habit Tracker Pro', prompt: 'Create a professional habit tracker with advanced streak tracking, customizable reminders, detailed analytics and progress visualization, habit linking, and motivation notifications.' },
  { id: 6, category: 'app', icon: '📺', title: 'Media Planner', prompt: 'Build a comprehensive media planner app for content creators, including scriptwriting tools, storyboard creation, publishing calendars, asset management, and collaboration features.' },
  { id: 7, category: 'app', icon: '💰', title: 'Expense Tracker', prompt: 'Create a fully operational expense tracker with OCR receipt scanning, intelligent categorization, detailed charts and financial reports, budget monitoring, and multi-currency support.' },
  { id: 8, category: 'app', icon: '📚', title: 'Book Catalog', prompt: 'Build a smart book catalog app with ISBN barcode scanning, automatic metadata retrieval (author, genre, publication date), personalized recommendations, and reading progress tracking.' },
  { id: 9, category: 'app', icon: '👨‍🍳', title: 'Recipe Manager', prompt: 'Create a versatile recipe manager with integrated shopping list generation, robust offline support, a nutritional calculator, photo OCR for recipes, and meal planning capabilities.' },
  { id: 10, category: 'app', icon: '💪', title: 'Fitness Log', prompt: 'Build a comprehensive fitness log app with customizable workout templates, interactive progress graphs, personal record (PR) tracking, and AI-powered form correction using device camera.' },
  
  // ===== ANDROID CATEGORY =====
  { id: 11, category: 'android', icon: '🏗️', title: 'Clean Architecture Refactor', prompt: 'Refactor an existing Android application into a modern clean architecture using Jetpack Compose for UI, Hilt for dependency injection, and proper separation of concerns.' },
  { id: 12, category: 'android', icon: '🔄', title: 'Fragment to Compose Migration', prompt: 'Transform a legacy fragment-based Android application into a modern, declarative Jetpack Compose application, ensuring all features are preserved and tests are updated.' },
  { id: 13, category: 'android', icon: '💾', title: 'Offline Caching & Retry Logic', prompt: 'Implement comprehensive offline caching and resilient retry logic within the Android repository layer, ensuring data consistency and graceful degradation.' },
  { id: 14, category: 'android', icon: '🗄️', title: 'Room Schema Definition', prompt: 'Write a complete Room database schema for an application\'s data model, including detailed Entity definitions, Data Access Objects (DAOs), and migration strategies.' },
  { id: 15, category: 'android', icon: '🧠', title: 'ViewModels for All Screens', prompt: 'Generate robust ViewModels for all application screens, incorporating loading, empty, and error states, along with appropriate data handling and lifecycle management.' },
  { id: 16, category: 'android', icon: '🗺️', title: 'Navigation Flows', prompt: 'Create comprehensive navigation flows for key user journeys such as onboarding, dashboard, detail views, and settings. Utilize Jetpack Navigation with type-safe arguments.' },
  { id: 17, category: 'android', icon: '🌙', title: 'Dark Mode & Accessibility', prompt: 'Add full dark mode support, enhance accessibility features (e.g., content descriptions, touch target sizes), and implement proper contrast ratios for WCAG compliance.' },
  { id: 18, category: 'android', icon: '📤', title: 'File Import/Export & Share', prompt: 'Implement secure and user-friendly file import/export functionalities and share intents using Scoped Storage and Storage Access Framework (SAF).' },
  { id: 19, category: 'android', icon: '🔁', title: 'Background Sync with WorkManager', prompt: 'Add reliable background data synchronization using WorkManager, implementing battery-friendly scheduling, network-aware retries, and proper error handling.' },
  { id: 20, category: 'android', icon: '🛡️', title: 'App Hardening & Security', prompt: 'Harden an Android application against common vulnerabilities by implementing input sanitization, secure storage practices, certificate pinning, and obfuscation.' },
  
  // ===== PROMPT CATEGORY =====
  { id: 21, category: 'prompt', icon: '✍️', title: 'Production Gemini Prompt', prompt: 'Rewrite this high-level idea into a production-grade Gemini prompt. The prompt should be highly specific, structured with clear sections, and include examples.' },
  { id: 22, category: 'prompt', icon: '📋', title: 'One-line to Build Spec', prompt: 'Expand this one-line application concept into a complete build specification document. Include detailed sections on features, architecture, tech stack, and deployment.' },
  { id: 23, category: 'prompt', icon: '✂️', title: 'Features to Tasks', prompt: 'Convert a given feature list into a detailed breakdown of implementation tasks, including estimated effort, dependencies, and acceptance criteria.' },
  { id: 24, category: 'prompt', icon: '💻', title: 'Force Complete Code', prompt: 'Generate a developer prompt that explicitly forces the AI to produce complete, runnable, and non-placeholder code for all requirements without shortcuts.' },
  { id: 25, category: 'prompt', icon: '👨‍💼', title: 'Senior Android Architect', prompt: 'Create a prompt making Gemini act as a senior Android architect. The AI should provide expert advice on architecture decisions and best practices.' },
  { id: 26, category: 'prompt', icon: '🧪', title: 'Modular Testing', prompt: 'Build a prompt asking for a modular architecture approach with a strong emphasis on testing. The AI should generate code with unit and integration tests.' },
  { id: 27, category: 'prompt', icon: '🚀', title: 'Rough Idea to Product', prompt: 'Transform a rough product idea into a deployment-ready product prompt. This includes defining target users, core functionality, and success metrics.' },
  { id: 28, category: 'prompt', icon: '📱', title: 'No Root App Prompt', prompt: 'Create a prompt for building an Android application that operates without requiring root access, avoids hidden dependencies, and is suitable for distribution.' },
  { id: 29, category: 'prompt', icon: '🌐', title: 'Full Stack Prompt', prompt: 'Write a comprehensive prompt generating a full-stack solution, encompassing UI design (frontend), business logic (backend), and database schema.' },
  { id: 30, category: 'prompt', icon: '🐛', title: 'Code Repair Prompt', prompt: 'Create a prompt making Gemini act as a code repair and improvement agent. The AI should identify bugs, suggest fixes, refactor code, and improve performance.' },
  
  // ===== DOCUMENT CATEGORY =====
  { id: 31, category: 'document', icon: '📄', title: 'Project Brief', prompt: 'Write a polished project brief for this application. Include an executive summary, a clear problem statement, proposed solution, and success criteria.' },
  { id: 32, category: 'document', icon: '📋', title: 'PRD Document', prompt: 'Turn a product idea into a comprehensive Product Requirements Document (PRD). Detail user stories, acceptance criteria, and functional requirements.' },
  { id: 33, category: 'document', icon: '🏛️', title: 'Technical Spec', prompt: 'Create a detailed technical specification for an entire Android application. Include an architecture diagram, component breakdown, and API specifications.' },
  { id: 34, category: 'document', icon: '📰', title: 'Release Notes v1.0', prompt: 'Write professional release notes for version 1.0 of an application. Highlight new features, significant improvements, and critical bug fixes.' },
  { id: 35, category: 'document', icon: '📖', title: 'README Generator', prompt: 'Generate a comprehensive README.md file for a software project. Include sections for setup instructions, features, usage examples, and contributing guidelines.' },
  { id: 36, category: 'document', icon: '🔒', title: 'Privacy Policy', prompt: 'Create a draft privacy policy for a consumer Android application. Address data collection practices, storage, usage, and user rights.' },
  { id: 37, category: 'document', icon: '⚖️', title: 'Terms of Service', prompt: 'Write terms of service for a mobile productivity app. Cover acceptable use, intellectual property, disclaimers, and limitation of liability.' },
  { id: 38, category: 'document', icon: '❓', title: 'Support FAQ', prompt: 'Create a comprehensive support FAQ for an application. Organize by common issues, troubleshooting steps, account management, and payment.' },
  { id: 39, category: 'document', icon: '📝', title: 'Changelog Template', prompt: 'Write a flexible changelog template for future application updates. Structure it to follow semantic versioning (MAJOR.MINOR.PATCH).' },
  { id: 40, category: 'document', icon: '💼', title: 'Investor Summary', prompt: 'Draft a concise one-page investor summary for a mobile product. Articulate the problem, solution, market opportunity, and business model.' },
  
  // ===== TOOL CATEGORY =====
  { id: 41, category: 'tool', icon: '🧪', title: 'Test Case Generator', prompt: 'Build a prompt that generates detailed test cases from application requirements or user stories. Include test steps, expected results, and edge cases.' },
  { id: 42, category: 'tool', icon: '🔍', title: 'Code Audit Prompt', prompt: 'Create a prompt for auditing code for potential bugs, missing features, security vulnerabilities, performance bottlenecks, and architectural issues.' },
  { id: 43, category: 'tool', icon: '🎨', title: 'UI Refactor Prompt', prompt: 'Generate a prompt for refactoring an existing UI into reusable, modular components. Focus on identifying common patterns and extracting them.' },
  { id: 44, category: 'tool', icon: '🌐', title: 'Web to PWA Prompt', prompt: 'Write a prompt for transforming a standard web application into an Android-friendly Progressive Web App (PWA). Include steps for setup and testing.' },
  { id: 45, category: 'tool', icon: '📊', title: 'Analytics Integration Prompt', prompt: 'Build a prompt for cleanly integrating analytics and event tracking into an application. Specify desired events, parameters, and reporting.' },
  { id: 46, category: 'tool', icon: '🎯', title: 'Onboarding Flow Generator', prompt: 'Create a prompt that generates engaging onboarding screens and UX copy for a new application. Focus on guiding users through core features.' },
  { id: 47, category: 'tool', icon: '🔗', title: 'API Integration Code', prompt: 'Write a prompt producing robust API integration code with built-in error handling, retry mechanisms, and authentication support (e.g., OAuth).' },
  { id: 48, category: 'tool', icon: '💾', title: 'Local-First Storage Strategy', prompt: 'Create a prompt for building a local-first storage strategy for an application. Detail choices between Room, Realm, or DataStore.' },
  { id: 49, category: 'tool', icon: '⚡', title: 'Performance Optimization Prompt', prompt: 'Generate a prompt for performance profiling and optimization of an application. Include steps for identifying bottlenecks and solutions.' },
  { id: 50, category: 'tool', icon: '✅', title: 'App Launch Checklist', prompt: 'Write a prompt producing a full, detailed app launch checklist. Cover pre-launch marketing, app store submission, and post-launch monitoring.' },
  
  // ===== IMAGE-ENHANCING CATEGORY =====
  { id: 51, category: 'image-enhancing', icon: '🎨', title: 'Neumorphic UI Design', prompt: 'Design a neumorphic UI mockup with soft, extruded shapes, subtle shadows, and tactile elements. Focus on soft light sources, minimal color, and realistic material finishes that appear to be pushed or pulled from the surface.' },
  { id: 52, category: 'image-enhancing', icon: '🧊', title: 'Glassmorphism Effect', prompt: 'Create a glassmorphism design with frosted glass effects, translucency, vibrant colors, and layered elements. Include proper backdrop blur, transparency variations, and realistic light refraction for a premium, modern aesthetic.' },
  { id: 53, category: 'image-enhancing', icon: '🌐', title: '3D Depth Rendering', prompt: 'Render a 3D depth scene with proper perspective, realistic lighting, accurate shadows, and material properties. Include depth-of-field effects, proper ambient occlusion, and believable spatial relationships between objects.' },
  { id: 54, category: 'image-enhancing', icon: '💎', title: 'Premium 3D Material', prompt: 'Create premium 3D materials with realistic reflections, refractions, roughness, and metallic properties. Focus on physically-based rendering, proper light interaction, and luxury material finishes (chrome, glass, carbon fiber, leather).' },
  { id: 55, category: 'image-enhancing', icon: '✨', title: 'Luminous 3D Scene', prompt: 'Design a luminous 3D scene with glowing elements, sophisticated lighting design, bloom effects, and atmospheric lighting. Include proper light falloff, color temperature variation, and realistic light bouncing.' },
  { id: 56, category: 'image-enhancing', icon: '🎭', title: 'Surreal 3D Composition', prompt: 'Create a surreal 3D composition with impossible geometry, dramatic lighting, and mind-bending spatial relationships. Use creative camera angles, exaggerated proportions, and cinematic composition for maximum impact.' },
  { id: 57, category: 'image-enhancing', icon: '🏛️', title: 'Architectural Visualization', prompt: 'Render architectural visualization with accurate perspective, realistic materials, proper lighting, and immersive environments. Include detailed textures, appropriate shadows, and believable interior/exterior spaces.' },
  { id: 58, category: 'image-enhancing', icon: '🎬', title: 'Cinematic Poster Grade', prompt: 'Create a cinematic poster grade for an image, applying a dramatic color palette, contrast adjustments, and cinematic framing. Focus on rich blacks, vibrant highlights, and a premium film look.' },
  { id: 59, category: 'image-enhancing', icon: '💎', title: 'Luxury Product Hero', prompt: 'Render a luxury hero product shot with exquisite lighting, reflective surfaces, and a minimalist background. Focus on product detail, material quality, and high-end commercial presentation.' },
  { id: 60, category: 'image-enhancing', icon: '👗', title: 'Editorial Fashion Frame', prompt: 'Create an editorial fashion frame for a portrait, emphasizing high contrast, sharp details, and a sophisticated aesthetic. Include proper skin tones and fashion-forward styling.' }
];

// ===== ADD YOUR ADDITIONAL PROMPTS HERE =====
// Paste your full 200-item array or additional prompts below this line
// Format: { id: N, category: 'category', icon: 'emoji', title: 'Title', prompt: 'Full prompt text...' }
// ============================================