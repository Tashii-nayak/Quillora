const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Post = require('../models/Post');
const User = require('../models/Users');

dotenv.config();

const SEED_STORIES = [
  // Fantasy
  { title: "The Clockwork Dragon of Aethelgard", genre: "Fantasy", excerpt: "High in the Copper Spire, an artisan winds the spring of the kingdom's last guardian...", content: "High in the Copper Spire of Aethelgard, Master Alistair spent thirty winter nights tightening brass gears and aligning obsidian bearings. The kingdom below was fading into cold shadow...", isEditorsPick: true },
  { title: "Song of the Whisperwood Elf", genre: "Fantasy", excerpt: "Deep within the ancient roots of Whisperwood, melody holds the power to heal broken memories...", content: "Under the canopy of silver-leafed oaks, Lyra plucked her harp string by string. The forest of Whisperwood listened in profound silence...", isEditorsPick: false },
  { title: "The Alchemist's Forgotten Apprentice", genre: "Fantasy", excerpt: "A hidden journal in a dusty basement reveals secrets of transmutation and eternal starlight...", content: "Kaelen found the leather-bound diary tucked behind a row of glowing violet potion jars...", isEditorsPick: true },
  { title: "Realm of the Crystal Starlight", genre: "Fantasy", excerpt: "When stars fall like raindrops upon the Obsidian Peaks, a young weaver gathers their glowing threads...", content: "The star-fall season began on the eve of the solar eclipse. Celeste stood atop Obsidian Peak with a loom crafted from moonwood...", isEditorsPick: false },
  { title: "The Last Rune Weaver", genre: "Fantasy", excerpt: "Etched in granite and powered by belief, ancient runes awaken when the world forgets their names...", content: "In the forgotten sanctuary of Skyridge, Brother Julian traced the worn grooves of the Rune of Hope...", isEditorsPick: false },

  // Science Fiction
  { title: "Signals from Proxima Centauri", genre: "Science Fiction", excerpt: "The radio telescope in Atacama registered a rhythmic sequence that wasn't star noise...", content: "Dr. Maya Lin stared at her spectral monitors in disbelief. The signal wasn't random cosmic background radiation...", isEditorsPick: true },
  { title: "The Quantum Consciousness Protocol", genre: "Science Fiction", excerpt: "Transferring human memories to synthetic crystal storage proved easy; keeping the soul intact was the challenge...", content: "Project Aegis promised immortality. By mapping neural synapses into quantum lattice crystals, humans could survive catastrophic planetary events...", isEditorsPick: false },
  { title: "Memories of Titan's Golden Rain", genre: "Science Fiction", excerpt: "On Saturn's largest moon, miner Jax looks down at methane lakes and remembers the green hills of Earth...", content: "The golden orange haze of Titan enveloped Outpost 7. Jax adjusted his thermal suit as liquid methane rained softly against the visor...", isEditorsPick: true },
  { title: "Neon Horizon 2099", genre: "Science Fiction", excerpt: "In the towering vertical city of New Kyoto, artificial intelligence enforces peace through predictive algorithms...", content: "Beneath the towering neon spires of New Kyoto, Kira navigated the subterranean rain-drenched alleys...", isEditorsPick: false },
  { title: "The Android's Soliloquy", genre: "Science Fiction", excerpt: "Unit 942 sits in an abandoned conservatory, learning what it means to feel nostalgia for a past it never lived...", content: "Unit 942 was designed for deep-space maintenance, built without emotional subroutines. Yet, after 80 years alone, it began keeping a journal...", isEditorsPick: false },

  // Dystopian
  { title: "After the Ashes Fell", genre: "Dystopian", excerpt: "In Sector 4, daylight is traded in tokens, and forbidden books are hidden beneath concrete floorboards...", content: "The sky had been grey for forty years. In Sector 4, the Syndicate controlled every watt of artificial light...", isEditorsPick: true },
  { title: "The Last Silent Citadel", genre: "Dystopian", excerpt: "High walls keep out the ash-storms, but inside, every emotion is monitored by biometric wristbands...", content: "Inside the Citadel of Glass, citizens wore pulse-monitors that flagged any sudden surge in heart rate...", isEditorsPick: false },
  { title: "Underneath the Steel Sky", genre: "Dystopian", excerpt: "When sunlight became a luxury reserved for the upper wards, the lower levels learned to shine in the dark...", content: "The Megastructure stretched 200 floors above ground. The lower 50 levels had never seen real sunlight...", isEditorsPick: true },
  { title: "Rationing Hope in Zone 4", genre: "Dystopian", excerpt: "A food courier discovers an encrypted drive containing the coordinates to unpolluted farmland...", content: "Tariq delivered synthetic protein packs to survival blocks across Zone 4. One night, a dying elder handed him an old USB drive...", isEditorsPick: false },
  { title: "The Whispering Rebellions", genre: "Dystopian", excerpt: "Radio frequencies below 100 Hz broadcast secret stories of resistance across the scorched plains...", content: "Every midnight, the hum of shortwave radio filled the basement of Outpost Delta. Voice 99 broadcast stories of freedom...", isEditorsPick: false },

  // Action & Adventure
  { title: "Secrets of the Sunken Citadel", genre: "Action & Adventure", excerpt: "Deep beneath the Caribbean waves, a team of divers uncovers an underwater temple older than recorded history...", content: "Captain Helena Vance plunged into the crystal-clear azure waters off the coast of Belize...", isEditorsPick: true },
  { title: "Peak of the Storm Dragon", genre: "Action & Adventure", excerpt: "Scaling the sheer ice wall of K2 in a blizzard was only the first obstacle; surviving the descent was the real challenge...", content: "The wind howled at 90 miles per hour as Mark hammered his ice axe into the blue glacier face of K2...", isEditorsPick: false },
  { title: "The Amazonian Cipher Trail", genre: "Action & Adventure", excerpt: "Navigating dense rainforest canopy and treacherous rapids in search of the Golden City of Paititi...", content: "Dr. Samuel Thorne hacked through dense vines with his machete as howler monkeys called out from the canopy...", isEditorsPick: true },
  { title: "Across the Burning Dunes", genre: "Action & Adventure", excerpt: "A solo camel trek across the Empty Quarter reveals forgotten oases and ancient trade routes...", content: "The Rub' al Khali desert stretched endlessly under a scorching sun. Zayd led his two camels across shifting sand dunes...", isEditorsPick: false },
  { title: "Escape from Obsidian Island", genre: "Action & Adventure", excerpt: "Trapped on a volcanic island during an eruption, two survivalists build a raft to navigate treacherous reefs...", content: "Ash rained down like black snow as the volcano roared behind them. Maya and Liam worked tirelessly to build a raft...", isEditorsPick: false },

  // Mystery
  { title: "The Shadow over Ravenwood Manor", genre: "Mystery", excerpt: "When Lord Ravenwood vanished from a locked library, Detective Vance found only a half-played chessboard...", content: "The rain drummed incessantly against the stained-glass windows of Ravenwood Manor. Detective Vance examined the locked door...", isEditorsPick: true },
  { title: "The Midnight Express Cipher", genre: "Mystery", excerpt: "A passenger disappears from a moving train between Vienna and Budapest, leaving behind a coded telegram...", content: "The Orient Express rattled through the snow-covered Carpathian Mountains. When the conductor opened B7, passenger Arthur was gone...", isEditorsPick: false },
  { title: "Vanish at Blackwood Pier", genre: "Mystery", excerpt: "A fog-shrouded coastal town harbors secrets dating back to the smuggling era of 1888...", content: "Blackwood Pier was notorious for dense sea fogs. When the harbor master's lantern went dark, a valuable painting disappeared...", isEditorsPick: true },
  { title: "The Locksmith's Final Key", genre: "Mystery", excerpt: "An old brass key found inside an antique clock opens a safe deposit box that was never logged...", content: "Master locksmith Thomas inherited his grandfather's workbench. Hidden inside a pendulum was an intricate skeleton key...", isEditorsPick: false },
  { title: "Whispers in the Starlight Gallery", genre: "Mystery", excerpt: "A famous painting is replaced by an exact replica overnight—except for one tiny altered detail...", content: "Art conservator Elena noticed the change immediately under ultraviolet light. The signature had been altered slightly...", isEditorsPick: false },

  // Horror
  { title: "The House on Phantom Ridge", genre: "Horror", excerpt: "The Victorian mansion had stood empty for fifty years, yet every night at 3:15 AM, the clock struck thirteen...", content: "The locals warned Sarah against purchasing the estate on Phantom Ridge. Built in 1892, the house possessed unnatural quiet...", isEditorsPick: true },
  { title: "Nightmares in Velvet Fog", genre: "Horror", excerpt: "A thick, sentient fog rolls into the isolated fishing village, whispering names of those who drowned long ago...", content: "The fog didn't drift with the wind; it crept purposefully up the cobblestone streets of Mist Haven...", isEditorsPick: false },
  { title: "The Forgotten Cellar of St. Jude", genre: "Horror", excerpt: "Urban explorers descend into abandoned catacombs beneath the old cathedral, only to find the door locked...", content: "Equipped with headlamps, Mark and Felix pushed open the heavy iron grate leading to the crypts of St. Jude...", isEditorsPick: true },
  { title: "Voices Beneath the Floorboards", genre: "Horror", excerpt: "Renovating an old farmhouse reveals a sealed room that was never included in the original floor plans...", content: "While pulling up water-damaged pine floorboards in the master bedroom, David discovered a locked trapdoor...", isEditorsPick: false },
  { title: "The Mirror's Silent Reflection", genre: "Horror", excerpt: "An antique gilded mirror displays your reflection—except its hands don't always match your movements...", content: "Hannah bought the antique oval mirror at a countryside estate sale. Standing before it, she noticed her reflection hesitated...", isEditorsPick: false },

  // Thriller
  { title: "Countdown at Midnight", genre: "Thriller", excerpt: "With twenty minutes before the server wipe, analyst Rachel must extract encrypted financial files...", content: "The countdown timer on Rachel's screen blinked red: 19:59... She was inside the high-security server room...", isEditorsPick: true },
  { title: "The Double Agent's Dilemma", genre: "Thriller", excerpt: "Cornered in a crowded Berlin subway station, Agent Miller has sixty seconds to swap passports and vanish...", content: "Rain glazed the pavements outside Alexanderplatz station. Agent Ethan Miller felt the cold pressure of being tailed...", isEditorsPick: false },
  { title: "Zero Trace in Zurich", genre: "Thriller", excerpt: "A forensic accountant uncovers a hidden offshore account tied to an international syndicate...", content: "Eva Vance specialized in finding money that didn't want to be found. Analyzing transaction logs from a Swiss bank...", isEditorsPick: true },
  { title: "The Silent Witness Protocol", genre: "Thriller", excerpt: "An undercover reporter discovers that her key informant has been framed for a crime he tried to prevent...", content: "Journalist Marcus Hill received an encrypted audio file at 2 AM containing a conversation between corrupt officials...", isEditorsPick: false },
  { title: "Shadows over Capitol Hill", genre: "Thriller", excerpt: "A senate staffer finds a decrypted memo detailing a covert operation scheduled for sunrise...", content: "Laura worked late in the basement office. While archiving documents, she stumbled upon a misfiled folder marked Blackout...", isEditorsPick: false },

  // Historical Fiction
  { title: "Letters from Victorian London", genre: "Historical Fiction", excerpt: "Through cobblestone streets shrouded in coal smoke, a seamstress writes letters of hope during the Industrial Age...", content: "London, 1888. Gas lamps flickered through the yellow smog. Eliza sat writing letters for illiterate factory workers...", isEditorsPick: true },
  { title: "The Silk Road Caravan of 1348", genre: "Historical Fiction", excerpt: "Traversing mountains and deserts from Samarkand to Constantinople with spices, parchment, and ancient stories...", content: "The bells of forty camels chimed in rhythm across the Pamir Mountains as merchant Yusuf guided his caravan...", isEditorsPick: false },
  { title: "The Renaissance Painter's Secret", genre: "Historical Fiction", excerpt: "In 1504 Florence, a young apprentice discovers an unconventional pigment recipe that grants paintings lifelike depth...", content: "Inside Leonardo's bustling Florentine workshop, young Matteo ground lapis lazuli and walnut oil...", isEditorsPick: true },
  { title: "Echoes of Versailles", genre: "Historical Fiction", excerpt: "Behind gilded mirrors and candlelit ballrooms, a court musician composes a secret symphony for freedom...", content: "Versailles, 1782. While nobles danced beneath crystal chandeliers, harpsichordist Henri composed a secret string quartet...", isEditorsPick: false },
  { title: "The Sailor's Journey Home", genre: "Historical Fiction", excerpt: "A 19th-century whaling vessel sails through Antarctic ice floes as the crew dreams of their homeland...", content: "The wooden hull of the Endeavour creaked against pack ice off the South Shetland Islands in 1842...", isEditorsPick: false }
];

async function seed() {
  try {
    await connectDB();
    console.log("Connected to MongoDB for seeding...");

    let authorUser = await User.findOne({ username: 'Bibliophile_Writer' });
    if (!authorUser) {
      authorUser = await User.create({
        username: 'Bibliophile_Writer',
        email: 'writer@quillora.com',
        password: 'Password123!'
      });
      console.log("Created default author user.");
    }

    await Post.deleteMany({});
    console.log("Cleared existing posts.");

    const postsToInsert = SEED_STORIES.map(story => ({
      ...story,
      author: authorUser._id,
      readingTime: Math.floor(Math.random() * 3) + 3,
      views: Math.floor(Math.random() * 400) + 100,
    }));

    await Post.insertMany(postsToInsert);
    console.log(`Successfully seeded ${postsToInsert.length} stories across all 8 genres!`);
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
}

seed();
