@AGENTS.md

## Project structure conventions

- Keep `app/*` focused on route composition (`page.tsx`, `layout.tsx`, and route handlers).
- Keep feature logic grouped by feature under `components/<feature>/`.
- Split feature code into clear responsibilities:
  - container/orchestration (`AddressForm.tsx`)
  - presentational UI (`AddressFormView.tsx`)
  - state/data hooks (`hooks/useAddressForm.ts`)
- Put reusable UI primitives under `components/ui/*` (for example `ToasterProvider`).

## UX feedback pattern

- Do not use browser `alert()` for user feedback.
- Use toast notifications for success/error feedback (via `sonner`), and keep inline field errors for validation hints.