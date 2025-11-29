# Invoice App MVP Implementation Plan

## Goal Description
Build an Invoice Application MVP to manage Customers and Invoices.
**Architecture**: Monorepo with `apps/web` (Next.js) and `apps/api` (Node.js/Express).
**Pattern**: Feature-Sliced 3-Layer Architecture + 4-Hook Pattern (Frontend).
**Stack**: PostgreSQL, Prisma, Flowbite React, TypeScript.

## User Review Required
> [!IMPORTANT]
> **Architecture Confirmation**: The frontend will strictly follow the provided "Feature-Sliced 3-Layer + 4-Hook" pattern.
> - **Features**: `features/customers`, `features/invoices`
> - **Components**: Container, Editor, View
> - **Hooks**: Data, State, Validation, Mutation

## Proposed Changes

### Database & Backend (`apps/api`)
#### [NEW] [schema.prisma](file:///c:/Users/BS01355/Desktop/Rajin/Invoice%20App/apps/api/prisma/schema.prisma)
- Define `Customer` model (id, name, email, address, etc.)
- Define `Invoice` model (id, customerId, status, total, createdAt)
- Define `InvoiceItem` model (id, invoiceId, description, qty, price)

#### [NEW] [server.ts](file:///c:/Users/BS01355/Desktop/Rajin/Invoice%20App/apps/api/src/server.ts)
- Setup Express app with CORS and JSON body parsing.

#### [NEW] [routes.ts](file:///c:/Users/BS01355/Desktop/Rajin/Invoice%20App/apps/api/src/routes/index.ts)
- `/customers` CRUD endpoints
- `/invoices` CRUD endpoints

### Frontend (`apps/web`)
#### [NEW] [features/customers](file:///c:/Users/BS01355/Desktop/Rajin/Invoice%20App/apps/web/src/features/customers)
- `components/CustomerContainer.tsx`: Main entry, orchestrates hooks and view.
- `components/CustomerEditor.tsx`: Form for creating/editing customers.
- `components/CustomerView.tsx`: List/Detail view.
- `hooks/useCustomerData.ts`: Fetches customer list.
- `hooks/useCustomerState.ts`: Manages UI state (modal open, selected ID).
- `hooks/useCustomerValidation.ts`: Zod/Formik validation logic.
- `hooks/useCustomerMutation.ts`: Handles create/update/delete API calls.

#### [NEW] [features/invoices](file:///c:/Users/BS01355/Desktop/Rajin/Invoice%20App/apps/web/src/features/invoices)
- `components/InvoiceContainer.tsx`
- `components/InvoiceEditor.tsx` (Includes Line Items management)
- `components/InvoiceView.tsx`
- `hooks/useInvoiceData.ts`
- `hooks/useInvoiceState.ts`
- `hooks/useInvoiceValidation.ts`
- `hooks/useInvoiceMutation.ts`

#### [NEW] [shared](file:///c:/Users/BS01355/Desktop/Rajin/Invoice%20App/apps/web/src/shared)
- `services/api.ts`: Axios/Fetch instance for API requests.
- `components/`: Reusable UI components (Buttons, Inputs from Flowbite).

## Verification Plan
### Automated Tests
- Backend: Run `npm run test` (if set up) or manual API testing via Postman/Curl.
- Frontend: Verify build with `npm run build`.

### Manual Verification
1.  **Customer Flow**: Create a customer, see it in the list, edit it.
2.  **Invoice Flow**: Create an invoice for a customer, add line items, save as Draft, change status to Paid.
