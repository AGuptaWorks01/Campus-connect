# CampusClient

src/
  └── app/
        ├── auth-guard/                     # Auth Guard-related files
        │    └── auth.guard.ts              # The actual guard to protect routes
        │
        ├── components/                     # UI components (pages and reusable components)
        │    ├── home/                      # Home page component
        │    │    └── home.component.ts     # Home component logic
        │    ├── login/                     # Login page component
        │    │    └── login.component.ts    # Login component logic
        │    ├── register/                  # Register page component
        │    │    └── register.component.ts # Register component logic
        │    ├── forget-password/           # Forget Password page component
        │    │    └── forget-password.component.ts
        │    ├── reset-password/            # Reset Password page component
        │    │    └── reset-password.component.ts
        │    ├── students-details/          # Students Details page component
        │    │    └── students-details.component.ts
        │    ├── ai-powered-mock-interview/ # AI-powered Mock Interview component
        │    │    └── ai-powered-mock-interview.component.ts
        │    ├── ai-powered-resume-review/  # AI-powered Resume Review component
        │    │    └── ai-powered-resume-review.component.ts
        │    ├── feedback/                  # Feedback component
        │    │    └── feedback.component.ts
        │    └── students-details/          # Students Details (if this is a separate view)
        │         └── students-details.component.ts
        │
        ├── layout/                         # Layout components (navbar, footer)
        │    ├── navbar/                    # Navbar component
        │    │    └── navbar.component.ts
        │    └── footer/                    # Footer component
        │         └── footer.component.ts
        │
        ├── services/                       # Services to interact with APIs
        │    ├── auth.service.ts            # Auth service to manage login/register etc.
        │    ├── students.service.ts        # Service to manage student data
        │    ├── gemini-ai.service.ts       # Service to interact with Gemini AI for resume review, mock interview
        │    └── feedback.service.ts        # Service to manage feedback
        │
        ├── app.component.ts              # Root app component
        ├── app.module.ts                 # Main module file to declare components and services
        ├── app.component.html            # Root template for the app (usually includes navbar, footer, router-outlet)
        └── app.component.css     
        ├── app-route.ts           # Main routing file where 