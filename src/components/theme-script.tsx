/**
 * Inlined in <head> to set the `.light` class on <html> before paint,
 * preventing a flash of unstyled content when the user has saved a theme.
 *
 * Dark is the canonical Pixelforge look (no class). Light is the alternate.
 */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: light)').matches;if(t==='light'||(!t&&m)){document.documentElement.classList.add('light');}}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
