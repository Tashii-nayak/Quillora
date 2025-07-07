document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.main-header');
    // No scroll indicator or scroll dot
    const crosshair = document.querySelector('.crosshair');
    // Include about-section and curated-collections-section in the scroll observer
    const sections = document.querySelectorAll('.hero-section, .approach-section, .explore-section, .about-section, .curated-collections-section, .page-3, #page4, .page-5, .page-6, .page-7');

    // Hide crosshair on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > window.innerHeight / 2) {
            crosshair.classList.add('hidden');
        } else {
            crosshair.classList.remove('hidden');
        }
    });
    // Animate .approach-section, .explore-section, .about-section, and .curated-collections-section text
    const slideInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.5
    });

    const approachSection = document.querySelector('.approach-section');
    const exploreSection = document.querySelector('.explore-section');
    const aboutSection = document.querySelector('.about-section');
    const curatedCollectionsSection = document.querySelector('.curated-collections-section');
    const readingRoomHeroSection = document.querySelector('.reading-room-hero-section');
    
    if (approachSection) {
        slideInObserver.observe(approachSection);
    }
    if (exploreSection) {
        slideInObserver.observe(exploreSection);
    }
    if (aboutSection) {
        slideInObserver.observe(aboutSection);
    }
    if (curatedCollectionsSection) {
        slideInObserver.observe(curatedCollectionsSection);
    }
    if (readingRoomHeroSection) {
        slideInObserver.observe(readingRoomHeroSection);
    }

    // Change header style based on section
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (
                    entry.target.classList.contains('approach-section') ||
                    entry.target.classList.contains('explore-section') ||
                    entry.target.classList.contains('about-section') ||
                    entry.target.classList.contains('curated-collections-section') ||
                    entry.target.id === 'page4' ||
                    entry.target.classList.contains('page-5') ||
                    entry.target.classList.contains('page-6') ||
                    entry.target.classList.contains('page-7')
                ) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        });
    }, {
        threshold: 0.5
    });

    sections.forEach(section => {
        if(section) headerObserver.observe(section);
    });

    const moodBtns = document.querySelectorAll('.mood-btn');
    const moodContent = document.getElementById('moodContent');
    const moodLabel = document.getElementById('moodLabel');
    const readingList = document.getElementById('readingList');
    const closeMoodContent = document.getElementById('closeMoodContent');

    // Example readings for each mood
    const readings = {
        sad: [
            "“Even the darkest night will end and the sun will rise.” — Victor Hugo"
        ],
        nostalgic: [
            "“Sometimes you will never know the value of a moment until it becomes a memory.” — Dr. Seuss"
        ],
        happy: [
            "“Happiness is only real when shared.” — Jon Krakauer"
        ],
        hopeful: [
            "“Once you choose hope, anything's possible.” — Christopher Reeve"
        ],
        raw: [
            "“What happens when people open their hearts? They get better.” — Haruki Murakami"
        ]
    };

    moodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const mood = btn.getAttribute('data-mood');
            moodLabel.textContent = btn.textContent;
            readingList.innerHTML = '';
            readings[mood].forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                readingList.appendChild(li);
            });
            moodContent.style.display = 'flex';
        });
    });

    if (closeMoodContent) {
        closeMoodContent.addEventListener('click', function() {
            moodContent.style.display = 'none';
        });
    }
    // Library slider manual navigation for read section page 2
    (function() {
        const slides = Array.from(document.querySelectorAll('.library-slide'));
        const leftArrow = document.querySelector('.library-arrow.left');
        const rightArrow = document.querySelector('.library-arrow.right');
        let current = 0;
        function showSlide(idx) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === idx);
            });
            current = idx;
        }
        leftArrow.addEventListener('click', () => {
            let prev = (current - 1 + slides.length) % slides.length;
            showSlide(prev);
        });
        rightArrow.addEventListener('click', () => {
            let next = (current + 1) % slides.length;
            showSlide(next);
        });
        showSlide(0);
    })();

    // Notepad with Save only
    const textarea = document.getElementById('mainNotepad');
    const saveBtn = document.getElementById('saveBtn');
    const status = document.getElementById('notepadStatus');

    // Load saved note
    const saved = localStorage.getItem('write-notepad');
    if (saved) {
        textarea.value = saved;
    }

    saveBtn.addEventListener('click', () => {
        localStorage.setItem('write-notepad', textarea.value);
        status.textContent = 'Saved!';
        setTimeout(() => status.textContent = '', 1500);
    });
});


 