// Simple ownership routing patterns for automated issue / control ticket creation.
export const ownership = [
  { pattern: /contrast|color/i, team: 'Web' },
  { pattern: /alt text|image/i, team: 'Web' },
  { pattern: /heading|structure/i, team: 'Web' },
  { pattern: /caption|transcript/i, team: 'Academic Technology' },
  { pattern: /mfa|backup|edr/i, team: 'Security' },
];

export function routeOwner(description: string): string {
  for (const rule of ownership) {
    if (rule.pattern.test(description)) return rule.team;
  }
  return 'Trust Ops';
}
