#!/usr/bin/env python3
"""
Build fixtures systematically to match exact official standings
"""

# Official requirements
teams = {
    'FINEST BROTHERS': {'P': 6, 'W': 5, 'D': 1, 'L': 0, 'GD': 9},
    'THE VILLAGERS': {'P': 5, 'W': 5, 'D': 0, 'L': 0, 'GD': 17},
    'SUPER STRIKERS': {'P': 5, 'W': 4, 'D': 1, 'L': 0, 'GD': 8},
    'PANTHERS': {'P': 6, 'W': 4, 'D': 0, 'L': 2, 'GD': 13},
    'LOSTI CITY': {'P': 6, 'W': 3, 'D': 2, 'L': 1, 'GD': 10},
    'CLUB DE SHEGE': {'P': 5, 'W': 3, 'D': 1, 'L': 1, 'GD': 8},
    'ALLIES': {'P': 3, 'W': 3, 'D': 0, 'L': 0, 'GD': 5},
    'COVID BOYS': {'P': 5, 'W': 3, 'D': 0, 'L': 2, 'GD': -1},
    'RONAVICS': {'P': 5, 'W': 2, 'D': 0, 'L': 3, 'GD': -1},
    'GODFATHERS': {'P': 6, 'W': 1, 'D': 2, 'L': 3, 'GD': -6},
    'PUNDITS': {'P': 3, 'W': 1, 'D': 0, 'L': 2, 'GD': 4},
    'TITANS': {'P': 4, 'W': 1, 'D': 0, 'L': 3, 'GD': -1},
    'KAWAGO': {'P': 3, 'W': 1, 'D': 0, 'L': 2, 'GD': -6},
    'BROTHERHOOD': {'P': 5, 'W': 1, 'D': 0, 'L': 4, 'GD': -7},
    'TOP BINS': {'P': 6, 'W': 0, 'D': 2, 'L': 4, 'GD': -11},
    'RAPTORS': {'P': 5, 'W': 0, 'D': 1, 'L': 4, 'GD': -11},
    'LEGENDS': {'P': 5, 'W': 0, 'D': 0, 'L': 5, 'GD': -16},
}

# Verify totals
total_wins = sum(t['W'] for t in teams.values())
total_draws = sum(t['D'] for t in teams.values())
total_losses = sum(t['L'] for t in teams.values())
total_matches = sum(t['P'] for t in teams.values()) // 2
total_gd = sum(t['GD'] for t in teams.values())

print("Official Table Requirements:")
print(f"  Total matches: {total_matches}")
print(f"  Total wins: {total_wins}, Total losses: {total_losses} (should be equal: {total_wins == total_losses})")
print(f"  Total draws: {total_draws} (should be even for draw matches: {total_draws % 2 == 0})")
print(f"  Total GD sum: {total_gd} (should be 0: {total_gd == 0})")
print()

# Calculate required number of draw matches and decisive matches
draw_matches = total_draws // 2  # Each draw match gives 2 draws
decisive_matches = total_wins  # Each decisive match gives 1 win and 1 loss

print(f"Required draw matches: {draw_matches}")
print(f"Required decisive matches: {decisive_matches}")
print(f"Total required: {draw_matches + decisive_matches} (should be {total_matches})")
print()

# Initialize tracking
remaining = {team: dict(data) for team, data in teams.items()}
matches = []

# Strategy: Create matches by pairing teams
# 1. First handle draws (3 draw matches needed: involves teams with D>0)
#    - FINEST (D=1), SUPER STRIKERS (D=1), LOSTI CITY (D=2), CLUB DE SHEGE (D=1), GODFATHERS (D=2), TOP BINS (D=2), RAPTORS (D=1)
#    Total D = 10, so 5 draw matches

# Teams needing draws:
# FINEST BROTHERS: 1 draw
# SUPER STRIKERS: 1 draw
# LOSTI CITY: 2 draws
# CLUB DE SHEGE: 1 draw
# GODFATHERS: 2 draws
# TOP BINS: 2 draws
# RAPTORS: 1 draw

print("Draw matches (5 total, consuming 10 draws):")
draw_fixtures = [
    ('FINEST BROTHERS', 'LOSTI CITY'),      # FB gets D=1, LC gets D=1
    ('SUPER STRIKERS', 'LOSTI CITY'),       # SS gets D=1, LC gets D=2
    ('CLUB DE SHEGE', 'GODFATHERS'),        # CDS gets D=1, GF gets D=1
    ('TOP BINS', 'GODFATHERS'),             # TB gets D=1, GF gets D=2
    ('TOP BINS', 'RAPTORS'),                # TB gets D=2, R gets D=1
]

for home, away in draw_fixtures:
    print(f"  {home} vs {away} (draw)")
    remaining[home]['D'] -= 1
    remaining[away]['D'] -= 1
    remaining[home]['P'] -= 1
    remaining[away]['P'] -= 1

print("\nRemaining draws after allocation:")
for team, data in remaining.items():
    if data['D'] != 0:
        print(f"  ❌ {team}: D={data['D']}")

print("\n" + "="*60)
print("Now creating decisive matches...")
print("="*60)

# Teams that need wins and losses:
# Need to pair each win with a loss

# Build pairs: winner needs W>0, loser needs L>0
def get_win_need(team):
    return remaining[team]['W']

def get_loss_need(team):
    return remaining[team]['L']

# Greedy matching
decisive_fixtures = []
iterations = 0
max_iterations = 1000

while True:
    iterations += 1
    if iterations > max_iterations:
        print("Max iterations reached!")
        break

    # Find team that needs a win
    winners = [(t, remaining[t]['W']) for t in remaining if remaining[t]['W'] > 0 and remaining[t]['P'] > 0]
    if not winners:
        break

    # Sort by most wins needed
    winners.sort(key=lambda x: -x[1])
    winner = winners[0][0]

    # Find opponent that needs a loss (and hasn't played winner yet or has games remaining)
    losers = [(t, remaining[t]['L']) for t in remaining
              if remaining[t]['L'] > 0 and remaining[t]['P'] > 0 and t != winner]

    if not losers:
        print(f"  ⚠️ No suitable loser for {winner} (needs {remaining[winner]['W']} more wins)")
        break

    # Sort by most losses needed
    losers.sort(key=lambda x: -x[1])
    loser = losers[0][0]

    decisive_fixtures.append((winner, loser))
    remaining[winner]['W'] -= 1
    remaining[winner]['P'] -= 1
    remaining[loser]['L'] -= 1
    remaining[loser]['P'] -= 1

print(f"\nGenerated {len(decisive_fixtures)} decisive matches:")
for winner, loser in decisive_fixtures:
    print(f"  {winner} beats {loser}")

print("\n" + "="*60)
print("Verification of W/D/L allocation:")
print("="*60)

all_ok = True
for team in teams:
    w_ok = remaining[team]['W'] == 0
    d_ok = remaining[team]['D'] == 0
    l_ok = remaining[team]['L'] == 0
    p_ok = remaining[team]['P'] == 0

    if w_ok and d_ok and l_ok and p_ok:
        print(f"  ✅ {team}")
    else:
        all_ok = False
        issues = []
        if not w_ok: issues.append(f"W={remaining[team]['W']}")
        if not d_ok: issues.append(f"D={remaining[team]['D']}")
        if not l_ok: issues.append(f"L={remaining[team]['L']}")
        if not p_ok: issues.append(f"P={remaining[team]['P']}")
        print(f"  ❌ {team}: {', '.join(issues)}")

if all_ok:
    print("\n✅ All W/D/L counts satisfied!")

    # Now assign scores to meet GD requirements
    print("\n" + "="*60)
    print("Assigning scores to meet GD requirements:")
    print("="*60)

    # Track GF and GA for each team
    gf = {team: 0 for team in teams}
    ga = {team: 0 for team in teams}

    # For draw matches, use 1-1 (simplest)
    all_matches = []
    for home, away in draw_fixtures:
        all_matches.append((home, away, 1, 1))
        gf[home] += 1
        ga[home] += 1
        gf[away] += 1
        ga[away] += 1

    # For decisive matches, winner scores 2, loser scores 1 (simplest win margin)
    for winner, loser in decisive_fixtures:
        all_matches.append((winner, loser, 2, 1))
        gf[winner] += 2
        ga[winner] += 1
        gf[loser] += 1
        ga[loser] += 2

    # Calculate current GD and compare to required
    print("\nCurrent GD vs Required:")
    for team in teams:
        current_gd = gf[team] - ga[team]
        required_gd = teams[team]['GD']
        diff = required_gd - current_gd
        status = "✅" if diff == 0 else f"need {diff:+d}"
        print(f"  {team}: GD={current_gd:+d} (need {required_gd:+d}) {status}")
else:
    print("\n❌ W/D/L allocation failed!")
