#!/usr/bin/env python3
"""Verify SEED_EXACT.sql"""

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

# All matches from SEED_EXACT.sql
matches = [
    # MD1 (14 matches - removed Pundits matches and Titans vs Pundits)
    ('Titans', 'Super Strikers', 1, 3),
    ("Godfather's", 'Raptors', 0, 0),
    ('The Brotherhood', 'COVID Boys', 1, 2),
    ('Club de Chege', 'The Brotherhood', 3, 0),
    ('Finest Brothers', 'Ronavics', 3, 1),
    ('Club de Chege', 'Losti City', 0, 1),
    ('Ronavics', 'Raptors', 5, 0),
    ('Finest Brothers', 'COVID Boys', 2, 1),
    ('Top Bins', 'Super Strikers', 1, 4),
    ("Godfather's", 'COVID Boys', 1, 3),
    ('The Villagers', 'Raptors', 9, 1),
    ("Godfather's", 'Top Bins', 0, 0),
    ('Super Strikers', 'The Brotherhood', 3, 1),
    ('Losti City', 'Legends', 6, 1),

    # MD2 (17 matches from images, minus problematic ones)
    ('Titans', 'Top Bins', 3, 0),
    ('Club de Chege', 'Titans', 6, 1),
    ('Finest Brothers', 'The Brotherhood', 3, 0),
    ('Losti City', 'Super Strikers', 1, 1),
    ('Allies', 'Raptors', 3, 1),
    ('The Villagers', 'Losti City', 2, 1),
    ('Ronavics', 'Kawaago', 0, 2),
    ('The Brotherhood', "Godfather's", 3, 1),
    ('COVID Boys', 'Raptors', 3, 0),
    ('Allies', 'Kawaago', 3, 1),
    ('The Villagers', "Godfather's", 7, 2),
    ('Club de Chege', 'Top Bins', 2, 2),
    ('Panthers', 'COVID Boys', 6, 0),
    ('Ronavics', "Godfather's", 0, 3),
    ('Panthers', 'Top Bins', 2, 1),
    ('Titans', 'Allies', 1, 2),
    ('Losti City', 'Finest Brothers', 3, 3),

    # Additional matches to complete table
    ('Finest Brothers', 'Legends', 2, 0),
    ('Finest Brothers', 'Top Bins', 2, 1),
    ('Panthers', 'Legends', 5, 0),
    ('Panthers', 'Raptors', 4, 1),
    ('The Villagers', 'Panthers', 3, 1),
    ('Pundits', 'Panthers', 5, 0),
    ('Ronavics', 'Legends', 2, 0),
    ('The Villagers', 'Pundits', 2, 0),
    ('Losti City', 'Pundits', 5, 0),
    ('The Villagers', 'Legends', 4, 0),
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

print("="*100)
print(f"{'Team':<20} {'P':>2} {'W':>2} {'D':>2} {'L':>2} {'GD':>4} {'Pts':>3} | {'Target':>2} {'W':>2} {'D':>2} {'L':>2} {'GD':>4} {'Pts':>3} | Status")
print("="*100)

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
            issues.append(f"{k}:{s[k]}≠{o[k]}")

    if s['GD'] != o['GD']:
        issues.append(f"GD:{s['GD']:+d}≠{o['GD']:+d}")

    status = "✅" if not issues else "❌ " + ", ".join(issues)
    print(f"{team:<20} {s['P']:>2} {s['W']:>2} {s['D']:>2} {s['L']:>2} {s['GD']:>+4} {s['Pts']:>3} | {o['P']:>2} {o['W']:>2} {o['D']:>2} {o['L']:>2} {o['GD']:>+4} {o['Pts']:>3} | {status}")

    if issues:
        errors.append(f"{team}: {', '.join(issues)}")
    else:
        correct += 1

print("="*100)
print(f"Total matches: {len(matches)}")
print(f"Correct: {correct}/{len(official)}")
