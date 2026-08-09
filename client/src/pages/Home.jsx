import { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const approachRef = useRef(null);

  useEffect(() => {
    approachRef.current?.classList.add('is-visible');
  }, []);

  return (
    <>
      <Header />
      <main className="hero-section">
        <div className="hero-content">
          <h1>Unheard:<br />Where Silence Finds a Voice</h1>
          <p>
            The most terrifying thing is to accept oneself completely. But until you make the unconscious conscious, it will direct your life and you will call it fate. Everyone carries a shadow, and the less it is embodied in the individual's conscious life, the blacker and denser it is. Yet, we are not what happened to us, we are what we choose to become. Your visions will become clear only when you can look into your own heart. Who looks outside, dreams; who looks inside, awakens.
          </p>
          <a href="/explore" className="cta-button">+ EXPLORE</a>
        </div>
      </main>

      <section className="approach-section" ref={approachRef}>
        <div className="approach-content">
          <h2>
            Our approach to<br />spread <span className="italic-highlight">passion</span> for bibliophiles.
          </h2>
          <p>
            Our DNA as a maker allows you to create a safe, anonymous space where users can freely express their thoughts, connect through emotions, and feel truly heard without judgment.
          </p>
        </div>
        <div className="design-build-container">
          <div className="design-part">
            <span className="design-text">Read</span>
            <p>Find your next great read</p>
          </div>
          <div className="plus-symbol">+</div>
          <div className="build-part">
            <span className="build-text">Write</span>
            <p>Share your own stories</p>
          </div>
        </div>
      </section>

      <section className="page-3">
        <div className="left3">
          <h1>
            Shared<br />
            <span className="left3-down">emotions</span><br />
            Collaborative<br />
            <span className="left3-down">space</span>
          </h1>
        </div>
        <div className="right3">
          <h1>
            Stay<br />
            <span className="right3-down">unfiltered</span><br />
            Silent<br />
            <span className="right3-down">reflections</span>
          </h1>
        </div>
        <div className="page-3-content">
          <p>
            Some feelings are too raw, too real, too honest for filters. This is your space — to think out loud, to write without fear, to read what others feel but never say. A quiet community of shared emotions, collaborative expression, and unspoken reflections. No pressure. No profiles. Just truth.
          </p>
          <a href="/about" className="cta-button">+ ABOUT</a>
        </div>
      </section>

      <div id="page4">
        <div className="left4">
          <h1>Use QUILLORA to share unfiltered thoughts and feelings.</h1>
          <h3>
            OUR<span className="page4-span"> services</span>
          </h3>
          <div className="services-table">
            <div className="table-header">
              <div className="services-title">SERVICES</div>
              <div className="expertise-title">EXPERTISE</div>
            </div>
            <div className="table-row">
              <div>The Whisper</div>
              <div>Thoughtful Guidance & Emotional Support</div>
            </div>
            <div className="table-row">
              <div>The Quill</div>
              <div>Creative Writing & Thought Sharing</div>
            </div>
            <div className="table-row">
              <div>The reader's Nook</div>
              <div>Reflective reading & Quiet Discovery</div>
            </div>
            <div className="table-row">
              <div>The Circle</div>
              <div>Anonymous Conversations & Gentle Dialogue</div>
            </div>
          </div>
          <a href="/explore" className="discover-link">+ DISCOVER ALL OUR SERVICES</a>
        </div>
        <div className="right4">
          <img src="https://m.media-amazon.com/images/S/amzn-author-media-prod/8cigckin175jtpsk3gs361r4ss.jpg" alt="Reading" width="65%" height="95%" />
          <p>"I write to escape. I read to understand. Both remind me that I am not alone.” — J.K. Rowling</p>
        </div>
      </div>

      <section className="page-5">
        <div className="page5-left">
          <h2>The Reading Room</h2>
          <p>
            Where quiet words spark loud emotions — a sanctuary for untold stories, whispered thoughts, and silent reflections. Here, every sentence is a window into someone's soul, and every reader becomes a listener to the voices that hide behind the veil of anonymity.
          </p>
          <a href="/read" className="discover-link">+ READ</a>
        </div>
        <div className="page5-right">
          <img src="https://images.unsplash.com/photo-1491309055486-24ae511c15c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Reading" />
        </div>
      </section>

      <section className="page-6">
        <div className="page6-left">
          <h2>The Writing Corner</h2>
          <p>
            Where thoughts flow without filters — a space to breathe, to release, to be. Here, you're not writing for approval or applause, but for clarity, connection, and catharsis. Each word you type is a whisper from your mind, finally free to speak without judgment.
          </p>
          <a href="/write" className="discover-link">+ WRITE</a>
        </div>
        <div className="page6-right">
          <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1000&auto=format&fit=crop" alt="Writing" />
        </div>
      </section>

      <section className="page-7">
        <div className="page7-left">
          <h2>Share Your Story</h2>
          <p>
            This is your space to express, reflect, and connect. Let your thoughts flow freely and inspire others in the community.
          </p>
          <a href="/chatrooms" className="discover-link">+ CHATROOMS</a>
        </div>
        <div className="page7-right">
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Story Sharing" />
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
