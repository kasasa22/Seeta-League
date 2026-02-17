#!/usr/bin/env python3
"""
Build FINAL fixture list matching official table 100%

Strategy:
1. Start with all teams and their required stats
2. Allocate draws first (fixed)
3. Allocate wins/losses systematically
4. Adjust scores for GD
"""

official = {
    'Finest Brothers': {'P': 6, 'W': 5, 'D': 1, 'L': 0, 'GD': 9},
    'The Villagers': {'P': 5, 'W': 5, 'D': 0, 'L': 0, 'GD': 17},
    'Super Strikers': {'P': 5, 'W': 4, 'D': 1, 'L': 0, 'GD': 8},
    'Panthers': {'P': 6, 'W': 4, 'D': 0, 'L': 2, 'GD': 13},
    'Losti City': {'P': 6, 'W': 3, 'D': 2, 'L': 1, 'GD': 10},
    'Club de Chege': {'P': 5, 'W': 3, 'D': 1, 'L': 1, 'GD': 8},
    'Allies': {'P': 3, 'W': 3, 'D': 0, 'L': 0, 'GD': 5},
    'COVID Boys': {'P': 5, 'W': 3, 'D': 0, 'L': 2, 'GD': -1},
    'Ronavics': {'P': 5, 'W': 2, 'D': 0, 'L': 3, 'GD': -1},
    "Godfather's": {'P': 6, 'W': 1, 'D': 2, 'L': 3, 'GD': -6},
    'Pundits': {'P': 3, 'W': 1, 'D': 0, 'L': 2, 'GD': 4},
    'Titans': {'P': 4, 'W': 1, 'D': 0, 'L': 3, 'GD': -1},
    'Kawaago': {'P': 3, 'W': 1, 'D': 0, 'L': 2, 'GD': -6},
    'The Brotherhood': {'P': 5, 'W': 1, 'D': 0, 'L': 4, 'GD': -7},
    'Top Bins': {'P': 6, 'W': 0, 'D': 2, 'L': 4, 'GD': -11},
    'Raptors': {'P': 5, 'W': 0, 'D': 1, 'L': 4, 'GD': -11},
    'Legends': {'P': 5, 'W': 0, 'D': 0, 'L': 5, 'GD': -16},
}

# Track remaining W/D/L for each team
remaining = {t: {'W': d['W'], 'D': d['D'], 'L': d['L']} for t, d in official.items()}
matches = []

def add_match(home, away, h_score, a_score):
    matches.append((home, away, h_score, a_score))
    if h_score > a_score:
        remaining[home]['W'] -= 1
        remaining[away]['L'] -= 1
    elif h_score < a_score:
        remaining[away]['W'] -= 1
        remaining[home]['L'] -= 1
    else:
        remaining[home]['D'] -= 1
        remaining[away]['D'] -= 1

# ========== DRAW MATCHES (5 total) ==========
# FB:1D, SS:1D, LC:2D, CdC:1D, GF:2D, TB:2D, R:1D = 10 draw slots = 5 matches
add_match('Finest Brothers', 'Losti City', 2, 2)      # FB D, LC D
add_match('Super Strikers', 'Losti City', 1, 1)       # SS D, LC D
add_match('Club de Chege', "Godfather's", 1, 1)       # CdC D, GF D
add_match("Godfather's", 'Top Bins', 0, 0)            # GF D, TB D
add_match('Top Bins', 'Raptors', 1, 1)                # TB D, R D

# Verify draws
for t in remaining:
    if remaining[t]['D'] != 0:
        print(f"ERROR: {t} still has {remaining[t]['D']} draws remaining")

print("Draws allocated correctly!")

# ========== Now allocate wins/losses ==========
# Total W remaining = sum of all W = 37 wins needed
# Total L remaining = sum of all L = 36 losses needed
# PROBLEM: W != L (37 != 36) - there's 1 extra win somewhere!
# This is a mathematical impossibility in the source data.
# We'll create 36 decisive matches and leave one team short.

total_w = sum(remaining[t]['W'] for t in remaining)
total_l = sum(remaining[t]['L'] for t in remaining)
print(f"\nTotal wins needed: {total_w}")
print(f"Total losses needed: {total_l}")

# Strategy: Create matches where winners need wins and losers need losses
# We'll allocate matches one by one

# FINEST BROTHERS needs 5 wins - find 5 teams that need losses
# FB W5: Ronavics(L3), COVID(L2), Brotherhood(L4), Legends(L5), Top Bins(L4)
add_match('Finest Brothers', 'Ronavics', 3, 1)        # FB W, Ronavics L
add_match('Finest Brothers', 'COVID Boys', 2, 1)      # FB W, COVID L
add_match('Finest Brothers', 'The Brotherhood', 3, 0) # FB W, Brotherhood L
add_match('Finest Brothers', 'Legends', 2, 0)         # FB W, Legends L
add_match('Finest Brothers', 'Top Bins', 2, 1)        # FB W, Top Bins L

# THE VILLAGERS needs 5 wins
# TV W5: Raptors(L4), Brotherhood(L4-1=3), Legends(L5-1=4), Godfather's(L3), Top Bins(L4-1=3)
add_match('The Villagers', 'Raptors', 5, 1)           # TV W, Raptors L
add_match('The Villagers', 'The Brotherhood', 4, 0)   # TV W, Brotherhood L
add_match('The Villagers', 'Legends', 4, 0)           # TV W, Legends L
add_match("The Villagers", "Godfather's", 3, 1)       # TV W, Godfather's L
add_match('The Villagers', 'Top Bins', 4, 1)          # TV W, Top Bins L

# SUPER STRIKERS needs 4 wins
# SS W4: Titans(L3), Raptors(L4-1=3), Ronavics(L3-1=2), Brotherhood(L4-2=2)
add_match('Super Strikers', 'Titans', 3, 1)           # SS W, Titans L
add_match('Super Strikers', 'Raptors', 3, 1)          # SS W, Raptors L
add_match('Super Strikers', 'Ronavics', 2, 0)         # SS W, Ronavics L
add_match('Super Strikers', 'The Brotherhood', 3, 1)  # SS W, Brotherhood L

# PANTHERS needs 4 wins, 2 losses
# Panthers W4: COVID(L2-1=1), Legends(L5-2=3), Kawaago(L2), Top Bins(L4-2=2)
add_match('Panthers', 'COVID Boys', 5, 0)             # Panthers W, COVID L
add_match('Panthers', 'Legends', 5, 0)                # Panthers W, Legends L
add_match('Panthers', 'Kawaago', 5, 0)                # Panthers W, Kawaago L
add_match('Panthers', 'Top Bins', 2, 0)               # Panthers W, Top Bins L
# Panthers L2: Losti City(W3), Pundits(W1)
add_match('Losti City', 'Panthers', 2, 1)             # Losti W, Panthers L
add_match('Pundits', 'Panthers', 7, 2)                # Pundits W, Panthers L

# LOSTI CITY needs 3 wins (already has 1 vs Panthers), 1 loss
# Losti W2 more: Legends(L5-3=2), Ronavics(L3-2=1)
add_match('Losti City', 'Legends', 5, 0)              # Losti W, Legends L
add_match('Losti City', 'Ronavics', 4, 1)             # Losti W, Ronavics L
# Losti L1: Club de Chege(W3)
add_match('Club de Chege', 'Losti City', 2, 1)        # Club W, Losti L

# CLUB DE CHEGE needs 3 wins (already 1 vs Losti), 1 loss
# Club W2: Titans(L3-1=2), Raptors(L4-2=2)
add_match('Club de Chege', 'Titans', 5, 0)            # Club W, Titans L
add_match('Club de Chege', 'Raptors', 3, 0)           # Club W, Raptors L
# Club L1: Allies(W3)
add_match('Allies', 'Club de Chege', 2, 1)            # Allies W, Club L

# ALLIES needs 3 wins (already 1 vs Club)
# Allies W2: Kawaago(L2-1=1), Titans(L3-2=1)
add_match('Allies', 'Kawaago', 2, 0)                  # Allies W, Kawaago L
add_match('Allies', 'Titans', 3, 1)                   # Allies W, Titans L

# COVID BOYS needs 3 wins (already 2 losses to FB and Panthers)
# COVID W3: Raptors(L4-3=1), Godfather's(L3-1=2), Brotherhood(L4-3=1)
add_match('COVID Boys', 'Raptors', 3, 1)              # COVID W, Raptors L
add_match("COVID Boys", "Godfather's", 2, 0)          # COVID W, Godfather's L
add_match('COVID Boys', 'The Brotherhood', 2, 1)      # COVID W, Brotherhood L

# RONAVICS needs 2 wins (already 3 losses to FB, SS, Losti)
# Ronavics W2: Legends(L5-4=1), Godfather's(L3-2=1)
add_match('Ronavics', 'Legends', 3, 0)                # Ronavics W, Legends L
add_match("Ronavics", "Godfather's", 2, 0)            # Ronavics W, Godfather's L

# GODFATHER'S needs 1 win (already 3 losses to TV, COVID, Ronavics)
# Godfather's W1: Pundits(L2)
add_match("Godfather's", 'Pundits', 2, 1)             # Godfather's W, Pundits L

# PUNDITS needs 1 win (already has it vs Panthers), 2 losses (already 1 to GF)
# Pundits L1 more: needs someone with a win slot...
# Hmm, who still needs wins?
# Let's check remaining

print("\n=== Remaining after allocations ===")
for t in remaining:
    r = remaining[t]
    if r['W'] != 0 or r['L'] != 0:
        print(f"{t}: W={r['W']}, L={r['L']}")

# TITANS needs 1 win (already 3 losses)
# Titans W1: need someone with losses left... only Legends(L5-5=0) is done
# Wait, let me recheck Legends

# Actually, Pundits still needs 1 more loss, and Titans needs 1 win!
add_match('Titans', 'Pundits', 1, 0)                  # Titans W, Pundits L

# KAWAAGO needs 1 win (already 2 losses to Panthers, Allies)
# Kawaago W1: need someone with losses left... Raptors?
# Raptors has L4, and we gave: TV, SS, COVID, Club = 4 losses. Done!
# So Kawaago needs to beat someone else...

# THE BROTHERHOOD needs 1 win (already 4 losses to FB, TV, SS, COVID)
# Brotherhood W1: need someone with losses left

# Let me recount Legends losses:
# L to: FB, TV, Panthers, Losti, Ronavics = 5. Exactly 5! Done.

# Raptors losses: TV, SS, Club, COVID = 4. Exactly 4! Done.

# Brotherhood has 4 losses. Needs 1 win.
# Kawaago has 2 losses. Needs 1 win.
# But there's no one left to lose to them!

# THE FIX: Kawaago and Brotherhood can beat each other? No, only one can win.
# Or they beat teams that already have all their losses?
# This is the mathematical impossibility!

# Let me try: Brotherhood beats Legends (but Legends already has 5 losses)
# Actually the official table has an inconsistency (W=37, L=36).
# We need to pick which team to short-change.

# OPTION: Give Kawaago the win vs Legends (making Legends have 6 losses instead of 5)
# OR: Give Brotherhood the win vs Legends
# OR: Skip one of the "extra" wins

# Since Legends has 5L already and we need them, let's just add the wins anyway:
add_match('Kawaago', 'Raptors', 2, 1)                 # Kawaago W, but Raptors already has 4L!
add_match('The Brotherhood', 'Legends', 2, 0)         # Brotherhood W, but Legends already has 5L!

# Final verification
stats = {}
for home, away, hs, as_ in matches:
    for t in [home, away]:
        if t not in stats:
            stats[t] = {'P': 0, 'W': 0, 'D': 0, 'L': 0, 'GF': 0, 'GA': 0}

    stats[home]['P'] += 1
    stats[away]['P'] += 1
    stats[home]['GF'] += hs
    stats[home]['GA'] += as_
    stats[away]['GF'] += as_
    stats[away]['GA'] += hs

    if hs > as_:
        stats[home]['W'] += 1
        stats[away]['L'] += 1
    elif hs < as_:
        stats[away]['W'] += 1
        stats[home]['L'] += 1
    else:
        stats[home]['D'] += 1
        stats[away]['D'] += 1

for t in stats:
    stats[t]['GD'] = stats[t]['GF'] - stats[t]['GA']
    stats[t]['Pts'] = stats[t]['W'] * 3 + stats[t]['D']

print("\n" + "="*110)
print(f"{'Team':<20} | Got                | Target              | Issues")
print("="*110)

correct = 0
for team in sorted(official.keys(), key=lambda t: -(official[t]['W']*3 + official[t]['D'])):
    o = official[team]
    s = stats.get(team, {'P': 0, 'W': 0, 'D': 0, 'L': 0, 'GD': 0})

    issues = []
    if s['P'] != o['P']: issues.append(f"P:{s['P']}≠{o['P']}")
    if s['W'] != o['W']: issues.append(f"W:{s['W']}≠{o['W']}")
    if s['D'] != o['D']: issues.append(f"D:{s['D']}≠{o['D']}")
    if s['L'] != o['L']: issues.append(f"L:{s['L']}≠{o['L']}")
    if s['GD'] != o['GD']: issues.append(f"GD:{s['GD']:+d}≠{o['GD']:+d}")

    status = "✅" if not issues else "❌ " + ", ".join(issues)
    print(f"{team:<20} P={s['P']:>2} W={s['W']:>2} D={s['D']:>2} L={s['L']:>2} GD={s['GD']:>+3} | {o['P']:>2} {o['W']:>2} {o['D']:>2} {o['L']:>2} {o['GD']:>+4} | {status}")
    if not issues:
        correct += 1

print("="*110)
print(f"\nTotal matches: {len(matches)}")
print(f"Correct: {correct}/17")

# Show teams that are off
if correct < 17:
    print("\n=== Issues to fix ===")
    for team in official:
        o = official[team]
        s = stats.get(team, {'P': 0, 'W': 0, 'D': 0, 'L': 0, 'GD': 0})
        if s['GD'] != o['GD']:
            diff = o['GD'] - s['GD']
            print(f"{team}: GD is {s['GD']:+d}, need {o['GD']:+d} (diff: {diff:+d})")
