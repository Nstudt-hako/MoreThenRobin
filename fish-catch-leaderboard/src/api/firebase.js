// Mock Firebase API replacement for offline/demo usage.
// Provides an in-memory store for catches and exposes async functions
// that mimic typical Firestore usage patterns.

/**
 * @typedef {Object} CatchRecord
 * @property {string} id Unique identifier
 * @property {string} species Fish species name
 * @property {number} size Size in cm
 * @property {string} angler Angler display name
 * @property {string=} location Optional location description
 * @property {number} timestamp Epoch milliseconds
 * @property {string=} photo Optional photo URL
 */

/**
 * Internal in-memory store. Acts like a collection table.
 * Pre-populated with sample data to showcase the leaderboard.
 * @type {CatchRecord[]}
 */
let catches = [
	{
		id: 'c1',
		species: 'Northern Pike',
		size: 112,
		angler: 'Alice',
		location: 'Lake Superior',
		timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2,
		photo: 'https://placehold.co/120x80?text=Pike'
	},
	{
		id: 'c2',
		species: 'Rainbow Trout',
		size: 54,
		angler: 'Bob',
		location: 'Rocky River',
		timestamp: Date.now() - 1000 * 60 * 60 * 5,
		photo: 'https://placehold.co/120x80?text=Trout'
	},
	{
		id: 'c3',
		species: 'Atlantic Salmon',
		size: 89,
		angler: 'Charlie',
		location: 'Salmon Bay',
		timestamp: Date.now() - 1000 * 60 * 60 * 24 * 7,
		photo: 'https://placehold.co/120x80?text=Salmon'
	},
	{
		id: 'c4',
		species: 'Catfish',
		size: 76,
		angler: 'Dana',
		location: 'Muddy Waters',
		timestamp: Date.now() - 1000 * 60 * 30,
		photo: 'https://placehold.co/120x80?text=Catfish'
	}
];

/**
 * Simulate network latency.
 * @param {any} value
 * @param {number} [ms=250]
 * @returns {Promise<any>}
 */
const withLatency = (value, ms = 250) => new Promise(resolve => setTimeout(() => resolve(value), ms));

/**
 * Get leaderboard data sorted by size descending.
 * @returns {Promise<CatchRecord[]>}
 */
export const getLeaderboardData = async () => {
	// Clone and sort to avoid accidental external mutation
	const sorted = [...catches].sort((a, b) => b.size - a.size);
	return withLatency(sorted);
};

/**
 * Add a new catch to the in-memory store.
 * @param {Omit<CatchRecord,'id'|'timestamp'> & { timestamp?: number }} data
 * @returns {Promise<CatchRecord>}
 */
export const addCatch = async (data) => {
	const record = {
		id: `c_${Math.random().toString(36).slice(2, 9)}`,
		timestamp: data.timestamp || Date.now(),
		...data
	};
	catches.push(record);
	return withLatency(record, 300);
};

/**
 * Reset and seed the mock database (useful for tests / demo reset)
 * @param {CatchRecord[]} seed
 */
export const seedCatches = (seed) => {
	catches = [...seed];
};

/**
 * Simple filter utility - mimic a query.
 * @param {(c: CatchRecord)=>boolean} predicate
 * @returns {Promise<CatchRecord[]>}
 */
export const queryCatches = async (predicate) => withLatency(catches.filter(predicate));

// No default export to encourage named import usage.
