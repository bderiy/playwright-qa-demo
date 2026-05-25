import { test, expect } from '@fixtures/test';
import { findDuplicateIds, validateRecommendations, Recommendation } from '@utils/recommendations';

test.describe('Recommendation data quality', () => {
  test('validates recommendation business rules', async () => {
    const recommendations: Recommendation[] = [
      { id: 'movie-1', title: 'Family Movie', playable: true, maturityRating: 'PG' },
      { id: 'movie-2', title: 'Action Movie', playable: true, maturityRating: 'PG-13' },
      { id: 'movie-3', title: 'Unavailable Movie', playable: false, maturityRating: 'PG' }
    ];

    expect(findDuplicateIds(recommendations)).toEqual([]);
    expect(validateRecommendations(recommendations, ['G', 'PG', 'PG-13'])).toEqual([
      expect.objectContaining({ id: 'movie-3', playable: false })
    ]);
  });
});
