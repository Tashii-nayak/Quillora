import { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    aboutRef.current?.classList.add('is-visible');
  }, []);

  return (
    <div className="about-page">
      <Header />
      <main className="hero-section">
        <div className="hero-content">
          <h1>Our Story:<br />Where Words Find Their Home</h1>
          <p>
            Quillora was born from a simple yet profound belief: that every voice deserves to be heard, every story deserves to be shared, and every heart deserves to find its echo in another. We created this space as a sanctuary for the unfiltered, the unspoken, and the beautifully honest expressions of the human experience. Here, anonymity becomes freedom, and vulnerability becomes strength.
          </p>
        </div>
      </main>

      <section className="about-section" ref={aboutRef}>
        <div className="about-content">
          <h2>
            Our mission to<br />create <span className="italic-highlight">safe spaces</span>
          </h2>
          <p>
            We believe in the transformative power of shared stories and the healing that comes from knowing you're not alone in your thoughts and feelings.
          </p>
        </div>
        <div className="values-container">
          <div className="value-item">
            <span className="value-text">Privacy</span>
            <p>Your voice, your choice</p>
          </div>
          <div className="plus-symbol">+</div>
          <div className="value-item">
            <span className="value-text">Community</span>
            <p>Shared experiences</p>
          </div>
        </div>
      </section>

      <section className="about-page-4">
        <div className="about-wishpr-content">
          <h2>About Quillora</h2>
          <p>
            Quillora is not just a platform — it's a quiet revolution. Born from the idea that some thoughts are too raw for social media and too sacred for silence, Quillora is a space where voices find freedom — even in whispers. Whether you're here to write your truth, read what others can't say aloud, or simply feel a little less alone, Quillora invites you to slow down, reflect, and connect.
          </p>
          <p>This is a home for:</p>
          <ul>
            <li>unfiltered emotions,</li>
            <li>honest storytelling, and</li>
            <li>anonymous yet genuine connection.</li>
          </ul>
          <p>
            Here, there are no followers, no likes — just authenticity.
          </p>
          <p><strong>Let your thoughts breathe. Let others feel seen. Let silence speak.</strong></p>
        </div>
      </section>

      <section className="page-5">
        <div className="page5-left">
          <h2>Anonymous by Design</h2>
          <p>
            On Quillora, your voice matters—not your name. We believe that the truest emotions come out when you're free from judgment, labels, and identity. That’s why every story, thought, or whisper you share here is completely anonymous. No usernames. No followers. No pressure. Just raw honesty in a space that listens.
          </p>
        </div>
        <div className="page5-right">
          <img src="https://images.pexels.com/photos/4769486/pexels-photo-4769486.jpeg" alt="Anonymous by Design" />
        </div>
      </section>

      <section className="page-6">
        <div className="page6-left">
          <h2>The Chatrooms</h2>
          <p>
            Step into our anonymous chatrooms — safe, quiet corners where voices meet without names, and stories are shared without fear. Whether you're feeling overwhelmed, curious, inspired, or simply in need of someone who gets it, there's always a space for you here.
          </p>
        </div>
        <div className="page6-right">
          <img src="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg" alt="Chatrooms" />
        </div>
      </section>

      <section className="page-7">
        <div className="page7-left">
          <h2>The Space We Provide</h2>
          <p>
            In a world full of noise, Quillora offers stillness — a space to feel, express, and simply be. Whether you're here to read, write, or reflect, this is your quiet refuge — free from judgment, pressure, or perfection. A home for thoughts too tender for the surface, and stories that long to be heard. Here, anonymity is freedom. And your voice finally has a place.
          </p>
        </div>
        <div className="page7-right">
          <img src="https://images.pexels.com/photos/8205411/pexels-photo-8205411.jpeg" alt="Our Space" />
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
    </div>
  );
}
