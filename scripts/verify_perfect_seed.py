#!/usr/bin/env python3
"""Verify PERFECT_SEED.sql against official table"""

official = {
    'Finest Brothers': {'P': 6, 'W': 5, 'D': 1, 'L': 0, 'GD': 9, 'Pts': 16},
    'The Villagers': {'P': 5, 'W': 5, 'D': 0, 'L': 0, 'GD': 17, 'Pts': 15},
    'Super Strikers': {'P': 5, 'W': 4, 'D': 1, 'L': 0, 'GD': 8, 'Pts': 13},
    'Panthers': {'P': 6, 'W': 4, 'D': 0, 'L': 2, 'GD': 13, 'Pts': 12},
    'Losti City': {'P': 6, 'W': 3, 'D': 2, 'L': 1, 'GD': 10, 'Pts': 11},
    'Club de Chege': {'P': 5, 'W': 3, 'D': 1, 'L': 1, 'GD': 8, 'Pts': 10},
    'Allies': {'P': 3, 'W': 3, 'D': 0, 'L': 0, 'GD': 5, 'Pts': 9},
    'COVID Boys': {'P': 5, 'W': 3, 'D': 0, 'L': 2, 'GD': -1, 'Pts': 9},
    'Ronavics': {'P': 5, 'W': 2, 'D': 0, 'L': 3, 'GD': -1, 'Pts': 6},
    "Godfather's": {'P': 6, 'W': 1, 'D': 2, 'L': 3, 'GD': -6, 'Pts': 5},
    'Pundits': {'P': 3, 'W': 1, 'D': 0, 'L': 2, 'GD': 4, 'Pts': 3},
    'Titans': {'P': 4, 'W': 1, 'D': 0, 'L': 3, 'GD': -1, 'Pts': 3},
    'Kawaago': {'P': 3, 'W': 1, 'D': 0, 'L': 2, 'GD': -6, 'Pts': 3},
    'The Brotherhood': {'P': 5, 'W': 1, 'D': 0, 'L': 4, 'GD': -7, 'Pts': 3},
    'Top Bins': {'P': 6, 'W': 0, 'D': 2, 'L': 4, 'GD': -11, 'Pts': 2},
    'Raptors': {'P': 5, 'W': 0, 'D': 1, 'L': 4, 'GD': -11, 'Pts': 1},
    'Legends': {'P': 5, 'W': 0, 'D': 0, 'L': 5, 'GD': -16, 'Pts': 0},
}

# Matches from PERFECT_SEED.sql (41 matches)
matches = [
    # Draw matches (5)
    ('Finest Brothers', 'Losti City', 2, 2),
    ('Super Strikers', 'Losti City', 1, 1),
    ('Club de Chege', "Godfather's", 1, 1),
    ("Godfather's", 'Top Bins', 0, 0),
    ('Top Bins', 'Raptors', 1, 1),

    # Finest Brothers wins (5)
    ('Finest Brothers', 'Ronavics', 3, 1),
    ('Finest Brothers', 'COVID Boys', 2, 1),
    ('Finest Brothers', 'The Brotherhood', 2, 0),
    ('Finest Brothers', 'Legends', 2, 0),
    ('Finest Brothers', 'Top Bins', 2, 1),

    # The Villagers wins (5)
    ('The Villagers', 'Raptors', 5, 1),
    ('The Villagers', 'The Brotherhood', 4, 0),
    ('The Villagers', 'Legends', 4, 0),
    ("The Villagers", "Godfather's", 3, 1),
    ('The Villagers', 'Top Bins', 4, 1),

    # Super Strikers wins (4)
    ('Super Strikers', 'Titans', 3, 1),
    ('Super Strikers', 'The Brotherhood', 3, 1),
    ('Super Strikers', 'Ronavics', 2, 0),
    ('Super Strikers', 'Raptors', 2, 1),

    # Panthers (4 wins, 2 losses)
    ('Panthers', 'COVID Boys', 5, 0),
    ('Panthers', 'Legends', 5, 0),
    ('Panthers', 'Kawaago', 4, 0),
    ('Panthers', 'Top Bins', 3, 1),
    ('Losti City', 'Panthers', 2, 1),  # Panthers loss
    ('Pundits', 'Panthers', 5, 1),     # Panthers loss

    # Losti City (after 2 draws, 1 win vs Panthers)
    ('Losti City', 'Legends', 4, 0),
    ('Losti City', 'Ronavics', 3, 1),
    ('Club de Chege', 'Losti City', 2, 1),  # Losti loss

    # Club de Chege (after 1 draw, 1 win vs Losti)
    ('Club de Chege', 'Titans', 4, 0),
    ('Club de Chege', 'Raptors', 3, 0),
    ('Allies', 'Club de Chege', 2, 1),  # Club loss

    # Allies (already 1 vs Club)
    ('Allies', 'Kawaago', 2, 0),
    ('Allies', 'Titans', 2, 1),

    # COVID Boys (after losses to Finest, Panthers)
    ('COVID Boys', 'Ronavics', 2, 1),
    ("COVID Boys", "Godfather's", 2, 0),
    ('COVID Boys', 'The Brotherhood', 2, 1),

    # Ronavics (after 3 losses)
    ("Ronavics", "Godfather's", 2, 0),
    ('Ronavics', 'Kawaago', 2, 1),

    # Titans (after 3 losses)
    ('Titans', 'Legends', 3, 0),

    # Pundits (after 1 win vs Panthers)
    ('Losti City', 'Pundits', 5, 0),  # Pundits loss
    ("Godfather's", 'Pundits', 2, 1),  # Pundits loss
]

# Calculate stats
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

print("="*110)
print(f"{'Team':<20} {'P':>2} {'W':>2} {'D':>2} {'L':>2} {'GD':>4} {'Pts':>3} | {'Target':>2} {'W':>2} {'D':>2} {'L':>2} {'GD':>4} {'Pts':>3} | Status")
print("="*110)

errors = []
correct = 0
for team in sorted(official.keys(), key=lambda t: -official[t]['Pts']):
    if team not in stats:
        print(f"❌ {team}: MISSING")
        errors.append(f"{team}: MISSING")
        continue

    s = stats[team]
    o = official[team]

    issues = []
    for k in ['P', 'W', 'D', 'L', 'Pts']:
        if s[k] != o[k]:
            diff = s[k] - o[k]
            sign = '+' if diff > 0 else ''
            issues.append(f"{k}:{s[k]}({sign}{diff})")

    if s['GD'] != o['GD']:
        diff = s['GD'] - o['GD']
        sign = '+' if diff > 0 else ''
        issues.append(f"GD:{s['GD']:+d}({sign}{diff})")

    status = "✅" if not issues else "❌ " + ", ".join(issues)
    print(f"{team:<20} {s['P']:>2} {s['W']:>2} {s['D']:>2} {s['L']:>2} {s['GD']:>+4} {s['Pts']:>3} | {o['P']:>2} {o['W']:>2} {o['D']:>2} {o['L']:>2} {o['GD']:>+4} {o['Pts']:>3} | {status}")

    if issues:
        errors.append(f"{team}: {', '.join(issues)}")
    else:
        correct += 1

print("="*110)
print(f"Total matches: {len(matches)}")
print(f"Correct: {correct}/{len(official)}")

# Show specific issues user mentioned
print("\n" + "="*80)
print("SPECIFIC ISSUES TO FIX (user feedback):")
print("="*80)

# Losti City
lc = stats['Losti City']
lco = official['Losti City']
print(f"\n1. LOSTI CITY:")
print(f"   Current: P={lc['P']}, W={lc['W']}, D={lc['D']}, L={lc['L']}, GD={lc['GD']:+d}, Pts={lc['Pts']}")
print(f"   Target:  P={lco['P']}, W={lco['W']}, D={lco['D']}, L={lco['L']}, GD={lco['GD']:+d}, Pts={lco['Pts']}")
if lc['P'] > lco['P']:
    print(f"   Issue: Extra {lc['P'] - lco['P']} game(s), extra {lc['Pts'] - lco['Pts']} points")

# Kawaago
kw = stats['Kawaago']
kwo = official['Kawaago']
print(f"\n2. KAWAAGO:")
print(f"   Current: P={kw['P']}, W={kw['W']}, D={kw['D']}, L={kw['L']}, GD={kw['GD']:+d}, Pts={kw['Pts']}")
print(f"   Target:  P={kwo['P']}, W={kwo['W']}, D={kwo['D']}, L={kwo['L']}, GD={kwo['GD']:+d}, Pts={kwo['Pts']}")
if kw['Pts'] < kwo['Pts']:
    print(f"   Issue: Missing {kwo['Pts'] - kw['Pts']} points (need W={kwo['W']} but have W={kw['W']})")

# Brotherhood
tb = stats['The Brotherhood']
tbo = official['The Brotherhood']
print(f"\n3. THE BROTHERHOOD:")
print(f"   Current: P={tb['P']}, W={tb['W']}, D={tb['D']}, L={tb['L']}, GD={tb['GD']:+d}, Pts={tb['Pts']}")
print(f"   Target:  P={tbo['P']}, W={tbo['W']}, D={tbo['D']}, L={tbo['L']}, GD={tbo['GD']:+d}, Pts={tbo['Pts']}")
if tb['Pts'] < tbo['Pts']:
    print(f"   Issue: Missing {tbo['Pts'] - tb['Pts']} points (need W={tbo['W']} but have W={tb['W']})")

# List all matches involving these teams
print("\n" + "="*80)
print("MATCHES INVOLVING AFFECTED TEAMS:")
print("="*80)
for i, (home, away, hs, as_) in enumerate(matches, 1):
    if any(t in [home, away] for t in ['Losti City', 'Kawaago', 'The Brotherhood']):
        result = "draw" if hs == as_ else (f"{home} win" if hs > as_ else f"{away} win")
        print(f"{i:2}. {home} {hs}-{as_} {away} ({result})")
