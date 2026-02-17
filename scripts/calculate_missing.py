#!/usr/bin/env python3
"""Calculate exactly what matches are missing to reach official table"""

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

# Match Day 1 from script 027
md1 = [
    ('Titans', 'Super Strikers', 1, 3),
    ("Godfather's", 'Raptors', 0, 0),
    ('The Brotherhood', 'COVID Boys', 1, 2),
    ('Pundits', 'Losti City', 0, 5),
    ('Club de Chege', 'The Brotherhood', 3, 0),
    ('Finest Brothers', 'Ronavics', 3, 1),
    ('Titans', 'Pundits', 1, 2),
    ('Club de Chege', 'Losti City', 0, 1),
    ('Ronavics', 'Raptors', 5, 0),
    ('Finest Brothers', 'COVID Boys', 2, 1),
    ('Top Bins', 'Super Strikers', 1, 4),
    ("Godfather's", 'COVID Boys', 1, 3),
    ('The Villagers', 'Raptors', 9, 1),
    ("Godfather's", 'Top Bins', 0, 0),
    ('Super Strikers', 'The Brotherhood', 3, 1),
    ('Losti City', 'Legends', 6, 1),
    ('The Villagers', 'Pundits', 2, 0),
]

# Match Day 2 from images
md2 = [
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
    ('The Villagers', 'Raptors', 3, 1),  # This gives Villagers GD=+18 and Raptors P=6
    ('Kawaago', 'Pundits', 1, 7),  # Pundits WIN here
    ('Panthers', 'COVID Boys', 6, 0),
    ('Ronavics', "Godfather's", 0, 3),
    ('The Villagers', "Godfather's", 7, 2),
    ('Club de Chege', 'Top Bins', 2, 2),
    ('Pundits', 'Super Strikers', 0, 1),
    ('Panthers', 'Top Bins', 2, 1),
    ('Titans', 'Allies', 1, 2),
    ('Losti City', 'Finest Brothers', 3, 3),
    ('Club de Chege', 'Pundits', 1, 0),
]

matches = md1 + md2

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

print("="*80)
print("CURRENT vs OFFICIAL - What's missing:")
print("="*80)

missing_games = {}
for team in official:
    if team not in stats:
        stats[team] = {'P': 0, 'W': 0, 'D': 0, 'L': 0, 'GF': 0, 'GA': 0, 'GD': 0}

    o = official[team]
    s = stats[team]

    dp = o['P'] - s['P']
    dw = o['W'] - s['W']
    dd = o['D'] - s['D']
    dl = o['L'] - s['L']
    dgd = o['GD'] - s['GD']

    if dp != 0 or dw != 0 or dd != 0 or dl != 0 or dgd != 0:
        print(f"{team}:")
        print(f"  Current: P={s['P']}, W={s['W']}, D={s['D']}, L={s['L']}, GD={s['GD']:+d}")
        print(f"  Target:  P={o['P']}, W={o['W']}, D={o['D']}, L={o['L']}, GD={o['GD']:+d}")
        print(f"  Need:    P={dp:+d}, W={dw:+d}, D={dd:+d}, L={dl:+d}, GD={dgd:+d}")
        missing_games[team] = {'dP': dp, 'dW': dw, 'dD': dd, 'dL': dl, 'dGD': dgd}
        print()

print("="*80)
print("ANALYSIS:")
print("="*80)

total_extra_games = sum(max(0, m['dP']) for m in missing_games.values())
total_extra_wins = sum(max(0, m['dW']) for m in missing_games.values())
total_extra_losses = sum(max(0, m['dL']) for m in missing_games.values())

print(f"Teams needing more games: {sum(1 for m in missing_games.values() if m['dP'] > 0)}")
print(f"Teams with too many games: {sum(1 for m in missing_games.values() if m['dP'] < 0)}")
print(f"Extra wins needed: {total_extra_wins}")
print(f"Extra losses needed: {total_extra_losses}")

# The Pundits problem: they have too many games (6 vs 3 needed)
# This means some of the MD2 image data might be wrong or misread
# Looking at image: Kawaago 1-7 Pundits shows Pundits winning
# But official shows Pundits P=3, W=1, so only 1 win and 3 total games

print("\n" + "="*80)
print("PUNDITS ISSUE:")
print("="*80)
print("Official: P=3, W=1, L=2 (3 games total)")
print("Current matches involving Pundits:")
pundits_matches = [(h, a, hs, as_) for h, a, hs, as_ in matches if 'Pundits' in [h, a]]
for h, a, hs, as_ in pundits_matches:
    result = "W" if (h == 'Pundits' and hs > as_) or (a == 'Pundits' and as_ > hs) else "L" if (h == 'Pundits' and hs < as_) or (a == 'Pundits' and as_ < hs) else "D"
    print(f"  {h} {hs}-{as_} {a} -> Pundits {result}")

# The issue is that Kawaago 1-7 Pundits is listed but the official table doesn't match
# Let's check what actually makes sense:
# Looking at the image carefully: It shows "KAWAAGO 1-7 PUNDITS"
# This would give Pundits a WIN with +6 GD, not matching official GD=+4

print("\n" + "="*80)
print("The Villagers 3-1 Raptors (MD2 match 11) gives:")
print("  - Villagers: 6th game (target is 5)")
print("  - Raptors: 6th game (target is 5)")
print("This match may be a duplicate or error in the image data")
