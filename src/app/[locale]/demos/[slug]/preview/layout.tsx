/**
 * Demo previews intentionally drop the marketing site's header/footer/chrome
 * so the embedded demo can use its own visual language without bleeding
 * styles into the agency theme.
 */
export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}
