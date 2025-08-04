// Mock Firebase functions for demo purposes

const mockLeaderboardData = [
  {
    id: '1',
    species: 'Rainbow Trout',
    size: 45,
    angler: 'John Doe',
    location: 'Lake Superior',
    timestamp: new Date('2024-07-15'),
    photo: null
  },
  {
    id: '2',
    species: 'Bass',
    size: 42,
    angler: 'Jane Smith',
    location: 'River Thames',
    timestamp: new Date('2024-07-10'),
    photo: null
  },
  {
    id: '3',
    species: 'Pike',
    size: 38,
    angler: 'Mike Johnson',
    location: 'Lake Michigan',
    timestamp: new Date('2024-07-05'),
    photo: null
  },
  {
    id: '4',
    species: 'Salmon',
    size: 35,
    angler: 'Sarah Wilson',
    location: 'Pacific Coast',
    timestamp: new Date('2024-06-28'),
    photo: null
  }
];

export const getLeaderboardData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockLeaderboardData.sort((a, b) => b.size - a.size);
};

// Mock objects for compatibility
export const auth = {
  onAuthStateChanged: () => () => {},
  signInWithEmailAndPassword: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  createUserWithEmailAndPassword: () => Promise.resolve()
};

export const db = {
  collection: () => ({
    orderBy: () => ({
      onSnapshot: () => () => {}
    })
  })
};