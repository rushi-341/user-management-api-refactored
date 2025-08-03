
## Major Issues Identified in the Original Python Code

1. Passwords were stored in plaintext.
2. No input validation or sanitation – vulnerable to SQL injection.
3. Code was monolithic and unorganized.
4. Sensitive config was hardcoded.
5. No proper HTTP status codes or error handling.

## Changes Made

1. Rewrote the code in Node.js using Express for better modularity.
2. Used bcrypt to hash passwords before storing.
3. Used prepared statements to prevent SQL injection.
4. Applied dotenv for managing environment variables securely.
5. Created a modular structure (router, models, controllers).
