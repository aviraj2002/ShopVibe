# **App Name**: ShopVibe

## Core Features:

- Product Catalog: Display a grid of 5-10 mock product items fetched from the backend API, including details like ID, name, and price.
- Add to Cart: Allow users to add products to their cart with a specified quantity, sending a POST request to the /api/cart endpoint.
- Cart Management: Display cart items with quantity and total price, allow users to remove items using DELETE /api/cart/:id.
- Cart Summary: Calculate and display the total cost of items in the cart using GET /api/cart.
- Mock Checkout: Implement a mock checkout process that accepts name/email and returns a mock receipt with the total and timestamp by POST /api/checkout.
- Database Persistence: Persist cart data in a database using MongoDB for mock user, bonus to persist to an SQL database for an extra bonus.

## Style Guidelines:

- Primary color: Deep Indigo (#4B0082) to evoke a sense of sophistication and trust.
- Background color: Light Lavender (#E6E6FA), a very desaturated version of indigo, to provide a gentle and unobtrusive backdrop.
- Accent color: Violet (#8F00FF), an analogous hue to the primary color, to draw attention to important elements without overwhelming the design.
- Headline font: 'Playfair', serif, for elegant titles. Body font: 'PT Sans', sans-serif, for clear, readable descriptions.
- Use minimalist line icons for product categories and cart actions.
- Implement a responsive grid layout for products, adapting to different screen sizes.
- Subtle hover effects on product cards and smooth transitions for cart updates.