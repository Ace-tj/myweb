// Minimal root layout — actual <html>/<body> live in src/app/[locale]/layout.tsx
// so the `lang` attribute can be set per locale.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
