# Security Specification: AirGuest Firestore Security Rules

## Data Invariants
1. **Global Default-Deny**: Any unmapped collection or wildcard path is strictly forbidden (`allow read, write: if false;`).
2. **Path Sanitization**: All document IDs must be validated using `isValidId(id)` (`id is string && id.size() <= 128 && id.matches('^[a-zA-Z0-9_\\-]+$')`).
3. **Guest Integrity**:
   - Guests can only be created with valid schema keys, string boundaries (`name.size() <= 100`, `category.size() <= 50`), and numeric pax boundaries (`pax >= 1 && pax <= 20`).
   - Guest updates can only modify attendance status, souvenir status, checkInTime, envelopeAmount, or allocation by authenticated operators/admins.
4. **Transaction Integrity**:
   - Transactions require a positive integer amount (`amount >= 0 && amount <= 1000000000`).
   - Sender name, relation, method are bounded.
5. **Wishlist Integrity**:
   - Status must belong to allowed enum: `['Telah Diberikan', 'Sedang Dikirim', 'Masih Tersedia']`.
6. **Guest Wish Integrity**:
   - Author name must not exceed 100 characters, message must not exceed 300 characters.
   - Likes can only be incremented or updated by positive increments.
7. **Admin Privilege**:
   - Master administrative operations and bootstrapped admin role is assigned to `windariwindari605@gmail.com`.
8. **No Blanket Queries**:
   - Listing documents requires valid authentication and enforces bounded payloads.

## The "Dirty Dozen" Penetration Test Payloads (Must Return PERMISSION_DENIED)
1. **Unauthenticated Write**: Creating a guest document without `request.auth`.
2. **Junk ID Poisoning**: Creating `/guests/%%evil-id-with-special-chars&&123` violating regex `^[a-zA-Z0-9_\\-]+$`.
3. **Oversized String Attack (Denial of Wallet)**: Submitting a guest name with 25,000 characters.
4. **Shadow Field Injection**: Submitting `{ id: "G-1", name: "Budi", ..., isSuperAdmin: true }` violating `hasOnly()`.
5. **Negative Pax Poisoning**: Submitting `{ pax: -5 }` for guest allocation.
6. **Negative Transaction Amount**: Creating transaction with `{ amount: -5000000 }`.
7. **Unbounded Wish Message**: Submitting a guest wish message with 15,000 characters.
8. **Invalid RSVP Enum**: Submitting `{ rsvpStatus: 'UnknownStatus' }`.
9. **Direct Write to /admins/**: A non-admin user writing to `/admins/{uid}`.
10. **Spoofed User Profile Write**: Writing to `/users/{otherUid}` where `request.auth.uid != otherUid`.
11. **Malicious Wishlist Status Injection**: Updating wishlist item status to `'Stolen'`.
12. **Blanket Collection Scraping Without Constraints**: Querying internal admin configurations.
