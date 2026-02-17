#!/usr/bin/env python3
"""Verify SEED_EXACT_TABLE.sql produces the exact official standings"""

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
    'KAWAGO': {'P': 3, 'W': 1, 'D': 0, 'L': 2, 'GD': -6, 'Pts': 3},
    'BROTHERHOOD': {'P': 5, 'W': 1, 'D': 0, 'L': 4, 'GD': -7, 'Pts': 3},
    'TOP BINS': {'P': 6, 'W': 0, 'D': 2, 'L': 4, 'GD': -11, 'Pts': 2},
    'RAPTORS': {'P': 5, 'W': 0, 'D': 1, 'L': 4, 'GD': -11, 'Pts': 1},
    'LEGENDS': {'P': 5, 'W': 0, 'D': 0, 'L': 5, 'GD': -16, 'Pts': 0},
}

# Matches from SEED_EXACT_TABLE.sql
matches = [
    # Match Day 1 (17 matches)
    ('THE VILLAGERS', 'RAPTORS', 5, 1),
    ('THE VILLAGERS', 'BROTHERHOOD', 4, 0),
    ('SUPER STRIKERS', 'TITANS', 3, 1),
    ('FINEST BROTHERS', 'RONAVICS', 3, 1),
    ('FINEST BROTHERS', 'COVID BOYS', 2, 1),
    ('LOSTI CITY', 'TOP BINS', 3, 0),
    ('CLUB DE SHEGE', 'BROTHERHOOD', 3, 0),
    ('COVID BOYS', 'GODFATHERS', 2, 1),
    ('COVID BOYS', 'RAPTORS', 3, 0),
    ('RONAVICS', 'GODFATHERS', 2, 0),
    ('PUNDITS', 'LEGENDS', 5, 0),
    ('TITANS', 'TOP BINS', 2, 1),
    ('GODFATHERS', 'TOP BINS', 1, 1),
    ('GODFATHERS', 'RAPTORS', 1, 1),
    ('LOSTI CITY', 'FINEST BROTHERS', 2, 2),
    ('SUPER STRIKERS', 'RONAVICS', 2, 0),
    ('BROTHERHOOD', 'RAPTORS', 2, 0),
    # Match Day 2 (24 matches)
    ('THE VILLAGERS', 'TITANS', 4, 1),
    ('THE VILLAGERS', 'KAWAGO', 3, 0),
    ('THE VILLAGERS', 'LEGENDS', 5, 0),
    ('SUPER STRIKERS', 'TOP BINS', 3, 1),
    ('SUPER STRIKERS', 'BROTHERHOOD', 2, 1),
    ('SUPER STRIKERS', 'LOSTI CITY', 1, 1),
    ('PANTHERS', 'TOP BINS', 4, 0),
    ('PANTHERS', 'GODFATHERS', 3, 0),
    ('PANTHERS', 'LEGENDS', 5, 0),
    ('PANTHERS', 'KAWAGO', 3, 1),
    ('FINEST BROTHERS', 'LEGENDS', 2, 0),
    ('FINEST BROTHERS', 'GODFATHERS', 2, 1),
    ('FINEST BROTHERS', 'BROTHERHOOD', 2, 0),
    ('LOSTI CITY', 'LEGENDS', 4, 0),
    ('LOSTI CITY', 'GODFATHERS', 3, 1),
    ('LOSTI CITY', 'CLUB DE SHEGE', 2, 2),
    ('CLUB DE SHEGE', 'TITANS', 3, 0),
    ('CLUB DE SHEGE', 'RAPTORS', 3, 1),
    ('ALLIES', 'RONAVICS', 2, 0),
    ('ALLIES', 'PUNDITS', 2, 1),
    ('ALLIES', 'TOP BINS', 3, 1),
    ('RONAVICS', 'KAWAGO', 3, 2),
    ('PANTHERS', 'PUNDITS', 0, 1),
    ('PANTHERS', 'LOSTI CITY', 0, 1),
]

# Calculate stats
stats = {}
for home, away, home_score, away_score in matches:
    for team in [home, away]:
        if team not in stats:
            stats[team] = {'P': 0, 'W': 0, 'D': 0, 'L': 0, 'GF': 0, 'GA': 0}

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
print("=" * 90)
print("VERIFICATION: SEED_EXACT_TABLE.sql")
print("=" * 90)
print(f"{'Team':<20} {'P':>2} {'W':>2} {'D':>2} {'L':>2} {'GD':>4} {'Pts':>3} | {'Status'}")
print("-" * 90)

errors = []
success = 0
for team in sorted(official.keys(), key=lambda t: -official[t]['Pts']):
    if team not in stats:
        print(f"❌ {team:<20} MISSING FROM FIXTURES")
        errors.append(f"{team}: MISSING")
        continue

    diffs = []
    for key in ['P', 'W', 'D', 'L', 'GD', 'Pts']:
        expected = official[team][key]
        actual = stats[team][key]
        if expected != actual:
            diffs.append(f"{key}={actual}(expected {expected})")

    if diffs:
        print(f"❌ {team:<20} {stats[team]['P']:>2} {stats[team]['W']:>2} {stats[team]['D']:>2} {stats[team]['L']:>2} {stats[team]['GD']:>+4} {stats[team]['Pts']:>3} | {', '.join(diffs)}")
        errors.append(f"{team}: {', '.join(diffs)}")
    else:
        print(f"✅ {team:<20} {stats[team]['P']:>2} {stats[team]['W']:>2} {stats[team]['D']:>2} {stats[team]['L']:>2} {stats[team]['GD']:>+4} {stats[team]['Pts']:>3} | OK")
        success += 1

print("-" * 90)
print(f"Total matches: {len(matches)}")
print(f"Teams matched: {success}/{len(official)}")
print("=" * 90)

if errors:
    print(f"\n❌ ERRORS ({len(errors)}):")
    for e in errors:
        print(f"   • {e}")
else:
    print("\n✅ ALL TEAMS MATCH THE OFFICIAL TABLE 100%!")
