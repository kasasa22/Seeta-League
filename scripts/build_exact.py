#!/usr/bin/env python3
"""
Build exact fixture list matching official table 100%
"""

# Official requirements
targets = {
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

# Track remaining needs
remaining = {t: dict(d) for t, d in targets.items()}
matches = []

def add_match(home, away, h_score, a_score, match_type='decisive'):
    """Add a match and update remaining needs"""
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

def needs_win(team):
    return remaining[team]['W'] > 0 and remaining[team]['P'] > 0

def needs_loss(team):
    return remaining[team]['L'] > 0 and remaining[team]['P'] > 0

def needs_draw(team):
    return remaining[team]['D'] > 0 and remaining[team]['P'] > 0

# Step 1: Create draw matches
# Teams needing draws: Finest(1), Super Strikers(1), Losti(2), Club(1), Godfathers(2), Top Bins(2), Raptors(1)
print("Creating draw matches...")

add_match('Finest Brothers', 'Losti City', 2, 2)
print("  Finest Brothers 2-2 Losti City")

add_match('Super Strikers', 'Losti City', 1, 1)
print("  Super Strikers 1-1 Losti City")

add_match('Club de Chege', "Godfather's", 1, 1)
print("  Club de Chege 1-1 Godfather's")

add_match('Top Bins', "Godfather's", 0, 0)
print("  Top Bins 0-0 Godfather's")

add_match('Top Bins', 'Raptors', 1, 1)
print("  Top Bins 1-1 Raptors")

print("\nDraw requirements after:")
for t in targets:
    if remaining[t]['D'] != 0:
        print(f"  ❌ {t}: D={remaining[t]['D']}")

# Step 2: Create decisive matches systematically
print("\nCreating decisive matches...")

# Manual pairing to satisfy W/L requirements exactly:

# Finest Brothers needs 5 wins (vs teams needing losses)
add_match('Finest Brothers', 'Legends', 3, 0)
add_match('Finest Brothers', 'Top Bins', 2, 1)
add_match('Finest Brothers', "Godfather's", 2, 1)
add_match('Finest Brothers', 'The Brotherhood', 2, 0)
add_match('Finest Brothers', 'Raptors', 2, 1)

# The Villagers needs 5 wins
add_match('The Villagers', 'The Brotherhood', 4, 0)
add_match('The Villagers', 'Raptors', 5, 1)
add_match('The Villagers', 'Titans', 4, 0)
add_match('The Villagers', 'Legends', 3, 0)
add_match('The Villagers', 'Top Bins', 4, 1)

# Super Strikers needs 4 wins (already has 1 draw)
add_match('Super Strikers', 'Titans', 3, 1)
add_match('Super Strikers', 'Ronavics', 2, 0)
add_match('Super Strikers', 'Legends', 2, 0)
add_match('Super Strikers', 'The Brotherhood', 2, 1)

# Panthers needs 4 wins and 2 losses
add_match('Panthers', 'Top Bins', 4, 0)
add_match('Panthers', 'Legends', 5, 0)
add_match('Panthers', 'Kawaago', 3, 0)
add_match('Panthers', 'Ronavics', 3, 1)
# Panthers losses:
add_match('COVID Boys', 'Panthers', 2, 1)
add_match('Pundits', 'Panthers', 5, 0)

# Losti City needs 3 wins and 1 loss (already has 2 draws)
add_match('Losti City', "Godfather's", 3, 1)
add_match('Losti City', 'Raptors', 4, 1)
add_match('Losti City', 'Kawaago', 3, 0)
# Losti loss:
add_match('Club de Chege', 'Losti City', 2, 1)

# Club de Chege needs 3 wins and 1 loss (already has 1 draw, 1 win above)
add_match('Club de Chege', 'Titans', 4, 1)
add_match('Club de Chege', 'Ronavics', 2, 0)
# Club loss:
add_match('Allies', 'Club de Chege', 2, 1)

# Allies needs 3 wins (already has 1 above)
add_match('Allies', 'The Brotherhood', 2, 1)
add_match('Allies', "Godfather's", 2, 1)

# COVID Boys needs 3 wins and 2 losses (already has 1 win above)
add_match('COVID Boys', 'Pundits', 2, 1)
add_match('COVID Boys', 'Raptors', 2, 0)
# COVID losses:
add_match('Ronavics', 'COVID Boys', 2, 1)
add_match('Titans', 'COVID Boys', 2, 1)

# Ronavics needs 2 wins (already has 1 above)
add_match('Ronavics', 'Pundits', 2, 1)

# Godfathers needs 1 win (already has 2 draws, 3 losses)
add_match("Godfather's", 'Top Bins', 2, 1)

# The Brotherhood needs 1 win (already has 4 losses)
add_match('The Brotherhood', 'Legends', 2, 0)

# Verify all W/D/L satisfied
print("\n" + "="*70)
print("Verification of W/D/L allocation:")
print("="*70)

all_ok = True
for team in targets:
    w = remaining[team]['W']
    d = remaining[team]['D']
    l = remaining[team]['L']
    p = remaining[team]['P']

    if w == 0 and d == 0 and l == 0 and p == 0:
        print(f"✅ {team}")
    else:
        all_ok = False
        issues = []
        if w != 0: issues.append(f"W={w}")
        if d != 0: issues.append(f"D={d}")
        if l != 0: issues.append(f"L={l}")
        if p != 0: issues.append(f"P={p}")
        print(f"❌ {team}: {', '.join(issues)}")

if all_ok:
    print("\n✅ All W/D/L satisfied!")

    # Calculate GF/GA
    gf = {t: 0 for t in targets}
    ga = {t: 0 for t in targets}

    for home, away, hs, as_ in matches:
        gf[home] += hs
        ga[home] += as_
        gf[away] += as_
        ga[away] += hs

    print("\n" + "="*70)
    print("GD Analysis:")
    print("="*70)

    for team in sorted(targets.keys(), key=lambda t: -targets[t].get('GD', 0)):
        current_gd = gf[team] - ga[team]
        target_gd = targets[team]['GD']
        diff = target_gd - current_gd
        status = "✅" if diff == 0 else f"need {diff:+d}"
        print(f"  {team:<20}: GD={current_gd:+3d} (target={target_gd:+3d}) {status}")

    print(f"\nTotal matches: {len(matches)}")
else:
    print("\n❌ W/D/L allocation incomplete!")
