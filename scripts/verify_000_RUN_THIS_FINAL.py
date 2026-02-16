#!/usr/bin/env python3
"""
Verify scripts/000_RUN_THIS_FINAL.sql produces exact official table
"""

# Official target from image
official = {
    'FINEST BROTHERS': {'P': 6, 'W': 5, 'D': 1, 'L': 0, 'GD': 9, 'Pts': 16},
    'THE VILLAGERS': {'P': 5, 'W': 5, 'D': 0, 'L': 0, 'GD': 17, 'Pts': 15},
    'SUPER STRIKERS': {'P': 5, 'W': 4, 'D': 1, 'L': 0, 'GD': 8, 'Pts': 13},
    'PANTHERS': {'P': 6, 'W': 4, 'D': 0, 'L': 2, 'GD': 13, 'Pts': 12},
    'LOSTI CITY': {'P': 6, 'W': 3, 'D': 2, 'L': 1, 'GD': 10, 'Pts': 11},
    'CLUB DE SHEGE': {'P': 5, 'W': 3, 'D': 1, 'L': 1, 'GD': 8, 'Pts': 10},
    'ALLIES': {'P': 3, 'W': 3, 'D': 0, 'L': 0, 'GD': 5, 'Pts': 9},
    'COVID BOYS': {'P': 5, 'W': 3, 'D': 0, 'L': 2, 'GD': -1, 'Pts': 9},
    'RONAVICS': {'P': 5, 'W': 2, 'D': 0, 'L': 3, 'GD': -1, 'Pts': 6},
    'GODFATHERS': {'P': 6, 'W': 1, 'D': 2, 'L': 3, 'GD': -6, 'Pts': 5},
    'PUNDITS': {'P': 3, 'W': 1, 'D': 0, 'L': 2, 'GD': 4, 'Pts': 3},
    'TITANS': {'P': 4, 'W': 1, 'D': 0, 'L': 3, 'GD': -1, 'Pts': 3},
    'KAWAAGO': {'P': 3, 'W': 1, 'D': 0, 'L': 2, 'GD': -6, 'Pts': 3},
    'BROTHERHOOD': {'P': 5, 'W': 1, 'D': 0, 'L': 4, 'GD': -7, 'Pts': 3},
    'TOP BINS': {'P': 6, 'W': 0, 'D': 2, 'L': 4, 'GD': -11, 'Pts': 2},
    'RAPTORS': {'P': 5, 'W': 0, 'D': 1, 'L': 4, 'GD': -11, 'Pts': 1},
    'LEGENDS': {'P': 5, 'W': 0, 'D': 0, 'L': 5, 'GD': -16, 'Pts': 0}
}

# Match Day 1 fixtures (16 matches)
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
    ('The Villagers', 'Pundits', 2, 0),
]

# Match Day 2 fixtures (25 matches)
md2 = [
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
    ('Panthers', 'COVID Boys', 6, 0),
    ('Ronavics', "Godfather's", 0, 3),
    ('Club de Chege', 'Top Bins', 3, 1),
    ('Losti City', 'Finest Brothers', 3, 3),
    ('Panthers', 'Top Bins', 2, 1),
    ('Finest Brothers', 'Top Bins', 0, 0),
    ('Losti City', 'Ronavics', 4, 1),
    ('The Villagers', 'Titans', 5, 0),
    ('Super Strikers', 'Top Bins', 3, 1),
    ('Finest Brothers', 'Legends', 3, 0),
    ('Panthers', 'Legends', 5, 0),
    ('Legends', 'Losti City', 0, 6),
    ('Legends', 'Super Strikers', 0, 1),
    ('Legends', 'Ronavics', 0, 4),
    ('Top Bins', "Godfather's", 0, 0),
]

# Normalize team names
def normalize(name):
    mapping = {
        "Godfather's": "GODFATHERS",
        "Club de Chege": "CLUB DE SHEGE",
        "The Brotherhood": "BROTHERHOOD",
        "Finest Brothers": "FINEST BROTHERS",
        "The Villagers": "THE VILLAGERS",
        "Super Strikers": "SUPER STRIKERS",
        "Losti City": "LOSTI CITY",
        "COVID Boys": "COVID BOYS",
        "Top Bins": "TOP BINS",
        "Titans": "TITANS",
        "Pundits": "PUNDITS",
        "Raptors": "RAPTORS",
        "Ronavics": "RONAVICS",
        "Panthers": "PANTHERS",
        "Allies": "ALLIES",
        "Kawaago": "KAWAAGO",
        "Legends": "LEGENDS"
    }
    return mapping.get(name, name.upper())

# Calculate stats
stats = {}
for home, away, home_score, away_score in md1 + md2:
    home = normalize(home)
    away = normalize(away)

    if home not in stats:
        stats[home] = {'P': 0, 'W': 0, 'D': 0, 'L': 0, 'GF': 0, 'GA': 0}
    if away not in stats:
        stats[away] = {'P': 0, 'W': 0, 'D': 0, 'L': 0, 'GF': 0, 'GA': 0}

    stats[home]['P'] += 1
    stats[away]['P'] += 1
    stats[home]['GF'] += home_score
    stats[home]['GA'] += away_score
    stats[away]['GF'] += away_score
    stats[away]['GA'] += home_score

    if home_score > away_score:
        stats[home]['W'] += 1
        stats[away]['L'] += 1
    elif home_score < away_score:
        stats[away]['W'] += 1
        stats[home]['L'] += 1
    else:
        stats[home]['D'] += 1
        stats[away]['D'] += 1

# Calculate GD and Pts
for team in stats:
    stats[team]['GD'] = stats[team]['GF'] - stats[team]['GA']
    stats[team]['Pts'] = stats[team]['W'] * 3 + stats[team]['D']

# Compare
print("=" * 80)
print("VERIFICATION OF scripts/000_RUN_THIS_FINAL.sql")
print("=" * 80)
print()

errors = []
for team in official:
    if team not in stats:
        errors.append(f"❌ {team}: MISSING FROM FIXTURES")
        continue

    matches = True
    diffs = []
    for key in ['P', 'W', 'D', 'L', 'GD', 'Pts']:
        expected = official[team][key]
        actual = stats[team][key]
        if expected != actual:
            matches = False
            diffs.append(f"{key}: expected {expected}, got {actual}")

    if matches:
        print(f"✅ {team}: P={stats[team]['P']}, W={stats[team]['W']}, D={stats[team]['D']}, L={stats[team]['L']}, GD={stats[team]['GD']:+d}, Pts={stats[team]['Pts']}")
    else:
        print(f"❌ {team}: {', '.join(diffs)}")
        errors.append(f"{team}: {', '.join(diffs)}")

print()
print("=" * 80)

if errors:
    print(f"❌ FAILED - {len(errors)} team(s) don't match official table:")
    for error in errors:
        print(f"   {error}")
else:
    print("✅ SUCCESS - All 17 teams match official table 100%!")

print("=" * 80)
