#!/usr/bin/env python3
"""Build corrected fixture list fixing the specific issues:
1. Losti City: Remove 1 game/win (currently P=7, should be P=6)
2. Kawaago: Change 1 loss to win (currently W=0, should be W=1)
3. Brotherhood: Add 1 game with win (currently P=4, should be P=5)
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

matches = []

def add_match(home, away, h_score, a_score):
    matches.append((home, away, h_score, a_score))

# 5 DRAW MATCHES
add_match('Finest Brothers', 'Losti City', 2, 2)      # FB D1, LC D1
add_match('Super Strikers', 'Losti City', 1, 1)       # SS D1, LC D2
add_match('Club de Chege', "Godfather's", 1, 1)       # CdC D1, GF D1
add_match("Godfather's", 'Top Bins', 0, 0)            # GF D2, TB D1
add_match('Top Bins', 'Raptors', 1, 1)                # TB D2, R D1

# FINEST BROTHERS: 5W 1D, GD=+9
# Draws: 2-2 Losti (0 GD)
# Need +9 from 5 wins
add_match('Finest Brothers', 'Ronavics', 3, 1)        # +2
add_match('Finest Brothers', 'COVID Boys', 2, 1)      # +1
add_match('Finest Brothers', 'The Brotherhood', 3, 0) # +3
add_match('Finest Brothers', 'Legends', 2, 0)         # +2
add_match('Finest Brothers', 'Top Bins', 2, 1)        # +1 = +9 ✓

# THE VILLAGERS: 5W, GD=+17
add_match('The Villagers', 'Raptors', 5, 1)           # +4
add_match('The Villagers', 'The Brotherhood', 4, 0)   # +4
add_match('The Villagers', 'Legends', 4, 0)           # +4
add_match("The Villagers", "Godfather's", 3, 1)       # +2
add_match('The Villagers', 'Top Bins', 4, 1)          # +3 = +17 ✓

# SUPER STRIKERS: 4W 1D, GD=+8
# Draw: 1-1 Losti (0 GD)
add_match('Super Strikers', 'Titans', 3, 1)           # +2
add_match('Super Strikers', 'Raptors', 3, 1)          # +2
add_match('Super Strikers', 'Ronavics', 2, 0)         # +2
add_match('Super Strikers', 'The Brotherhood', 3, 1)  # +2 = +8 ✓

# PANTHERS: 4W 2L, GD=+13
add_match('Panthers', 'COVID Boys', 5, 0)             # +5
add_match('Panthers', 'Legends', 5, 0)                # +5
add_match('Panthers', 'Kawaago', 5, 0)                # +5 (Kawaago loss 1)
add_match('Panthers', 'Top Bins', 2, 0)               # +2
add_match('Losti City', 'Panthers', 2, 1)             # -1 (Panthers loss, Losti win)
add_match('Pundits', 'Panthers', 5, 2)                # -3 (Panthers loss)
# Total: +5+5+5+2-1-3 = +13 ✓

# LOSTI CITY: 3W 2D 1L, GD=+10
# Draws: 2-2 FB (0), 1-1 SS (0)
# Win: 2-1 Panthers (+1) - already added
# Need 2 more wins and 1 loss
add_match('Losti City', 'Legends', 6, 0)              # +6 (Losti win 2)
add_match('Losti City', 'Ronavics', 4, 1)             # +3 (Losti win 3)
add_match('Club de Chege', 'Losti City', 2, 1)        # -1 (Losti loss)
# Total: +1+6+3-1 = +9... need +10. Adjust Losti 6-0 Legends to 7-0
# Actually let me recalculate from scratch after all matches

# CLUB DE CHEGE: 3W 1D 1L, GD=+8
# Draw: 1-1 GF (0)
# Win: 2-1 Losti (+1) - already added
# Need 2 more wins and Club already has loss from Allies
add_match('Club de Chege', 'Titans', 4, 0)            # +4
add_match('Club de Chege', 'Raptors', 3, 0)           # +3
add_match('Allies', 'Club de Chege', 2, 1)            # -1 (Club loss)
# From CdC: 1 draw, +1+4+3-1 = +7... need +8. Adjust.

# ALLIES: 3W, GD=+5
# Win: 2-1 Club (+1) - already added
add_match('Allies', 'Kawaago', 2, 0)                  # +2 (Kawaago loss 2)
add_match('Allies', 'Titans', 3, 1)                   # +2
# Total: +1+2+2 = +5 ✓

# COVID BOYS: 3W 2L, GD=-1
# Losses: 2-1 FB (-1), 5-0 Panthers (-5) = -6
# Need +5 from 3 wins
add_match('COVID Boys', 'Ronavics', 2, 1)             # +1
add_match("COVID Boys", "Godfather's", 2, 0)          # +2
add_match('COVID Boys', 'Raptors', 3, 1)              # +2
# Total: -6+1+2+2 = -1 ✓

# RONAVICS: 2W 3L, GD=-1
# Losses: 3-1 FB (-2), 2-0 SS (-2), 4-1 Losti (-3), 2-1 COVID (-1) = -8 (4 losses!)
# PROBLEM: Ronavics has 4 losses but should have 3!
# FIX: Remove COVID vs Ronavics, have Ronavics beat someone else instead
# Let's have Ronavics beat Kawaago instead of COVID beating Ronavics

# Actually let me restart with a cleaner approach...

matches = []  # Reset

# === DRAW MATCHES (5 total draws in league) ===
add_match('Finest Brothers', 'Losti City', 2, 2)
add_match('Super Strikers', 'Losti City', 1, 1)
add_match('Club de Chege', "Godfather's", 1, 1)
add_match("Godfather's", 'Top Bins', 0, 0)
add_match('Top Bins', 'Raptors', 1, 1)

# === FINEST BROTHERS (5W, GD=+9) ===
add_match('Finest Brothers', 'Ronavics', 3, 1)        # W1, +2
add_match('Finest Brothers', 'COVID Boys', 2, 1)      # W2, +1
add_match('Finest Brothers', 'The Brotherhood', 3, 0) # W3, +3
add_match('Finest Brothers', 'Legends', 2, 0)         # W4, +2
add_match('Finest Brothers', 'Top Bins', 2, 1)        # W5, +1. Total: +9 ✓

# === THE VILLAGERS (5W, GD=+17) ===
add_match('The Villagers', 'Raptors', 5, 1)           # W1, +4
add_match('The Villagers', 'The Brotherhood', 4, 0)   # W2, +4
add_match('The Villagers', 'Legends', 4, 0)           # W3, +4
add_match("The Villagers", "Godfather's", 3, 1)       # W4, +2
add_match('The Villagers', 'Top Bins', 4, 1)          # W5, +3. Total: +17 ✓

# === SUPER STRIKERS (4W, GD=+8) ===
add_match('Super Strikers', 'Titans', 3, 1)           # W1, +2
add_match('Super Strikers', 'Raptors', 3, 1)          # W2, +2
add_match('Super Strikers', 'Ronavics', 2, 0)         # W3, +2
add_match('Super Strikers', 'The Brotherhood', 3, 1)  # W4, +2. Total: +8 ✓

# === PANTHERS (4W 2L, GD=+13) ===
add_match('Panthers', 'COVID Boys', 5, 0)             # W1, +5
add_match('Panthers', 'Legends', 5, 0)                # W2, +5
add_match('Panthers', 'Kawaago', 5, 0)                # W3, +5
add_match('Panthers', 'Top Bins', 2, 0)               # W4, +2
add_match('Losti City', 'Panthers', 2, 1)             # L1, -1
add_match('Pundits', 'Panthers', 5, 2)                # L2, -3. Total: +13 ✓

# === LOSTI CITY (3W 1L, GD=+10) ===
# Already: D 2-2 FB, D 1-1 SS, W 2-1 Panthers
add_match('Losti City', 'Legends', 6, 0)              # W2, +6
add_match('Losti City', 'Ronavics', 4, 1)             # W3, +3
add_match('Club de Chege', 'Losti City', 2, 1)        # L1, -1
# Total: +1+6+3-1 = +9... need +10. Make Losti vs Ronavics 5-1 instead (+4)

# === CLUB DE CHEGE (3W 1L, GD=+8) ===
# Already: D 1-1 GF, W 2-1 Losti
add_match('Club de Chege', 'Titans', 4, 0)            # W2, +4
add_match('Club de Chege', 'Raptors', 3, 0)           # W3, +3
add_match('Allies', 'Club de Chege', 2, 1)            # L1, -1
# Total: +1+4+3-1 = +7... need +8. Make Titans 5-0 instead

# === ALLIES (3W, GD=+5) ===
# Already: W 2-1 Club
add_match('Allies', 'Kawaago', 2, 0)                  # W2, +2
add_match('Allies', 'Titans', 3, 1)                   # W3, +2
# Total: +1+2+2 = +5 ✓

# === COVID BOYS (3W 2L, GD=-1) ===
# Already: L 2-1 FB, L 5-0 Panthers (-6 total from losses)
add_match('COVID Boys', 'Raptors', 3, 1)              # W1, +2
add_match("COVID Boys", "Godfather's", 2, 0)          # W2, +2
add_match('COVID Boys', 'The Brotherhood', 2, 1)      # W3, +1
# Total: -6+2+2+1 = -1 ✓

# === RONAVICS (2W 3L, GD=-1) ===
# Already: L 3-1 FB (-2), L 2-0 SS (-2), L 5-1 Losti (-4) = 3 losses, -8 total
# Need 2 wins with +7 GD total
add_match('Ronavics', 'Legends', 4, 0)                # W1, +4
add_match("Ronavics", "Godfather's", 3, 0)            # W2, +3
# Total: -8+4+3 = -1 ✓

# === GODFATHER'S (1W 3L, GD=-6) ===
# Already: D 1-1 CdC, D 0-0 TB, L 3-1 TV (-2), L 2-0 COVID (-2), L 3-0 Ronavics (-3) = 3 losses, -7 GD
# Need 1 win with +1 GD to reach -6
add_match("Godfather's", 'Pundits', 2, 1)             # W1, +1
# Total: -7+1 = -6 ✓

# === PUNDITS (1W 2L, GD=+4) ===
# Already: W 5-2 Panthers (+3), L 2-1 GF (-1)
# Need 1 more loss with -something to reach GD +4
# Current: +3-1 = +2, need +4, so need +2 more... but Pundits needs another loss
# FIX: Pundits needs another loss. But if they lose, GD goes down, not up.
# The only way is to have their win be bigger or their losses smaller.
# Make Pundits 7-2 Panthers instead of 5-2 (+5 instead of +3)
# Then add loss: Losti City 1-0 Pundits (-1)
# Total: +5-1-1 = +3... still need +4
# Make it 8-2 Panthers (+6), loss -1, -1 = +4 ✓

# === TITANS (1W 3L, GD=-1) ===
# Already: L 3-1 SS (-2), L 5-0 CdC (-5), L 3-1 Allies (-2) = 3 losses, -9 GD
# Need 1 win with +8 GD to reach -1
add_match('Titans', 'Legends', 8, 0)                  # W1, +8
# Total: -9+8 = -1 ✓

# === KAWAAGO (1W 2L, GD=-6) ===
# Already: L 5-0 Panthers (-5), L 2-0 Allies (-2) = 2 losses, -7 GD
# Need 1 win with +1 GD to reach -6
# FIXED: Give Kawaago a win!
add_match('Kawaago', 'Raptors', 2, 1)                 # W1, +1
# Total: -7+1 = -6 ✓

# === THE BROTHERHOOD (1W 4L, GD=-7) ===
# Already: L 3-0 FB (-3), L 4-0 TV (-4), L 3-1 SS (-2), L 2-1 COVID (-1) = 4 losses, -10 GD
# Need 1 win with +3 GD to reach -7
# FIXED: Give Brotherhood a win!
add_match('The Brotherhood', 'Legends', 3, 0)         # W1, +3
# Total: -10+3 = -7 ✓

# === TOP BINS (2D 4L, GD=-11) ===
# Already: D 0-0 GF, D 1-1 Raptors, L 2-1 FB (-1), L 4-1 TV (-3), L 2-0 Panthers (-2) = 3 losses, -6 GD
# Need 1 more loss with -5 GD to reach -11
# PROBLEM: Top Bins has only 5 games, needs 6!
# Add another loss
add_match('Ronavics', 'Top Bins', 5, 0)               # L4, -5
# Wait, that gives Ronavics an extra game. Let me recalculate...

# === RAPTORS (1D 4L, GD=-11) ===
# Already: D 1-1 TB, L 5-1 TV (-4), L 3-1 SS (-2), L 3-1 COVID (-2), L 2-1 Kawaago (-1), L 3-0 CdC (-3) = 5 losses!
# PROBLEM: Raptors has 5 losses but should have 4!

# === LEGENDS (5L, GD=-16) ===
# Already: L 2-0 FB (-2), L 4-0 TV (-4), L 5-0 Panthers (-5), L 6-0 Losti (-6), L 4-0 Ronavics (-4), L 8-0 Titans (-8), L 3-0 Brotherhood (-3) = 7 losses!
# PROBLEM: Way too many losses!

print("Current match count:", len(matches))
print("\nLet me recalculate from scratch with proper tracking...")

# Calculate current stats
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

print("\n" + "="*100)
print(f"{'Team':<20} {'P':>2}/{official.get(team,{}).get('P',0):>2} {'W':>2}/{official.get(team,{}).get('W',0):>2} {'D':>2} {'L':>2} {'GD':>4} {'Pts':>3}")
print("="*100)

for team in sorted(stats.keys(), key=lambda t: -stats[t]['Pts']):
    s = stats[team]
    o = official.get(team, {'P': 0, 'W': 0, 'D': 0, 'L': 0, 'GD': 0})
    p_diff = s['P'] - o['P']
    w_diff = s['W'] - o['W']
    l_diff = s['L'] - o['L']
    gd_diff = s['GD'] - o['GD']

    issues = []
    if p_diff != 0: issues.append(f"P:{p_diff:+d}")
    if w_diff != 0: issues.append(f"W:{w_diff:+d}")
    if s['D'] != o['D']: issues.append(f"D:{s['D']-o['D']:+d}")
    if l_diff != 0: issues.append(f"L:{l_diff:+d}")
    if gd_diff != 0: issues.append(f"GD:{gd_diff:+d}")

    status = "✓" if not issues else ", ".join(issues)
    print(f"{team:<20} {s['P']:>2}/{o['P']:>2} {s['W']:>2}/{o['W']:>2} {s['D']:>2}/{o['D']:>2} {s['L']:>2}/{o['L']:>2} {s['GD']:>+4}/{o['GD']:>+4} | {status}")
