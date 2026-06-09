# Seeta League — Season 2 User Manual

*Connecting Generations*

**Website:** https://seeta-league.vercel.app/

This manual explains Season 2, how to use the website, and a step-by-step guide for every role — including the exact information each person needs to have ready.

---

## 1. Season 2 at a glance

| | |
|---|---|
| **Kick-off** | 30 August 2026 |
| **Venue** | Arches Gardens, Kisasi |
| **Registration fee** | UGX 1,500,000 per team (50% due before games start) |
| **Awards** | Presented at the end of the season |
| **Contact** | +256 786 665 151 · seetaleague28@gmail.com |

Season 1 (champions **Allies**, runners-up **Club de Chege**) is archived and stays viewable. Season 2 is the new active season.

---

## 2. The website

### Public area — no login needed
Visit https://seeta-league.vercel.app/. A **season switcher** in the top navigation flips the whole site between **Season 1** and **Season 2**.

| Page | What it shows |
|---|---|
| **Home** | Live ticker, featured match, latest results, upcoming fixtures, standings snapshot, news |
| **Matches** | Upcoming fixtures and completed results |
| **Table** | Full standings + top scorers + top assists |
| **Teams** | Every registered team with logo and stats |
| **News** | League blog posts |
| **Activities** | Photo write-ups posted by the Coordinator |

### Member area — login required
- **Register:** https://seeta-league.vercel.app/register
- **Login:** https://seeta-league.vercel.app/login
- **Dashboard:** https://seeta-league.vercel.app/admin

Each role only sees the tools it is allowed to use.

---

## 3. Getting an account (everyone)

1. Go to **/register** and provide:
   - Full name
   - Phone number
   - Email address
   - A password (you choose it; you can tap the 👁 icon to check what you typed)
2. Your account is created as **Pending** — you'll see an "Awaiting Approval" screen.
3. The **Super Admin** approves you and assigns your role.
4. Sign in at **/login**. You now land in your role's portal.

> If you see "Awaiting Approval," it simply means the Super Admin hasn't assigned your role yet.

---

## 4. Roles — detailed guide

The Super Admin decides which permissions each role has, so these can be tuned at any time. Below is what each role does by default, the steps to follow, and **what you'll need ready**.

---

### 4.1 Super Admin
**Purpose:** runs the whole platform and sets everyone else up.

**What you'll need ready**
- The list of people who should have accounts and which role each should hold.
- For captains: which team each captain belongs to (once they have registered it).

**How to use it**
1. Sign in and open **/admin**.
2. **Users & Roles** (`/admin/users`):
   - See everyone who registered, with their status.
   - Click **Approve** to activate an account (or **Suspend** to block it).
   - Pick a role from the dropdown and **Assign role**. For a Captain you can also attach their team and season.
   - Remove a role with the trash icon.
3. **Roles & Permissions** (`/admin/roles`):
   - Create a new role (give it a name and description).
   - Tick/untick the permissions each role should have.
   - System roles (like Super Admin) are locked; custom roles can be deleted.
4. You also have access to every other portal (teams, players, matches, scores, finance, news, messages, overview).

**Tip:** approve a captain first, then they register their own team; afterwards you can confirm the team is attached to them.

---

### 4.2 Captain
**Purpose:** registers and manages one team for the season.

**What you'll need ready**
- **Team details:** team name, a contact phone and email, and a **team logo image** (PNG/JPG).
- **For every player:**
  - Full name
  - Jersey number
  - Position (e.g. Goalkeeper, Defender, Midfielder, Forward)
  - Date of birth
  - A **passport-size photo (required)** — you cannot save a player without one
  - (Optional) contact phone/email

**How to use it**
1. Get approved by the Super Admin, then sign in.
2. Open **My Team** (`/admin/team`).
3. **Register your team:** enter the name and contact details, upload the logo, and submit. (One team per captain per season.)
4. **Register players:** for each player, fill in the details, **upload the passport photo**, and add them. They appear in your squad list.
5. You can remove a player while registration is still open.
6. Use **Messages** (`/admin/messages`) to send an RFC (a request) to any official — e.g. a fixture query to Records or a payment question to Finance.

**Important:** player registration closes automatically once the season's **registration deadline** passes, so register everyone in good time.

---

### 4.3 Records Officer
**Purpose:** keeps every match result and statistic accurate.

**What you'll need ready**
- The final score of each match.
- The **goal scorers**, and the **assister** for each goal (names).
- Your pick for **Man of the Match** in each game.

**How to use it**
1. Sign in and open **Records** (`/admin/records`), or **Enter Scores** (`/admin/scores`).
2. **Enter a result:** choose the match, type the home and away scores, then list each goal's scorer and (optionally) assister. If a player isn't in the system yet, typing their name adds them.
3. On saving, the **league table updates automatically**, and the **top scorers / top assists** lists refresh.
4. In **Records**, set the **Man of the Match** for each completed game from the dropdown of that match's players.
5. The **Outstanding Player of the Match Day** is worked out **automatically** for each match day (based on goals and assists) — no manual entry needed.

**Tip:** the number of scorers you list must match the score you entered, or the form will ask you to fix it.

---

### 4.4 Finance Officer
**Purpose:** records all money in and out, and tracks team fees.

**What you'll need ready**
- The registration fee status of each team (how much each has paid).
- Any expenses, with amounts, dates, and a short description.

**How to use it**
1. Sign in and open **Finance** (`/admin/finance`).
2. **Record a transaction:** choose **Payment** (money in) or **Expense** (money out), enter the amount, an optional category (e.g. `registration_fee`, `pitch`, `referees`), the team (for payments), a date, and a description.
3. The **Team Registration Balances** section shows, per team, how much has been paid against the UGX 1,500,000 fee and whether they are **Cleared** or still have a balance due.
4. The summary cards show **total collected**, **total expenses**, and **net balance**.

**Tip:** record the 50% upfront payment per team before kick-off so balances stay accurate.

---

### 4.5 Coordinator
**Purpose:** publishes news and activity write-ups for the public.

**What you'll need ready**
- A title and a short write-up for each post.
- A cover image, and any gallery images — each with a **caption/subtitle**.

**How to use it**
1. Sign in and open **News & Activities** (`/admin/activities`).
2. **Create a post:** enter a title and body, upload a cover image, then **add images one by one and type a caption** for each.
3. Tick **Publish immediately** (or leave it as a draft).
4. Published posts appear on the public **Activities** page; you can unpublish or delete them later.

---

### 4.6 President
**Purpose:** full visibility, no editing.

**What you'll need ready**
- Nothing — this is a view-only overview.

**How to use it**
1. Sign in and open **President Overview** (`/admin/overview`).
2. See the season's headline numbers: number of teams and players, money collected and spent, message count, and the top of the league table.
3. You cannot change anything here — it is purely for oversight.

---

### 4.7 Messaging & RFCs (everyone with an account)
**Purpose:** structured requests and replies between captains and officials.

**How to use it**
1. Open **Messages & RFCs** (`/admin/messages`).
2. **Send an RFC:** enter a subject, choose **which role** it should go to, write your message, and send.
3. The chosen role sees it in their inbox, can **reply** in a thread, and set the status to **Open**, **In progress**, or **Resolved**.
4. You see messages you sent, plus any addressed to a role you hold.

---

## 5. A typical season, end to end

1. **Super Admin** approves captains and assigns roles.
2. **Captains** register teams (with logos) and players (with passport photos) before the deadline.
3. **Finance** records each team's fee payments and any expenses.
4. **Records** enters scores and scorers; the table, top scorers, Man of the Match, and match-day outstanding player all update automatically.
5. **Coordinator** posts news and photo galleries.
6. **President** monitors everything in read-only view.
7. The **public** follows along on the website, switching seasons in the top navigation.
