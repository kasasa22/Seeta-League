#!/usr/bin/env python3
"""
Generate fixtures that match the EXACT official table
Using constraint solving approach
"""

# Official requirements (GF = Goals For, GA = Goals Against)
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

# Calculate total matches needed and GF/GA from W/D/L and GD
total_matches = sum(t['P'] for t in official.values()) // 2
print(f"Total matches needed: {total_matches}")
print()

# Calculate GF and GA for each team
# For a team: Pts = W*3 + D, so W and D are already known
# We need to find GF and GA such that GF - GA = GD
# And total GF across all teams = total GA across all teams

print("Calculating GF/GA for each team:")
print("="*80)

# Start with minimum goals assumption
for team, stats in official.items():
    # Start with minimum realistic goals
    # For wins, we need at least W goals for
    # For losses, we concede at least L goals against
    # For draws, at least D*1 for and D*1 against

    gd = stats['GD']
    w, d, l = stats['W'], stats['D'], stats['L']

    # We need GF - GA = GD
    # Start with minimum: GF = W + D (1 goal per win/draw), GA = L + D
    min_gf = w + d  # At least 1 goal per win/draw
    min_ga = l + d  # At least 1 goal per loss/draw

    # Adjust to meet GD requirement
    if min_gf - min_ga < gd:
        # Need more GF
        min_gf = min_ga + gd
    elif min_gf - min_ga > gd:
        # Need more GA
        min_ga = min_gf - gd

    stats['GF'] = min_gf
    stats['GA'] = min_ga

    print(f"{team:20s}: P={stats['P']}, W={w}, D={d}, L={l}, GD={gd:+3d}, GF={min_gf:3d}, GA={min_ga:3d}")

print()
total_gf = sum(t['GF'] for t in official.values())
total_ga = sum(t['GA'] for t in official.values())
print(f"Total GF: {total_gf}, Total GA: {total_ga}, Difference: {total_gf - total_ga}")
print()

# Adjust to balance GF and GA
if total_gf != total_ga:
    print(f"⚠️  Need to balance: GF={total_gf}, GA={total_ga}")
    diff = total_gf - total_ga

    if diff > 0:
        # Too many GF, need to add GA to some teams
        print(f"Need to add {diff} total GA to teams")
        # Distribute to teams with losses
        teams_with_losses = [(t, s) for t, s in official.items() if s['L'] > 0]
        teams_with_losses.sort(key=lambda x: x[1]['L'], reverse=True)

        remaining = diff
        for team, stats in teams_with_losses:
            if remaining <= 0:
                break
            add = min(stats['L'], remaining)
            stats['GA'] += add
            remaining -= add
            print(f"  Added {add} GA to {team}")
    else:
        # Too many GA, need to add GF to some teams
        print(f"Need to add {-diff} total GF to teams")
        teams_with_wins = [(t, s) for t, s in official.items() if s['W'] > 0]
        teams_with_wins.sort(key=lambda x: x[1]['W'], reverse=True)

        remaining = -diff
        for team, stats in teams_with_wins:
            if remaining <= 0:
                break
            add = min(stats['W'], remaining)
            stats['GF'] += add
            remaining -= add
            print(f"  Added {add} GF to {team}")

print()
total_gf = sum(t['GF'] for t in official.values())
total_ga = sum(t['GA'] for t in official.values())
print(f"After balancing - Total GF: {total_gf}, Total GA: {total_ga}")
print()

# Verify GD still matches
print("Verifying GD after GF/GA assignment:")
for team, stats in official.items():
    calculated_gd = stats['GF'] - stats['GA']
    expected_gd = stats['GD']
    status = "✅" if calculated_gd == expected_gd else "❌"
    print(f"{status} {team:20s}: GF={stats['GF']:3d}, GA={stats['GA']:3d}, GD={calculated_gd:+3d} (expected {expected_gd:+3d})")
