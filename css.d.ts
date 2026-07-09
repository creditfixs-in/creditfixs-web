// Ambient declaration for global CSS side-effect imports (e.g. `import "./globals.css"`).
// Next only ships types for CSS Modules (*.module.css), so a plain global CSS import
// triggers TypeScript's ts(2882) in editors. Declaring the module makes it type-check.
// The more specific `*.module.css` declaration from next/types still wins for CSS Modules.
declare module "*.css";
