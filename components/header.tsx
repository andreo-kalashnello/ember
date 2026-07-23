import { ButtonLink, Logo } from "./ui";

const links = [
  ["The Experience", "#experience"],
  ["Menu", "#menu"],
  ["Private Dining", "#reservation"],
  ["Wine", "#wine"],
  ["About", "#about"],
  ["Contact", "#contact"],
] as const;

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <ButtonLink href="#reservation">Book a table</ButtonLink>
        </div>
      </div>
    </header>
  );
}
