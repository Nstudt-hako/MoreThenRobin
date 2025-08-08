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
const withLatency = (value, ms = 150) => new Promise(resolve => setTimeout(() => resolve(value), ms));

// --- Fairness / Integrity Settings ---
const PHOTO_REQUIRED_SIZE_CM = 80; // Require photo for catches >= this size
const VERIFY_SIZE_CM = 100;        // Catches >= require admin verification
const RATE_LIMIT_MAX_PER_HOUR = 5; // Per user limit

// Rate limiting memory map
const userCatchTimestamps = new Map(); // userEmail -> number[]

// Utility to enforce rate limiting
const checkRateLimit = (userId) => {
	const now = Date.now();
	const oneHourAgo = now - 1000 * 60 * 60;
	const list = (userCatchTimestamps.get(userId) || []).filter(ts => ts > oneHourAgo);
	if (list.length >= RATE_LIMIT_MAX_PER_HOUR) {
		const retryMins = Math.ceil((list[0] + 1000 * 60 * 60 - now) / 60000);
		const error = new Error(`Rate limit exceeded. Try again in ~${retryMins} min`);
		error.code = 'rate/limit-exceeded';
		throw error;
	}
	list.push(now);
	userCatchTimestamps.set(userId, list);
};

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
	const userId = data.angler || 'anonymous';
	checkRateLimit(userId);

	if ((data.size || 0) >= PHOTO_REQUIRED_SIZE_CM && !data.photo) {
		const err = new Error(`Photo required for catches >= ${PHOTO_REQUIRED_SIZE_CM} cm`);
		err.code = 'photo/required';
		throw err;
	}

	const now = Date.now();
	const willNeedVerification = (data.size || 0) >= VERIFY_SIZE_CM;
	const record = {
		id: `c_${Math.random().toString(36).slice(2, 9)}`,
		timestamp: data.timestamp || now,
		createdAt: now,
		updatedAt: now,
		editedBy: userId,
		verified: !willNeedVerification, // auto-verified if below threshold
		flagged: false,
		isDeleted: false,
		history: [],
		...data
	};
	catches.push(record);
	return withLatency(record, 250);
};

/**
 * Update catch (soft) while recording audit trail.
 * @param {string} id
 * @param {Partial<CatchRecord>} patch
 * @param {string} editor
 */
export const updateCatch = async (id, patch, editor='system') => {
	const idx = catches.findIndex(c => c.id === id && !c.isDeleted);
	if (idx === -1) throw new Error('Catch not found');
	const prev = catches[idx];
	const now = Date.now();
	const snapshot = { size: prev.size, location: prev.location, photo: prev.photo, timestamp: prev.timestamp, updatedAt: prev.updatedAt };
	const updated = { ...prev, ...patch, updatedAt: now, editedBy: editor, history: [...prev.history, snapshot] };
	catches[idx] = updated;
	return withLatency(updated);
};

/** Soft delete. */
export const deleteCatch = async (id, editor='system') => updateCatch(id, { isDeleted: true }, editor);

/**
 * Admin: verify a catch
 */
export const verifyCatch = async (id, editor='admin') => updateCatch(id, { verified: true, flagged: false }, editor);

/**
 * Admin: flag a catch for review
 */
export const flagCatch = async (id, reason='suspicious', editor='admin') => updateCatch(id, { flagged: true, flagReason: reason }, editor);

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

/**
 * Get distinct species list
 */
export const getSpeciesList = async () => {
	return withLatency(Array.from(new Set(catches.filter(c=>!c.isDeleted).map(c => c.species))).sort());
};

/**
 * Get catches by id
 */
export const getCatchById = async (id) => withLatency(catches.find(c => c.id === id && !c.isDeleted) || null);

/**
 * Filter & sort helper for leaderboard.
 * @param {{species?:string, timeframe?:'24h'|'7d'|'30d'|'all', search?:string, sort?:'size'|'recent', onlyVerified?:boolean}} criteria
 */
export const filterLeaderboard = async (criteria = {}) => {
	const { species, timeframe='all', search='', sort='size', onlyVerified=true } = criteria;
	const now = Date.now();
	let minTs = 0;
	if (timeframe === '24h') minTs = now - 1000*60*60*24;
	else if (timeframe === '7d') minTs = now - 1000*60*60*24*7;
	else if (timeframe === '30d') minTs = now - 1000*60*60*24*30;

	let list = catches.filter(c => !c.isDeleted && c.timestamp >= minTs);
	if (onlyVerified) list = list.filter(c => c.verified);
	if (species) list = list.filter(c => c.species === species);
	if (search) {
		const s = search.toLowerCase();
		list = list.filter(c => c.species.toLowerCase().includes(s) || c.angler.toLowerCase().includes(s));
	}
	if (sort === 'size') list = [...list].sort((a,b)=> b.size - a.size);
	else if (sort === 'recent') list = [...list].sort((a,b)=> b.timestamp - a.timestamp);
	return withLatency(list);
};

// No default export to encourage named import usage.
