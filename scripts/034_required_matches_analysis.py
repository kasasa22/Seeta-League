#!/usr/bin/env python3
"""
Determine exactly what matches are needed to produce the official table
Working backwards from the official standings for 17 teams only
"""

# Official standings (17 teams total)
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

print("=" * 80)
print("OFFICIAL TABLE - 17 TEAMS")
print("=" * 80)
print(f"{'Team':<20} {'P':>3} {'W':>3} {'D':>3} {'L':>3} {'GF':>4} {'GA':>4} {'GD':>4} {'Pts':>4}")
print("-" * 80)

for i, (team, stats) in enumerate(official.items(), 1):
    gd = stats['gf'] - stats['ga']
    print(f"{i:>2}. {team:<17} {stats['p']:>3} {stats['w']:>3} {stats['d']:>3} {stats['l']:>3} "
          f"{stats['gf']:>4} {stats['ga']:>4} {gd:>4} {stats['pts']:>4}")

total_matches = sum(s['p'] for s in official.values()) // 2
total_goals = sum(s['gf'] for s in official.values())

print("\n" + "=" * 80)
print(f"Total matches played: {total_matches}")
print(f"Total goals scored: {total_goals}")
print("=" * 80)

print("\n" + "=" * 80)
print("KEY OBSERVATIONS")
print("=" * 80)

print("\n1. LEGENDS (5 matches, all losses, 0-0 goals)")
print("   - This means Legends lost 5 matches where they scored 0 and conceded 0")
print("   - This is IMPOSSIBLE in real football!")
print("   - Either:")
print("     a) Legends forfeited 5 matches (counted as 0-0 losses)")
print("     b) The table is incorrect")
print("     c) 'Legends' is a placeholder for teams that withdrew")

print("\n2. FINEST BROTHERS (6 matches, 5W 1D, GF=11 GA=5)")
print("   - Current fixtures have 4 matches with correct goals (GF=11, GA=5)")
print("   - Need 2 MORE WINS with 0 goals for/against")
print("   - This suggests 2 matches vs LEGENDS (if Legends forfeited)")
print("   - Finest Brothers 0-0 Legends (forfeit win) x2")

print("\n3. PANTHERS (6 matches, 4W 2L, GF=8 GA=1)")
print("   - Current fixtures have 2 matches (2W, GF=8, GA=1)")
print("   - Need 4 MORE matches (2W, 2L, 0 goals for/against)")
print("   - This also suggests matches vs LEGENDS")
print("   - Panthers 0-0 Legends (forfeit win) x2")
print("   - Panthers 0-0 Legends (forfeit loss) x2 - WAIT, this doesn't make sense!")
print("   - OR: Panthers played other matches not in the images")

print("\n4. Match count check:")
total_played = {}
for team, stats in official.items():
    total_played[team] = stats['p']

print("   Teams by matches played:")
for matches in sorted(set(total_played.values()), reverse=True):
    teams = [t for t, p in total_played.items() if p == matches]
    print(f"   - {matches} matches: {len(teams)} teams: {', '.join(teams)}")

print("\n5. SOFT LYF in current fixtures:")
print("   - Soft Lyf appears in Match Day 1: Lost to Losti City 1-6")
print("   - Soft Lyf is NOT in the official table")
print("   - Most likely: 'Soft Lyf' should be 'Legends'")
print("   - But Legends should have 0-0 goals in ALL matches!")

print("\n" + "=" * 80)
print("CONCLUSION")
print("=" * 80)
print("The official table appears to have inconsistencies:")
print("1. Legends with 5 losses and 0-0 goals is impossible unless all forfeits")
print("2. Finest Brothers and Panthers missing matches with 0-0 scorelines")
print("3. If Legends = Soft Lyf, then Legends should have GF=1 GA=6, not 0-0")
print()
print("RECOMMENDATION:")
print("Ask the user to verify:")
print("1. Is 'Legends' correct in the official table?")
print("2. Did Legends forfeit all their matches?")
print("3. Are there additional handwritten match images we haven't seen?")
print("4. Should 'Soft Lyf' be renamed to 'Legends' with corrected stats?")
