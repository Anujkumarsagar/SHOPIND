# 🗺️ SHOPIND.CO - Complete Routes Documentation

## 📋 Table of Contents
- [Public Routes](#public-routes)
- [Authentication Routes](#authentication-routes)
- [User Protected Routes](#user-protected-routes)
- [Admin Routes](#admin-routes)
- [API Routes](#api-routes)
- [Dynamic Routes](#dynamic-routes)

---

## 🌐 Public Routes
*Accessible to all users without authentication*

### Homepage
- **Route:** `/`
- **File:** `app/page.tsx`
- **Description:** Main landing page with hero section, featured products, new arrivals, top selling items, browse by style categories, and customer testimonials
- **Features:** 
  - Hero banner with CTA
  - Brand showcase (Versace, Zara, Gucci, Prada, Calvin Klein)
  - New arrivals section
  - Top selling products
  - Browse by dress style (Casual, Formal, Party, Gym)
  - Customer reviews carousel

### Shop/Products
- **Route:** `/shop`
- **File:** `app/shop/page.tsx`
- **Description:** Complete product catalog with advanced filtering and sorting
- **Query Parameters:**
  - `category` - Filter by category
  - `minPrice` - Minimum price filter
  - `maxPrice` - Maximum price filter
  - `colors` - Filter by color
  - `sizes` - Filter by size
  - `style` - Filter by dress style
  - `sort` - Sort products (price-asc, price-desc, rating, newest)
- **Features:**
  - Mobile-responsive filter sidebar
  - Real-time product filtering
  - Pagination
  - Grid/list view toggle

### Product Detail
- **Route:** `/product/[id]`
- **File:** `app/product/[id]/page.tsx`
- **Description:** Individual product page with full details
- **Features:**
  - Image gallery with zoom
  - Size and color selection
  - Quantity selector
  - Add to cart functionality
  - Product reviews and ratings
  - Write review (requires authentication)
  - Related products section

### Search
- **Route:** `/search`
- **File:** `app/search/page.tsx`
- **Description:** Search results page
- **Query Parameters:**
  - `q` - Search query
- **Features:**
  - Real-time product search
  - Filter and sort capabilities
  - Search suggestions

### Brands
- **Route:** `/brands`
- **File:** `app/brands/page.tsx`
- **Description:** Browse products by brand
- **Features:**
  - Brand directory
  - Products grouped by brand
  - Brand logos and descriptions

### Informational Pages
- **Route:** `/about`
  - **File:** `app/about/page.tsx`
  - **Description:** Company information, mission, and team

- **Route:** `/contact`
  - **File:** `app/contact/page.tsx`
  - **Description:** Contact form and information

- **Route:** `/support`
  - **File:** `app/support/page.tsx`
  - **Description:** Customer support and FAQs

- **Route:** `/delivery`
  - **File:** `app/delivery/page.tsx`
  - **Description:** Delivery and shipping information

- **Route:** `/terms`
  - **File:** `app/terms/page.tsx`
  - **Description:** Terms and conditions

- **Route:** `/privacy`
  - **File:** `app/privacy/page.tsx`
  - **Description:** Privacy policy

---

## 🔐 Authentication Routes
*For login, signup, and password management*

### Login
- **Route:** `/auth/login`
- **File:** `app/auth/login/page.tsx`
- **Description:** User login page
- **Features:**
  - Email/password login
  - Google OAuth sign-in
  - Remember me option
  - Forgot password link
  - Animated UI with framer-motion

### Sign Up
- **Route:** `/auth/sign-up`
- **File:** `app/auth/sign-up/page.tsx`
- **Description:** User registration page
- **Features:**
  - Email/password registration
  - Google OAuth sign-up
  - Email verification flow
  - Password strength indicator
  - Animated UI

### Email Verification
- **Route:** `/auth/verify-email`
- **File:** `app/auth/verify-email/page.tsx`
- **Description:** Email verification confirmation page
- **Features:**
  - Verification status display
  - Resend verification email option

### Forgot Password
- **Route:** `/auth/forgot-password`
- **File:** `app/auth/forgot-password/page.tsx`
- **Description:** Password reset request page
- **Features:**
  - Email input for password reset
  - Reset link sent confirmation

### Reset Password
- **Route:** `/auth/reset-password`
- **File:** `app/auth/reset-password/page.tsx`
- **Description:** Set new password page
- **Features:**
  - New password input
  - Password confirmation
  - Secure token validation

### Auth Error
- **Route:** `/auth/error`
- **File:** `app/auth/error/page.tsx`
- **Description:** Authentication error display page

### Auth Callback
- **Route:** `/auth/callback`
- **File:** `app/auth/callback/route.ts`
- **Type:** API Route
- **Description:** OAuth callback handler for Google authentication

---

## 👤 User Protected Routes
*Require user authentication*

### Shopping Cart
- **Route:** `/cart`
- **File:** `app/cart/page.tsx`
- **Description:** Shopping cart with item management
- **Auth Required:** Yes
- **Features:**
  - View all cart items
  - Update quantities
  - Remove items
  - Apply promo codes
  - Order summary with pricing
  - Checkout button

### User Account
- **Route:** `/account`
- **File:** `app/account/page.tsx`
- **Description:** User profile and settings
- **Auth Required:** Yes
- **Features:**
  - View/edit profile information
  - Update email and password
  - Manage addresses
  - View account statistics
  - Profile picture upload

### Order History
- **Route:** `/orders`
- **File:** `app/orders/page.tsx`
- **Description:** User's order history
- **Auth Required:** Yes
- **Features:**
  - List of all orders
  - Order status tracking
  - Order details view
  - Reorder functionality
  - Download invoices

---

## 🛠️ Admin Routes
*Require admin authentication and privileges*

### Admin Dashboard
- **Route:** `/admin`
- **File:** `app/admin/page.tsx`
- **Description:** Complete admin ERP system
- **Auth Required:** Admin only
- **Features:**
  - **Dashboard Overview:**
    - Total revenue analytics
    - Order statistics (pending, delivered, total)
    - Recent orders list
    - Revenue charts
  
  - **Product Management:**
    - Add new products
    - Edit existing products
    - Delete products
    - Bulk product operations
    - Product image upload
    - Inventory management
  
  - **Order Management:**
    - View all orders
    - Update order status
    - Filter by status (pending, processing, shipped, delivered)
    - Search orders
    - Order details view
    - Customer information

---

## 🔌 API Routes

### OAuth Callback
- **Route:** `/api/auth/callback`
- **File:** `app/auth/callback/route.ts`
- **Method:** GET
- **Description:** Handles OAuth redirect from Google authentication
- **Purpose:** Exchanges OAuth code for session, sets cookies

---

## 🎯 Dynamic Routes

### Product Detail
- **Pattern:** `/product/[id]`
- **Example:** `/product/1`, `/product/23`
- **Description:** Dynamic route for individual product pages
- **Parameters:**
  - `id` - Product ID from database

---

## 📊 Route Summary

| Category | Count | Auth Required |
|----------|-------|---------------|
| Public Pages | 11 | No |
| Auth Pages | 6 | No* |
| User Pages | 3 | Yes |
| Admin Pages | 1 | Yes (Admin) |
| API Routes | 1 | Varies |
| **Total** | **22** | - |

*Auth pages are accessible to unauthenticated users but redirect authenticated users

---

## 🚀 Quick Navigation

**For Customers:**
\`\`\`
Homepage → Shop → Product Detail → Cart → Checkout
                                  ↓
                              Account/Orders
\`\`\`

**For Admins:**
\`\`\`
Login → Admin Dashboard → Product Management
                       → Order Management
                       → Analytics
\`\`\`

---

## 🔗 Important Links

- **Main Navigation:** Homepage, Shop, New Arrivals, Brands
- **Footer Links:** About, Contact, Support, Terms, Privacy, Delivery
- **User Menu:** Account, Orders, Cart, Logout
- **Admin Access:** `/admin` (requires admin role)

---

## 📱 Mobile Navigation

All routes are fully responsive and include:
- Hamburger menu for main navigation
- Mobile-optimized filter sheets
- Touch-friendly product cards
- Swipeable image galleries
- Bottom navigation for quick access

---

## 🔒 Protected Route Middleware

Routes are protected using Supabase authentication middleware that:
- Checks user session on protected routes
- Redirects unauthenticated users to login
- Refreshes session tokens automatically
- Validates admin permissions for admin routes

---

**Last Updated:** 2024
**Version:** 1.0
