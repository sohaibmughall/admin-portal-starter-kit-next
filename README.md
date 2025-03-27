# Modern E-commerce Dashboard

A modern, feature-rich e-commerce dashboard built with Next.js 13, TypeScript, Tailwind CSS, and shadcn/ui components. This dashboard provides comprehensive management tools for products, orders, customers, categories, and reviews.

## Features

- 📊 **Dashboard Overview**
  - Key metrics visualization
  - Recent activity tracking
  - Performance analytics

- 🛍️ **Product Management**
  - Add, edit, and delete products
  - Categorize products
  - Track inventory levels
  - Product reviews and ratings

- 📦 **Order Management**
  - Real-time order tracking
  - Order status updates
  - Multiple items per order
  - Order history

- 👥 **Customer Management**
  - Customer profiles
  - Order history per customer
  - Contact information
  - Total spend tracking

- 🏷️ **Category Management**
  - Hierarchical category structure
  - Category metrics
  - Product associations

- ⭐ **Review System**
  - Product ratings and reviews
  - Star rating visualization
  - Review moderation tools

## Tech Stack

- **Frontend Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Redux Toolkit with Redux Persist
- **Icons**: Lucide Icons

## Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd project-bolt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the dashboard.

## Project Structure

```
project/
├── app/
│   └── (dashboard)/
│       ├── products/
│       ├── orders/
│       ├── customers/
│       ├── categories/
│       └── reviews/
├── components/
│   ├── ui/
│   ├── dashboard/
│   └── modals/
├── lib/
│   ├── store/
│   │   └── slices/
│   ├── types/
│   ├── hooks/
│   └── utils/
└── public/
```

## Key Features Implementation

### State Management
- Redux Toolkit for centralized state management
- Redux Persist for local storage persistence
- Custom hooks for Redux integration

### UI Components
- Modular component architecture
- Reusable UI components from shadcn/ui
- Responsive design for all screen sizes

### Data Management
- CRUD operations for all entities
- Real-time updates
- Optimistic UI updates
- Data persistence

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Lucide Icons](https://lucide.dev/)
