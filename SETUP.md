# 🚀 SHOPIND.CO - Local Development Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** or **pnpm** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Supabase Account** - [Sign up free](https://supabase.com/)

---

## 🛠️ Installation Steps

### Step 1: Clone the Repository

\`\`\`bash
git clone <your-repository-url>
cd shop-co
\`\`\`

### Step 2: Install Dependencies

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### Step 3: Set Up Supabase

1. **Create a Supabase Project:**
   - Go to [app.supabase.com](https://app.supabase.com/)
   - Click "New Project"
   - Fill in project details
   - Wait for project to be created (2-3 minutes)

2. **Get Your API Keys:**
   - Go to Settings → API
   - Copy the "Project URL"
   - Copy the "anon public" key
   - Copy the "service_role" key (keep this secret!)

3. **Get Database Connection Details:**
   - Go to Settings → Database
   - Copy the connection pooling URL
   - Copy the direct connection URL

### Step 4: Configure Environment Variables

1. **Copy the example environment file:**

\`\`\`bash
cp .env.example .env.local
\`\`\`

2. **Edit `.env.local` and fill in your Supabase credentials:**

\`\`\`env
# Required - Get from Supabase Settings → API
NEXT_PUBLIC_DBSUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_DBSUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Required - Get from Supabase Settings → Database
POSTGRES_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@..."

# Optional but recommended for development
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL="http://localhost:3000/auth/verify-email"
\`\`\`

### Step 5: Set Up the Database

Run the SQL scripts in order to create tables and seed data:

1. **Run from your terminal using Supabase CLI** (recommended):

\`\`\`bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref [YOUR-PROJECT-REF]

# Run migrations
supabase db push
\`\`\`

2. **Or run manually in Supabase SQL Editor:**

Go to your Supabase Dashboard → SQL Editor and run these scripts in order:

- `scripts/001_create_tables.sql` - Creates all database tables
- `scripts/002_create_profile_trigger.sql` - Sets up profile creation trigger
- `scripts/003_seed_products.sql` - Adds sample products
- `scripts/004_create_orders_table.sql` - Creates orders table
- `scripts/005_fix_reviews_foreign_key.sql` - Fixes reviews constraints

### Step 6: Configure Google OAuth (Optional)

To enable Google sign-in:

1. **Create Google OAuth Credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Go to Credentials → Create Credentials → OAuth client ID
   - Set authorized redirect URIs:
     - `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback` (for development)

2. **Add to Supabase:**
   - Go to Supabase Dashboard → Authentication → Providers
   - Enable Google provider
   - Add your Client ID and Client Secret
   - Save changes

### Step 7: Start Development Server

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂️ Database Schema

The application uses the following tables:

### Products Table
\`\`\`sql
- id (uuid, primary key)
- name (text)
- description (text)
- price (numeric)
- discount_price (numeric, nullable)
- category (text)
- image_url (text)
- colors (text array)
- sizes (text array)
- rating (numeric)
- reviews_count (integer)
- created_at (timestamp)
\`\`\`

### Profiles Table
\`\`\`sql
- id (uuid, references auth.users)
- email (text)
- full_name (text)
- avatar_url (text, nullable)
- created_at (timestamp)
- updated_at (timestamp)
\`\`\`

### Cart Items Table
\`\`\`sql
- id (uuid, primary key)
- user_id (uuid, references profiles)
- product_id (uuid, references products)
- quantity (integer)
- selected_size (text)
- selected_color (text)
- created_at (timestamp)
\`\`\`

### Reviews Table
\`\`\`sql
- id (uuid, primary key)
- product_id (uuid, references products)
- user_id (uuid, references profiles)
- rating (integer)
- comment (text)
- created_at (timestamp)
\`\`\`

### Orders Table
\`\`\`sql
- id (uuid, primary key)
- user_id (uuid, references profiles)
- items (jsonb)
- total (numeric)
- status (text)
- created_at (timestamp)
\`\`\`

---

## 🔐 Row Level Security (RLS)

All tables have RLS enabled with these policies:

**Products:**
- Public read access
- Admin-only write access

**Profiles:**
- Users can read their own profile
- Users can update their own profile

**Cart Items:**
- Users can CRUD their own cart items
- No public access

**Reviews:**
- Public read access
- Authenticated users can create
- Users can update/delete their own reviews

**Orders:**
- Users can read their own orders
- Users can create orders
- Admin can read all orders

---

## 📦 Project Structure

\`\`\`
shop-co/
├── app/
│   ├── (routes)/
│   │   ├── page.tsx              # Homepage
│   │   ├── shop/                 # Shop page
│   │   ├── product/[id]/         # Product detail
│   │   ├── cart/                 # Shopping cart
│   │   ├── account/              # User account
│   │   ├── orders/               # Order history
│   │   ├── admin/                # Admin dashboard
│   │   ├── about/                # About page
│   │   ├── contact/              # Contact page
│   │   ├── support/              # Support page
│   │   ├── delivery/             # Delivery info
│   │   ├── terms/                # Terms & conditions
│   │   └── privacy/              # Privacy policy
│   ├── auth/
│   │   ├── login/                # Login page
│   │   ├── sign-up/              # Signup page
│   │   ├── forgot-password/      # Password reset
│   │   ├── reset-password/       # New password
│   │   ├── verify-email/         # Email verification
│   │   ├── error/                # Auth errors
│   │   └── callback/             # OAuth callback
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── site-header.tsx           # Navigation header
│   ├── site-footer.tsx           # Footer
│   ├── product-filters.tsx       # Filter sidebar
│   ├── product-reviews.tsx       # Reviews component
│   ├── admin-dashboard.tsx       # Admin overview
│   ├── admin-product-manager.tsx # Product management
│   └── admin-orders-manager.tsx  # Order management
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── proxy.ts              # Middleware client
│   └── types.ts                  # TypeScript types
├── scripts/
│   ├── 001_create_tables.sql
│   ├── 002_create_profile_trigger.sql
│   ├── 003_seed_products.sql
│   ├── 004_create_orders_table.sql
│   └── 005_fix_reviews_foreign_key.sql
├── .env.local                    # Your environment variables
├── .env.example                  # Example environment file
├── package.json
├── ROUTES.md                     # Route documentation
└── SETUP.md                      # This file
\`\`\`

---

## 🎯 Common Tasks

### Adding a New Product (Via Admin)
1. Navigate to `/admin`
2. Click "Product Management" tab
3. Click "Add New Product"
4. Fill in product details
5. Click "Save Product"

### Testing Authentication
1. Go to `/auth/sign-up`
2. Create a test account
3. Check your email for verification link
4. Or use Google sign-in

### Accessing Admin Dashboard
1. Create an admin user in Supabase:
\`\`\`sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
\`\`\`
2. Navigate to `/admin`

---

## 🐛 Troubleshooting

### Port Already in Use
\`\`\`bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
\`\`\`

### Supabase Connection Errors
- Verify your environment variables are correct
- Check if Supabase project is running
- Ensure your IP is not blocked by Supabase

### Database Migration Errors
- Run scripts in order (001, 002, 003, etc.)
- Check for existing tables and drop if needed
- Verify you have the correct database permissions

### Google OAuth Not Working
- Check redirect URIs match exactly
- Verify Google OAuth consent screen is configured
- Ensure Google provider is enabled in Supabase

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com/)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Environment Variables for Production

Make sure to add all variables from `.env.example` to your Vercel project settings.

**Important:** Update redirect URLs for production:
\`\`\`env
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL="https://your-domain.com/auth/verify-email"
\`\`\`

---

## 💡 Tips

- Use the admin dashboard to manage products and orders
- Enable Google OAuth for better user experience
- Monitor Supabase usage in the dashboard
- Use RLS policies to secure your data
- Test on multiple devices for responsive design
- Check browser console for error messages

---

## 🤝 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review Supabase logs
3. Check browser console for errors
4. Verify environment variables

---

**Happy Coding!** 🎉
