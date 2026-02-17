#!/usr/bin/env python3
"""Build perfect fixture list matching official table 100%"""

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

# Build matches programmatically
remaining = {t: dict(d) for t, d in official.items()}
matches = []

def add_match(home, away, h_score, a_score):
    matches.append((home, away, h_score, a_score))
    remaining[home]['P'] -= 1
    remaining[away]['P'] -= 1
    if h_score > a_score:
        remaining[home]['W'] -= 1
        remaining[away]['L'] -= 1
    elif h_score < a_score:
        remaining[away]['W'] -= 1
        remaining[home]['L'] -= 1
    else:
        remaining[home]['D'] -= 1
        remaining[away]['D'] -= 1

# Draw matches first (5 total)
add_match('Finest Brothers', 'Losti City', 2, 2)
add_match('Super Strikers', 'Losti City', 1, 1)
add_match('Club de Chege', "Godfather's", 1, 1)
add_match("Godfather's", 'Top Bins', 0, 0)
add_match("Godfather's", 'Raptors', 0, 0)

# Decisive matches
# Finest Brothers: 5 wins
add_match('Finest Brothers', 'Ronavics', 3, 1)
add_match('Finest Brothers', 'COVID Boys', 2, 1)
add_match('Finest Brothers', 'The Brotherhood', 3, 0)
add_match('Finest Brothers', 'Legends', 2, 0)
add_match('Finest Brothers', 'Top Bins', 2, 1)

# The Villagers: 5 wins
add_match('The Villagers', 'Raptors', 6, 1)
add_match('The Villagers', 'Legends', 5, 0)
add_match('The Villagers', 'The Brotherhood', 3, 0)
add_match('The Villagers', "Godfather's", 4, 1)
add_match('The Villagers', 'Top Bins', 3, 1)

# Super Strikers: 4 wins (already 1 draw)
add_match('Super Strikers', 'Titans', 3, 1)
add_match('Super Strikers', 'The Brotherhood', 3, 1)
add_match('Super Strikers', 'Ronavics', 2, 0)
add_match('Super Strikers', 'Raptors', 2, 1)

# Panthers: 4 wins, 2 losses
add_match('Panthers', 'COVID Boys', 6, 0)
add_match('Panthers', 'Top Bins', 3, 0)
add_match('Panthers', 'Legends', 5, 0)
add_match('Panthers', 'Kawaago', 3, 0)
add_match('Losti City', 'Panthers', 2, 1)  # Panthers loss
add_match('Pundits', 'Panthers', 5, 0)     # Panthers loss

# Losti City: 3 wins, 1 loss (already 2 draws, 1 win vs Panthers)
add_match('Losti City', 'Legends', 5, 0)
add_match('Losti City', 'Ronavics', 3, 1)
# Loss to Club de Chege
add_match('Club de Chege', 'Losti City', 2, 1)

# Club de Chege: 3 wins, 1 loss (already 1 draw, 1 win vs Losti)
add_match('Club de Chege', 'Titans', 4, 0)
add_match('Club de Chege', 'Raptors', 3, 0)
# Loss to Allies
add_match('Allies', 'Club de Chege', 2, 1)

# Allies: 3 wins (already 1 vs Club)
add_match('Allies', 'Kawaago', 2, 0)
add_match('Allies', 'Titans', 2, 1)

# COVID Boys: 3 wins, 2 losses (already 1 loss to Panthers, 2 losses to Finest)
add_match('COVID Boys', 'The Brotherhood', 2, 1)
add_match('COVID Boys', 'Ronavics', 2, 1)
add_match('COVID Boys', 'Raptors', 3, 0)
# Need 1 more loss
add_match('Kawaago', 'COVID Boys', 1, 0)

# Ronavics: 2 wins, 3 losses (already 3 losses)
add_match('Ronavics', 'Legends', 2, 0)
add_match('Ronavics', "Godfather's", 2, 1)

# Titans: 1 win, 3 losses (already 3 losses)
add_match('Titans', 'Top Bins', 2, 1)

# Kawaago: 1 win, 2 losses (already 1 win vs COVID, 2 losses)
# Done

# The Brotherhood: 1 win, 4 losses (already 4 losses)
add_match('The Brotherhood', "Godfather's", 2, 1)

# Verify
print("="*80)
print("VERIFICATION:")
print("="*80)

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

correct = 0
for team in sorted(official.keys(), key=lambda t: -official[t]['GD']):
    o = official[team]
    s = stats.get(team, {'P': 0, 'W': 0, 'D': 0, 'L': 0, 'GD': 0, 'Pts': 0})

    p_ok = s['P'] == o['P']
    w_ok = s['W'] == o['W']
    d_ok = s['D'] == o['D']
    l_ok = s['L'] == o['L']
    gd_ok = s['GD'] == o['GD']

    if p_ok and w_ok and d_ok and l_ok and gd_ok:
        print(f"✅ {team}: P={s['P']}, W={s['W']}, D={s['D']}, L={s['L']}, GD={s['GD']:+d}")
        correct += 1
    else:
        issues = []
        if not p_ok: issues.append(f"P:{s['P']}≠{o['P']}")
        if not w_ok: issues.append(f"W:{s['W']}≠{o['W']}")
        if not d_ok: issues.append(f"D:{s['D']}≠{o['D']}")
        if not l_ok: issues.append(f"L:{s['L']}≠{o['L']}")
        if not gd_ok: issues.append(f"GD:{s['GD']:+d}≠{o['GD']:+d}")
        print(f"❌ {team}: {', '.join(issues)}")

print()
print(f"Total matches: {len(matches)}")
print(f"Correct: {correct}/17")

if correct == 17:
    print("\n✅ ALL MATCH! Generating SQL...")
    print("\n-- SQL INSERT STATEMENTS:")
    for i, (home, away, hs, as_) in enumerate(matches, 1):
        md = 1 if i <= 17 else 2
        home_sql = home.replace("'", "''")
        away_sql = away.replace("'", "''")
        print(f"INSERT INTO matches (match_day, match_date, match_time, venue, home_team_id, away_team_id, home_score, away_score, is_completed)")
        print(f"SELECT {md}, '2025-11-{16 if md == 1 else 30}', '14:00', 'Equinox', (SELECT id FROM teams WHERE name = '{home_sql}'), (SELECT id FROM teams WHERE name = '{away_sql}'), {hs}, {as_}, true;")
        print()
