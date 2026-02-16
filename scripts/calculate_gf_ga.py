#!/usr/bin/env python3
"""
Calculate realistic GF/GA that satisfies all constraints
"""

# Official requirements
teams_data = [
    ('FINEST BROTHERS', 6, 5, 1, 0, 9, 16),
    ('THE VILLAGERS', 5, 5, 0, 0, 17, 15),
    ('SUPER STRIKERS', 5, 4, 1, 0, 8, 13),
    ('PANTHERS', 6, 4, 0, 2, 13, 12),
    ('LOSTI CITY', 6, 3, 2, 1, 10, 11),
    ('CLUB DE SHEGE', 5, 3, 1, 1, 8, 10),
    ('ALLIES', 3, 3, 0, 0, 5, 9),
    ('COVID BOYS', 5, 3, 0, 2, -1, 9),
    ('RONAVICS', 5, 2, 0, 3, -1, 6),
    ('GODFATHERS', 6, 1, 2, 3, -6, 5),
    ('PUNDITS', 3, 1, 0, 2, 4, 3),
    ('TITANS', 4, 1, 0, 3, -1, 3),
    ('KAWAAGO', 3, 1, 0, 2, -6, 3),
    ('BROTHERHOOD', 5, 1, 0, 4, -7, 3),
    ('TOP BINS', 6, 0, 2, 4, -11, 2),
    ('RAPTORS', 5, 0, 1, 4, -11, 1),
    ('LEGENDS', 5, 0, 0, 5, -16, 0),
]

print("Manually assigning realistic GF/GA values:")
print("="*90)
print(f"{'Team':<20} {'P':>2} {'W':>2} {'D':>2} {'L':>2} {'GD':>4} {'Pts':>3} | {'GF':>3} {'GA':>3} {'Check':>6}")
print("="*90)

# Manually set realistic GF/GA values
# Need: GF total = GA total, and each team's GF - GA = required GD
# Current: GF=142, GA=128, need to add 14 more GA
# Can only add to teams with losses (increase conceded goals in defeats)
assignments = {
    'FINEST BROTHERS': (13, 4),    # 5W 1D: avg ~2.2 GF, 0.7 GA per game
    'THE VILLAGERS': (20, 3),      # 5W unbeaten: high scoring
    'SUPER STRIKERS': (12, 4),     # 4W 1D unbeaten
    'PANTHERS': (15, 2),           # 4W 2L: strong attack
    'LOSTI CITY': (15, 5),         # 3W 2D 1L: balanced
    'CLUB DE SHEGE': (11, 3),      # 3W 1D 1L
    'ALLIES': (7, 2),              # 3W in 3 games: perfect
    'COVID BOYS': (9, 10),         # 3W 2L: concedes a bit
    'RONAVICS': (7, 8),            # 2W 3L: struggling
    'GODFATHERS': (6, 12),         # 1W 2D 3L: poor
    'PUNDITS': (7, 3),             # 1W 2L in 3 games: decent attack
    'TITANS': (5, 6),              # 1W 3L in 4 games
    'KAWAAGO': (2, 8),             # 1W 2L in 3 games: low scoring
    'BROTHERHOOD': (5, 12),        # 1W 4L: struggling
    'TOP BINS': (4, 15),           # 0W 2D 4L: GD must be -11
    'RAPTORS': (4, 15),            # 0W 1D 4L: GD must be -11
    'LEGENDS': (0, 16),            # 0W 5L: GD must be -16
}

total_gf = 0
total_ga = 0
all_valid = True

for team, p, w, d, l, gd, pts in teams_data:
    gf, ga = assignments[team]
    calculated_gd = gf - ga
    check = "✅" if calculated_gd == gd else f"❌ {calculated_gd}"

    if calculated_gd != gd:
        all_valid = False

    print(f"{team:<20} {p:>2} {w:>2} {d:>2} {l:>2} {gd:>+4} {pts:>3} | {gf:>3} {ga:>3} {check:>6}")

    total_gf += gf
    total_ga += ga

print("="*90)
print(f"{'TOTALS':<20} {'':<16} | {total_gf:>3} {total_ga:>3} {'✅' if total_gf == total_ga else '❌'}")
print("="*90)

if all_valid and total_gf == total_ga:
    print("\n✅ All constraints satisfied!")
    print(f"\nTotal matches: {sum(t[1] for t in teams_data) // 2}")
    print(f"Total goals: {total_gf}")
else:
    print("\n❌ Constraints not satisfied, need adjustments")
    print(f"GF-GA imbalance: {total_gf - total_ga}")
