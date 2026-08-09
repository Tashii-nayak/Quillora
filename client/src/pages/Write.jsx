import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Write() {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('Fantasy');
  const [tags, setTags] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('write-notepad');
    if (saved) {
      setNote(saved);
    }
  }, []);

  const saveNote = () => {
    localStorage.setItem('write-notepad', note);

    if (note.trim()) {
      const storedWorks = JSON.parse(localStorage.getItem('my_work_posts') || '[]');
      const newWork = {
        _id: 'local_' + Date.now(),
        title: title.trim() || 'Untitled Draft',
        genre: genre || 'General',
        content: note.trim(),
        excerpt: note.trim().substring(0, 150) + '...',
        createdAt: new Date().toISOString(),
        status: 'Draft'
      };
      // Prepend to my_work_posts
      const updatedWorks = [newWork, ...storedWorks.filter(w => w.title !== newWork.title)];
      localStorage.setItem('my_work_posts', JSON.stringify(updatedWorks));
    }

    setStatus('Saved to My Work!');
    setTimeout(() => setStatus(''), 1500);
  };

  const handlePublish = async () => {
    const trimmedNote = note.trim();

    if (!trimmedNote) {
      setStatus('Please write something before publishing.');
      return;
    }

    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      if (!storedUser || !storedUser._id) {
        setStatus("Please log in before publishing.");
        navigate("/signup");
        return;
      }
      if (!title.trim()) {
        setStatus("Please enter a title.");
        return;
      }
      const payload = {
        title,
        excerpt: trimmedNote.substring(0, 180),
        content: trimmedNote,
        genre,
        tags: [],
        coverImage: "",
        author: storedUser._id
      };

      const res = await axios.post('http://localhost:3000/api/posts', payload);

      // Save to local works array for instant profile reflection
      const storedWorks = JSON.parse(localStorage.getItem('my_work_posts') || '[]');
      const publishedWork = {
        _id: res.data._id || 'pub_' + Date.now(),
        title: title.trim(),
        genre: genre || 'General',
        content: trimmedNote,
        excerpt: trimmedNote.substring(0, 150) + '...',
        createdAt: new Date().toISOString(),
        status: 'Published'
      };
      const updatedWorks = [publishedWork, ...storedWorks.filter(w => w.title !== publishedWork.title)];
      localStorage.setItem('my_work_posts', JSON.stringify(updatedWorks));

      localStorage.removeItem('write-notepad');
      setTitle("");
      setGenre("Fantasy");
      setNote('');
      setStatus('Published successfully! Added to My Work.');
    } catch (error) {
      setStatus(error.response?.data?.message || 'Failed to publish story.');
    }
  };

  return (
    <>
      <Header />
      <section className="reading-room-hero-section writing-room-hero-section">
        <div className="reading-room-hero-content">
          <h1>The Writing Corner</h1>
          <p>
            This is your blank page — no expectations, no filters, no noise. Whether it's a fleeting thought, a buried memory, or a feeling too complex to name, here you can write it out. Anonymously, safely, honestly. You don't need to be a writer. You just need to feel. Because here, every word matters — not for how it sounds, but for how true it is. Write to release. Write to understand. Write to be heard.
          </p>
          <p><strong>This is your space to let it out.</strong></p>
        </div>
      </section>

      <section className="write-moodboard">
        <div className="moodboard-header">
          <h1>What's Your Mood?</h1>
          <p>Select a mood and let your thoughts flow. Your words, your feelings, your space.</p>
        </div>
        <div className="moodboard-moods">
          <button className="mood-btn" type="button">😢 Sad</button>
          <button className="mood-btn" type="button">🌙 Nostalgic</button>
          <button className="mood-btn" type="button">😊 Happy</button>
          <button className="mood-btn" type="button">🌱 Hopeful</button>
          <button className="mood-btn" type="button">🔥 Raw</button>
        </div>
      </section>

      <section className="write-notepad-page">
        <div className="notepad-header">
          <h1>Write Freely</h1>
          <div className="notepad-actions">
            <button id="saveBtn" type="button" title="Save" aria-label="Save" onClick={saveNote}>
              💾 Save
            </button>
            <button type="button" title="Publish" aria-label="Publish" onClick={handlePublish}>
              🚀 Publish
            </button>
          </div>
        </div>
        <div className="story-details">
          <input
            type="text"
            placeholder="Enter Story Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="story-input"
          />

          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="story-select"
          >
            <option value="Fantasy">Fantasy</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Dystopian">Dystopian</option>
            <option value="Action & Adventure">Action & Adventure</option>
            <option value="Mystery">Mystery</option>
            <option value="Horror">Horror</option>
            <option value="Thriller">Thriller</option>
            <option value="Historical Fiction">Historical Fiction</option>
          </select>
        </div>
        <div className="notepad-container">
          <textarea
            id="mainNotepad"
            placeholder="Start writing here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="notepad-status" id="notepadStatus">{status}</div>
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
      <Footer />
    </>
  );
}
