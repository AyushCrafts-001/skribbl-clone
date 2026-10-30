// Categorized word bank for skribbl clone
export const wordCategories = {
  animals: [
    "elephant", "giraffe", "monkey", "penguin", "dolphin", "kangaroo", "tiger", "lion",
    "zebra", "octopus", "squirrel", "hedgehog", "crocodile", "flamingo", "owl", "koala",
    "panda", "chameleon", "peacock", "shark", "whale", "camel", "hippo", "rabbit",
    "bear", "frog", "butterfly", "snail", "parrot", "gorilla", "sloth", "cheetah"
  ],
  food: [
    "pizza", "hamburger", "spaghetti", "sushi", "pancake", "waffle", "ice cream", "sandwich",
    "donut", "cupcake", "chocolate", "watermelon", "pineapple", "strawberry", "avocado", "taco",
    "popcorn", "cookie", "french fries", "cheese", "hotdog", "croissant", "burrito", "bacon"
  ],
  objects: [
    "computer", "guitar", "airplane", "telescope", "microscope", "umbrella", "backpack", "compass",
    "camera", "rocket", "submarine", "bicycle", "skateboard", "clock", "lamp", "scissors",
    "key", "glasses", "battery", "flashlight", "headphones", "anchor", "trophy", "magnet",
    "ladder", "hammer", "umbrella", "candle", "paintbrush", "microfone", "violin", "toaster"
  ],
  actions: [
    "dancing", "swimming", "flying", "sleeping", "running", "singing", "cooking", "climbing",
    "fishing", "painting", "reading", "juggling", "laughing", "sneezing", "skating", "driving",
    "surfing", "whispering", "boxing", "jumping", "diving", "baking", "crying", "yawning"
  ],
  nature: [
    "volcano", "rainbow", "waterfall", "lightning", "tornado", "mountain", "desert", "glacier",
    "island", "forest", "sunrise", "eclipse", "cave", "ocean", "thunderstorm", "comet",
    "meteor", "canyon", "oasis", "blizzard", "tsunami", "meadow", "swamp", "beach"
  ],
  popculture: [
    "superman", "batman", "spiderman", "pikachu", "mario", "yoshi", "pacman", "sonic",
    "sponge bob", "shrek", "harry potter", "voldemort", "goku", "elsa", "yoda", "iron man"
  ]
};

// Flattened general word list
export const allWords = Object.values(wordCategories).flat();

/**
 * Get random words for drawer selection
 * @param {number} count Number of choices (e.g. 3)
 * @param {string} category Category name or 'all'
 * @param {string[]} customWords Optional host custom words
 * @returns {string[]}
 */
export const getRandomWords = (count = 3, category = "all", customWords = []) => {
  let pool = [];

  if (Array.isArray(customWords) && customWords.length > 0) {
    pool = [...customWords];
  }

  if (category && category !== "all" && wordCategories[category]) {
    pool = [...pool, ...wordCategories[category]];
  } else {
    pool = [...pool, ...allWords];
  }

  // Deduplicate and filter non-empty
  const uniquePool = Array.from(new Set(pool.map((w) => w.trim().toLowerCase()))).filter(
    (w) => w.length > 0
  );

  // Shuffle pool using Fisher-Yates
  const shuffled = [...uniquePool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
};

/**
 * Calculate Levenshtein distance between two strings
 */
export const levenshteinDistance = (a, b) => {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
};

/**
 * Check if guess is close to target word (distance of 1 for words length >= 4)
 */
export const isCloseGuess = (guess, target) => {
  const g = guess.trim().toLowerCase();
  const t = target.trim().toLowerCase();
  if (g === t) return false;
  if (t.length < 4) return false;
  return levenshteinDistance(g, t) === 1;
};

export default allWords;
