# Simple Login Demo

Requires Node.js 18+.

1. Open a terminal in this folder.
2. Run `npm start` (no npm packages need installing).
3. Visit http://localhost:3000.
4. Enter any non-empty username and password, then click **Save details**.
5. Look for `details.txt` in this folder. Each submission appends a JSON record containing the username, password as entered (plain text), and timestamp. Repeat submissions are saved as separate records. Existing hashed records remain unchanged and cannot be converted back to passwords.

If port 3000 is already in use, run `PORT=3001 npm start` and visit http://localhost:3001.

This is a local teaching demo, not production authentication. It does not create a real login session, use a database or rate-limit attempts. Use HTTPS, password hashing, session management, and rate limits in a deployed system. Do not store plaintext passwords in a log file.
