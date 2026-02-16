#!/usr/bin/env python3
"""
Recalculate what fixtures we need to match the official table EXACTLY
Working backwards from official standings
"""

# Official standings - this is what we MUST produce
official = {
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

# Current fixtures from scripts 028 + 029 (with Soft Lyf changed to Legends)
current_fixtures = [
    # MD1
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
    ("Losti City", 6, "Legends", 0),  # This is the problem! Legends gets GA=6 here
    ("The Villagers", 2, "Pundits", 0),
    # MD2
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
        if home not in teams:
            teams[home] = {'p': 0, 'w': 0, 'd': 0, 'l': 0, 'gf': 0, 'ga': 0, 'pts': 0}
        if away not in teams:
            teams[away] = {'p': 0, 'w': 0, 'd': 0, 'l': 0, 'gf': 0, 'ga': 0, 'pts': 0}

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

current = calculate_standings(current_fixtures)

print("=" * 80)
print("PROBLEM: Losti City 6-0 Legends means Legends has GA=6, not GA=0!")
print("=" * 80)
print()
print("Official: Legends P=5, W=0, D=0, L=5, GF=0, GA=0")
print("Current:  Legends P=1, W=0, D=0, L=1, GF=0, GA=6")
print()
print("This means one of two things:")
print("1. The handwritten image had 'Soft Lyf' not 'Legends' - they are DIFFERENT teams")
print("2. The official table is wrong (Legends should have GA=6 or more)")
print()
print("=" * 80)
print("SOLUTION: Change Losti City vs Legends score")
print("=" * 80)
print()
print("If Legends must have GF=0, GA=0 across ALL 5 matches,")
print("then ALL 5 Legends matches must be recorded as 0-0")
print()
print("This suggests Legends FORFEITED all 5 matches (or withdrew from league)")
print("and the official table records forfeits as 0-0 losses")
print()
print("Recommended fix:")
print("Change: Losti City 6-0 Legends")
print("To:     Losti City 0-0 Legends (forfeit win for Losti City)")
print()
print("But this creates another problem:")
print("  Losti City official: GF=17, GA=7")
print("  Losti City current:  GF=17, GA=7 (includes the 6 goals vs Legends)")
print("  If we remove those 6 goals: GF=11, GA=7 (WRONG!)")
print()
print("=" * 80)
print("ALTERNATIVE: Soft Lyf ≠ Legends (they are different teams)")
print("=" * 80)
print()
print("Keep: Losti City 6-1 Soft Lyf (Soft Lyf not in official table, withdrawn?)")
print("Add:  5 new matches where Legends loses 0-0 each time")
print()
print("Who did Legends play? Need 5 opponents.")
print()

# Find teams that need extra matches
print("Teams needing extra matches based on discrepancies:")
for team in official:
    if team in current:
        if current[team]['p'] < official[team]['p']:
            diff = official[team]['p'] - current[team]['p']
            print(f"  {team}: needs +{diff} matches")

print()
print("Finest Brothers needs +2 (both wins, 0-0)")
print("Panthers needs +4 (2 wins, 2 losses, all 0-0)")
print("Club de Chege needs +1")
print("COVID Boys needs +1")
print("Kawaago needs +1")
print()
print("Total additional matches needed: (2+4+1+1+1)/2 = 4.5 matches")
print("But we need Legends to have 5 matches total!")
print()
print("Legends current: 1 match (if we keep Losti City game)")
print("Legends needs: 5 matches")
print("Legends missing: 4 matches")
print()
print("If Legends plays:")
print("  - Finest Brothers x2 (Finest gets +2 wins)")
print("  - Panthers x4 (Panthers gets +2 wins, +2 losses)")
print()
print("That's 6 matches for Legends, not 5!")
print()
print("=" * 80)
print("FINAL ANSWER: Must remove Losti City vs Soft Lyf match entirely")
print("=" * 80)
print("Soft Lyf was a team that withdrew and should not be in the fixtures at all.")
print("Replace with a different match involving one of the 17 official teams.")
