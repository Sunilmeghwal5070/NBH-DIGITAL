# Admin Panel Code for Digital Nimbahera

As per your request to keep the app secure, I have created the Admin Panel code entirely separate from your main app files. This way, your end-users cannot access the admin functionality, and your app remains secure from hacking attempts.

## How to use this Admin Panel?

1. **Create a New Project:** Open a new AI Studio Build project (or use your local development environment) dedicated to just the Admin Panel.
2. **Copy the Code:** Copy the code provided in the `AdminApp.tsx` file inside this folder.
3. **Use the Same Firebase Config:** Ensure your Firebase configuration in the new Admin App is identical to the one in your main app, so the Admin Panel connects to the same database.

### Features included in the Admin Code:
- View all pending and active records (Businesses, Resales, Offers).
- Edit descriptions, approval status, or remove inappropriate posts.
- Direct Firebase integration using your exact same config.
- A clean sidebar for navigating between Jobs, Users, Businesses, Offers, Resales, etc.

*File Location: See the `AdminApp.tsx` file right next to this README!*
