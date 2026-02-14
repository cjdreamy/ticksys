# Advanced Ticketing System - Visual Workflows

## 🎫 Feature Workflows

### Workflow 1: Resale to Organization (Emergency)

```
┌─────────────────────────────────────────────────────────────────┐
│  USER HAS TICKET BUT CAN'T ATTEND (EMERGENCY)                   │
└─────────────────────────────────────────────────────────────────┘
                               ↓
                    ┌──────────────────────┐
                    │ Check: Waitlist      │
                    │ has members?         │
                    └──────────────────────┘
                      ↙              ↘
                    YES              NO
                    ↓               ↓
            ┌──────────────┐  ┌─────────────────────┐
            │ Resell       │  │ Resell button is    │
            │ Button       │  │ DISABLED (grayed)   │
            │ ENABLED      │  └─────────────────────┘
            └──────────────┘
                    ↓
        ┌───────────────────────────────┐
        │ User clicks "Resell to        │
        │ Organization"                 │
        └───────────────────────────────┘
                    ↓
        ┌───────────────────────────────┐
        │ System shows waitlist members │
        │ User confirms resale          │
        └───────────────────────────────┘
                    ↓
        ┌───────────────────────────────┐
        │ TICKET LOCKED                 │
        │ Status: "⏳ Transfer Pending" │
        │ Cannot cancel/transfer        │
        └───────────────────────────────┘
                    ↓
        ┌───────────────────────────────┐
        │ ORGANIZER NOTIFIED            │
        │ Sees resale request in        │
        │ Dashboard                     │
        └───────────────────────────────┘
                    ↓
        ┌───────────────────────────────┐
        │ Organizer clicks "Resale      │
        │ Requests" button              │
        │ Reviews details               │
        │ Clicks "Approve"              │
        └───────────────────────────────┘
                    ↓
        ┌─────────────────────────────────────┐
        │ SYSTEM AUTO-PROCESSES:              │
        │ 1. Assigns to 1st in waitlist       │
        │ 2. Generates new code: TKT-XXXXX    │
        │ 3. Removes from waitlist            │
        │ 4. Unlocks original owner's ticket  │
        └─────────────────────────────────────┘
                    ↓
        ┌───────────────────────────────────────┐
        │ RESULT:                               │
        │ ✓ Original owner: Resale complete    │
        │ ✓ Waitlist user: Gets ticket!        │
        │ ✓ New code generated                 │
        │ ✓ Both see transaction in history    │
        └───────────────────────────────────────┘
```

---

### Workflow 2: Transfer to Friend

```
┌─────────────────────────────────────────────────────────────────┐
│  USER WANTS TO TRANSFER TICKET TO FRIEND                        │
└─────────────────────────────────────────────────────────────────┘
                               ↓
                    ┌──────────────────────┐
                    │ User clicks          │
                    │ "Transfer to Friend" │
                    └──────────────────────┘
                               ↓
                    ┌──────────────────────┐
                    │ Enter recipient's    │
                    │ email address        │
                    └──────────────────────┘
                               ↓
                    ┌──────────────────────────────┐
                    │ SYSTEM VALIDATES:            │
                    │ 1. Email exists in users?    │
                    │ 2. Is a regular user?        │
                    │ 3. Not organizer?            │
                    └──────────────────────────────┘
                      ↙                      ↘
                  VALID                    INVALID
                    ↓                          ↓
        ┌───────────────────────┐  ┌─────────────────────┐
        │ PROCEED               │  │ ERROR: Show message │
        │ Transfer initiated    │  │ User must register  │
        └───────────────────────┘  └─────────────────────┘
                    ↓
        ┌─────────────────────────────────────┐
        │ IMMEDIATE LOCK:                     │
        │ ✓ ownershipPending = true           │
        │ ✓ transferPendingTo = recipient     │
        │ ✓ Ticket status: "Transfer Pending" │
        │ ✓ Action buttons: HIDDEN            │
        └─────────────────────────────────────┘
                    ↓
        ┌─────────────────────────────────────┐
        │ RECIPIENT NOTIFICATION:             │
        │ - Next time they log in             │
        │ - See "Pending Ticket Transfers"    │
        │ - Section shows incoming transfer   │
        └─────────────────────────────────────┘
                    ↓
        ┌──────────────────────────────────────────┐
        │ RECIPIENT CONFIRMS OWNERSHIP:            │
        │ - Click "Confirm Ownership &             │
        │   Receive New Code" button               │
        │ - Alerted with new code: TKT-YYYYY       │
        └──────────────────────────────────────────┘
                    ↓
        ┌──────────────────────────────────────────┐
        │ SYSTEM PROCESSES:                        │
        │ 1. Generate new code                     │
        │ 2. Change ownership                      │
        │ 3. Record in transfer history            │
        │ 4. Unlock ticket                         │
        │ 5. Update all displays                   │
        └──────────────────────────────────────────┘
                    ↓
        ┌──────────────────────────────────────────┐
        │ RESULT:                                  │
        │ ✓ Sender: See transfer complete in      │
        │   ticket history                         │
        │ ✓ Recipient: Now owns ticket with new   │
        │   code and can transfer/resell/cancel    │
        │ ✓ Lock released                         │
        │ ✓ Transfer history preserved            │
        └──────────────────────────────────────────┘
```

---

### Workflow 3: Automatic Waitlist & Promotion

```
┌─────────────────────────────────────────────────────────────────┐
│  EVENT MANAGEMENT - WAITLIST & AUTOMATIC PROMOTION              │
└─────────────────────────────────────────────────────────────────┘

SCENARIO: Event sells out

        ┌──────────────────────────────┐
        │ Event capacity: 1000 tickets  │
        │ Available: 0                  │
        └──────────────────────────────┘
                    ↓
        ┌──────────────────────────────┐
        │ New user tries to buy tickets │
        └──────────────────────────────┘
                    ↓
        ┌──────────────────────────────┐
        │ SYSTEM MESSAGE:              │
        │ "Event sold out!"            │
        │ "Join waitlist?"             │
        └──────────────────────────────┘
                    ↓
        ┌──────────────────────────────┐
        │ User confirms: Yes            │
        └──────────────────────────────┘
                    ↓
        ┌──────────────────────────────┐
        │ Added to waitlist:            │
        │ Position: #1                 │
        │ Others may follow            │
        └──────────────────────────────┘

        ┌──────────────────────────────┐
        │ ORGANIZER DASHBOARD:         │
        │ Event shows "5 waiting"      │
        │ Click to view waitlist       │
        └──────────────────────────────┘

SCENARIO: Someone cancels ticket

        ┌─────────────────────────────────┐
        │ Current owner cancels ticket    │
        │ Calls: cancelTicket()           │
        └─────────────────────────────────┘
                    ↓
        ┌─────────────────────────────────┐
        │ SYSTEM AUTO-PROCESSES:          │
        │ 1. Mark original ticket         │
        │    cancelled                    │
        │ 2. Check: Is there a waitlist? │
        └─────────────────────────────────┘
                    ↓
        ┌─────────────────────────────────┐
        │ YES - Waitlist exists           │
        │ Pop first user from waitlist    │
        └─────────────────────────────────┘
                    ↓
        ┌─────────────────────────────────┐
        │ TRANSFER TO FIRST IN LINE:      │
        │ 1. Reassign ticket to them      │
        │ 2. Generate new code            │
        │ 3. Remove from waitlist         │
        │ 4. Update position #2 → #1     │
        └─────────────────────────────────┘
                    ↓
        ┌─────────────────────────────────┐
        │ WAITLIST USER NOTIFICATION:     │
        │ Next login: See ticket in      │
        │ "My Tickets" section            │
        │ With new code                   │
        └─────────────────────────────────┘
                    ↓
        ┌──────────────────────────────────────┐
        │ ORGANIZER SEES UPDATE:               │
        │ Dashboard now shows "4 waiting"      │
        │ (was 5, now 1 promoted to ticket)    │
        └──────────────────────────────────────┘
```

---

### Workflow 4: Transaction Lock Sequence

```
TIMELINE: Transaction Lock - Prevents Double-Selling

T=0 min: User initiates transfer
    ↓
    ┌────────────────────────┐
    │ Transfer initiated     │
    │ ownershipPending=true  │
    │ 🔒 LOCKED              │
    └────────────────────────┘
    ↓
    State: Actions BLOCKED
    ├─ Cannot cancel ✗
    ├─ Cannot resell ✗
    ├─ Cannot transfer ✗
    ├─ Cannot modify ✗
    └─ CAN wait for confirmation ✓

T=5 min: User tries to do more sales (PREVENTED)
    ↓
    ❌ Ticket locked
    ❌ Cannot access buttons
    ❌ Entire ticket appears faded
    ↓
    Message: "⏳ Waiting for new owner 
              to confirm ownership change"

T=10 min: Recipient confirms
    ↓
    ┌────────────────────────┐
    │ Ownership confirmed    │
    │ ownershipPending=false │
    │ 🔓 UNLOCKED            │
    └────────────────────────┘
    ↓
    State: Actions ENABLED again
    ├─ Can cancel ✓
    ├─ Can transfer ✓
    ├─ Can resell ✓
    └─ Full access restored ✓

T=15 min: User can now take new actions
    ↓
    ✓ Ticket available for new operations
    ✓ Lock released
    ✓ Normal state restored
```

---

## 📊 State Diagrams

### Ticket Lifecycle

```
                    ┌──────────────┐
                    │ CREATED      │
                    │ (Purchased)  │
                    └──────────────┘
                           ↓
                ┌──────────────────────┐
                │ CONFIRMED            │
                │ (Ready to use)       │
                └──────────────────────┘
                  ↙            ↘       ↘
              CANCEL         TRANSFER  RESELL
                ↓               ↓        ↓
        ┌──────────────┐ ┌────────────┐ ┌──────────────┐
        │ CANCELLED    │ │ PENDING    │ │ PENDING      │
        │ (Returned)   │ │ (Locked)   │ │ (Locked)     │
        └──────────────┘ └────────────┘ └──────────────┘
                               ↓              ↓
                           CONFIRM       APPROVE
                               ↓              ↓
                        ┌──────────────┐ ┌──────────────┐
                        │ CONFIRMED    │ │ CONFIRMED    │
                        │ (New Owner)  │ │ (Waitlist)   │
                        └──────────────┘ └──────────────┘
                           (continues lifecycle)

Legend:
- CREATED: Just purchased
- CONFIRMED: Active and usable
- PENDING: Awaiting action (locked)
- CANCELLED: Refunded/returned
```

---

### Ownership State Machine

```
         ┌─────────────────────────────┐
         │ ORIGINAL PURCHASE           │
         │ Owner = Buyer (User A)      │
         │ Code = TKT-AAA              │
         └─────────────────────────────┘
                     ↓
        [Transfer to User B requested]
                     ↓
         ┌─────────────────────────────┐
         │ TRANSFER PENDING            │
         │ 🔒 Ownership LOCKED         │
         │ Original: TKT-AAA           │
         │ Pending recipient: User B   │
         └─────────────────────────────┘
                     ↓
        [User B confirms ownership]
                     ↓
         ┌─────────────────────────────┐
         │ OWNERSHIP TRANSFERRED       │
         │ 🔓 Unlocked                 │
         │ Owner = User B              │
         │ Code = TKT-BBB (NEW!)       │
         │ History: User A → User B    │
         └─────────────────────────────┘
                     ↓
        [User B transfers to User C]
                     ↓
         ┌─────────────────────────────┐
         │ TRANSFER PENDING            │
         │ 🔒 Ownership LOCKED         │
         │ Current: TKT-BBB            │
         │ Pending recipient: User C   │
         └─────────────────────────────┘
                     ↓
        [User C confirms ownership]
                     ↓
         ┌──────────────────────────────┐
         │ FINAL OWNERSHIP STATE        │
         │ 🔓 Unlocked                  │
         │ Owner = User C               │
         │ Code = TKT-CCC (NEW!)        │
         │ Original Buyer = User A      │
         │ History:                     │
         │   - User A (TKT-AAA)         │
         │   - User B (TKT-BBB)         │
         │   - User C (TKT-CCC)         │
         └──────────────────────────────┘
```

---

## 🔄 Data Flow Diagrams

### Resale Flow: Data Movement

```
┌────────────────┐
│ Original Owner │
│   (User A)     │
│  Has Ticket    │
│  Code: AAA     │
└────────────────┘
       │
       │ Requests Resale
       ↓
┌──────────────────┐
│ Ticket Object    │
│ resalePending=OK │
│ LOCKED 🔒        │
└──────────────────┘
       │
       │ Organizer Approves
       ↓
┌──────────────────┐
│ Event Waitlist   │
│ Pop First User   │
│ (User B)         │
└──────────────────┘
       │
       │ Assign Ticket
       ↓
┌────────────────────────┐
│ Ticket Updated:        │
│ currentOwner = User B  │
│ Code = BBB (New)       │
│ resaleHistory.add()    │
│ UNLOCKED 🔓            │
└────────────────────────┘
       │
       │ Update Waitlist
       ↓
┌────────────────┐
│ Event Waitlist │
│ User C → #1    │
│ (Promotion)    │
└────────────────┘
       │
       │ User B Notified
       ↓
┌────────────────┐
│ User B         │
│ New Ticket     │
│ Code: BBB      │
│ Ready to Use   │
└────────────────┘
```

---

## 🎯 Feature Decision Trees

### Can User Resell?

```
        ┌─────────────────────────────┐
        │ User Has Ticket             │
        │ Clicks "Resell"             │
        └─────────────────────────────┘
                      │
                      ↓
              ┌───────────────────┐
              │ Event Waitlist    │
              │ has members?      │
              └───────────────────┘
                ↙              ↘
              YES              NO
              ↓               ↓
         ┌─────────┐   ┌──────────────┐
         │ ALLOW   │   │ BUTTON       │
         │ Resale  │   │ DISABLED     │
         │ ✓       │   │ (grayed)     │
         └─────────┘   └──────────────┘
```

---

### Can Ticket Be Transferred?

```
        ┌──────────────────────┐
        │ Ticket Owned         │
        │ Status = Confirmed   │
        └──────────────────────┘
                  │
                  ↓
        ┌──────────────────────┐
        │ ownershipPending     │
        │ = true?              │
        └──────────────────────┘
         ↙              ↘
       YES              NO
        ↓               ↓
   ┌────────────┐  ┌──────────────┐
   │ BLOCKED    │  │ ALLOWED      │
   │ Cannot     │  │ Can transfer │
   │ transfer   │  │ or resell    │
   │ (Locked)   │  │ ✓            │
   └────────────┘  └──────────────┘
```

---

## 📈 System Statistics

### Data Point Relationships

```
┌─────────────────────────────────────────────────────┐
│                   SYSTEM OVERVIEW                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Events                                            │
│  ├─ 5 sample events                               │
│  ├─ Organizer-specific events                     │
│  └─ Each has:                                     │
│      ├─ Capacity (total tickets)                  │
│      ├─ Available (remaining tickets)             │
│      ├─ Waitlist (queue of users)                 │
│      └─ Resale requests (pending approvals)       │
│                                                   │
│  Users                                            │
│  ├─ Regular users                                 │
│  ├─ Organizers                                    │
│  └─ Each has:                                     │
│      ├─ Email (unique ID)                         │
│      ├─ Owned tickets (array)                     │
│      ├─ Pending transfers (array)                 │
│      └─ Transfer history (array)                  │
│                                                   │
│  Tickets                                          │
│  ├─ Purchase tickets                              │
│  ├─ Transferred tickets                           │
│  ├─ Resold tickets                                │
│  └─ Each has:                                     │
│      ├─ ticketCode (unique per owner)             │
│      ├─ currentOwner (who has it now)             │
│      ├─ originalBuyer (who bought it first)       │
│      ├─ resaleHistory (all transfers)             │
│      ├─ ownershipPending (lock status)            │
│      ├─ transferPendingTo (recipient if locked)   │
│      └─ resalePendingTo (org if locked)           │
│                                                   │
└─────────────────────────────────────────────────────┘
```

---

## ✅ Verification Checklist

### Before First Use
- [ ] Open `index.html` in browser
- [ ] 5 sample events visible
- [ ] Can register user
- [ ] Can register organizer
- [ ] Can purchase ticket
- [ ] Ticket appears in "My Tickets"

### After First Purchase
- [ ] See ticket details with code
- [ ] See "Transfer to Friend" button
- [ ] See "Resell to Organization" (if applicable)
- [ ] Can cancel ticket (if applicable)

### After Resale/Transfer
- [ ] Ticket shows "Transfer Pending" status
- [ ] Recipient sees in pending section
- [ ] New code generated on confirmation
- [ ] Transfer history recorded

### After Organizer Actions
- [ ] Dashboard shows waitlist count
- [ ] Dashboard shows resale count
- [ ] Can view details
- [ ] Can approve resales
- [ ] Waitlist auto-promotes
- [ ] New codes generated

---

**These visual workflows help understand the complete system flow for all features and use cases.**
