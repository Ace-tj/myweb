/**
 * Inlined in <head> to apply the `.dark` class on <html> before paint,
 * preventing a flash of unstyled content. Light is canonical (`:root`);
 * dark is the alternate (`.dark` rule in globals.css).
 *
 * Resolution order: localStorage('theme') > prefers-color-scheme > light.
 */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
