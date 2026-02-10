# Fullstack Architecture Foundation



---

## 🎯 LAYER 2 - DATA LAYER + USERS CORE (ACTIVE)

### What's New in Layer 2

Layer 2 introduces **real database integration** with Prisma ORM and a fully functional **Users Core Module**.

#### Database Setup (Prisma ORM)

**Prisma is now integrated** with PostgreSQL:

\`\`\`bash
# Generate Prisma Client
cd backend
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Open Prisma Studio
npm run prisma:studio
\`\`\`

**Database Models:**
- ✅ **User** - Full CRUD with roles (SUPERADMIN, ADMIN, AGENCY)
- ✅ **Agency** - Foundation structure (commissions logic pending)

**Environment Variables:**
\`\`\`env
DATABASE_URL="postgresql://admin:password@localhost:5432/myapp?schema=public"
\`\`\`

---

#### Users Module

**Backend API Endpoints:**

\`\`\`bash
POST   /api/v1/users          # Create user
GET    /api/v1/users          # List users (with pagination)
GET    /api/v1/users/:id      # Get user by ID
PATCH  /api/v1/users/:id      # Update user
DELETE /api/v1/users/:id      # Soft delete (deactivate)
\`\`\`

**Query Parameters for GET /users:**
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 10)
- `role` - Filter by role (SUPERADMIN, ADMIN, AGENCY)
- `isActive` - Filter by status (true/false)

**Example Request:**
\`\`\`bash
curl -X POST http://localhost:3001/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepass123",
    "role": "AGENCY"
  }'
\`\`\`

**Frontend Users Page:**
- Navigate to: http://localhost:5173/users
- View users table with pagination
- Role badges and status indicators
- Real-time data from backend

---

### Running Layer 2

**1. Start PostgreSQL:**
\`\`\`bash
# Using Docker Compose (recommended)
docker-compose up postgres -d

# Or manually with Docker
docker run -d \
  --name fullstack-postgres \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=myapp \
  -p 5432:5432 \
  postgres:15-alpine
\`\`\`

**2. Run Migrations:**
\`\`\`bash
cd backend
npm install
npm run prisma:migrate
\`\`\`

**3. Start Backend & Frontend:**
\`\`\`bash
# Backend
cd backend
npm run dev

# Frontend (new terminal)
cd frontend
npm run dev
\`\`\`

**4. Access:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api/v1
- Users Page: http://localhost:5173/users

---

### Architecture Updates

**Backend Structure:**
\`\`\`
backend/
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Migration history
├── src/
│   ├── core/
│   │   └── database/
│   │       └── prismaClient.js  # Singleton client
│   └── modules/
│       └── users/
│           ├── dto/              # Data Transfer Objects
│           │   ├── create-user.dto.js
│           │   └── update-user.dto.js
│           ├── users.controller.js
│           ├── users.service.js
│           ├── users.routes.js
│           └── index.js
\`\`\`

**Frontend Structure:**
\`\`\`
frontend/src/
├── services/
│   ├── api.js              # Base API service (existing)
│   └── usersApi.js         # Users API methods
└── features/
    └── users/
        ├── UsersPage.jsx   # Users management page
        └── UsersPage.css   # Styles
\`\`\`

---

### What's NOT Included Yet

❌ Authentication system (JWT, sessions)  
❌ Authorization middleware  
❌ Commission calculation engine  
❌ Agency hierarchy/tree logic  
❌ Advanced agency management  

**These will be added in future layers.**

---

### Testing Users API

\`\`\`bash
# Health check
curl http://localhost:3001/api/v1/health

# Create user
curl -X POST http://localhost:3001/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Get all users
curl http://localhost:3001/api/v1/users

# Get user by ID
curl http://localhost:3001/api/v1/users/{USER_ID}
\`\`\`

---
