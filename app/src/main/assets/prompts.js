/**
 * Prompts Data Array
 * Contains all prompt objects with structure:
 * { id, category, icon, title, prompt }
 * 
 * Categories: 'app', 'android', 'prompt', 'document', 'tool', 'image-enhancing'
 */

const prompts = [
  // ===== APP CATEGORY =====
  { id: 1, category: 'app', icon: '📝', title: 'Offline-First Note App', prompt: 'Build a complete offline-first note app with robust search capabilities, tagging, seamless cloud synchronization, and flexible storage options. Include real-time sync, conflict resolution, and end-to-end encryption. Design style: 3D-depth Neumorphism.' },
  { id: 2, category: 'app', icon: '🎙️', title: 'Premium Podcast Player', prompt: 'Create a premium podcast player featuring advanced playlist management, an intelligent sleep timer, precise chapter markers, variable playback speeds, and queue management. Include downloading for offline listening. Design style: 3D-depth Neumorphism.' },
  { id: 3, category: 'app', icon: '👻', title: 'Horror Story Reader', prompt: 'Design an immersive horror story reader app with chilling audio narration, atmospheric visual effects (e.g., subtle parallax, dynamic shadows), and interactive story branching with multiple endings. Design style: 3D-depth Neumorphism.' },
  { id: 4, category: 'app', icon: '🔐', title: 'Secure Password Vault', prompt: 'Build a highly secure password vault app incorporating biometric authentication (fingerprint/face ID), military-grade encryption, password generation, and secure sharing with expiration options. Design style: 3D-depth Neumorphism.' },
  { id: 5, category: 'app', icon: '🎯', title: 'Habit Tracker Pro', prompt: 'Create a professional habit tracker with advanced streak tracking, customizable reminders, detailed analytics and progress visualization, habit linking, and motivation notifications. Design style: 3D-depth Neumorphism.' },
  { id: 6, category: 'app', icon: '📺', title: 'Media Planner', prompt: 'Build a comprehensive media planner app for content creators, including scriptwriting tools, storyboard creation, publishing calendars, asset management, and collaboration features. Design style: 3D-depth Neumorphism.' },
  { id: 7, category: 'app', icon: '💰', title: 'Expense Tracker', prompt: 'Create a fully operational expense tracker with OCR receipt scanning, intelligent categorization, detailed charts and financial reports, budget monitoring, and multi-currency support. Design style: 3D-depth Neumorphism.' },
  { id: 8, category: 'app', icon: '📚', title: 'Book Catalog', prompt: 'Build a smart book catalog app with ISBN barcode scanning, automatic metadata retrieval (author, genre, publication date), personalized recommendations, and reading progress tracking. Design style: 3D-depth Neumorphism.' },
  { id: 9, category: 'app', icon: '👨‍🍳', title: 'Recipe Manager', prompt: 'Create a versatile recipe manager with integrated shopping list generation, robust offline support, a nutritional calculator, photo OCR for recipes, and meal planning capabilities. Design style: 3D-depth Neumorphism.' },
  { id: 10, category: 'app', icon: '💪', title: 'Fitness Log', prompt: 'Build a comprehensive fitness log app with customizable workout templates, interactive progress graphs, personal record (PR) tracking, and AI-powered form correction using device camera. Design style: 3D-depth Neumorphism.' },
  
  // ===== ANDROID CATEGORY =====
  { id: 11, category: 'android', icon: '🏗️', title: 'Clean Architecture Refactor', prompt: 'Refactor an existing Android application into a modern clean architecture using Jetpack Compose for UI, Hilt for dependency injection, and proper separation of concerns. Design style: 3D-depth Neumorphism.' },
  { id: 12, category: 'android', icon: '🔄', title: 'Fragment to Compose Migration', prompt: 'Transform a legacy fragment-based Android application into a modern, declarative Jetpack Compose application, ensuring all features are preserved and tests are updated. Design style: 3D-depth Neumorphism.' },
  { id: 13, category: 'android', icon: '💾', title: 'Offline Caching & Retry Logic', prompt: 'Implement comprehensive offline caching and resilient retry logic within the Android repository layer, ensuring data consistency and graceful degradation. Design style: 3D-depth Neumorphism.' },
  { id: 14, category: 'android', icon: '🗄️', title: 'Room Schema Definition', prompt: 'Write a complete Room database schema for an application\'s data model, including detailed Entity definitions, Data Access Objects (DAOs), and migration strategies. Design style: 3D-depth Neumorphism.' },
  { id: 15, category: 'android', icon: '🧠', title: 'ViewModels for All Screens', prompt: 'Generate robust ViewModels for all application screens, incorporating loading, empty, and error states, along with appropriate data handling and lifecycle management. Design style: 3D-depth Neumorphism.' },
  { id: 16, category: 'android', icon: '🗺️', title: 'Navigation Flows', prompt: 'Create comprehensive navigation flows for key user journeys such as onboarding, dashboard, detail views, and settings. Utilize Jetpack Navigation with type-safe arguments. Design style: 3D-depth Neumorphism.' },
  { id: 17, category: 'android', icon: '🌙', title: 'Dark Mode & Accessibility', prompt: 'Add full dark mode support, enhance accessibility features (e.g., content descriptions, touch target sizes), and implement proper contrast ratios for WCAG compliance. Design style: 3D-depth Neumorphism.' },
  { id: 18, category: 'android', icon: '📤', title: 'File Import/Export & Share', prompt: 'Implement secure and user-friendly file import/export functionalities and share intents using Scoped Storage and Storage Access Framework (SAF). Design style: 3D-depth Neumorphism.' },
  { id: 19, category: 'android', icon: '🔁', title: 'Background Sync with WorkManager', prompt: 'Add reliable background data synchronization using WorkManager, implementing battery-friendly scheduling, network-aware retries, and proper error handling. Design style: 3D-depth Neumorphism.' },
  { id: 20, category: 'android', icon: '🛡️', title: 'App Hardening & Security', prompt: 'Harden an Android application against common vulnerabilities by implementing input sanitization, secure storage practices, certificate pinning, and obfuscation. Design style: 3D-depth Neumorphism.' },
  
  // ===== PROMPT CATEGORY =====
  { id: 21, category: 'prompt', icon: '✍️', title: 'Production Gemini Prompt', prompt: 'Rewrite this high-level idea into a production-grade Gemini prompt. The prompt should be highly specific, structured with clear sections, and include examples. Design style: 3D-depth Neumorphism.' },
  { id: 22, category: 'prompt', icon: '📋', title: 'One-line to Build Spec', prompt: 'Expand this one-line application concept into a complete build specification document. Include detailed sections on features, architecture, tech stack, and deployment. Design style: 3D-depth Neumorphism.' },
  { id: 23, category: 'prompt', icon: '✂️', title: 'Features to Tasks', prompt: 'Convert a given feature list into a detailed breakdown of implementation tasks, including estimated effort, dependencies, and acceptance criteria. Design style: 3D-depth Neumorphism.' },
  { id: 24, category: 'prompt', icon: '💻', title: 'Force Complete Code', prompt: 'Generate a developer prompt that explicitly forces the AI to produce complete, runnable, and non-placeholder code for all requirements without shortcuts. Design style: 3D-depth Neumorphism.' },
  { id: 25, category: 'prompt', icon: '👨‍💼', title: 'Senior Android Architect', prompt: 'Create a prompt making Gemini act as a senior Android architect. The AI should provide expert advice on architecture decisions and best practices. Design style: 3D-depth Neumorphism.' },
  { id: 26, category: 'prompt', icon: '🧪', title: 'Modular Testing', prompt: 'Build a prompt asking for a modular architecture approach with a strong emphasis on testing. The AI should generate code with unit and integration tests. Design style: 3D-depth Neumorphism.' },
  { id: 27, category: 'prompt', icon: '🚀', title: 'Rough Idea to Product', prompt: 'Transform a rough product idea into a deployment-ready product prompt. This includes defining target users, core functionality, and success metrics. Design style: 3D-depth Neumorphism.' },
  { id: 28, category: 'prompt', icon: '📱', title: 'No Root App Prompt', prompt: 'Create a prompt for building an Android application that operates without requiring root access, avoids hidden dependencies, and is suitable for distribution. Design style: 3D-depth Neumorphism.' },
  { id: 29, category: 'prompt', icon: '🌐', title: 'Full Stack Prompt', prompt: 'Write a comprehensive prompt generating a full-stack solution, encompassing UI design (frontend), business logic (backend), and database schema. Design style: 3D-depth Neumorphism.' },
  { id: 30, category: 'prompt', icon: '🐛', title: 'Code Repair Prompt', prompt: 'Create a prompt making Gemini act as a code repair and improvement agent. The AI should identify bugs, suggest fixes, refactor code, and improve performance. Design style: 3D-depth Neumorphism.' },
  
  // ===== DOCUMENT CATEGORY =====
  { id: 31, category: 'document', icon: '📄', title: 'Project Brief', prompt: 'Write a polished project brief for this application. Include an executive summary, a clear problem statement, proposed solution, and success criteria. Design style: 3D-depth Neumorphism.' },
  { id: 32, category: 'document', icon: '📋', title: 'PRD Document', prompt: 'Turn a product idea into a comprehensive Product Requirements Document (PRD). Detail user stories, acceptance criteria, and functional requirements. Design style: 3D-depth Neumorphism.' },
  { id: 33, category: 'document', icon: '🏛️', title: 'Technical Spec', prompt: 'Create a detailed technical specification for an entire Android application. Include an architecture diagram, component breakdown, and API specifications. Design style: 3D-depth Neumorphism.' },
  { id: 34, category: 'document', icon: '📰', title: 'Release Notes v1.0', prompt: 'Write professional release notes for version 1.0 of an application. Highlight new features, significant improvements, and critical bug fixes. Design style: 3D-depth Neumorphism.' },
  { id: 35, category: 'document', icon: '📖', title: 'README Generator', prompt: 'Generate a comprehensive README.md file for a software project. Include sections for setup instructions, features, usage examples, and contributing guidelines. Design style: 3D-depth Neumorphism.' },
  { id: 36, category: 'document', icon: '🔒', title: 'Privacy Policy', prompt: 'Create a draft privacy policy for a consumer Android application. Address data collection practices, storage, usage, and user rights. Design style: 3D-depth Neumorphism.' },
  { id: 37, category: 'document', icon: '⚖️', title: 'Terms of Service', prompt: 'Write terms of service for a mobile productivity app. Cover acceptable use, intellectual property, disclaimers, and limitation of liability. Design style: 3D-depth Neumorphism.' },
  { id: 38, category: 'document', icon: '❓', title: 'Support FAQ', prompt: 'Create a comprehensive support FAQ for an application. Organize by common issues, troubleshooting steps, account management, and payment. Design style: 3D-depth Neumorphism.' },
  { id: 39, category: 'document', icon: '📝', title: 'Changelog Template', prompt: 'Write a flexible changelog template for future application updates. Structure it to follow semantic versioning (MAJOR.MINOR.PATCH). Design style: 3D-depth Neumorphism.' },
  { id: 40, category: 'document', icon: '💼', title: 'Investor Summary', prompt: 'Draft a concise one-page investor summary for a mobile product. Articulate the problem, solution, market opportunity, and business model. Design style: 3D-depth Neumorphism.' },
  
  // ===== TOOL CATEGORY =====
  { id: 41, category: 'tool', icon: '🧪', title: 'Test Case Generator', prompt: 'Build a prompt that generates detailed test cases from application requirements or user stories. Include test steps, expected results, and edge cases. Design style: 3D-depth Neumorphism.' },
  { id: 42, category: 'tool', icon: '🔍', title: 'Code Audit Prompt', prompt: 'Create a prompt for auditing code for potential bugs, missing features, security vulnerabilities, performance bottlenecks, and architectural issues. Design style: 3D-depth Neumorphism.' },
  { id: 43, category: 'tool', icon: '🎨', title: 'UI Refactor Prompt', prompt: 'Generate a prompt for refactoring an existing UI into reusable, modular components. Focus on identifying common patterns and extracting them. Design style: 3D-depth Neumorphism.' },
  { id: 44, category: 'tool', icon: '🌐', title: 'Web to PWA Prompt', prompt: 'Write a prompt for transforming a standard web application into an Android-friendly Progressive Web App (PWA). Include steps for setup and testing. Design style: 3D-depth Neumorphism.' },
  { id: 45, category: 'tool', icon: '📊', title: 'Analytics Integration Prompt', prompt: 'Build a prompt for cleanly integrating analytics and event tracking into an application. Specify desired events, parameters, and reporting. Design style: 3D-depth Neumorphism.' },
  { id: 46, category: 'tool', icon: '🎯', title: 'Onboarding Flow Generator', prompt: 'Create a prompt that generates engaging onboarding screens and UX copy for a new application. Focus on guiding users through core features. Design style: 3D-depth Neumorphism.' },
  { id: 47, category: 'tool', icon: '🔗', title: 'API Integration Code', prompt: 'Write a prompt producing robust API integration code with built-in error handling, retry mechanisms, and authentication support (e.g., OAuth). Design style: 3D-depth Neumorphism.' },
  { id: 48, category: 'tool', icon: '💾', title: 'Local-First Storage Strategy', prompt: 'Create a prompt for building a local-first storage strategy for an application. Detail choices between Room, Realm, or DataStore. Design style: 3D-depth Neumorphism.' },
  { id: 49, category: 'tool', icon: '⚡', title: 'Performance Optimization Prompt', prompt: 'Generate a prompt for performance profiling and optimization of an application. Include steps for identifying bottlenecks and solutions. Design style: 3D-depth Neumorphism.' },
  { id: 50, category: 'tool', icon: '✅', title: 'App Launch Checklist', prompt: 'Write a prompt producing a full, detailed app launch checklist. Cover pre-launch marketing, app store submission, and post-launch monitoring. Design style: 3D-depth Neumorphism.' },
  
  // ===== IMAGE-ENHANCING CATEGORY =====
  { id: 51, category: 'image-enhancing', icon: '🎨', title: 'Neumorphic UI Design', prompt: 'Design a neumorphic UI mockup with soft, extruded shapes, subtle shadows, and tactile elements. Focus on soft light sources, minimal color, and realistic material finishes that appear to be pushed or pulled from the surface. Design style: 3D-depth Neumorphism.' },
  { id: 52, category: 'image-enhancing', icon: '🧊', title: 'Glassmorphism Effect', prompt: 'Create a glassmorphism design with frosted glass effects, translucency, vibrant colors, and layered elements. Include proper backdrop blur, transparency variations, and realistic light refraction for a premium, modern aesthetic. Design style: 3D-depth Neumorphism.' },
  { id: 53, category: 'image-enhancing', icon: '🌐', title: '3D Depth Rendering', prompt: 'Render a 3D depth scene with proper perspective, realistic lighting, accurate shadows, and material properties. Include depth-of-field effects, proper ambient occlusion, and believable spatial relationships between objects. Design style: 3D-depth Neumorphism.' },
  { id: 54, category: 'image-enhancing', icon: '💎', title: 'Premium 3D Material', prompt: 'Create premium 3D materials with realistic reflections, refractions, roughness, and metallic properties. Focus on physically-based rendering, proper light interaction, and luxury material finishes (chrome, glass, carbon fiber, leather). Design style: 3D-depth Neumorphism.' },
  { id: 55, category: 'image-enhancing', icon: '✨', title: 'Luminous 3D Scene', prompt: 'Design a luminous 3D scene with glowing elements, sophisticated lighting design, bloom effects, and atmospheric lighting. Include proper light falloff, color temperature variation, and realistic light bouncing. Design style: 3D-depth Neumorphism.' },
  { id: 56, category: 'image-enhancing', icon: '🎭', title: 'Surreal 3D Composition', prompt: 'Create a surreal 3D composition with impossible geometry, dramatic lighting, and mind-bending spatial relationships. Use creative camera angles, exaggerated proportions, and cinematic composition for maximum impact. Design style: 3D-depth Neumorphism.' },
  { id: 57, category: 'image-enhancing', icon: '🏛️', title: 'Architectural Visualization', prompt: 'Render architectural visualization with accurate perspective, realistic materials, proper lighting, and immersive environments. Include detailed textures, appropriate shadows, and believable interior/exterior spaces. Design style: 3D-depth Neumorphism.' },
  { id: 58, category: 'image-enhancing', icon: '🎬', title: 'Cinematic Poster Grade', prompt: 'Create a cinematic poster grade for an image, applying a dramatic color palette, contrast adjustments, and cinematic framing. Focus on rich blacks, vibrant highlights, and a premium film look. Design style: 3D-depth Neumorphism.' },
  { id: 59, category: 'image-enhancing', icon: '💎', title: 'Luxury Product Hero', prompt: 'Render a luxury hero product shot with exquisite lighting, reflective surfaces, and a minimalist background. Focus on product detail, material quality, and high-end commercial presentation. Design style: 3D-depth Neumorphism.' },
  { id: 60, category: 'image-enhancing', icon: '👗', title: 'Editorial Fashion Frame', prompt: 'Create an editorial fashion frame for a portrait, emphasizing high contrast, sharp details, and a sophisticated aesthetic. Include proper skin tones and fashion-forward styling. Design style: 3D-depth Neumorphism.' },

  
  // ===== APP CATEGORY (CONTINUED) =====
  { id: 61, category: 'app', icon: '🔔', title: 'Push Notification Manager', prompt: 'Build a notification management app that allows users to snooze, group, and categorize incoming notifications. Include smart filters and historical logs.' },
  { id: 62, category: 'app', icon: '📍', title: 'Smart Location Tracker', prompt: 'Create a location tracking app for families with geofencing, real-time map updates, and safety alerts. Focus on battery efficiency and data privacy.' },
  { id: 63, category: 'app', icon: '🥦', title: 'Macro Nutrient Counter', prompt: 'Develop a macro nutrient counter with a comprehensive food database, barcode scanner, and AI-driven image recognition for meal logging.' },
  { id: 64, category: 'app', icon: '🌐', title: 'Simple VPN Client', prompt: 'Build a minimalist VPN client for Android using the VpnService API, focusing on speed, server selection, and transparent connection logging.' },
  { id: 65, category: 'app', icon: '🎧', title: 'Noise-Canceling Soundscapes', prompt: 'Create a soundscape app with mixed audio environments, timer, and high-quality looping files for study or sleep. Offline-first.' },
  { id: 66, category: 'app', icon: '📄', title: 'Invoice Generator Pro', prompt: 'Build an invoice generator for freelancers with template customization, PDF export, client database, and integrated payment link generation.' },
  { id: 67, category: 'app', icon: '🎛️', title: 'Advanced Device Dashboard', prompt: 'Create a dashboard for power users to view real-time system metrics: CPU, RAM, battery health, and network throughput. Material 3 design.' },
  { id: 68, category: 'app', icon: '📖', title: 'Speed Reading Trainer', prompt: 'Develop a speed reading app that uses RSVP (Rapid Serial Visual Presentation) technology. Include customizable speed and text import.' },
  { id: 69, category: 'app', icon: '🌱', title: 'Plant Care Reminders', prompt: 'Build a plant care assistant with personalized watering schedules, light sensor diagnostics, and plant history logging.' },
  { id: 70, category: 'app', icon: '🚗', title: 'Trip Cost Calculator', prompt: 'Create a trip planner that calculates fuel costs based on vehicle mileage, tolls, and distance. Includes multi-stop support.' },
  
  // ===== ANDROID CATEGORY (CONTINUED) =====
  { id: 71, category: 'android', icon: '🧩', title: 'Custom Widget Designer', prompt: 'Create an app that allows users to design custom Android widgets using drag-and-drop elements and basic scripting logic for data.' },
  { id: 72, category: 'android', icon: '🔋', title: 'Battery Optimizer Tool', prompt: 'Build a tool to analyze background battery usage and suggest specific deep-sleep optimization settings per app.' },
  { id: 73, category: 'android', icon: '⌨️', title: 'Custom Keyboard Builder', prompt: 'Develop a simple IME (Input Method Editor) template with custom key layouts and text-shortcut expansion features.' },
  { id: 74, category: 'android', icon: '⚙️', title: 'Quick Settings Tile App', prompt: 'Write a prompt for an app that allows users to create custom Quick Settings tiles for specific app launches or system toggles.' },
  { id: 75, category: 'android', icon: '☁️', title: 'Local Media Backup', prompt: 'Create a tool to automatically back up local gallery media to a specified FTP or NAS server on local Wi-Fi only.' },
  { id: 76, category: 'android', icon: '🔐', title: 'Clipboard Manager', prompt: 'Build a clipboard manager that stores history, enables pinning, and supports text formatting and syncing across sessions.' },
  { id: 77, category: 'android', icon: '📱', title: 'App Usage Monitor', prompt: 'Develop a tool to track app usage duration and set daily limits, utilizing Android Accessibility Services to detect focus.' },
  { id: 78, category: 'android', icon: '🔕', title: 'Smart Volume Profiles', prompt: 'Create an app that automatically adjusts volume profiles based on location or time of day, using geofencing.' },
  { id: 79, category: 'android', icon: '📂', title: 'Storage Analyzer', prompt: 'Build a file system visualizer that helps users identify large files and folders taking up internal storage space.' },
  { id: 80, category: 'android', icon: '🌙', title: 'Night-Shift Filter', prompt: 'Create a blue-light filter application that overlays a warm color tint on the screen during scheduled evening hours.' },
  
  // ===== PROMPT CATEGORY (CONTINUED) =====
  { id: 81, category: 'prompt', icon: '🦾', title: 'Cyberpunk Aesthetic', prompt: 'Generate a prompt to design an app UI with a dark, high-contrast Cyberpunk aesthetic. Include neon glows, monospaced fonts, and glitch animations.' },
  { id: 82, category: 'prompt', icon: '🫧', title: 'Claymorphism Style', prompt: 'Write a prompt for designing a UI in the Claymorphism style, emphasizing inflated 3D-like shapes, soft shadows, and pastel, friendly color palettes.' },
  { id: 83, category: 'prompt', icon: '🏗️', title: 'Brutalist UI Prompt', prompt: 'Create a prompt for a Brutalist design style. Focus on harsh lines, unstyled browser defaults, bold black-and-white typography, and raw grid structures.' },
  { id: 84, category: 'prompt', icon: '🪟', title: 'Glassmorphism UI Prompt', prompt: 'Develop a prompt for an advanced Glassmorphism design system. Focus on frosted glass layers, backdrop blur settings, and vibrant color gradients.' },
  { id: 85, category: 'prompt', icon: '📐', title: 'Isometric UI Mockup', prompt: 'Write a prompt that turns a flat UI design into a sophisticated isometric 3D mockup with soft depth of field and premium lighting.' },
  { id: 86, category: 'prompt', icon: '💿', title: 'Holographic Style Prompt', prompt: 'Create a prompt for a holographic UI element. Use iridescent rainbow highlights, glowing aura, and transparent refractive layers.' },
  { id: 87, category: 'prompt', icon: '👾', title: 'Pixel Art Retro Prompt', prompt: 'Develop a prompt for 16-bit retro pixel art assets. Include a specific color palette, hard aliased edges, and chunky arcade aesthetic.' },
  { id: 88, category: 'prompt', icon: '📏', title: 'Blueprint CAD Style', prompt: 'Write a prompt for an app built in a high-fidelity blueprint/wireframe style. Focus on CAD schematic elements, grids, and technical lines.' },
  { id: 89, category: 'prompt', icon: '💽', title: 'Y2K Retro Prompt', prompt: 'Create a prompt for a Y2K aesthetic design. Incorporate chrome metallics, liquid bubble shapes, and futuristic techno-typography from the early 2000s.' },
  { id: 90, category: 'prompt', icon: '🎨', title: 'Bento Grid Prompt', prompt: 'Write a prompt for a Bento Box grid layout. Focus on asymmetric modular tiles, rounded corners, and varied content density.' },
  
  // ===== DOCUMENT CATEGORY (CONTINUED) =====
  { id: 91, category: 'document', icon: '⚖️', title: 'Data Processing Agreement', prompt: 'Draft a Data Processing Agreement (DPA) between a software vendor and a corporate client, focusing on GDPR compliance requirements.' },
  { id: 92, category: 'document', icon: '🤝', title: 'SLA Template', prompt: 'Create a Service Level Agreement (SLA) template that defines uptime guarantees, response times, and penalty clauses for software services.' },
  { id: 93, category: 'document', icon: '💼', title: 'Statement of Work', prompt: 'Write a Statement of Work (SOW) template for a mobile development contract, including deliverables, timeline, and payment milestones.' },
  { id: 94, category: 'document', icon: '🛡️', title: 'Security Policy', prompt: 'Draft an internal security policy for developers, covering secure coding, environment access, and incident reporting procedures.' },
  { id: 95, category: 'document', icon: '🏗️', title: 'Architecture Review Doc', prompt: 'Create a template for an Architecture Review Document (ARD) that tracks proposed technical decisions and potential long-term architectural impacts.' },
  { id: 96, category: 'document', icon: '🔥', title: 'Incident Post-Mortem', prompt: 'Develop a template for a technical incident post-mortem. Include root cause analysis, timeline of events, and preventative measures.' },
  { id: 97, category: 'document', icon: '🗺️', title: 'Customer Journey Map', prompt: 'Draft a template to document a user\'s end-to-end journey within a mobile app, identifying pain points, emotions, and conversion opportunities.' },
  { id: 98, category: 'document', icon: '📊', title: 'Competitive Analysis', prompt: 'Write a structure for a competitive analysis report, comparing features, pricing, and user sentiment against key market rivals.' },
  { id: 99, category: 'document', icon: '💡', title: 'Feature Pitch Deck', prompt: 'Outline a pitch deck for a new app feature, including the problem, the specific user need, the solution, and the expected KPIs for success.' },
  { id: 100, category: 'document', icon: '🖋️', title: 'Code Style Guide', prompt: 'Generate a code style guide template that defines indentation, naming conventions, and file structure for a collaborative project.' },
  
  // ===== TOOL CATEGORY (CONTINUED) =====
  { id: 101, category: 'tool', icon: '✨', title: 'Icon Vector Generator', prompt: 'Build a prompt that converts icon concepts into optimized SVG paths compatible with Android VectorDrawable format.' },
  { id: 102, category: 'tool', icon: '🧠', title: 'State Machine Generator', prompt: 'Create a tool prompt that takes an interaction description and generates a formal State Machine diagram representation.' },
  { id: 103, category: 'tool', icon: '🌈', title: 'Dynamic Theme Creator', prompt: 'Generate a prompt that creates a dynamic color theme based on a single brand primary color, outputting hex codes for light and dark palettes.' },
  { id: 104, category: 'tool', icon: '🔎', title: 'Layout Inspector Script', prompt: 'Write a guide or script that assists developers in using the Android Studio Layout Inspector to solve specific UI layout shift issues.' },
  { id: 105, category: 'tool', icon: '📉', title: 'Bundle Size Optimizer', prompt: 'Create a prompt for analyzing an Android app\'s bundle size and providing actionable steps to reduce it using ProGuard, R8, and asset optimization.' },
  { id: 106, category: 'tool', icon: '🧪', title: 'Integration Test Suite', prompt: 'Build a prompt for generating an integration test suite for an app\'s login/signup flow, using MockWebServer to intercept API calls.' },
  { id: 107, category: 'tool', icon: '🏗️', title: 'CI/CD Pipeline YAML', prompt: 'Generate a complete GitHub Actions YAML file for an Android project that builds the app, runs tests, and publishes a release artifact.' },
  { id: 108, category: 'tool', icon: '🗂️', title: 'Resource Manager', prompt: 'Create a tool prompt to organize Android resources (strings, dimensions, colors) into clean, scoped XML or Kotlin files.' },
  { id: 109, category: 'tool', icon: '🔒', title: 'Obfuscation Rules Generator', prompt: 'Generate a comprehensive set of ProGuard rules tailored to a specific set of third-party libraries commonly used in Android development.' },
  { id: 110, category: 'tool', icon: '📡', title: 'Network Request Mocking', prompt: 'Build a prompt for generating mock JSON responses for all API endpoints in an Android app to facilitate frontend-only development.' },
  
  // ===== IMAGE-ENHANCING CATEGORY (CONTINUED) =====
  { id: 111, category: 'image-enhancing', icon: '🔘', title: 'Neumorphic Depth Modifiers', prompt: 'Write a highly optimized Jetpack Compose Modifier that replicates 3D-depth neumorphism for components. Allow light-angle and elevation parameters.' },
  { id: 112, category: 'image-enhancing', icon: '🌫️', title: 'Performant Glass Blur', prompt: 'Implement a real-time, high-performance glass blur effect using RenderEffect. Ensure it gracefully degrades on older Android API versions.' },
  { id: 113, category: 'image-enhancing', icon: '🌌', title: 'Aurora Mesh Gradients', prompt: 'Design a prompt to create animated Aurora-style mesh gradients that shift slowly, providing a premium, fluid backdrop for a modern mobile application.' },
  { id: 114, category: 'image-enhancing', icon: '🦾', title: 'Cyberpunk Neon Effects', prompt: 'Write code for neon-glow text and component effects suitable for a Cyberpunk aesthetic. Use multiple shadow layers in Compose.' },
  { id: 115, category: 'image-enhancing', icon: '🫧', title: 'Claymorphic Inflation', prompt: 'Create a prompt for an inflated clay-like aesthetic. Focus on soft light falloff and "bubbly" UI components using exaggerated corner radii.' },
  { id: 116, category: 'image-enhancing', icon: '📏', title: 'Blueprint Wireframe Style', prompt: 'Style UI components to look like hand-drawn CAD schematics. Use specific blueprint-blue backgrounds with precise line-weight strokes.' },
  { id: 117, category: 'image-enhancing', icon: '💿', title: 'Holographic Iridescence', prompt: 'Generate a shader prompt for holographic iridescence. The UI element should shimmer with rainbow colors based on the device accelerometer input.' },
  { id: 118, category: 'image-enhancing', icon: '👾', title: 'Retro 8-Bit Pixelation', prompt: 'Apply a pixel-art filter to a UI component. Scale the pixel size dynamically and restrict color depth to create an authentic 8-bit aesthetic.' },
  { id: 119, category: 'image-enhancing', icon: '🪞', title: 'Glassy Refraction', prompt: 'Create an effect where text behind a UI card appears refracted. Use custom drawing to simulate thick glass optical distortion.' },
  { id: 120, category: 'image-enhancing', icon: '✨', title: 'Micro-Interaction Polish', prompt: 'Design a set of 5 tiny, meaningful micro-interactions for buttons: subtle bounce, color pulse, scale-up, shadow-elevation, and ripple-wave.' },
  
  // ===== APP CATEGORY (EXTENDED) =====
  { id: 121, category: 'app', icon: '⌚', title: 'WearOS Companion App', prompt: 'Develop a lightweight WearOS companion app that mirrors primary notification tasks from the main Android app. Design style: Minimalist, high contrast for battery saving.' },
  { id: 122, category: 'app', icon: '🚗', title: 'Android Auto Dashboard', prompt: 'Build an Android Auto interface for the Podcast Player app. Focus on large targets, voice control support, and simplified media controls. Design style: Safety-first high-contrast UI.' },
  { id: 123, category: 'app', icon: '🔊', title: 'Voice-Activated Controller', prompt: 'Develop a voice-control system for smart home apps using Google Assistant SDK. Implement natural language processing for intent handling.' },
  { id: 124, category: 'app', icon: '🌐', title: 'AR Object Placer', prompt: 'Use ARCore to build an object placement app. Include surface detection, real-time object scaling, and lighting adjustment for the 3D assets.' },
  { id: 125, category: 'app', icon: '📍', title: 'Indoor Navigation Mapper', prompt: 'Create an indoor navigation app using BLE beacons. Map floorplans and plot real-time location. Design style: Schematic blue-print.' },
  { id: 126, category: 'app', icon: '🌡️', title: 'Smart Agriculture Monitor', prompt: 'Build a dashboard for soil sensors. Visualizing humidity, light, and nutrient data. Design style: 3D-depth Neumorphism for sensor cards.' },
  { id: 127, category: 'app', icon: '🎨', title: 'Color Palette Generator', prompt: 'A tool for artists to generate palettes from photos. Include exporting to JSON and ASE files. Design style: Minimalist.' },
  { id: 128, category: 'app', icon: '🔢', title: 'Scientific Calculator', prompt: 'Develop a scientific calculator with custom skins and history log. Design style: Skeuomorphic synth interface.' },
  { id: 129, category: 'app', icon: '📉', title: 'Crypto Tax Calculator', prompt: 'Calculate capital gains for crypto. Include exchange API import. Design style: Data-dense, clean professional.' },
  { id: 130, category: 'app', icon: '🧘', title: 'Mindful Timer', prompt: 'A timer that encourages breathing exercises between focus periods. Design style: Claymorphic, soft pastel.' },
  { id: 131, category: 'app', icon: '✈️', title: 'Travel Budget Tracker', prompt: 'Track travel expenses across multiple currencies with automated conversion. Design style: 3D-depth Neumorphism.' },
  { id: 132, category: 'app', icon: '👗', title: 'Digital Closet', prompt: 'Digitize your wardrobe. Take photos, categorize, and build outfits. Design style: Minimalist editorial.' },
  { id: 133, category: 'app', icon: '💧', title: 'Water Intake Tracker', prompt: 'Simple water tracker with push notifications and daily goals. Design style: Liquid/Glassmorphism.' },
  { id: 134, category: 'app', icon: '📝', title: 'Collaborative Whiteboard', prompt: 'A real-time whiteboard app using WebSockets for collaborative drawing. Design style: Infinite canvas, 3D tools.' },
  { id: 135, category: 'app', icon: '🎮', title: 'Retro Game Boy Emulator', prompt: 'Develop a game boy emulator interface. Design style: Skeuomorphic retro, plastic-texture finish.' },
  { id: 136, category: 'app', icon: '📊', title: 'Personal Finance Dashboard', prompt: 'A comprehensive finance app tracking net worth, stocks, and cash. Design style: Dark-mode 3D-depth Neumorphism.' },
  { id: 137, category: 'app', icon: '📄', title: 'Document Scanner Pro', prompt: 'Scan documents, apply edge detection, and convert to high-contrast PDF. Design style: Professional utility.' },
  { id: 138, category: 'app', icon: '☀️', title: 'Solar Power Tracker', prompt: 'Track solar panel efficiency in real-time. Design style: Aurora UI, fluid gradients.' },
  { id: 139, category: 'app', icon: '🎧', title: 'Focus Music Mixer', prompt: 'Mix your own ambient tracks (rain, city, forest) with volume sliders. Design style: Minimalist slider control.' },
  { id: 140, category: 'app', icon: '📦', title: 'Inventory Master', prompt: 'Track home inventory with quantity alerts and expiration dates. Design style: Modular Bento Box.' },
  
  // ===== TOOL CATEGORY (EXTENDED) =====
  { id: 141, category: 'tool', icon: '🔑', title: 'Keycloak Auth Manager', prompt: 'Tool to manage Keycloak sessions and tokens for development. Design style: Professional CLI-UI mix.' },
  { id: 142, category: 'tool', icon: '📦', title: 'Docker Container Helper', prompt: 'Manage and monitor local Docker containers with tap-to-start/stop/restart capabilities. Design style: Cyberpunk.' },
  { id: 143, category: 'tool', icon: '🖌️', title: 'Asset Resizer', prompt: 'Batch process image assets for Android folders (mdpi to xxxhdpi). Design style: Minimalist.' },
  { id: 144, category: 'tool', icon: '🔍', title: 'Logcat Filter Pro', prompt: 'Real-time log filtering and tagging for developers on mobile. Design style: Terminal-like, monochrome.' },
  { id: 145, category: 'tool', icon: '🌐', title: 'Network Proxy Helper', prompt: 'Easily toggle system-wide proxy settings for dev testing. Design style: Utility-first.' },
  { id: 146, category: 'tool', icon: '🛠️', title: 'APK File Inspector', prompt: 'Analyze APK structure, manifest permissions, and signatures. Design style: Clean technical dashboard.' },
  { id: 147, category: 'tool', icon: '🔗', title: 'Deep Link Tester', prompt: 'Quickly trigger and test app deep links for debugging routes. Design style: Simple.' },
  { id: 148, category: 'tool', icon: '🎨', title: 'Compose Theme Viewer', prompt: 'Visualize the current Jetpack Compose theme colors and typography on-device. Design style: Component Gallery.' },
  { id: 149, category: 'tool', icon: '📡', title: 'Sensor Debugger', prompt: 'Monitor live output from all device sensors (gyro, accelerometer, lux, etc.). Design style: Data-dense, 3D cards.' },
  { id: 150, category: 'tool', icon: '⌨️', title: 'Key Code Finder', prompt: 'Identify key codes for bluetooth and media controller keys. Design style: Minimalist.' },
  
  // ===== IMAGE-ENHANCING CATEGORY (EXTENDED) =====
  { id: 151, category: 'image-enhancing', icon: '🔳', title: 'Vectorization Tool', prompt: 'Convert raster images to clean SVG files. Design style: Technical, clean.' },
  { id: 152, category: 'image-enhancing', icon: '🌫️', title: 'Background Blur AI', prompt: 'Apply intelligent portrait blur to any image. Design style: Soft focus photography.' },
  { id: 153, category: 'image-enhancing', icon: '🎨', title: 'Color Grade Presets', prompt: 'Apply professional LUTs to images and fine-tune. Design style: Cinematic.' },
  { id: 154, category: 'image-enhancing', icon: '📸', title: 'Photo Denoiser', prompt: 'AI-based low light photo denoiser. Design style: Clean, natural.' },
  { id: 155, category: 'image-enhancing', icon: '💎', title: 'Super Resolution Up-scaler', prompt: 'Upscale images using AI without loss of detail. Design style: High-fidelity.' },
  { id: 156, category: 'image-enhancing', icon: '🕶️', title: 'Retro Film Grain', prompt: 'Add realistic film grain to images with film-stock presets. Design style: Vintage analog.' },
  { id: 157, category: 'image-enhancing', icon: '🖼️', title: 'Auto-Crop Assistant', prompt: 'Use AI to auto-crop images for social media ratios. Design style: Smart/Simple.' },
  { id: 158, category: 'image-enhancing', icon: '🌓', title: 'HDR Balancer', prompt: 'Fix over-exposed or under-exposed areas in photos. Design style: Technical.' },
  { id: 159, category: 'image-enhancing', icon: '✨', title: 'Skin Softener', prompt: 'AI-driven gentle skin softening for portraits. Design style: Beauty/Editorial.' },
  { id: 160, category: 'image-enhancing', icon: '💡', title: 'Shadow Recovery Tool', prompt: 'Boost details in deep shadows without introducing noise. Design style: Professional editing.' },
  
  // ===== DOCUMENT CATEGORY (EXTENDED) =====
  { id: 161, category: 'document', icon: '🛡️', title: 'Bug Report Form', prompt: 'Standardized bug report form for users with attachment upload. Design style: 3D-depth Neumorphism.' },
  { id: 162, category: 'document', icon: '🤝', title: 'API Key Request Form', prompt: 'Manage API access requests securely. Design style: Corporate Professional.' },
  { id: 163, category: 'document', icon: '🧩', title: 'Onboarding Checklist', prompt: 'Dynamic onboarding checklist for new users. Design style: Checklist-centric UI.' },
  { id: 164, category: 'document', icon: '📊', title: 'Project Roadmap Doc', prompt: 'A living roadmap doc with Gantt chart visualization. Design style: Data-dense.' },
  { id: 165, category: 'document', icon: '📝', title: 'Team Meeting Minutes', prompt: 'Meeting minutes generator with auto-summary. Design style: Clean notebook.' },
  { id: 166, category: 'document', icon: '💼', title: 'Business Plan Draft', prompt: 'Business plan drafting tool with structure guides. Design style: Professional.' },
  { id: 167, category: 'document', icon: '📜', title: 'Legal Contract Builder', prompt: 'Standardized contract builder for consultants. Design style: Clean legalistic.' },
  { id: 168, category: 'document', icon: '❓', title: 'Knowledge Base Article', prompt: 'Generator for help center articles. Design style: Minimalist doc.' },
  { id: 169, category: 'document', icon: '📦', title: 'Versioning Docs', prompt: 'Automated documentation for release versions. Design style: Simple.' },
  { id: 170, category: 'document', icon: '🎨', title: 'Branding Guidelines Doc', prompt: 'Generate a guide for visual assets and font usage. Design style: Editorial.' },
  
  // ===== ANDROID CATEGORY (EXTENDED) =====
  { id: 171, category: 'android', icon: '🔋', title: 'Energy Consumption Profiler', prompt: 'Monitor CPU usage per background service to detect leaks. Design style: Technical.' },
  { id: 172, category: 'android', icon: '🧩', title: 'Feature Flag Manager', prompt: 'Manage feature flags in-app for rapid testing. Design style: Toggle-heavy UI.' },
  { id: 173, category: 'android', icon: '🚫', title: 'Network Blocklist', prompt: 'Allow users to block specific domains for an app. Design style: Simple list.' },
  { id: 174, category: 'android', icon: '⏲️', title: 'Code Benchmark Tool', prompt: 'Benchmark specific function execution time on device. Design style: Dark, technical.' },
  { id: 175, category: 'android', icon: '📡', title: 'Network Latency Test', prompt: 'Test latency for API endpoints from mobile. Design style: Gauge-based visual.' },
  { id: 176, category: 'android', icon: '💾', title: 'Storage Cleaner', prompt: 'Helper to find and clear cache files and temporary data. Design style: Utility.' },
  { id: 177, category: 'android', icon: '🎛️', title: 'Hardware Debugger', prompt: 'Debug sensor values, vibrator patterns, and screen refresh rates. Design style: Technical.' },
  { id: 178, category: 'android', icon: '🔔', title: 'Notification Logger', prompt: 'Log all notifications sent by the app for debugging. Design style: Terminal.' },
  { id: 179, category: 'android', icon: '📲', title: 'Install Source Info', prompt: 'Inspect how the app was installed (Play Store vs sideload). Design style: Info card.' },
  { id: 180, category: 'android', icon: '🔑', title: 'Keystore Explorer', prompt: 'View certificate info of the current build. Design style: Professional.' },
  
  // ===== PROMPT CATEGORY (EXTENDED) =====
  { id: 181, category: 'prompt', icon: '✍️', title: 'Persona Refiner', prompt: 'Refine a prompt by injecting persona-specific vocabulary (e.g. "Senior Dev"). Design style: 3D-depth Neumorphism.' },
  { id: 182, category: 'prompt', icon: '📋', title: 'Chain of Thought Prompt', prompt: 'Improve logic by forcing the prompt to use step-by-step reasoning (Chain of Thought). Design style: Structured.' },
  { id: 183, category: 'prompt', icon: '✂️', title: 'Constraint Injector', prompt: 'Apply strict constraints (no placeholders, specific lengths) to a prompt. Design style: Technical.' },
  { id: 184, category: 'prompt', icon: '💻', title: 'Documentation Enforcer', prompt: 'Force the AI to add JSDoc/KDoc documentation to generated code. Design style: Structured.' },
  { id: 185, category: 'prompt', icon: '👨‍💼', title: 'Stakeholder Translator', prompt: 'Turn technical specs into business-friendly language for stakeholders. Design style: Professional.' },
  { id: 186, category: 'prompt', icon: '🧪', title: 'Security Hardening Prompt', prompt: 'Force AI to write code with security first (SQL injection prevention, hashing). Design style: Technical.' },
  { id: 187, category: 'prompt', icon: '🚀', title: 'Optimization Focused Prompt', prompt: 'Force the prompt to prioritize O(n) complexity. Design style: Technical.' },
  { id: 188, category: 'prompt', icon: '📱', title: 'Accessibility First Prompt', prompt: 'Force the prompt to prioritize WCAG compliance in UI logic. Design style: Structured.' },
  { id: 189, category: 'prompt', icon: '🔧', title: 'Localization Ready Prompt', prompt: 'Force prompt to be ready for translation (I18N). Design style: Technical.' },
  { id: 190, category: 'prompt', icon: '🐛', title: 'Exception Safety Prompt', prompt: 'Force AI to wrap code in Try-Catch or Result types. Design style: Structured.' },
  
  // ===== APP CATEGORY (FINAL) =====
  { id: 191, category: 'app', icon: '⌚', title: 'Interval Training Timer', prompt: 'A highly custom interval training timer for HIIT. Design style: 3D-depth Neumorphism.' },
  { id: 192, category: 'app', icon: '💊', title: 'Medication Tracker', prompt: 'Keep track of daily medications and reminders. Design style: Soft/Clean.' },
  { id: 193, category: 'app', icon: '☕', title: 'Coffee Brew Timer', prompt: 'Precision timer for French press/Pour-over coffee. Design style: Skeuomorphic.' },
  { id: 194, category: 'app', icon: '🪴', title: 'Plant Identifier AI', prompt: 'Scan plants for disease and care tips. Design style: Organic/Green.' },
  { id: 195, category: 'app', icon: '☁️', title: 'Cloud File Sync', prompt: 'A simple file-syncing tool for local folders to Google Drive. Design style: Minimalist.' },
  { id: 196, category: 'app', icon: '💬', title: 'Voice Translator', prompt: 'Real-time voice translator with history log. Design style: Clean.' },
  { id: 197, category: 'app', icon: '🧩', title: 'Sudoku Solver', prompt: 'Scan and solve Sudoku puzzles. Design style: 3D-depth Neumorphism.' },
  { id: 198, category: 'app', icon: '🗺️', title: 'Offline Map Cache', prompt: 'Cache areas of maps for offline use. Design style: Simple.' },
  { id: 199, category: 'app', icon: '📦', title: 'Package Tracker', prompt: 'Track shipping packages from various carriers. Design style: Professional.' },
  { id: 200, category: 'app', icon: '🎵', title: 'Audio Looper', prompt: 'Loop small sections of audio for practice. Design style: Professional.' }
];

// ===== ADD YOUR ADDITIONAL PROMPTS HERE =====
// Paste your full 200-item array or additional prompts below this line
// Format: { id: N, category: 'category', icon: 'emoji', title: 'Title', prompt: 'Full prompt text...' }
// ============================================
