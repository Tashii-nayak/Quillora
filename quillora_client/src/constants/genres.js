const GENRE_ALIASES = {
  fantasy: 'Fantasy',
  scifi: 'Science Fiction',
  'science fiction': 'Science Fiction',
  dystopian: 'Dystopian',
  adventure: 'Action & Adventure',
  'action & adventure': 'Action & Adventure',
  mystery: 'Mystery',
  horror: 'Horror',
  thriller: 'Thriller',
  historical: 'Historical Fiction',
  'historical fiction': 'Historical Fiction',
};

export const GENRES = {
  Fantasy: {
    title: 'Fantasy',
    description:
      'Step into worlds of magic, myth, and imagination — where anything is possible and every page holds wonder.',
  },
  'Science Fiction': {
    title: 'Science Fiction',
    description:
      'Explore futures near and far, technology, space, and ideas that stretch the boundaries of what we know.',
  },
  Dystopian: {
    title: 'Dystopian',
    description:
      'Stories of societies unmade and remade — cautionary tales that mirror our fears and question our choices.',
  },
  'Action & Adventure': {
    title: 'Action & Adventure',
    description:
      'High stakes, bold journeys, and pulse-quickening tales for readers who crave momentum and discovery.',
  },
  Mystery: {
    title: 'Mystery',
    description:
      'Follow the clues, question every detail, and unravel secrets hidden in plain sight.',
  },
  Horror: {
    title: 'Horror',
    description:
      'Stories that linger in the dark — unsettling, atmospheric, and unafraid to confront what frightens us.',
  },
  Thriller: {
    title: 'Thriller',
    description:
      'Tension that never lets up — suspenseful narratives built on urgency, twists, and relentless pace.',
  },
  'Historical Fiction': {
    title: 'Historical Fiction',
    description:
      'The past brought vividly to life — human stories woven through real eras, events, and forgotten voices.',
  },
};

export function normalizeGenreName(genreName = '') {
  const value = String(genreName || '').trim();

  if (!value) {
    return '';
  }

  return GENRE_ALIASES[value.toLowerCase()] || value;
}

export function getGenreMeta(genreName) {
  const canonicalGenre = normalizeGenreName(genreName);

  return (
    GENRES[canonicalGenre] || {
      title: canonicalGenre || genreName,
      description: `Explore the best stories from the ${canonicalGenre || genreName} genre.`,
    }
  );
}
