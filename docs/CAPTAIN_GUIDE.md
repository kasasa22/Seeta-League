# Seeta League — Team Captain's Guide

A step-by-step walkthrough for team captains: creating your account, getting access to the portal, registering your team, adding your players, and communicating with the league officials.

---

## Overview: what a captain does

As a captain you are responsible for:

1. **Creating an account** and getting it approved.
2. **Registering your team** for the current season.
3. **Registering your players** (squad) before the deadline.
4. **Communicating with officials** via messages / RFCs.
5. Keeping an eye on **fixtures, results, the table, and stats** (public pages).

Your portal lives in the **Admin area**, but you only see the parts relevant to captains — you cannot manage other teams, enter scores, or change records.

---

## Step 1 — Create your account

> Route: **`/register`**

1. Go to the site and open **Register** (`/register`).
2. Fill in the form:
   - **Full Name** *(required)*
   - **Phone** *(optional but recommended — used as your team contact)*
   - **Email** *(required — this is your login)*
   - **Password** *(required, minimum 6 characters)*
3. Click **Register**.
4. You'll see a confirmation that your account is **pending approval**.

> ℹ️ **No email verification is needed.** Your account is created immediately but starts in a **pending** state.

---

## Step 2 — Wait for approval & your Captain role

Your account must be **approved by the Super Admin**, who also assigns you the **Captain** role (and links you to your season).

- If you log in before approval, you'll land on the **Awaiting Approval** page (`/pending`):
  > "Your account is registered but not yet approved by the Super Admin. You will gain access to your portal once your role is assigned."
- Once the Super Admin approves you and assigns the **Captain** role, you're ready.

> 📌 **Tip:** If approval is taking long, contact the league Super Admin directly and confirm you registered with the correct email.

**What the Captain role lets you do:**

| Permission | Meaning |
|---|---|
| `view_admin` | Access the portal (Admin area) |
| `register_team` | Register your own team |
| `register_players` | Add players to your team |
| `send_rfc` | Send messages / requests to officials |

You **cannot** manage other teams, enter scores, edit records, manage users, or post news — those belong to other roles.

---

## Step 3 — Log in & reach your portal

> Route: **`/login`**

1. Open **Login** (`/login`).
2. Enter your **Email** and **Password**.
3. Click **Sign In**.
4. After approval you land on the **Admin Dashboard** (`/admin`).

**Forgot your password?**
1. On the login page click **Forgot password?**
2. Enter your email and click **Send reset link**.
3. Open the link in your email, set a new password (min 6 characters), and confirm.
4. Log in again.

---

## Step 4 — Confirm the season

Everything you register is tied to a **season**.

- Use the **season selector** in the portal sidebar to make sure you're on the **current/open season**.
- If you see *"There is no active season open for registration yet,"* registration hasn't opened — check back later or contact the Super Admin.

> ⏰ Each season has a **registration deadline**. After it passes, **player registration closes** automatically.

---

## Step 5 — Register your team

> Route: **`/admin/team`** → "Register your team"

If you haven't registered a team yet for this season, you'll see the **Register your team** form:

1. **Team Name** *(required)* — e.g. *Allies*, *Club de Chege*.
2. **Campus** *(required)* — choose one of **Main**, **Nama**, **Green**, **A level campus**, or **All Campuses** (use this for a combined/merged team that draws from every campus).
3. **Year** *(required)* — choose the team's year from the dropdown (**2000** up to the current year).
4. **Contact Phone** *(optional)* — defaults to your phone if left blank.
5. **Contact Email** *(optional)* — defaults to your email if left blank.
6. **Team Logo** *(optional)* — click **Choose logo**, pick an image; you'll see *"Logo uploaded."*
7. Click **Register Team**.
8. On success you'll see *"Team registered,"* and your team card appears with your **campus** and **year** badges and a player count of **0**.

> 🛑 **One team per season.** You can only register a single team per season. To captain a different team you'd need the Super Admin to reassign you.

---

## Step 6 — Register your players (build your squad)

> Route: **`/admin/team`** → "Add player" (same page, below your team)

> ⚠️ Available **only before the registration deadline**. After the deadline you'll see *"registration closed"* and the form is hidden.

For **each** player:

1. **Full Name** *(required)*.
2. **Jersey Number** *(optional)*.
3. **Position** *(optional)* — choose **Goalkeeper**, **Defender**, **Midfielder**, or **Forward**.
4. **Passport Photo** *(**required**)* — click **Choose photo** and upload a clear passport-style image. The photo is mandatory; the **Add Player** button stays disabled until the photo finishes uploading.
5. Click **Add Player**.
6. On success you'll see *"Player registered,"* the form clears, and the player appears in your **Squad** list.

> ℹ️ There's **no date-of-birth field**. Each player automatically inherits the **year** from your team's details, so you don't enter it per player.

**Managing your squad:**
- The **Squad (N)** list shows each player's photo, name, position, and jersey number.
- Before the deadline you can **remove** a player (trash icon).
- After the deadline the squad becomes **read-only**.

> 💡 Repeat Step 6 for every player. Take photos in advance — the passport photo is required for each one.

---

## Step 7 — Communicate with officials (Messages & RFCs)

> Route: **`/admin/messages`**

Use this to raise requests with league officials (e.g. a rescheduling request to the Records Officer, a fee query to Finance).

1. Open **Messages & RFCs**.
2. Compose a message:
   - **Subject** *(required)*.
   - **Send to role** — pick the recipient role (e.g. *Records Officer*, *Finance Officer*).
   - **Send to specific user** *(optional)* — if the role has more than one person.
   - **Message** — your details.
3. Click **Send**.
4. Track status on each thread: **open** → **in progress** → **resolved**.

> Captains can **send** requests. Officials handle and respond to them.

---

## Step 8 — Follow your team (public pages, no login needed)

| What | Where |
|---|---|
| Fixtures & results | `/fixtures` |
| League table & standings | `/table` |
| **Stats Centre** (top scorers, assists, form, etc.) | `/statistics` |
| Your team page | `/teams/[your team]` |
| Player profiles | `/players/[player]` |
| News & activities | `/news`, `/activities` |

---

## Quick checklist

- [ ] Registered an account at `/register`
- [ ] Account **approved** and **Captain** role assigned by Super Admin
- [ ] Logged in and reached `/admin`
- [ ] Correct **season** selected
- [ ] **Team registered** at `/admin/team` (name + **campus** + **year**, plus optional logo/contacts)
- [ ] **All players added** with **passport photos** — before the deadline
- [ ] Squad reviewed in the **Squad** list
- [ ] Know how to reach officials via **Messages & RFCs**

---

## Frequently asked questions

**I registered but can't see the portal.**
Your account is still **pending**. The Super Admin must approve you and assign the **Captain** role.

**I don't see the team registration form.**
Either no season is open for registration, or you've already registered a team this season.

**I can't add players.**
The **registration deadline** has likely passed — player registration closes automatically after it.

**The "Add Player" button is greyed out.**
You haven't uploaded the player's **passport photo** yet. It's required for every player.

**Can I register two teams?**
No — one team per captain per season. Ask the Super Admin to reassign you if needed.

**I forgot my password.**
Use **Forgot password?** on the login page to receive a reset link.
