<p align="center">
  <img src="docs/images/Logo.png" alt="VK9D Kasm Registry Logo" width="300"><br>
</p>

# VK9D Kasm Registry

This repository hosts the **VK9D Kasm Workspace Registry**, a static, schema-aware registry designed to work seamlessly with **Kasm Workspaces**.

The registry:
- Generates a Kasm-compatible `list.json`
- Builds a static storefront using Next.js
- Publishes via GitHub Pages
- Supports multiple schema versions (currently `1.1`)

---

## 🌐 Live Registry

- **Storefront:** https://vk9d.github.io/kasm-registry/1.1/
- **Registry URL (for Kasm):** https://vk9d.github.io/kasm-registry/

---

## 📁 Repository Structure

```
kasm-registry/
├── processing/        # Registry generation scripts
├── site/              # Static storefront (Next.js)
├── workspaces/        # Workspace definitions
├── docs/              # Documentation
├── CONTRIBUTING.md
└── README.md
```

---

## 🧩 How It Works

1. Workspace definitions live in `workspaces/*/workspace.json`
2. CI generates `list.json` + metadata
3. Storefront is statically built
4. Output is published to `gh-pages`
5. Kasm consumes the registry directly

---

## 📚 Documentation

- [Contributing](CONTRIBUTING.md)
- [Adding a Workspace](docs/ADDING_A_WORKSPACE.md)
- [Build Pipeline](docs/BUILD_PIPELINE.md)
- [Known Failure Modes](docs/KNOWN_FAILURES.md)

---

## 🚑 Recovery Philosophy

This registry is designed to be **fully regeneratable**.
If something breaks, roll back `main` and let CI rebuild.

No hotfixes. No panic edits.

---

## 🧠 Design Goals

- Static > Dynamic
- Predictable > Clever
- Recoverable > Fragile

---

Maintained by **SquirrelWorks LLC**
