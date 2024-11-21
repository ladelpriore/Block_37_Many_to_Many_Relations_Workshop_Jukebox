//Seed the database with at least 5 users, 20 tracks, and 10 playlists. 
//Each playlist should be owned by a random user. Connect it to a number of randomly chosen tracks.
//Order matters: make users and tracks, then playlists last

const prisma = require("../prisma");

const seed = async (numUsers = 5, numPlaylists = 10, numTracks = 20) => {
   
  const users = Array.from({ length: numUsers }, (_, i) => ({
    name: `Users ${i + 1}`,
  }));
  await prisma.user.createMany({ data: users });


  const tracks = Array.from({ length: numTracks }, (_, i) => ({
    name: `Track ${i + 1}`,
  }));
  await prisma.track.createMany({ data: tracks });


  for (let i = 0; i < numPlaylists; i++) {
    const trackCount = 1 + Math.floor(Math.random() * 3);
    const selectedTracks= Array.from({ length: trackCount }, () => ({
      id: 1 + Math.floor(Math.random() * numTracks),
    }));
    await prisma.playlist.create({
      data: {
        name: new Name(),
        ownerId: 1 + Math.floor(Math.random() * numUsers),
        tracks: { connect: selectedTracks },
      },
    });
  }
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });