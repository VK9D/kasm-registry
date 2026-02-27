import Link from "next/link";
import { useRouter } from "next/router";

function NavLink({ href, children }) {
  const router = useRouter();
  const active =
    router.asPath === href || (href !== "/" && router.asPath.startsWith(href));

  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition",
        active
          ? "bg-white/20 text-white ring-1 ring-white/30"
          : "bg-white/10 text-white/90 ring-1 ring-white/20 hover:bg-white/15",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default function Header({ search, setSearch }) {
  return (
    <header className="sw-topbar">
      <div className="mx-auto max-w-6xl px-6 py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="text-2xl font-extrabold tracking-tight text-white">
              VK9D Kasm Registry
            </div>
            <div className="mt-1 text-xs tracking-[0.35em] uppercase text-white/70">
              Workspace Registry
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-end">
            <div className="flex items-center gap-2">
              <NavLink href="/">Library</NavLink>
              {/* Keep /add so we don’t collide with /new/[[...workspace]] */}
              <NavLink href="/add">New</NavLink>
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for workspace"
              className="w-full md:w-[420px] rounded-xl bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/60 ring-1 ring-white/20 outline-none focus:bg-white/15"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
