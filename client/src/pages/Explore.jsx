import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const moodReadings = {
  sad: [
    '“Even the darkest night will end and the sun will rise.” — Victor Hugo',
  ],
  nostalgic: [
    '“Sometimes you will never know the value of a moment until it becomes a memory.” — Dr. Seuss',
  ],
  happy: [
    '“Happiness is only real when shared.” — Jon Krakauer',
  ],
  hopeful: [
    '“Once you choose hope, anything’s possible.” — Christopher Reeve',
  ],
  raw: [
    '“What happens when people open their hearts? They get better.” — Haruki Murakami',
  ],
};

const moodButtons = [
  { mood: 'sad', label: '😢 Sad' },
  { mood: 'nostalgic', label: '🌙 Nostalgic' },
  { mood: 'happy', label: '😊 Happy' },
  { mood: 'hopeful', label: '🌱 Hopeful' },
  { mood: 'raw', label: '🔥 Raw' },
];

export default function Explore() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [showMoodPanel, setShowMoodPanel] = useState(false);

  const readings = useMemo(
    () => (selectedMood ? moodReadings[selectedMood] : []),
    [selectedMood],
  );

  useEffect(() => {
    if (selectedMood) {
      setShowMoodPanel(true);
    }
  }, [selectedMood]);

  return (
    <>
      <Header />
      <main className="hero-section">
        <div className="hero-content">
          <h1>Discover:<br />Where Stories Come Alive</h1>
          <p>
            Embark on a journey through the vast landscape of human expression. Every story is a window into another soul, every word a bridge between hearts. Here, you'll find tales that resonate, thoughts that inspire, and voices that echo your own deepest feelings. Let curiosity be your guide as you navigate through the rich tapestry of shared experiences.
          </p>
        </div>
      </main>

      <section className="curated-collections-section">
        <div className="thematic-banners">
          <div className="banner">Inspiration</div>
          <div className="banner">Healing</div>
          <div className="banner">Adventure</div>
          <div className="banner">Reflection</div>
          <div className="banner">Growth</div>
        </div>

        <div className="collections-header">
          <h2 style={{ color: 'black' }}>Curated Collections</h2>
          <p>
            Discover select writings and readings gathered under powerful themes. Click a collection to explore content that resonates with your mood or interest.
          </p>
        </div>
        <div className="collections-grid">
          <a className="collection-card" href="#">
            <div
              className="collection-image"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1455058683937-c45857082982?q=80&w=2206&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              }}
            />
            <div className="collection-title">Finding Light</div>
            <div className="collection-desc">Stories of hope and inspiration</div>
          </a>
          <a className="collection-card" href="#">
            <div
              className="collection-image"
              style={{
                backgroundImage:
                  "url('https://plus.unsplash.com/premium_photo-1677396921317-5398bbe55a68?q=80&w=2101&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              }}
            />
            <div className="collection-title">Journeys Within</div>
            <div className="collection-desc">Reflections and self-discovery</div>
          </a>
          <a className="collection-card" href="#">
            <div
              className="collection-image"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1483691278019-cb7253bee49f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              }}
            />
            <div className="collection-title">Healing Words</div>
            <div className="collection-desc">Comfort for the soul</div>
          </a>
          <a className="collection-card" href="#">
            <div
              className="collection-image"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1492879291357-620e858bd26a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              }}
            />
            <div className="collection-title">Bold Voices</div>
            <div className="collection-desc">Empowering perspectives</div>
          </a>
        </div>
      </section>

      <section className="explore-mood-selector">
        <h2>Select Your Mood</h2>
        <div className="mood-buttons">
          {moodButtons.map((item) => (
            <button
              key={item.mood}
              className="mood-btn"
              type="button"
              onClick={() => setSelectedMood(item.mood)}
            >
              {item.label}
            </button>
          ))}
        </div>
        {showMoodPanel && (
          <div className="mood-content" id="moodContent" style={{ display: 'flex' }}>
            <div className="notepad-block">
              <h3>Write your thoughts</h3>
              <textarea id="notepad" placeholder="Start writing..." />
            </div>
            <div className="reading-list-block">
              <h3>Readings for <span id="moodLabel">{selectedMood}</span></h3>
              <ul id="readingList">
                {readings.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <button className="close-mood-content" type="button" onClick={() => setShowMoodPanel(false)}>
              Close
            </button>
          </div>
        )}
      </section>

      <section className="explore-features-showcase">
        <div className="features-header">
          <h2>Discover What Quillora Offers</h2>
          <p>Explore the platform's core features — all in one place, no navigation needed.</p>
        </div>
        <div className="features-list">
          <div className="feature-card">
            <h3>Write Without Judgment</h3>
            <p>A safe, anonymous space to pour your heart out. No names, no filters — just your truth.</p>
          </div>
          <div className="feature-card">
            <h3>Read to Feel Understood</h3>
            <p>Discover raw, real voices from others like you. Find comfort in shared silence and spoken scars.</p>
          </div>
          <div className="feature-card">
            <h3>Chat Anonymously</h3>
            <p>Dive into quiet conversations. Listen. Whisper. Connect.</p>
          </div>
        </div>
      </section>

      <section className="reading-writing-journeys">
        <div className="journeys-header">
          <h2>Reading & Writing Journeys</h2>
          <p>Visual story paths to guide your creative and reading adventures</p>
        </div>
        <div className="journeys-container">
          <div className="journey-card writing-journey">
            <h3>Writing Journey</h3>
            <div className="journey-path">
              <div className="journey-step">
                <div className="step-icon">✍️</div>
                <div className="step-content">
                  <h4>Start Writing</h4>
                  <p>Begin your story with a blank canvas</p>
                </div>
              </div>
              <div className="journey-arrow">→</div>
              <div className="journey-step">
                <div className="step-icon">💾</div>
                <div className="step-content">
                  <h4>Save</h4>
                  <p>Keep your thoughts safe and private</p>
                </div>
              </div>
              <div className="journey-arrow">→</div>
              <div className="journey-step">
                <div className="step-icon">🔄</div>
                <div className="step-content">
                  <h4>Revisit</h4>
                  <p>Return to refine and evolve</p>
                </div>
              </div>
              <div className="journey-arrow">→</div>
              <div className="journey-step">
                <div className="step-icon">📤</div>
                <div className="step-content">
                  <h4>Optionally Share</h4>
                  <p>Connect with others when ready</p>
                </div>
              </div>
            </div>
          </div>
          <div className="journey-card reading-journey">
            <h3>Reading Journey</h3>
            <div className="journey-path">
              <div className="journey-step">
                <div className="step-icon">📚</div>
                <div className="step-content">
                  <h4>Browse Reads</h4>
                  <p>Explore diverse voices and stories</p>
                </div>
              </div>
              <div className="journey-arrow">→</div>
              <div className="journey-step">
                <div className="step-icon">🎭</div>
                <div className="step-content">
                  <h4>Choose Mood</h4>
                  <p>Find content that matches your feeling</p>
                </div>
              </div>
              <div className="journey-arrow">→</div>
              <div className="journey-step">
                <div className="step-icon">📖</div>
                <div className="step-content">
                  <h4>Read</h4>
                  <p>Immerse yourself in the story</p>
                </div>
              </div>
              <div className="journey-arrow">→</div>
              <div className="journey-step">
                <div className="step-icon">🔖</div>
                <div className="step-content">
                  <h4>Bookmark/Respond</h4>
                  <p>Save favorites or share your thoughts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-left">
          <h2>
            <span className="contact-italic">Let's shape your<br />atmosphere</span> <span className="contact-bold">together</span>
          </h2>
          <hr className="contact-divider" />
          <div className="contact-info">
            <p>contact@quillora.com</p>
            <p>+91 12342 56565</p>
          </div>
        </div>
        <div className="contact-right">
          <span className="contact-title">Quillora<span className="logo-subtext"> Love Bibliophile</span></span>
        </div>
      </section>
      <div className="crosshair"></div>
      <Footer />
    </>
  );
}
