#!/usr/bin/env python3
"""Verify FINAL_SEED.sql"""

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

matches = [
    # Draws (5)
    ('Finest Brothers', 'Losti City', 2, 2),
    ('Super Strikers', 'Losti City', 1, 1),
    ('Club de Chege', "Godfather's", 1, 1),
    ('Top Bins', "Godfather's", 0, 0),
    ('Top Bins', 'Raptors', 1, 1),

    # Finest Brothers wins (5)
    ('Finest Brothers', 'Legends', 4, 0),
    ('Finest Brothers', 'Top Bins', 3, 1),
    ('Finest Brothers', "Godfather's", 2, 1),
    ('Finest Brothers', 'The Brotherhood', 2, 0),
    ('Finest Brothers', 'Raptors', 2, 1),

    # The Villagers wins (5)
    ('The Villagers', 'The Brotherhood', 5, 0),
    ('The Villagers', 'Raptors', 4, 1),
    ('The Villagers', 'Titans', 3, 0),
    ('The Villagers', 'Kawaago', 3, 0),
    ('The Villagers', 'Legends', 5, 0),

    # Super Strikers wins (4)
    ('Super Strikers', 'Titans', 3, 1),
    ('Super Strikers', 'Ronavics', 2, 0),
    ('Super Strikers', 'Top Bins', 3, 1),
    ('Super Strikers', 'Legends', 2, 0),

    # Panthers wins (4) and losses (2)
    ('Panthers', 'Top Bins', 5, 0),
    ('Panthers', 'Legends', 6, 0),
    ('Panthers', 'Kawaago', 4, 0),
    ('Panthers', 'Ronavics', 3, 1),
    ('COVID Boys', 'Panthers', 2, 1),  # Panthers loss
    ('Pundits', 'Panthers', 5, 0),      # Panthers loss

    # Losti City wins (3) and loss (1) - already has 2 draws
    ('Losti City', "Godfather's", 4, 1),
    ('Losti City', 'Legends', 5, 0),
    ('Losti City', 'The Brotherhood', 3, 1),
    ('Club de Chege', 'Losti City', 2, 1),  # Losti loss

    # Club de Chege wins (3) and loss (1) - already has 1 draw
    # Win vs Losti already counted above
    ('Club de Chege', 'Titans', 4, 1),
    ('Club de Chege', 'Raptors', 3, 0),
    ('Allies', 'Club de Chege', 2, 1),  # Club loss

    # Allies wins (3)
    # Win vs Club already counted above
    ('Allies', 'Ronavics', 2, 0),
    ('Allies', 'The Brotherhood', 2, 1),

    # COVID Boys wins (3) and losses (2)
    # Win vs Panthers already counted above
    ('COVID Boys', 'Titans', 2, 1),
    ('COVID Boys', 'Kawaago', 2, 1),
    ('Ronavics', 'COVID Boys', 3, 2),  # COVID loss
    ("Godfather's", 'COVID Boys', 2, 1),  # COVID loss

    # Pundits win (1) and losses (2) - win vs Panthers counted
    ('Kawaago', 'Pundits', 1, 0),  # Pundits loss
    ('Titans', 'Pundits', 2, 1),    # Pundits loss

    # Brotherhood win (1) - losses already counted
    ('The Brotherhood', 'Legends', 2, 0),
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

print("="*90)
print(f"{'Team':<20} {'P':>2} {'W':>2} {'D':>2} {'L':>2} {'GD':>4} {'Pts':>3} | {'Target P':>2} {'W':>2} {'D':>2} {'L':>2} {'GD':>4} {'Pts':>3} | Status")
print("="*90)

errors = []
for team in sorted(official.keys(), key=lambda t: -official[t]['Pts']):
    if team not in stats:
        print(f"❌ {team}: MISSING")
        errors.append(team)
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
        errors.append(team)

print("="*90)
print(f"Total matches: {len(matches)}")
print(f"Correct: {len(official) - len(errors)}/{len(official)}")
