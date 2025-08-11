# Split Bill 💰

A modern, responsive web application for effortlessly splitting bills with friends. Calculate individual shares, tips, and payments in seconds with a beautiful glassmorphism design.

![Split Bill Preview](https://via.placeholder.com/800x400/2563eb/ffffff?text=Split+Bill+App)

## ✨ Features

- **Smart Bill Splitting**: Split bills equally or with custom amounts for each person
- **Flexible Tax & Tip Calculation**: Support for both percentage and fixed amount inputs
- **Group Management**: Add up to 10 participants with customizable shares
- **Real-time Calculations**: Instant updates as you modify inputs
- **Share Results**: Copy shareable summaries to clipboard
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Glassmorphism UI**: Modern frosted glass design with smooth animations
- **Accessibility**: Built with accessibility best practices

## 🚀 Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism components
- **Icons**: Font Awesome
- **Fonts**: Inter (headings) and Open Sans (body text)
- **State Management**: React hooks (useState, useReducer)

## 🎨 Design

The app implements glassmorphism design principles with:
- Frosted glass effects with backdrop blur
- Transparent overlays and subtle borders
- Floating background shapes with animations
- Color palette: Blue tones (#eff6ff, #bfdbfe, #2563eb, #1e3a8a, #3b82f6)

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/BillBalancer/SplitBill
   cd split-bill
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
split-bill/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with global styles
│   ├── page.tsx           # Landing page
│   ├── split/             # Bill splitter tool
│   │   └── page.tsx
│   └── globals.css        # Global styles and glassmorphism components
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Landing page hero section
│   ├── Features.tsx       # Features showcase
│   ├── HowItWorks.tsx     # Step-by-step guide
│   ├── CTA.tsx            # Call-to-action section
│   ├── Footer.tsx         # Site footer
│   └── BillSplitter.tsx   # Main bill splitting functionality
├── lib/                   # Utility functions
│   ├── calculations.ts    # Bill splitting logic
│   └── fontawesome.ts     # Font Awesome configuration
├── types/                 # TypeScript type definitions
│   └── index.ts
└── public/               # Static assets
```

## 🧮 How It Works

### Bill Splitting Logic

The app supports two splitting modes:

1. **Equal Split**: Total amount (including tax and tip) divided equally among all participants
2. **Custom Split**: Each person pays based on their individual consumption, with tip distributed proportionally

### Example Calculation

**Scenario**: $100 bill + $10 tax + 15% tip ($16.50) = $126.50 total

- **Equal split (3 people)**: Each pays ~$42.17
- **Custom split**: Person A ($50), B ($30), C ($20) + proportional tip

## 🎯 Usage

1. **Enter Bill Details**
   - Input total bill amount
   - Add tax (amount or percentage)
   - Set tip (percentage or fixed amount)

2. **Add Participants**
   - Add 2-10 people
   - Optionally set custom amounts for uneven splits

3. **Calculate & Share**
   - Get instant breakdown for each person
   - Copy shareable summary to clipboard

## 🚀 Deployment

This Next.js application can be deployed to any hosting platform that supports Node.js or static sites.

### Build for Production

```bash
# Build the application
npm run build

# For static export (if configured)
npm run build && npm run export
```

### Deployment Options

- **Static Hosting**: Deploy the built files to any static hosting service
- **Node.js Hosting**: Deploy to platforms that support Node.js applications
- **Serverless**: Deploy to serverless platforms with Next.js support

### Production Server

```bash
# Start production server (for Node.js deployments)
npm start
```

## 🔧 Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 Customization

### Colors

Update the color palette in `tailwind.config.js`:

```javascript
colors: {
  primary: '#eff6ff',      // Light blue background
  secondary: '#bfdbfe',    // Medium blue
  accent: '#2563eb',       // Bright blue (buttons, icons)
  text: '#1e3a8a',         // Dark blue (headings)
  'text-secondary': '#3b82f6', // Medium blue (body text)
}
```

### Fonts

Modify font imports in `app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap');
```

## 🔮 Extension Ideas

### Backend Integration
- **User Accounts**: Add authentication with NextAuth.js
- **Bill History**: Store and retrieve past calculations
- **Group Management**: Save frequent groups and settings
- **Database**: Integrate with PostgreSQL, MongoDB, or Supabase

### Enhanced Features
- **Currency Support**: Multi-currency calculations with exchange rates
- **Receipt Scanning**: OCR integration to extract bill amounts
- **Payment Integration**: Connect with Venmo, PayPal, or Stripe
- **Notifications**: Email/SMS reminders for payments
- **Expense Tracking**: Monthly/yearly spending analytics

### UI/UX Improvements
- **Dark Mode**: Toggle between light and dark themes
- **Animations**: Enhanced micro-interactions and transitions
- **PWA**: Progressive Web App with offline support
- **Mobile App**: React Native version for iOS/Android

### Advanced Calculations
- **Tax Variations**: Different tax rates per item
- **Discounts**: Coupon and discount handling
- **Service Charges**: Automatic service fee calculations
- **Split by Items**: Individual item-level splitting

### Social Features
- **Group Invites**: Send invitations via email/SMS
- **Real-time Collaboration**: Multiple users editing simultaneously
- **Payment Status**: Track who has paid their share
- **Social Sharing**: Share results on social media

### Developer Experience
- **Testing**: Add Jest and React Testing Library
- **Storybook**: Component documentation and testing
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Monitoring**: Error tracking with Sentry
- **Analytics**: User behavior tracking with Google Analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspired by modern glassmorphism trends
- Icons provided by Font Awesome
- Built with Next.js and Tailwind CSS

---

**Happy bill splitting! 🎉**