export type Recommendation = {
  id: string;
  title: string;
  playable: boolean;
  maturityRating: 'G' | 'PG' | 'PG-13' | 'R';
};

export function findDuplicateIds(recommendations: Recommendation[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const recommendation of recommendations) {
    if (seen.has(recommendation.id)) {
      duplicates.add(recommendation.id);
    }
    seen.add(recommendation.id);
  }

  return [...duplicates];
}

export function validateRecommendations(recommendations: Recommendation[], allowedRatings: string[]) {
  return recommendations.filter(item => !item.playable || !allowedRatings.includes(item.maturityRating));
}
