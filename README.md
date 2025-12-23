# Expressive Reads

A modern e-commerce store for books and notebooks, built with Next.js, ShadCN, Tailwind CSS, and powered by Genkit for AI features.

## Features

*   **Modern UI/UX:** Built with Next.js, React, and ShadCN UI for a clean and responsive user interface.
*   **Theme Toggle:** Switch between light and dark modes.
*   **Book Discovery:** Browse books by category or use the search functionality.
*   **Live Data:** Fetches book information from the Open Library API.
*   **AI Recommendations:** Personalized book suggestions powered by Google's Genkit.
*   **Shopping Cart & Wishlist:** Fully functional cart and wishlist using client-side state management.
*   **E-commerce Flow:** Product detail pages, checkout process, and user profiles.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
*   **AI:** [Genkit](https://firebase.google.com/docs/genkit)
*   **Data Source:** [Open Library API](https://openlibrary.org/developers/api)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later)
*   npm

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username_/your_repository_name.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Set up your environment variables. Create a `.env` file in the root of your project and add your Gemini API key:
    ```
    GEMINI_API_KEY=YOUR_API_KEY
    ```
4.  Run the development server:
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:9002`.

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

MIT License

Copyright (c) 2024 Raj Kashyap

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
