# AI Rules for Saidj Mohamed Law Office Website

This document outlines the core technologies used in this application and provides guidelines for using specific libraries and tools.

## Tech Stack Description

*   **Frontend Framework**: React 19 for building dynamic user interfaces.
*   **Language**: TypeScript for type-safe and maintainable code.
*   **Build Tool**: Vite for a fast development experience and optimized builds.
*   **Styling**: Tailwind CSS for utility-first styling, complemented by custom CSS for advanced animations and global styles.
*   **State Management**: React's built-in `useState` and `useContext` for managing component and global application state.
*   **Routing**: Custom hash-based routing implemented directly in `App.tsx` for navigation.
*   **Icons**: Custom SVG icons defined in `components/icons.tsx`.
*   **Animations**: Primarily custom CSS animations for dynamic visual effects.
*   **AI Integration**: Google Gemini API for the interactive chatbot functionality.
*   **Internationalization (i18n)**: A custom `LanguageContext` and `translations.ts` file for multi-language support.
*   **Performance & SEO**: Custom `PerformanceOptimizer` component, JSON-LD schema markup, and a Service Worker for caching and offline capabilities.

## Library Usage Rules

To maintain consistency, performance, and simplicity, please adhere to the following guidelines when making changes or adding new features:

*   **UI Components**:
    *   **Rule**: Always build new UI components using React and style them with Tailwind CSS.
    *   **Avoid**: Introducing new external UI component libraries (e.g., Material UI, Ant Design) unless explicitly requested and justified for a complex, specific need not covered by existing patterns.
    *   **Note**: While `shadcn/ui` and `Radix UI` are available in the environment, prioritize custom Tailwind-based components for consistency with the existing codebase.

*   **Styling**:
    *   **Rule**: Use Tailwind CSS classes for all component-level styling. For global styles, complex animations, or utility classes not covered by Tailwind, add them to `styles/enhanced.css` or `styles/modern-enhanced.css`.
    *   **Avoid**: Inline styles where Tailwind classes can be used, or creating new CSS files for minor component-specific styles.

*   **Icons**:
    *   **Rule**: Utilize the existing custom SVG icons from `components/icons.tsx`. If a required icon is missing, add it to this file.
    *   **Consider**: If a very broad range of icons is needed, `lucide-react` is available and can be used, but prefer adding to `components/icons.tsx` for consistency.

*   **State Management**:
    *   **Rule**: For all state management, use React's `useState` for local component state and `useContext` for global state (e.g., `LanguageContext`).
    *   **Avoid**: Introducing external state management libraries (e.g., Redux, Zustand) as the current application's complexity does not warrant them.

*   **Routing**:
    *   **Rule**: Continue to use the existing hash-based routing mechanism (`window.location.hash`) for navigation within the single-page application.
    *   **Consider**: If more advanced routing features (e.g., nested routes, programmatic navigation without hash) become necessary, `react-router-dom` would be the appropriate library to introduce.

*   **API Interaction**:
    *   **Rule**: Use the native `fetch` API for all HTTP requests (e.g., interacting with the Gemini API, fetching `articles.json`).
    *   **Avoid**: Adding external HTTP client libraries (e.g., Axios) unless a specific, compelling reason arises.

*   **AI Integration**:
    *   **Rule**: All chatbot functionality must be powered by the Google Gemini API, as implemented in `components/Chatbot.tsx`.
    *   **Note**: Ensure the `GEMINI_API_KEY` is handled securely via environment variables.

*   **Internationalization**:
    *   **Rule**: Leverage the `LanguageContext` and `translations.ts` for all multi-language content.
    *   **Avoid**: Introducing alternative i18n libraries.

*   **Performance & SEO**:
    *   **Rule**: Utilize the `PerformanceOptimizer` component and its associated techniques (lazy loading, image optimization, Intersection Observer hook) to ensure optimal performance and SEO. Implement JSON-LD schema markup where appropriate (e.g., `HeroImproved.tsx`).
    *   **Note**: The Service Worker (`public/sw.js`) is configured for caching and offline support; ensure any new assets are considered for caching strategies.

*   **Forms**:
    *   **Rule**: Use standard HTML form elements and handle submissions via native `fetch` to services like Formspree, as demonstrated in `components/Contact.tsx`.
    *   **Avoid**: Complex form libraries unless advanced validation or state management is specifically required for a new form.