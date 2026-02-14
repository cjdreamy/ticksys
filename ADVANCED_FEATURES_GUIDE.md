# Advanced Ticketing Features Guide

## Overview
Your ticketing system now includes advanced ticket management features for resale, transfer, and ownership tracking. This guide explains how each feature works.

---

## 🎫 Feature 1: Ticket Resale to Organization (Emergency Resale)

### What It Does
Users who cannot attend an event due to an emergency can resell their ticket back to the organization, BUT only if there are people waiting on the event's waitlist.

### How It Works

**Step 1: User initiates resale**
- Navigate to "My Tickets"
- Find the ticket you want to resell
- Click **"Resell to Organization"** button (only appears if waitlist exists)

**Step 2: Confirmation**
- System shows all users currently on the waitlist
- User confirms they want to proceed with resale

**Step 3: Transaction Lock**
- Ticket becomes locked with status **"Transfer Pending"**
- Original owner cannot resell the same ticket to multiple people
- A new ticket code is generated for security

**Step 4: Organization Processing**
- Organizer sees "Resale Requests" in the dashboard
- Organizer can approve the resale request
- First person on waitlist automatically receives the ticket
- New ticket code is generated for the new owner

**Step 5: Completion**
- Transaction is finalized
- New owner receives the ticket with new code
- Original ticket is marked as transferred

### Important Rules
✓ Only works if waitlist has members  
✓ Transaction is locked until processed  
✓ Cannot transfer while locked  
✓ New security code generated for resold ticket  

---

## 🤝 Feature 2: Ticket Transfer to Friends

### What It Does
Users can transfer their ticket to a friend (anyone with an account) by providing the friend's email address.

### How It Works

**Step 1: Initiate Transfer**
- Navigate to "My Tickets"
- Click **"Transfer to Friend"** button on any confirmed ticket
- Enter the recipient's email address

**Step 2: Transfer Validation**
- System verifies the recipient email exists
- Recipient must be a regular user (not organizer)
- Transfer request is created

**Step 3: Transaction Lock**
- Original owner's ticket is locked
- Status shows **"Transfer Pending"**
- Cannot be resold or transferred again until confirmed

**Step 4: Recipient Confirmation**
- Recipient receives a notification (in their "Pending Transfers" section)
- Recipient must click **"Confirm Ownership & Receive New Code"**
- This confirms they accept the transfer

**Step 5: Completion**
- New ticket code is generated for recipient
- Ownership is officially transferred
- Transfer history is recorded on the ticket

### Important Rules
✓ Recipient must have an account  
✓ Transaction locked until recipient confirms  
✓ Prevents double-selling (can't transfer while locked)  
✓ New code generated for security  
✓ Original buyer information is preserved in history  

---

## 🔐 Feature 3: Ownership Change & New Ticket Codes

### What It Does
Every time a ticket is resold or transferred, a new unique ticket code is generated. This prevents fraud where the same ticket could be used multiple times.

### Ticket Code Format
- **Format:** TKT-XXXXXXXXXXXX (12 random alphanumeric characters)
- **Generated:** When ticket is purchased, resold, or transferred
- **Purpose:** Unique identifier for admission/entry

### Ownership Tracking
Each ticket maintains:
- **Original Buyer:** Person who first purchased the ticket
- **Current Owner:** Person who currently owns the ticket
- **Transfer History:** All previous owners and transfer dates

### Example Flow
```
1. John buys ticket → Code: TKT-ABC123XYZ789
   
2. John transfers to Sarah → Code: TKT-DEF456UVW012 (new!)
   - Original Buyer: john@email.com
   - Current Owner: sarah@email.com
   - Transfer History: [John → Sarah on 2/14/2026]

3. Sarah cancels → Ticket goes to waitlist user Mike
   → Code: TKT-GHI789RST345 (new!)
   - Original Buyer: john@email.com
   - Current Owner: mike@email.com
   - Transfer History: [John → Sarah, Sarah cancelled, Mike from waitlist]
```

---

## ⏳ Feature 4: Transaction Lock Until Ownership Confirmation

### Why This Matters
Prevents users from selling the same ticket to multiple people by locking the transaction in a pending state.

### How It Works

**Locked State Indicators:**
- Ticket shows **"⏳ Transfer Pending"** badge
- Ticket appears with reduced opacity
- Cancel and Transfer buttons are hidden
- Cannot perform new actions on the ticket

**Transaction Flow:**
```
Ticket Locked (Transfer Initiated)
         ↓
    Awaiting Confirmation
         ↓
Owner Confirms OR Recipient Confirms
         ↓
Ticket Unlocked (Transaction Complete)
```

**What Happens When:**
- **Owner initiates transfer:** Lock happens immediately
- **Organizer approves resale:** Lock happens immediately
- **New owner confirms:** Lock is released, new code active
- **Original owner cancels:** Lock is released, ticket available for other actions

### Example Scenarios

**Scenario 1: Prevent Double-Selling**
```
❌ NOT ALLOWED:
- Sarah: Click "Transfer to Mike" → Transfer locked
- Sarah: Click "Resell to Org" → Cannot! Ticket is locked
- Sarah: Click "Cancel Ticket" → Cannot! Ticket is locked

✓ MUST DO:
- Wait for Mike to confirm ownership
- THEN ticket is unlocked and available for new actions
```

**Scenario 2: Normal Transfer Process**
```
✓ ALLOWED:
- Sarah: Click "Transfer to Mike" → Transfer locked
- Mike: Click "Confirm Ownership" → Transfer complete
- Sarah: Now has her ticket unlocked and owned by Mike
- Sarah: Can now transfer/resell a different ticket
```

---

## 📊 Organizer Dashboard Features

### Waitlist Management
**What You See:**
- Number of users on waitlist
- User emails and request dates
- Quantity requested per user

**What You Can Do:**
- Click "Waitlist" button to view all waiting users
- Monitor how many people want tickets
- Use this data for future event planning

### Resale Request Management
**What You See:**
- Number of pending resale requests
- Ticket codes of tickets being resold
- Original owner information

**What You Can Do:**
- Click "Resale Requests" button to view requests
- Review details before approval
- Approve resale request to assign to first waitlist user
- Automatically notifies new owner with new ticket code

### Example Resale Approval Process
```
Dashboard shows: "2 resale requests"
         ↓
Organizer clicks button
         ↓
System shows:
  1. Ticket #TKT-ABC123 from john@email.com
  2. Ticket #TKT-DEF456 from sarah@email.com
         ↓
Organizer approves first request
         ↓
System:
  - Generates new code: TKT-XYZ789
  - Transfers to first waitlist user
  - Removes user from waitlist
  - Clears pending status
```

---

## 🎯 Waitlist System

### How Waitlist Works

**When Event is Sold Out:**
- Users trying to buy when tickets = 0
- System offers option to join waitlist
- User is added to queue

**When User Cancels or Resells:**
- If event is sold out
- First person in waitlist automatically gets the ticket
- They receive notification
- New ticket code is generated

**Automatic Promotion:**
```
Event Full (0 available)
    ↓
John cancels ticket
    ↓
Sarah (1st on waitlist) automatically gets ticket
    ↓
Sarah can now:
  - View ticket in "My Tickets"
  - Transfer to friend
  - Resell (if new waitlist exists)
  - Cancel
```

**Partial Availability:**
- Event has some tickets but fewer than requested
- User chooses to:
  - Buy available tickets now
  - Join waitlist for remaining quantity
  - Cancel

---

## 📝 Data Storage

### Ticket Structure (Enhanced)
```javascript
{
  id: "ticket_1707000000000",
  ticketCode: "TKT-A1B2C3D4E5F6",
  eventId: "1",
  eventTitle: "Summer Music Festival",
  
  // Ownership Info
  originalBuyer: "user_123",
  originalBuyerEmail: "john@email.com",
  currentOwner: "user_456",
  currentOwnerEmail: "sarah@email.com",
  
  // Pricing
  originalPrice: 99,
  quantity: 1,
  
  // Status
  status: "Confirmed",
  ownershipPending: false,
  transferPendingTo: null,
  transferRecipientEmail: null,
  resalePendingTo: null,
  
  // History
  resaleHistory: [
    {
      from: "user_transfer",
      to: "sarah@email.com",
      date: "2026-02-14T10:00:00Z",
      newCode: "TKT-A1B2C3D4E5F6"
    }
  ],
  
  // Dates
  purchaseDate: "2026-02-14T09:00:00Z",
  ownershipTransferDate: "2026-02-14T10:00:00Z"
}
```

### Event Waitlist Structure
```javascript
event.waitlist = [
  {
    userId: "user_789",
    email: "mike@email.com",
    requestDate: "2026-02-14T11:00:00Z",
    quantity: 2
  },
  {
    userId: "user_999",
    email: "anna@email.com",
    requestDate: "2026-02-14T12:00:00Z",
    quantity: 1
  }
]
```

---

## 🔒 Security Features

### Preventing Ticket Fraud
1. **Unique Codes:** New code generated for each owner
2. **Ownership Lock:** Can't transfer while locked
3. **Transaction History:** All transfers tracked
4. **Confirmation Required:** New owner must confirm
5. **Email Verification:** Recipient must have account

### Preventing Double-Selling
- Ticket locked immediately when transfer initiated
- Cannot resell same ticket during transfer
- Cannot cancel during transfer
- Must complete or cancel transfer first

### Audit Trail
Every ticket maintains complete history:
- Original buyer information
- All previous owners
- Transfer dates and reasons
- New codes generated
- Resale approvals

---

## 💡 Best Practices

### For Users
✓ Keep your ticket code safe  
✓ Share tickets only with trusted people  
✓ Confirm ownership transfers immediately  
✓ Check "Pending Transfers" section regularly  
✓ Use email address when transferring  

### For Organizers
✓ Monitor waitlist growth  
✓ Process resale requests promptly  
✓ Keep record of transferred tickets  
✓ Communicate with waitlist users  
✓ Use ticket codes for entry verification  

---

## ❓ Frequently Asked Questions

**Q: Can I resell my ticket if there's no waitlist?**  
A: No, the Resell button is disabled (grayed out) if there are no people waiting. Resale only available when someone wants the ticket.

**Q: What happens if I don't confirm a transferred ticket?**  
A: The transfer stays pending. The original owner cannot sell or transfer again until you confirm or they cancel the transfer.

**Q: Can I transfer a ticket that's locked?**  
A: No, locked tickets cannot be transferred, resold, or cancelled. Wait for the current transfer to complete first.

**Q: What if I want to cancel a transfer?**  
A: The original owner can cancel the transfer request, which unlocks the ticket for new actions.

**Q: Do I get a new ticket code when I receive a transferred ticket?**  
A: Yes! Once you confirm ownership, a new unique code is generated for you. This is for security.

**Q: Can I see who had my ticket before me?**  
A: Yes! Check the ticket details - it shows "Original Buyer" and "Resale History" with all previous transfers.

**Q: What if the recipient doesn't confirm the transfer?**  
A: The ticket remains locked. The original owner can cancel the transfer request after reasonable time.

---

## 🚀 Getting Started

1. **Register/Login** as a user
2. **Browse Events** and purchase tickets
3. **View Tickets** in "My Tickets" section
4. **Transfer** to a friend or **Resell** if waitlist exists
5. **Confirm Transfers** when you receive tickets from others

For Organizers:
1. **Create Events** with ticket capacity
2. **Monitor Dashboard** for resale requests and waitlist
3. **Approve Resales** to fulfill waitlist requests
4. **Track Sales** with enhanced ticket information

---

## 📞 Support

For issues with:
- **Resale:** Check if event has waitlist members
- **Transfers:** Ensure recipient has account and confirm email
- **Codes:** New code generated upon confirmation
- **Ownership:** Check ticket details for transfer history

All transactions are atomic - either fully complete or fully cancelled to prevent data inconsistency.
