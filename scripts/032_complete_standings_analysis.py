#!/usr/bin/env python3
"""
Analyze all fixtures from scripts 028 and 029 to calculate current standings
Compare against official table to identify missing matches
"""

# Match Day 1 fixtures from script 028
md1_fixtures = [
    ("Titans", 1, "Super Strikers", 3),
    ("Godfather's", 0, "Raptors", 0),
    ("The Brotherhood", 1, "COVID Boys", 2),
    ("Pundits", 0, "Losti City", 5),
    ("Club de Chege", 3, "The Brotherhood", 0),
    ("Finest Brothers", 3, "Ronavics", 1),
    ("Titans", 1, "Pundits", 2),
    ("Club de Chege", 0, "Losti City", 1),
    ("Ronavics", 5, "Raptors", 0),
    ("Finest Brothers", 2, "COVID Boys", 1),
    ("Top Bins", 1, "Super Strikers", 4),
    ("Godfather's", 1, "COVID Boys", 3),
    ("The Villagers", 9, "Raptors", 1),
    ("Godfather's", 0, "Top Bins", 0),
    ("Super Strikers", 3, "The Brotherhood", 1),
    ("Losti City", 6, "Soft Lyf", 1),
    ("The Villagers", 2, "Pundits", 0),
]

# Match Day 2 fixtures from script 029
md2_fixtures = [
    ("Titans", 3, "Top Bins", 0),
    ("Club de Chege", 6, "Titans", 1),
    ("Finest Brothers", 3, "The Brotherhood", 0),
    ("Losti City", 1, "Super Strikers", 1),
    ("Allies", 3, "Raptors", 1),
    ("The Villagers", 2, "Losti City", 1),
    ("Ronavics", 0, "Kawaago", 2),
    ("The Brotherhood", 3, "Godfather's", 1),
    ("COVID Boys", 3, "Raptors", 0),
    ("Allies", 3, "Kawaago", 1),
    ("The Villagers", 3, "Raptors", 1),
    ("Kawaago", 1, "Pundits", 7),
    ("Panthers", 6, "COVID Boys", 0),
    ("Ronavics", 0, "Godfather's", 3),
    ("The Villagers", 7, "Godfather's", 2),
    ("Club de Chege", 2, "Top Bins", 2),
    ("Pundits", 0, "Super Strikers", 1),
    ("Panthers", 2, "Top Bins", 1),
    ("Titans", 1, "Allies", 2),
    ("Losti City", 3, "Finest Brothers", 3),
    ("Club de Chege", 1, "Pundits", 0),
]

def calculate_standings(fixtures):
    """Calculate standings from fixtures"""
    teams = {}

    for home, home_score, away, away_score in fixtures:
        # Initialize teams if not seen before
        if home not in teams:
            teams[home] = {'p': 0, 'w': 0, 'd': 0, 'l': 0, 'gf': 0, 'ga': 0, 'pts': 0}
        if away not in teams:
            teams[away] = {'p': 0, 'w': 0, 'd': 0, 'l': 0, 'gf': 0, 'ga': 0, 'pts': 0}

        # Update stats
        teams[home]['p'] += 1
        teams[away]['p'] += 1
        teams[home]['gf'] += home_score
        teams[home]['ga'] += away_score
        teams[away]['gf'] += away_score
        teams[away]['ga'] += home_score

        if home_score > away_score:
            teams[home]['w'] += 1
            teams[home]['pts'] += 3
            teams[away]['l'] += 1
        elif home_score < away_score:
            teams[away]['w'] += 1
            teams[away]['pts'] += 3
            teams[home]['l'] += 1
        else:
            teams[home]['d'] += 1
            teams[home]['pts'] += 1
            teams[away]['d'] += 1
            teams[away]['pts'] += 1

    return teams

# Calculate combined standings
all_fixtures = md1_fixtures + md2_fixtures
current_standings = calculate_standings(all_fixtures)

# Official standings from the image
official_standings = {
    "Finest Brothers": {'p': 6, 'w': 5, 'd': 1, 'l': 0, 'gf': 11, 'ga': 5, 'pts': 16},
    "The Villagers": {'p': 5, 'w': 5, 'd': 0, 'l': 0, 'gf': 23, 'ga': 5, 'pts': 15},
    "Super Strikers": {'p': 5, 'w': 4, 'd': 1, 'l': 0, 'gf': 12, 'ga': 4, 'pts': 13},
    "Panthers": {'p': 6, 'w': 4, 'd': 0, 'l': 2, 'gf': 8, 'ga': 1, 'pts': 12},
    "Losti City": {'p': 6, 'w': 3, 'd': 2, 'l': 1, 'gf': 17, 'ga': 7, 'pts': 11},
    "Club de Chege": {'p': 6, 'w': 3, 'd': 1, 'l': 2, 'gf': 15, 'ga': 7, 'pts': 10},
    "Pundits": {'p': 6, 'w': 3, 'd': 0, 'l': 3, 'gf': 9, 'ga': 9, 'pts': 9},
    "COVID Boys": {'p': 6, 'w': 3, 'd': 0, 'l': 3, 'gf': 9, 'ga': 13, 'pts': 9},
    "Allies": {'p': 3, 'w': 3, 'd': 0, 'l': 0, 'gf': 8, 'ga': 3, 'pts': 9},
    "Godfather's": {'p': 6, 'w': 1, 'd': 2, 'l': 3, 'gf': 5, 'ga': 13, 'pts': 5},
    "Titans": {'p': 5, 'w': 1, 'd': 0, 'l': 4, 'gf': 7, 'ga': 11, 'pts': 3},
    "The Brotherhood": {'p': 5, 'w': 1, 'd': 0, 'l': 4, 'gf': 6, 'ga': 11, 'pts': 3},
    "Ronavics": {'p': 4, 'w': 1, 'd': 0, 'l': 3, 'gf': 6, 'ga': 11, 'pts': 3},
    "Kawaago": {'p': 4, 'w': 1, 'd': 0, 'l': 3, 'gf': 5, 'ga': 13, 'pts': 3},
    "Raptors": {'p': 6, 'w': 0, 'd': 1, 'l': 5, 'gf': 4, 'ga': 20, 'pts': 1},
    "Top Bins": {'p': 5, 'w': 0, 'd': 1, 'l': 4, 'gf': 4, 'ga': 10, 'pts': 1},
    "Legends": {'p': 5, 'w': 0, 'd': 0, 'l': 5, 'gf': 0, 'ga': 0, 'pts': 0},
}

print("=" * 100)
print("CURRENT STANDINGS FROM SCRIPTS 028 + 029")
print("=" * 100)
print(f"{'Team':<20} {'P':>3} {'W':>3} {'D':>3} {'L':>3} {'GF':>4} {'GA':>4} {'GD':>4} {'Pts':>4}")
print("-" * 100)

sorted_teams = sorted(current_standings.items(),
                     key=lambda x: (x[1]['pts'], x[1]['gf'] - x[1]['ga'], x[1]['gf']),
                     reverse=True)

for team, stats in sorted_teams:
    gd = stats['gf'] - stats['ga']
    print(f"{team:<20} {stats['p']:>3} {stats['w']:>3} {stats['d']:>3} {stats['l']:>3} "
          f"{stats['gf']:>4} {stats['ga']:>4} {gd:>4} {stats['pts']:>4}")

print("\n" + "=" * 100)
print("DISCREPANCIES (Current vs Official)")
print("=" * 100)
print(f"{'Team':<20} {'Stat':<5} {'Current':>8} {'Official':>8} {'Diff':>6}")
print("-" * 100)

for team in official_standings:
    if team in current_standings:
        curr = current_standings[team]
        off = official_standings[team]

        if curr != off:
            for stat in ['p', 'w', 'd', 'l', 'gf', 'ga', 'pts']:
                if curr[stat] != off[stat]:
                    diff = curr[stat] - off[stat]
                    print(f"{team:<20} {stat.upper():<5} {curr[stat]:>8} {off[stat]:>8} {diff:>6}")
    else:
        print(f"{team:<20} {'MISSING - not in current fixtures'}")

print("\n" + "=" * 100)
print("TEAMS IN CURRENT BUT NOT IN OFFICIAL")
print("=" * 100)
for team in current_standings:
    if team not in official_standings:
        print(f"  - {team}")

print("\n" + "=" * 100)
print("DETAILED MATCH ANALYSIS FOR FINEST BROTHERS")
print("=" * 100)
print("\nMatch Day 1:")
for i, (home, hs, away, as_) in enumerate(md1_fixtures, 1):
    if "Finest Brothers" in [home, away]:
        print(f"  Match {i}: {home} {hs}-{as_} {away}")

print("\nMatch Day 2:")
for i, (home, hs, away, as_) in enumerate(md2_fixtures, 1):
    if "Finest Brothers" in [home, away]:
        print(f"  Match {i}: {home} {hs}-{as_} {away}")

fb_current = current_standings.get("Finest Brothers", {})
fb_official = official_standings["Finest Brothers"]
print(f"\nFinest Brothers Current:  P={fb_current.get('p', 0)}, W={fb_current.get('w', 0)}, "
      f"D={fb_current.get('d', 0)}, L={fb_current.get('l', 0)}, "
      f"GF={fb_current.get('gf', 0)}, GA={fb_current.get('ga', 0)}, Pts={fb_current.get('pts', 0)}")
print(f"Finest Brothers Official: P={fb_official['p']}, W={fb_official['w']}, "
      f"D={fb_official['d']}, L={fb_official['l']}, "
      f"GF={fb_official['gf']}, GA={fb_official['ga']}, Pts={fb_official['pts']}")
print(f"\nMissing: {fb_official['p'] - fb_current.get('p', 0)} matches, "
      f"{fb_official['w'] - fb_current.get('w', 0)} wins needed")
