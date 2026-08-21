---
title: "RFC #344 Review: High-Level Rust Crate API for Fedimint SDK"
rfc: 344
repo: fedimint-sdk
authors:
  - zeenix
  - MrImmortal09
status: "Final Comment Draft Ready | Task Strategy & Contribution Offer Included"
tags:
  - fedimint
  - rust
  - uniffi
  - sdk
  - rfc-344
  - architecture
---

# Architectural Review & Complete GitHub Comment Plan: RFC #344

---

## 📌 Ready-to-Post GitHub Comment

Copy and post this complete response directly to [GitHub Issue #344](https://github.com/fedimint/fedimint-sdk/issues/344):

```markdown
Great RFC @zeenix! The unified SDK architecture and capability facade model (`ecash()`, `lightning()`, `onchain()`) is a huge step forward for developer ergonomics and language binding consistency.

A couple of architectural considerations to complement the design:

1. **Multi-Federation Key Derivation & Domain Separation**: Since `Sdk` derives per-federation secrets from a single BIP-39 seed, specifying a standard domain-separated derivation path (e.g. `m/44'/1023'/<federation_index>'` or `HMAC-SHA512(seed, FederationId)`) will ensure that compromising one federation's state never risks secrets or user privacy across other joined federations.

2. **Database Locking in Extensions/Widgets**: App extensions (iOS Share Extensions, Today Widgets, Android Notification Services) often run in separate background processes. Incorporating IPC/DB-lock delegation (`fedimint-db-locked` style) in `Storage::at()` will prevent `DatabaseLocked` panics when widgets access the SDK concurrently with the main app process.

3. **PR Execution Strategy & Task Splitting**: Since this proposal spans multiple domain crates, will this be executed as an incremental series of smaller PRs (e.g. Types -> Storage -> Handles -> Capability Facades -> FFI)? Splitting this into modular tasks will make code review much smoother.

I'd love to help contribute to this! I can take on implementing one of the clean, self-contained initial tasks—such as the **`Meta` capability facade** (`fed.meta()`) or the **standalone core types crate** (`Amount`, `Notes`, `Bolt11Invoice`)—to help get the initial foundation landed.

Overall, this high-level SDK crate design solves the binding duplication problem elegantly!
```

---

## 🔍 Task Complexity Breakdown: Why `Meta` Facade & Core Types are the Easiest

| Task / Component | Complexity | Why it's the Easiest to Start With |
| :--- | :---: | :--- |
| **`Meta` Facade (`fed.meta()`)** | 🟢 **Lowest** | Very simple API (`get(key)` and `all()`). Merges meta overrides with config meta. No complex async crypto, state machines, or payment gateways. |
| **Standalone Types (`Amount`, `Notes`, `Bolt11Invoice`)** | 🟢 **Low** | Pure data structures, parsing (`FromStr`), and validation. Isolated from background execution logic. |
| **`Onchain` Facade (`fed.onchain()`)** | 🟡 **Medium** | Simple deposit address generation & withdrawal fee quoting. |
| **`Operation<S>` State Machine** | 🔴 **High** | Requires background thread management, `updates()` stream handles, and re-attaching. |
| **`Ecash` / `Lightning` Facades** | 🔴 **High** | Involves Chaumian blind signatures, gateway selection, and payment cancellation state machines. |

---

## 📂 Saved in Obsidian for Future Follow-Ups (Post-Merge)

- **Async Pull vs Mobile Background Task Suspensions** (iOS/Android background stream handling).
- **Retriable vs Fatal Error Classification** (`ErrorCode::is_transient()`).
- **WASM Web Worker Support** (Offloading crypto off main DOM thread).
- **Ecash Notes Serialization Versioning** (v1 vs v2 format compatibility).
