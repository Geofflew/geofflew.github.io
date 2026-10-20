"""Generate the blog's original, editable SVG diagrams using its shared palette."""
from pathlib import Path
from html import escape

PAPER, INK, QUIET, LINE, ACCENT = '#faf8f3', '#1c1a16', '#5b564c', '#d8d0c2', '#c2410c'

def diagram(name, title, subtitle, steps, foot):
    height = 164 + len(steps) * 130 + 56
    svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="720" height="{height}" viewBox="0 0 720 {height}" role="img" aria-labelledby="title desc">',
           f'<title id="title">{escape(title)}</title><desc id="desc">{escape(subtitle + ". " + "; ".join(s[1]+": "+s[2] for s in steps))}</desc>',
           f'<defs><pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".8" fill="{LINE}"/></pattern><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1L8 5L1 9" fill="none" stroke="{ACCENT}" stroke-width="1.3"/></marker></defs>',
           f'<rect width="720" height="{height}" fill="{PAPER}"/><rect width="720" height="{height}" fill="url(#dots)"/>',
           f'<rect x="24" width="672" height="{height}" fill="{PAPER}" stroke="{LINE}"/>',
           f'<g font-family="Arial, Helvetica, sans-serif" fill="{INK}">',
           f'<text x="52" y="49" font-size="27" font-weight="600">{escape(title)}</text>',
           f'<text x="52" y="79" font-size="17" fill="{QUIET}">{escape(subtitle)}</text>',
           f'<path d="M24 103H696" stroke="{LINE}"/><rect x="21" y="100" width="6" height="6" fill="{PAPER}" stroke="{LINE}"/>']
    for i,(label,heading,detail) in enumerate(steps):
        y=126+i*130
        svg += [f'<rect x="52" y="{y}" width="616" height="98" rx="14" fill="#fffefb" stroke="{LINE}"/>',
                f'<text x="76" y="{y+27}" font-size="12" font-family="monospace" letter-spacing="1.1" fill="{ACCENT}">{escape(label.upper())}</text>',
                f'<text x="76" y="{y+53}" font-size="23" font-weight="500">{escape(heading)}</text>',
                f'<text x="76" y="{y+79}" font-size="17" fill="{QUIET}">{escape(detail)}</text>']
        if i<len(steps)-1:
            svg += [f'<path d="M360 {y+100}V{y+125}" stroke="{ACCENT}" stroke-width="1.5" marker-end="url(#arrow)"/>']
    svg += [f'<text x="52" y="{height-35}" font-size="16" fill="{QUIET}">{escape(foot)}</text></g></svg>']
    Path(f'assets/{name}.svg').write_text('\n'.join(svg)+'\n')

diagram('warehouse-flow','Give separate records shared meaning','Conceptual data path · source records to business-facing views',[
 ('Starting point','Separate source systems','Account and deal records · contracts · product activity'),
 ('Bronze','Keep the source records','Retain the inputs used to build shared definitions.'),
 ('Silver','Define what the records mean','Customer history · measured coverage · activity counts'),
 ('Gold','Expose those meanings to reports','Combine definitions into views people can query.')
], 'Preserve the distinctions: unknown is not zero; a renewal is not a first sale.')

diagram('question-flow','Carry meaning into the answer','Question-answering flow · model roles and application decisions',[
 ('Question','“Which deals included our forecasting product?”','A business question needs business definitions.'),
 ('Context + LLM planner','Forecasting means the product named Horizon','Select relevant context; propose SQL and state assumptions.'),
 ('Application checks + selected critic review','Check access, then examine interpretation','If revised, check the replacement SQL before it runs.'),
 ('Database execution','Run the checked query with restricted access','Read-only execution · timeout · overflow detection at the fetch cap'),
 ('Answer','Show the result and what it covers','SQL · assumptions · missing data · partial-result status')
], 'The critic reviews selected query shapes; permission is not correctness.')

diagram('automation-flow','Carry an approved change through','Account reassignment · one workflow within an automation system',[
 ('Request + planner','Interpret the requested reassignment','Current owner · region · destination owner'),
 ('Application + database','Find accounts and save the exact proposal','Store account IDs, current owners, and proposed owners.'),
 ('Person','Review the list and approve its proposal ID','Approval refers to the saved list, not a newly generated one.'),
 ('Application transaction','Claim the proposal and apply eligible changes','Reject stale or repeated approval; recheck each current owner.'),
 ('Outcome','Report what changed and what needs attention','Applied accounts · accounts skipped because their owner changed')
], 'Models interpret; stored state carries the person’s decision into execution.')
