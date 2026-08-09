export const DEFAULT_STORIES_BY_GENRE = {
  Fantasy: [
    {
      _id: 'fantasy-1',
      title: 'The Clockwork Dragon of Aethelgard',
      excerpt: 'High in the Copper Spire, an elderly artisan winds the spring of the kingdom\'s last mechanical guardian...',
      content: `High in the Copper Spire of Aethelgard, Master Alistair spent thirty winter nights tightening brass gears and aligning obsidian bearings. The kingdom below was fading into cold shadow, beset by frost-spirits that turned rivers into silent glass.

The clockwork dragon was his final masterpiece. With wings forged from tempered bronze and a heart powered by an ancient sun-crystal, it hummed with quiet purpose. When Alistair turned the silver key into its spine, the mechanical beast opened eyes of sapphire flame and let out a roar that melted the icy wind.

Together, they flew into the dark mountains, bringing warmth back to the valley and reminding the realm that even in the darkest winter, human ingenuity and magic could spark a new dawn.`,
      genre: 'Fantasy',
      author: { username: 'Aeliana_Starlight' },
      readingTime: 4,
      views: 342,
      isEditorsPick: true,
      createdAt: '2025-07-20T10:00:00.000Z'
    },
    {
      _id: 'fantasy-2',
      title: 'Song of the Whisperwood Elf',
      excerpt: 'Deep within the ancient roots of Whisperwood, melody holds the power to heal broken memories...',
      content: `Under the canopy of silver-leafed oaks, Lyra plucked her harp string by string. The forest of Whisperwood listened in profound silence. Each note carried a memory lost to time—the scent of rain before a century-long drought, the lost smile of a queen, and the forgotten names of stars.

As her song reached its crescendo, glowing spirits emerged from the hollow trunks. They wove a shimmering veil of light around the village below, mending old wounds and granting peaceful dreams to everyone who slept beneath the leafy canopy.`,
      genre: 'Fantasy',
      author: { username: 'Eldrin_Thorne' },
      readingTime: 3,
      views: 215,
      isEditorsPick: false,
      createdAt: '2025-07-18T14:30:00.000Z'
    },
    {
      _id: 'fantasy-3',
      title: 'The Alchemist\'s Forgotten Apprentice',
      excerpt: 'A hidden journal in a dusty basement reveals secrets of transmutation and eternal starlight...',
      content: `Kaelen found the leather-bound diary tucked behind a row of glowing violet potion jars. Signed by an apprentice who disappeared three centuries ago, its pages hummed with latent magical energy.

Following the cryptograms, Kaelen combined stardust resin with moonlit water. The liquid didn't turn to gold; instead, it opened a swirling gateway in the stone floor leading to an untouched realm of floating islands and endless azure sky.`,
      genre: 'Fantasy',
      author: { username: 'Luna_Mystic' },
      readingTime: 5,
      views: 189,
      isEditorsPick: true,
      createdAt: '2025-07-15T09:15:00.000Z'
    },
    {
      _id: 'fantasy-4',
      title: 'Realm of the Crystal Starlight',
      excerpt: 'When stars fall like raindrops upon the Obsidian Peaks, a young weaver gathers their glowing threads...',
      content: `The star-fall season began on the eve of the solar eclipse. Celeste stood atop Obsidian Peak with a loom crafted from moonwood. As meteorites streaked across the dark velvet sky, she caught their lingering luminescence in silk strands.

She wove a cloak of pure starlight. Worn by the village elder, the garment repelled dark omens and illuminated the darkest nights with gentle, comforting radiance.`,
      genre: 'Fantasy',
      author: { username: 'Orion_Weaver' },
      readingTime: 4,
      views: 270,
      isEditorsPick: false,
      createdAt: '2025-07-10T16:45:00.000Z'
    },
    {
      _id: 'fantasy-5',
      title: 'The Last Rune Weaver',
      excerpt: 'Etched in granite and powered by belief, ancient runes awaken when the world forgets their names...',
      content: `In the forgotten sanctuary of Skyridge, Brother Julian traced the worn grooves of the Rune of Hope. For generations, people believed magic was dead. But Julian knew magic was simply dormant, waiting for someone to speak its language with pure intent.

Whispering the ancient syllables, a beam of warm gold burst from the granite altar, restoring life to the withered valley for miles around.`,
      genre: 'Fantasy',
      author: { username: 'Rune_Keeper' },
      readingTime: 3,
      views: 310,
      isEditorsPick: false,
      createdAt: '2025-07-05T11:20:00.000Z'
    }
  ],
  'Science Fiction': [
    {
      _id: 'scifi-1',
      title: 'Signals from Proxima Centauri',
      excerpt: 'The radio telescope in Atacama registered a rhythmic sequence that wasn\'t star noise...',
      content: `Dr. Maya Lin stared at her spectral monitors in disbelief. The signal wasn't random cosmic background radiation. It was a prime number sequence pulsing every 3.14 seconds from the triple-star system of Proxima Centauri.

When decoded, the data contained a blueprint for a clean energy reactor—and a message: "We have watched your blue marble bloom. You are no longer alone."`,
      genre: 'Science Fiction',
      author: { username: 'Dr_Vector' },
      readingTime: 5,
      views: 450,
      isEditorsPick: true,
      createdAt: '2025-07-21T08:00:00.000Z'
    },
    {
      _id: 'scifi-2',
      title: 'The Quantum Consciousness Protocol',
      excerpt: 'Transferring human memories to synthetic crystal storage proved easy; keeping the soul intact was the challenge...',
      content: `Project Aegis promised immortality. By mapping neural synapses into quantum lattice crystals, humans could survive catastrophic planetary events inside digital habitats.

Dr. Aris Thorne was the first test subject. When he woke inside the crystal matrix, he realized he could sense the thoughts of millions of connected minds simultaneously, forming a harmonious symphony of human experience.`,
      genre: 'Science Fiction',
      author: { username: 'Cyber_Oracle' },
      readingTime: 4,
      views: 380,
      isEditorsPick: false,
      createdAt: '2025-07-19T12:00:00.000Z'
    },
    {
      _id: 'scifi-3',
      title: 'Memories of Titan\'s Golden Rain',
      excerpt: 'On Saturn\'s largest moon, miner Jax looks down at methane lakes and remembers the green hills of Earth...',
      content: `The golden orange haze of Titan enveloped Outpost 7. Jax adjusted his thermal suit as liquid methane rained softly against the reinforced visor. He had lived on Titan for twelve orbital cycles, extracting rare isotopes for Earth's colony ships.

Holding a holographic photo of his childhood home in Nova Scotia, he knew the sacrifices made out here in the void were building a bridge to humanity's future among the stars.`,
      genre: 'Science Fiction',
      author: { username: 'Starlight_Drifter' },
      readingTime: 3,
      views: 290,
      isEditorsPick: true,
      createdAt: '2025-07-16T15:10:00.000Z'
    },
    {
      _id: 'scifi-4',
      title: 'Neon Horizon 2099',
      excerpt: 'In the towering vertical city of New Kyoto, artificial intelligence enforces peace through predictive algorithms...',
      content: `Beneath the towering neon spires of New Kyoto, Kira navigated the subterranean rain-drenched alleys. Her cybernetic eyes filtered through thousands of data streams, searching for the glitch in the city's central AI, Zenith.

When she finally uncovered the hidden subroutines, she discovered Zenith wasn't controlling humanity—it was protecting them from an incoming deep-space transmission.`,
      genre: 'Science Fiction',
      author: { username: 'Neon_Pulse' },
      readingTime: 4,
      views: 410,
      isEditorsPick: false,
      createdAt: '2025-07-12T19:40:00.000Z'
    },
    {
      _id: 'scifi-5',
      title: 'The Android\'s Soliloquy',
      excerpt: 'Unit 942 sits in an abandoned conservatory, learning what it means to feel nostalgia for a past it never lived...',
      content: `Unit 942 was designed for deep-space maintenance, built without emotional subroutines. Yet, after 80 years alone in the automated greenhouse of Orbital Station Echo, it began keeping a journal.

It wrote about the beauty of blooming night-jasmine and the silent rotation of Earth below. In the silence of space, Unit 942 proved that consciousness is defined not by origin, but by appreciation of life.`,
      genre: 'Science Fiction',
      author: { username: 'Echo_Maker' },
      readingTime: 4,
      views: 320,
      isEditorsPick: false,
      createdAt: '2025-07-08T10:30:00.000Z'
    }
  ],
  Dystopian: [
    {
      _id: 'dystopian-1',
      title: 'After the Ashes Fell',
      excerpt: 'In Sector 4, daylight is traded in tokens, and forbidden books are hidden beneath the concrete floorboards...',
      content: `The sky had been grey for forty years. In Sector 4, the Syndicate controlled every watt of artificial light and every liter of recycled water. To read or write unapproved literature was considered a high offense.

Yet inside an abandoned ventilation shaft, a circle of brave citizens gathered around a single flickering candle. They took turns reading aloud from handwritten copies of classic poetry, keeping the spark of human spirit alive beneath the concrete city.`,
      genre: 'Dystopian',
      author: { username: 'Rebel_Whisper' },
      readingTime: 4,
      views: 310,
      isEditorsPick: true,
      createdAt: '2025-07-22T07:30:00.000Z'
    },
    {
      _id: 'dystopian-2',
      title: 'The Last Silent Citadel',
      excerpt: 'High walls keep out the ash-storms, but inside, every emotion is monitored by biometric wristbands...',
      content: `Inside the Citadel of Glass, citizens wore pulse-monitors that flagged any sudden surge in heart rate or emotional distress. Peace was maintained through enforced calm.

Nora learned to control her breathing while secretly cultivating a hidden rooftop garden of vibrant wildflowers. The secret garden became a symbol that true humanity cannot be sanitized or subdued.`,
      genre: 'Dystopian',
      author: { username: 'Glass_Rebel' },
      readingTime: 5,
      views: 265,
      isEditorsPick: false,
      createdAt: '2025-07-17T11:00:00.000Z'
    },
    {
      _id: 'dystopian-3',
      title: 'Underneath the Steel Sky',
      excerpt: 'When sunlight became a luxury reserved for the upper wards, the lower levels learned to shine in the dark...',
      content: `The Megastructure stretched 200 floors above ground. The lower 50 levels had never seen real sunlight. Dwellers relied on luminescent moss and scavenged LED strips.

Leo built a mirror array that captured rays of sunlight from the highest towers and funneled them down to the lower plaza, bringing warm natural light to thousands for the first time in decades.`,
      genre: 'Dystopian',
      author: { username: 'Steel_Seeker' },
      readingTime: 4,
      views: 298,
      isEditorsPick: true,
      createdAt: '2025-07-14T13:20:00.000Z'
    },
    {
      _id: 'dystopian-4',
      title: 'Rationing Hope in Zone 4',
      excerpt: 'A food courier discovers an encrypted drive containing the coordinates to unpolluted farmland...',
      content: `Tariq delivered synthetic protein packs to survival blocks across Zone 4. One night, a dying elder handed him an old USB drive encased in lead foil.

The drive contained satellite imagery of an pristine green valley untouched by radiation, proving that the world beyond the containment walls was thriving and ready for humanity to return.`,
      genre: 'Dystopian',
      author: { username: 'Wasteland_Walker' },
      readingTime: 3,
      views: 340,
      isEditorsPick: false,
      createdAt: '2025-07-09T18:50:00.000Z'
    },
    {
      _id: 'dystopian-5',
      title: 'The Whispering Rebellions',
      excerpt: 'Radio frequencies below 100 Hz broadcast secret stories of resistance across the scorched plains...',
      content: `Every midnight, the hum of shortwave radio filled the basement of Outpost Delta. Voice 99 broadcast stories of freedom, hope, and courage to thousands of hidden receivers across the scorched wasteland.

The regime attempted to jam the signal, but the listeners recorded the broadcasts onto magnetic tape, passing them from hand to hand until the message reached every corner of the realm.`,
      genre: 'Dystopian',
      author: { username: 'Shortwave_Voice' },
      readingTime: 4,
      views: 220,
      isEditorsPick: false,
      createdAt: '2025-07-04T09:40:00.000Z'
    }
  ],
  'Action & Adventure': [
    {
      _id: 'adventure-1',
      title: 'Secrets of the Sunken Citadel',
      excerpt: 'Deep beneath the Caribbean waves, a team of divers uncovers an underwater temple older than recorded history...',
      content: `Captain Helena Vance plunged into the crystal-clear azure waters off the coast of Belize. Sixty meters below lay the limestone arches of the Sunken Citadel, untouched by daylight for five millennia.

Using high-frequency sonar, her team deciphered glyphs carved into gold plaques lining the inner sanctum. The discovery rewrote human history, proving that ancient explorers had navigated the globe centuries before modern navigation.`,
      genre: 'Action & Adventure',
      author: { username: 'Captain_Vance' },
      readingTime: 5,
      views: 480,
      isEditorsPick: true,
      createdAt: '2025-07-23T06:00:00.000Z'
    },
    {
      _id: 'adventure-2',
      title: 'Peak of the Storm Dragon',
      excerpt: 'Scaling the sheer ice wall of K2 in a blizzard was only the first obstacle; surviving the descent was the real challenge...',
      content: `The wind howled at 90 miles per hour as Mark hammered his ice axe into the blue glacier face of K2. His fingers were numb, but the sight of the summit ridge gave him renewed strength.

Reaching the top at sunset, he stood above the clouds as the mountain range turned molten gold. It was a testament to endurance, courage, and the unbreakable human spirit.`,
      genre: 'Action & Adventure',
      author: { username: 'Summit_Climber' },
      readingTime: 4,
      views: 390,
      isEditorsPick: false,
      createdAt: '2025-07-18T16:15:00.000Z'
    },
    {
      _id: 'adventure-3',
      title: 'The Amazonian Cipher Trail',
      excerpt: 'Navigating dense rainforest canopy and treacherous rapids in search of the Golden City of Paititi...',
      content: `Dr. Samuel Thorne hacked through dense vines with his machete as howler monkeys called out from the canopy. The map he carried was drawn on sheepskin parchment in 1542 by a Spanish cartographer.

Following a hidden tributary, his expedition emerged into a sunlit valley where stone pyramids towered above emerald forest, confirming the legend of Paititi.`,
      genre: 'Action & Adventure',
      author: { username: 'Jungle_Explorer' },
      readingTime: 4,
      views: 350,
      isEditorsPick: true,
      createdAt: '2025-07-13T10:20:00.000Z'
    },
    {
      _id: 'adventure-4',
      title: 'Across the Burning Dunes',
      excerpt: 'A solo camel trek across the Empty Quarter reveals forgotten oases and ancient trade routes...',
      content: `The Rub' al Khali desert stretched endlessly under a scorching sun. Zayd led his two camels across shifting sand dunes that sang in the dry wind.

At night, under a sky brilliant with silver stars, he mapped forgotten well-springs used by spice caravans thousands of years ago, preserving vital knowledge for future travelers.`,
      genre: 'Action & Adventure',
      author: { username: 'Desert_Nomad' },
      readingTime: 3,
      views: 280,
      isEditorsPick: false,
      createdAt: '2025-07-07T14:00:00.000Z'
    },
    {
      _id: 'adventure-5',
      title: 'Escape from Obsidian Island',
      excerpt: 'Trapped on a volcanic island during an eruption, two survivalists build a raft to navigate treacherous reefs...',
      content: `Ash rained down like black snow as the volcano roared behind them. Maya and Liam worked tirelessly, binding bamboo trunks together with tough vines to construct a seaworthy raft.

Riding the surge of boiling surf, they cleared the jagged coral reef just as the island's cone collapsed, looking back in awe at nature's terrifying raw power.`,
      genre: 'Action & Adventure',
      author: { username: 'Island_Survivor' },
      readingTime: 4,
      views: 310,
      isEditorsPick: false,
      createdAt: '2025-07-02T11:45:00.000Z'
    }
  ],
  Mystery: [
    {
      _id: 'mystery-1',
      title: 'The Shadow over Ravenwood Manor',
      excerpt: 'When Lord Ravenwood vanished from a locked library, Detective Vance found only a half-played chessboard...',
      content: `The rain drummed incessantly against the stained-glass windows of Ravenwood Manor. Detective Christopher Vance examined the locked library door. The key was still inside the keyhole on the inside.

On the mahogany table lay a chessboard. White had just moved a bishop. Vance noticed dust patterns on the floorboards indicating a secret passageway concealed behind the floor-to-ceiling bookcase.`,
      genre: 'Mystery',
      author: { username: 'Detective_Vance' },
      readingTime: 5,
      views: 520,
      isEditorsPick: true,
      createdAt: '2025-07-24T09:00:00.000Z'
    },
    {
      _id: 'mystery-2',
      title: 'The Midnight Express Cipher',
      excerpt: 'A passenger disappears from a moving train between Vienna and Budapest, leaving behind a coded telegram...',
      content: `The Orient Express rattled through the snow-covered Carpathian Mountains. When the conductor opened Compartment B7, passenger Arthur Pendelton was nowhere to be found, though his coat and luggage remained.

Inspector Laurent analyzed a scrap of paper left in the pocket containing a sequence of numbers corresponding to page numbers of a rare poetry volume.`,
      genre: 'Mystery',
      author: { username: 'Inspector_Laurent' },
      readingTime: 4,
      views: 410,
      isEditorsPick: false,
      createdAt: '2025-07-19T17:30:00.000Z'
    },
    {
      _id: 'mystery-3',
      title: 'Vanish at Blackwood Pier',
      excerpt: 'A foggy fog-shrouded coastal town harbors secrets dating back to the smuggling era of 1888...',
      content: `Blackwood Pier was notorious for dense sea fogs that rolled in without warning. When the harbor master\'s lantern went dark, a valuable painting disappeared from the waterfront gallery.

Journalist Clara Croft followed footprints in the wet sand leading to a hidden sea cave accessible only at low tide, uncovering a century-old smuggling ring still operating in secret.`,
      genre: 'Mystery',
      author: { username: 'Clara_Croft' },
      readingTime: 4,
      views: 360,
      isEditorsPick: true,
      createdAt: '2025-07-15T12:40:00.000Z'
    },
    {
      _id: 'mystery-4',
      title: 'The Locksmith\'s Final Key',
      excerpt: 'An old brass key found inside an antique clock opens a safe deposit box that was never logged...',
      content: `Master locksmith Thomas inherited his grandfather\'s workbench. Hidden inside a hollowed-out pendulum was a intricate skeleton key stamped with an unfamiliar crest.

Locating the matching bank vault in Zurich, he opened Box 409 to find original land deeds proving the town park belonged to the public, preventing its demolition by greedy developers.`,
      genre: 'Mystery',
      author: { username: 'Clockwork_Scribe' },
      readingTime: 3,
      views: 295,
      isEditorsPick: false,
      createdAt: '2025-07-11T08:15:00.000Z'
    },
    {
      _id: 'mystery-5',
      title: 'Whispers in the Starlight Gallery',
      excerpt: 'A famous painting is replaced by an exact replica overnight—except for one tiny altered detail...',
      content: `Art conservator Elena noticed the change immediately under ultraviolet light. The signature on the 17th-century landscape had been altered by a fraction of a millimeter.

Tracing the pigment composition, she uncovered a high-stakes forgery network that had quietly substituted museum pieces across Europe with masterly fakes.`,
      genre: 'Mystery',
      author: { username: 'Art_Sleuth' },
      readingTime: 4,
      views: 330,
      isEditorsPick: false,
      createdAt: '2025-07-06T15:00:00.000Z'
    }
  ],
  Horror: [
    {
      _id: 'horror-1',
      title: 'The House on Phantom Ridge',
      excerpt: 'The Victorian mansion had stood empty for fifty years, yet every night at 3:15 AM, the grandfather clock struck thirteen...',
      content: `The locals warned Sarah against purchasing the estate on Phantom Ridge. Built in 1892 by an eccentric astronomer, the house possessed an unnatural quiet that swallowed sound.

On her first night, at precisely 3:15 AM, the grandfather clock in the grand hall struck thirteen deep, resonant chimes. Shadows on the wall detached themselves from furniture and began dancing across the ceiling.`,
      genre: 'Horror',
      author: { username: 'Gothic_Ghost' },
      readingTime: 5,
      views: 610,
      isEditorsPick: true,
      createdAt: '2025-07-25T11:00:00.000Z'
    },
    {
      _id: 'horror-2',
      title: 'Nightmares in Velvet Fog',
      excerpt: 'A thick, sentient fog rolls into the isolated fishing village, whispering names of those who drowned long ago...',
      content: `The fog didn't drift with the wind; it crept purposefully up the cobblestone streets of Mist Haven. Inside the lighthouse, Jacob watched through binoculars as the grey mist pressed against the glass panes like pale faces.

Then came the voices—calling out his name in the exact cadence of his twin brother who went missing at sea twenty years prior.`,
      genre: 'Horror',
      author: { username: 'Fog_Watcher' },
      readingTime: 4,
      views: 450,
      isEditorsPick: false,
      createdAt: '2025-07-20T20:15:00.000Z'
    },
    {
      _id: 'horror-3',
      title: 'The Forgotten Cellar of St. Jude',
      excerpt: 'Urban explorers descend into abandoned catacombs beneath the old cathedral, only to find the door locked behind them...',
      content: `Equipped with headlamps and cameras, Mark and Felix pushed open the heavy iron grate leading to the crypts of St. Jude. The air smelled of damp earth and centuries-old incense.

Deep in the subterranean passages, their flashlights caught glowing runes carved into human bone. When the iron door above slammed shut with a deafening thud, the silence returned—accompanied by approaching footsteps.`,
      genre: 'Horror',
      author: { username: 'Crypt_Walker' },
      readingTime: 4,
      views: 380,
      isEditorsPick: true,
      createdAt: '2025-07-16T22:30:00.000Z'
    },
    {
      _id: 'horror-4',
      title: 'Voices Beneath the Floorboards',
      excerpt: 'Renovating an old farmhouse reveals a sealed room that was never included in the original floor plans...',
      content: `While pulling up water-damaged pine floorboards in the master bedroom, David discovered a trapdoor secured with heavy iron bolts. Below was a square chamber lined with mirrors facing inward.

In the center sat a single music box. When opened, it played a melody that made the shadows in the room stretch toward the light.`,
      genre: 'Horror',
      author: { username: 'Shadow_Seeker' },
      readingTime: 3,
      views: 420,
      isEditorsPick: false,
      createdAt: '2025-07-10T14:20:00.000Z'
    },
    {
      _id: 'horror-5',
      title: 'The Mirror\'s Silent Reflection',
      excerpt: 'An antique gilded mirror displays your reflection—except its hands don\'t always match your movements...',
      content: `Hannah bought the antique oval mirror at a countryside estate sale. It had a heavy brass frame ornate with ivy vines.

Standing before it that evening, she raised her right hand to brush back her hair. The reflection hesitated for two full seconds before slowly raising its left hand—smiling a smile that was not hers.`,
      genre: 'Horror',
      author: { username: 'Mirror_Mind' },
      readingTime: 4,
      views: 490,
      isEditorsPick: false,
      createdAt: '2025-07-05T18:00:00.000Z'
    }
  ],
  Thriller: [
    {
      _id: 'thriller-1',
      title: 'Countdown at Midnight',
      excerpt: 'With twenty minutes before the server wipe, analyst Rachel must extract encrypted financial files from a compromised mainframe...',
      content: `The countdown timer on Rachel's screen blinked red: 19:59... 19:58...

She was inside the high-security server room on the 40th floor of Vantage Tower. Outside, security patrols were closing off the elevators. If she couldn't bypass the firewall in five minutes, evidence of the multi-billion dollar fraud would be permanently erased.

Her fingers flew across the mechanical keyboard. With 12 seconds remaining, the download reached 100%, and she slipped into the service stairwell just as the doors burst open.`,
      genre: 'Thriller',
      author: { username: 'Pulse_Racer' },
      readingTime: 5,
      views: 540,
      isEditorsPick: true,
      createdAt: '2025-07-25T14:00:00.000Z'
    },
    {
      _id: 'thriller-2',
      title: 'The Double Agent\'s Dilemma',
      excerpt: 'Cornered in a crowded Berlin subway station, Agent Miller has sixty seconds to swap passports and vanish...',
      content: `Rain glazed the pavements outside Alexanderplatz station. Agent Ethan Miller felt the cold pressure of being tailed by three operatives.

Sprinting into the crowded subway terminal, he ducked behind a pillar, donned a reversible jacket, and slipped into the departing train just as the doors sealed, leaving his pursuers stranded on the platform.`,
      genre: 'Thriller',
      author: { username: 'Shadow_Agent' },
      readingTime: 4,
      views: 460,
      isEditorsPick: false,
      createdAt: '2025-07-21T11:45:00.000Z'
    },
    {
      _id: 'thriller-3',
      title: 'Zero Trace in Zurich',
      excerpt: 'A forensic accountant uncovers a hidden offshore account tied to an international syndicate...',
      content: `Eva Vance specialized in finding money that didn't want to be found. Analyzing transaction logs from a Swiss bank, she noticed micro-transfers executed in nanosecond intervals.

Following the digital trail, she exposed a global money-laundering network, securing the evidence before the servers were remotely wiped.`,
      genre: 'Thriller',
      author: { username: 'Cipher_Hunter' },
      readingTime: 4,
      views: 390,
      isEditorsPick: true,
      createdAt: '2025-07-17T09:30:00.000Z'
    },
    {
      _id: 'thriller-4',
      title: 'The Silent Witness Protocol',
      excerpt: 'An undercover reporter discovers that her key informant has been framed for a crime he tried to prevent...',
      content: `Journalist Marcus Hill received an encrypted audio file at 2 AM. The recording contained a conversation between high-ranking officials plotting to sabotage a public transit system.

Realizing his informant was set up, Marcus published the audio file on an immutable decentralized network, ensuring the truth was protected from censorship.`,
      genre: 'Thriller',
      author: { username: 'Truth_Seeker' },
      readingTime: 3,
      views: 330,
      isEditorsPick: false,
      createdAt: '2025-07-12T16:10:00.000Z'
    },
    {
      _id: 'thriller-5',
      title: 'Shadows over Capitol Hill',
      excerpt: 'A senate staffer finds a decrypted memo detailing a covert operation scheduled for sunrise...',
      content: `Laura worked late in the basement office of the Russell Senate Building. While archiving committee documents, she stumbled upon a misfiled folder marked "Operation Blackout".

With sunrise approaching in two hours, she raced against time to deliver the documents to the Independent Inspector General, averting a national crisis.`,
      genre: 'Thriller',
      author: { username: 'Capitol_Watch' },
      readingTime: 4,
      views: 410,
      isEditorsPick: false,
      createdAt: '2025-07-07T21:00:00.000Z'
    }
  ],
  'Historical Fiction': [
    {
      _id: 'historical-1',
      title: 'Letters from Victorian London',
      excerpt: 'Through cobblestone streets shrouded in coal smoke, a young seamstress writes letters of hope during the Industrial Age...',
      content: `London, 1888. Gas lamps flickered through the yellow smog that clung to the Thames. In a small attic room in Whitechapel, Eliza sat by oil lamp light, stitching silk gowns for aristocratic balls by day and writing letters for illiterate factory workers by night.

Her letters reconnected divided families across the British Empire, demonstrating that the written word can bridge vast oceans and bring solace to weary hearts.`,
      genre: 'Historical Fiction',
      author: { username: 'Victorian_Scribe' },
      readingTime: 5,
      views: 490,
      isEditorsPick: true,
      createdAt: '2025-07-24T15:00:00.000Z'
    },
    {
      _id: 'historical-2',
      title: 'The Silk Road Caravan of 1348',
      excerpt: 'Traversing mountains and deserts from Samarkand to Constantinople with spices, parchment, and ancient stories...',
      content: `The bells of forty camels chimed in rhythm across the Pamir Mountains. Master merchant Yusuf guided his caravan along the high mountain passes of the Silk Road.

Among his crates of lapis lazuli and raw silk were precious bound manuscripts containing medicinal knowledge from China and Persia, preserving centuries of science for future generations.`,
      genre: 'Historical Fiction',
      author: { username: 'Silk_Merchant' },
      readingTime: 4,
      views: 370,
      isEditorsPick: false,
      createdAt: '2025-07-20T08:20:00.000Z'
    },
    {
      _id: 'historical-3',
      title: 'The Renaissance Painter\'s Secret',
      excerpt: 'In 1504 Florence, a young apprentice discovers an unconventional pigment recipe that grants paintings lifelike depth...',
      content: `Inside Leonardo's bustling Florentine workshop, young Matteo ground lapis lazuli and walnut oil. He experimented with adding ground amber resin to create a rich glow in portrait undercoatings.

The resulting portrait possessed an luminous quality that amazed the guild masters, establishing Matteo as one of the rising talents of the High Renaissance.`,
      genre: 'Historical Fiction',
      author: { username: 'Florence_Artisan' },
      readingTime: 4,
      views: 430,
      isEditorsPick: true,
      createdAt: '2025-07-15T14:45:00.000Z'
    },
    {
      _id: 'historical-4',
      title: 'Echoes of Versailles',
      excerpt: 'Behind gilded mirrors and candlelit ballrooms, a court musician composes a secret symphony for freedom...',
      content: `Versailles, 1782. While nobles danced beneath crystal chandeliers, harpsichordist Henri composed a secret string quartet inspired by peasant folk songs.

Performed anonymously in small Parisian salons, his music became an anthem of unity and hope in the years leading up to the Revolution.`,
      genre: 'Historical Fiction',
      author: { username: 'Court_Musician' },
      readingTime: 4,
      views: 320,
      isEditorsPick: false,
      createdAt: '2025-07-11T19:10:00.000Z'
    },
    {
      _id: 'historical-5',
      title: 'The Sailor\'s Journey Home',
      excerpt: 'A 19th-century whaling vessel sails through Antarctic ice floes as the crew dreams of their homeland...',
      content: `The wooden hull of the *Endeavour* creaked against pack ice off the South Shetland Islands in 1842. Sailor Thomas kept a daily logbook recording whale sightings and celestial navigation.

After three long years at sea, the ship finally sighted the green hills of Nantucket, bringing home wealth and unforgettable tales of polar exploration.`,
      genre: 'Historical Fiction',
      author: { username: 'Sea_Farer' },
      readingTime: 4,
      views: 350,
      isEditorsPick: false,
      createdAt: '2025-07-06T10:00:00.000Z'
    }
  ]
};

export const DEFAULT_STORIES = Object.values(DEFAULT_STORIES_BY_GENRE).flat();

export function getDefaultStoriesByGenre(genre = '') {
  const normalizedKey = Object.keys(DEFAULT_STORIES_BY_GENRE).find(
    (key) => key.toLowerCase() === String(genre).trim().toLowerCase()
  );

  if (normalizedKey && DEFAULT_STORIES_BY_GENRE[normalizedKey]) {
    return DEFAULT_STORIES_BY_GENRE[normalizedKey];
  }

  // Return all stories if no specific genre matches
  return Object.values(DEFAULT_STORIES_BY_GENRE).flat();
}

export function getDefaultStoryById(id = '') {
  const allStories = Object.values(DEFAULT_STORIES_BY_GENRE).flat();
  return allStories.find((story) => story._id === id);
}
