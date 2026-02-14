# Quick Start: Testing Advanced Ticketing Features

## 🎬 Setup for Testing

Open `index.html` in your browser. The app includes 5 pre-loaded sample events with limited tickets to help you test all features.

---

## 📋 Sample Events (Pre-loaded)

| Event | Capacity | Available | Category | Price |
|-------|----------|-----------|----------|-------|
| Summer Music Festival | 1000 | 500 | Music | $99 |
| Tech Conference 2026 | 500 | 200 | Technology | $299 |
| Championship Boxing | 5000 | 1000 | Sports | $149 |
| Art Expo 2026 | 1000 | 300 | Art | $45 |
| Business Summit | 300 | 150 | Business | $199 |

---

## 🧪 Test Scenario 1: Resale to Organization

**Goal:** Test reselling a ticket to organization when waitlist exists

**Steps:**

1. **Create Test Users**
   - Register User 1: `user1@test.com` / `password123`
   - Register User 2: `user2@test.com` / `password123`
   - Register User 3: `user3@test.com` / `password123`

2. **Set Up Waitlist**
   - Log in as User 2
   - Go to "Summer Music Festival"
   - Try to buy 1500 tickets (more than available)
   - System will offer to sell 500 available + add 1000 to waitlist
   - Choose to just join waitlist for 1500
   - Now User 2 is in waitlist

3. **User 1 Purchases and Resells**
   - Log in as User 1
   - Buy 1 ticket for "Summer Music Festival"
   - Go to "My Tickets"
   - Should see **"Resell to Organization"** button (blue)
   - Click it
   - Confirm resale dialog showing User 2 in waitlist
   - Ticket should lock with "⏳ Transfer Pending" badge

4. **Organizer Approves Resale**
   - Register as Organizer: `org1@test.com` / `org123`
   - Go to Dashboard
   - Find "Summer Music Festival" in table (or create your own to see better)
   - Click **"1 resale request"** button
   - Approve the resale
   - System should notify that User 2 received the ticket with new code

5. **Verify Results**
   - Log in as User 1: Should see ticket is no longer locked
   - Log in as User 2: Should see ticket in "My Tickets" with new code (TKT-XXXX)
   - Check resale history on ticket

**Success Indicators:**
- ✅ "Resell" button only visible when waitlist exists
- ✅ Ticket locked during resale
- ✅ Organizer can approve resale
- ✅ Waitlist member automatically receives ticket
- ✅ New ticket code generated

---

## 🧪 Test Scenario 2: Transfer to Friend

**Goal:** Test transferring ticket to another user and they confirm ownership

**Steps:**

1. **User 1 Purchases Ticket**
   - Log in as User 1: `user1@test.com` / `password123`
   - Buy 1 ticket for "Tech Conference 2026"
   - Go to "My Tickets"

2. **Initiate Transfer**
   - Click **"Transfer to Friend"** button
   - Enter `user2@test.com` in the email field
   - System should show confirmation
   - Ticket should immediately lock with "Transfer Pending" badge

3. **User 1 Tries Conflicting Actions (should all fail)**
   - Try clicking "Cancel Ticket" - button should be hidden/disabled
   - Try clicking "Resell" - button should be hidden/disabled
   - Try clicking "Transfer" again - button should be hidden/disabled
   - Verify nothing works while locked

4. **User 2 Receives Transfer**
   - Log in as User 2: `user2@test.com` / `password123`
   - Go to "My Tickets" section
   - Scroll down to **"Pending Ticket Transfers"** section
   - Should see the Tech Conference ticket
   - Should show original owner as User 1
   - Should have button **"Confirm Ownership & Receive New Code"**

5. **User 2 Confirms Transfer**
   - Click the confirm button
   - Should get alert with new ticket code: `TKT-XXXXXXXXXXXX`
   - Should see ticket now in main "My Tickets" section
   - Should show User 2 as current owner
   - Should show User 1 as original buyer

6. **Verify Lock Released**
   - Go back to User 1's account
   - That ticket should show new code in history
   - Transfer complete

**Success Indicators:**
- ✅ "Transfer to Friend" button appears
- ✅ System validates recipient email exists
- ✅ Ticket locks immediately
- ✅ Conflicting actions are blocked
- ✅ Recipient sees pending transfer
- ✅ New code generated on confirmation
- ✅ Transfer history recorded
- ✅ Lock released after confirmation

---

## 🧪 Test Scenario 3: Ownership Lock & Code Generation

**Goal:** Verify transaction lock prevents double-selling and new codes are generated

**Steps:**

1. **User 1 Purchases Ticket**
   - Log in as User 1
   - Buy 1 ticket for "Art Expo 2026"
   - Note the original code in ticket details

2. **Initiate Transfer**
   - Click "Transfer to Friend"
   - Enter User 3's email: `user3@test.com`
   - Ticket is now locked

3. **Try to Sell Again (should fail)**
   - Click on ticket - actions hidden ✓
   - Cannot resell ✓
   - Cannot cancel ✓
   - Cannot transfer ✓

4. **User 3 Confirms Transfer**
   - Log in as User 3
   - Find Art Expo ticket in "Pending Transfers"
   - Click "Confirm Ownership"
   - Note new code: `TKT-YYYYYYYYYYYYYY`

5. **Verify Code Changed**
   - Original code: `TKT-XXXXXXXXXXXX`
   - New code: `TKT-YYYYYYYYYYYYYY`
   - Should be different ✓
   - Transfer history shows both codes

6. **User 3 Can Now Perform Actions**
   - User 3 can now cancel, transfer, or resell
   - Lock is released ✓

**Success Indicators:**
- ✅ Original code assigned on purchase
- ✅ New code generated on transfer
- ✅ Codes are different
- ✅ Lock prevents actions during transfer
- ✅ Lock releases after confirmation
- ✅ New code visible in ticket details

---

## 🧪 Test Scenario 4: Waitlist System

**Goal:** Test automatic waitlist when event is sold out

**Steps:**

1. **Exhaust Event Tickets**
   - Log in as User 1
   - Buy all remaining "Business Summit" tickets (150 available)
   - Should see message about successful purchase

2. **Event is Now Full**
   - Log in as User 2
   - Go to "Business Summit"
   - Click "Buy Tickets"
   - System should show: "Event is sold out!"
   - Offer option: "Would you like to join the waitlist?"

3. **Join Waitlist**
   - Click OK to join waitlist
   - Should get confirmation: "Added to waitlist! You're #1 in line"

4. **Multiple Users Join Waitlist**
   - Log in as User 3
   - Try to buy "Business Summit"
   - Join waitlist
   - Should show: "You're #2 in line"

5. **View Waitlist in Dashboard**
   - Log in as Organizer
   - Find "Business Summit" in events
   - Column shows "2 waiting"
   - Click the button to view full waitlist
   - Should show User 2 and User 3 with request dates

6. **Ticket Cancelled - Auto-Promotion**
   - Log in as User 1
   - Go to "My Tickets"
   - Cancel the "Business Summit" ticket
   - One of the waitlist spots should now be filled

7. **Verify Promotion**
   - Log in as User 2 (first in waitlist)
   - Check "My Tickets"
   - Should have "Business Summit" ticket with new code
   - Status: Confirmed

8. **Check Updated Waitlist**
   - Organizer dashboard: "Business Summit" shows "1 waiting"
   - User 3 is still #1 in remaining waitlist

**Success Indicators:**
- ✅ Sold out event offers waitlist option
- ✅ Multiple users can join waitlist
- ✅ Organizer sees waitlist count
- ✅ Organizer can view waitlist details
- ✅ Auto-promotion on cancellation works
- ✅ New code generated for promoted user
- ✅ Promotion removes from waitlist

---

## 🧪 Test Scenario 5: Complex Flow - Resale + Transfer

**Goal:** Test a complex scenario combining resale and transfer

**Steps:**

1. **Setup Waitlist**
   - User 1 joins waitlist for an event
   - User 2 joins waitlist for same event

2. **User 3 Owns Ticket**
   - User 3 purchases 1 ticket for event
   - Note code: `TKT-AAA`

3. **User 3 Resells to Organization**
   - Click "Resell to Organization"
   - Ticket locks
   - Organizer approves
   - User 1 automatically receives ticket with `TKT-BBB`

4. **User 1 Transfers to User 4**
   - Log in as User 1
   - Transfer ticket to new user (User 4 - register first)
   - Ticket locks, shows "Transfer Pending"
   - New code should be: `TKT-CCC`

5. **User 4 Confirms**
   - Log in as User 4
   - See pending transfer
   - Confirm ownership
   - Receive new code: `TKT-DDD`

6. **Check Transfer History**
   - Log in as User 4
   - View ticket details
   - Resale History should show:
     - User 3 → User 1 (code: TKT-BBB)
     - User 1 → User 4 (code: TKT-DDD)

**Success Indicators:**
- ✅ Chain of transfers works correctly
- ✅ Each transfer gets new code
- ✅ Full history preserved
- ✅ Each user sees correct current owner
- ✅ Locks work during each step
- ✅ Original buyer (User 3) shown throughout

---

## ⏱️ Quick Test (5 minutes)

If you want to quickly test all features:

1. **Register 3 users** (user1, user2, user3)
2. **User 1:** Buy "Tech Conference" ticket
3. **User 2:** Try to buy too many "Tech Conference" tickets → join waitlist
4. **User 1:** Resell to organization (User 2 auto-gets it)
5. **User 2:** Transfer to User 3
6. **User 3:** Confirm ownership, receive new code
7. **Check:** Dashboard shows resale/waitlist updates

Done! All features tested.

---

## 🐛 Debugging Tips

**Check Browser Console:**
- Open Developer Tools (F12)
- Console tab shows any errors
- Check localStorage under Application tab
- See all tickets and events in console by typing: `JSON.stringify(allTickets, null, 2)`

**Reset Data:**
- Open DevTools → Application → Local Storage
- Clear all ticketsys data to start fresh
- Page will reload with original 5 sample events

**Common Issues:**

| Issue | Solution |
|-------|----------|
| Transfer button shows "Transfer (No Waitlist)" | You need waitlist for resale; transfer works always |
| Can't find recipient | Recipient email must be registered in system |
| Ticket locked but shouldn't be | Clear browser localStorage and refresh |
| Dashboard empty | Make sure logged in as organizer who created event |
| No pending transfers shown | Must be logged in as recipient user |

---

## ✅ Validation Checklist

After testing, confirm:

- [ ] Users can resell only when waitlist exists
- [ ] Resale button disabled when no waitlist
- [ ] Users can transfer to any registered user
- [ ] Transfers are blocked by email validation
- [ ] Tickets lock during transfers
- [ ] New codes generated on transfers
- [ ] Organizer can approve resales
- [ ] Waitlist auto-promotes on cancellation
- [ ] Transfer history tracks all owners
- [ ] Original buyer always shown
- [ ] Pending transfers show in user's section
- [ ] Recipient can confirm ownership
- [ ] Lock releases after confirmation
- [ ] Cannot double-sell locked tickets
- [ ] All status badges show correctly

---

## 🎯 Success!

If all tests pass, your advanced ticketing system is working perfectly! 

Users can now:
- ✅ Resell tickets due to emergencies
- ✅ Transfer to friends
- ✅ Join waitlist when sold out
- ✅ Receive automatic promotions
- ✅ Manage ownership changes securely
- ✅ Track complete transfer history
- ✅ Get new codes for each transfer

---

**Questions?** Check `ADVANCED_FEATURES_GUIDE.md` for detailed information on each feature.
