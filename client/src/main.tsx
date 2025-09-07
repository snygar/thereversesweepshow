import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

document.title = "The Reverse Sweep Show - Cricket Podcast";

// Add viewport meta tag
const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1';
document.getElementsByTagName('head')[0].appendChild(meta);

// Add font preloads
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Roboto:wght@300;400;500&display=swap';
document.getElementsByTagName('head')[0].appendChild(fontLink);

// Add icon library
const iconLink = document.createElement('link');
iconLink.rel = 'stylesheet';
iconLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
document.getElementsByTagName('head')[0].appendChild(iconLink);

createRoot(document.getElementById("root")!).render(<App />);
