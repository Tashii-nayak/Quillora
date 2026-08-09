import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const slides = [
  { title: 'Browse Your Library', genre: 'main', background: null },
  {
    title: 'Fantasy',
    genre: 'fantasy',
    background:
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1500&auto=format&fit=crop',
  },
  {
    title: 'Science Fiction',
    genre: 'scifi',
    background:
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1500&auto=format&fit=crop',
  },
  {
    title: 'Dystopian',
    genre: 'dystopian',
    background:
      'https://images.unsplash.com/photo-1604315841269-a1f298321670?w=1600&auto=format&fit=crop',
  },
  {
    title: 'Action & Adventure',
    genre: 'adventure',
    background:
      'https://images.unsplash.com/photo-1582092605221-bf4ddf388587?w=1600&auto=format&fit=crop',
  },
  {
    title: 'Mystery',
    genre: 'mystery',
    background:
      'https://images.unsplash.com/photo-1560146560-1fce47962590?q=80&w=1470&auto=format&fit=crop',
  },
  {
    title: 'Horror',
    genre: 'horror',
    background:
      'https://images.unsplash.com/photo-1481018085669-2bc6e4f00eed?q=80&w=2940&auto=format&fit=crop',
  },
  {
    title: 'Thriller & Suspense',
    genre: 'thriller',
    background:
      'https://images.unsplash.com/photo-1520683197291-667c5475ed63?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Historical Fiction',
    genre: 'historical',
    background:
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2940&auto=format&fit=crop',
  },
];

export default function Read() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  useEffect(() => {
    const loadStories = async () => {
      if (!hasMore && page > 1) return;

      setLoading(true);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/posts/latest`,
          {
            params: {
              page,
              limit: 3,
            },
          }
        );

        const newPosts = response.data.posts || [];
        const more = response.data.hasMore || false;

        setStories((prev) =>
          page === 1 ? newPosts : [...prev, ...newPosts]
        );

        setHasMore(more);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, [page]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <Header />
      <section className="reading-room-hero-section">
        <div className="reading-room-hero-content">
          <h1>The Reading Room</h1>
          <p>
            Step into a quiet world where stories breathe and emotions linger. This is more than just a place to read — it's a space to listen. To the unspoken thoughts of strangers, the whispered truths behind anonymous voices, and the raw, vulnerable expressions that rarely find a stage elsewhere. From poetic fragments and journal-like entries to soul-baring monologues and midnight musings — every piece here is real, untamed, and human. You're not just reading. You're witnessing. Feeling. Connecting.
            <br />
            <strong>Let the silence between the lines speak to you.</strong>
          </p>
        </div>
      </section>

      <section className="editorsPickSection">
        <div className="editorsPickHeader">
          <h1>Pinned Reads / Editor's Pick</h1>
          <p>
            Discover this week's standout pieces, handpicked by our editors for their honesty, beauty, and emotional resonance.
          </p>
        </div>
        <div className="editorsPickGrid">
          <div className="editorsPickCard">
            <h2>"The Quiet Between"</h2>
            <p>
              Sometimes, the loudest feelings are the ones we never say aloud. In the hush of midnight, I write what I cannot speak—hoping someone, somewhere, will understand the silence between my words.
            </p>
            <span className="editorsPickLabel">Editor's Pick</span>
          </div>
          <div className="editorsPickCard">
            <h2>"Unsent Letters"</h2>
            <p>
              I write to you, though you'll never read these lines. Each word is a wish, a memory, a hope that maybe letting go is just another way of holding on.
            </p>
            <span className="editorsPickLabel">Pinned Read</span>
          </div>
          <div className="editorsPickCard">
            <h2>"Fragments of Light"</h2>
            <p>
              Even on the darkest days, I find pieces of myself in the stories of strangers. We are all searching for a little light, and sometimes, we find it in each other's words.
            </p>
            <span className="editorsPickLabel">Editor's Pick</span>
          </div>
        </div>
      </section>

      <div className="library-slider">
        <button className="library-arrow left" type="button" aria-label="Previous Slide" onClick={prevSlide}>
          &#8592;
        </button>
        {slides.map((slide, index) => (
          <section
            key={slide.genre}
            className={`library-slide${index === activeIndex ? ' active' : ''}`}
            onClick={() => {
              if (slide.genre !== 'main') {
                navigate(`/read/${encodeURIComponent(slide.genre)}`);
              }
            }}
            style={{
              cursor: slide.genre !== 'main' ? 'pointer' : 'default',
              ...(slide.background ? { backgroundImage: `url('${slide.background}')` } : {})
            }}
          >
            <h1 className="library-heading">{slide.title}</h1>
            {slide.genre !== 'main' && (
              <button
                type="button"
                className="latestStories-button"
                style={{ marginTop: '1rem', cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/read/${encodeURIComponent(slide.genre)}`);
                }}
              >
                Explore {slide.title} Stories &rarr;
              </button>
            )}
          </section>
        ))}
        <button className="library-arrow right" type="button" aria-label="Next Slide" onClick={nextSlide}>
          &#8594;
        </button>
      </div>

      <section className="latestStories-section">
        <div className="latestStories-container">
          <div className="latestStories-header">
            <h1>Latest Stories</h1>
            <p>Fresh voices, newest thoughts, and the most recent pieces from the Quillora community.</p>
          </div>
          <div className="latestStories-grid">
            {stories.length > 0 ? (
              stories.map((story) => (
                <article
                  key={story._id}
                  className="latestStories-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/read/post/${story._id}`)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      navigate(`/read/post/${story._id}`);
                    }
                  }}
                >
                  {story.coverImage ? (
                    <img src={story.coverImage} alt={story.title} className="latestStories-image" />
                  ) : (
                    <div className="latestStories-imagePlaceholder" />
                  )}
                  <div className="latestStories-content">
                    <h3 className="latestStories-title">{story.title}</h3>
                    <p className="latestStories-excerpt">
                      {story.excerpt ||
                        (story.content
                          ? `${story.content.substring(0, 180)}...`
                          : "No preview available.")}
                    </p>

                    <div className="latestStories-meta">
                      <span className="latestStories-author">
                        {story.author?.username || "Anonymous"}
                      </span>

                      <span className="latestStories-genre">
                        {story.genre}
                      </span>
                    </div>

                    <div className="latestStories-footer">
                      <span> {story.readingTime || 1} min</span>

                      <span> {story.views || 0}</span>

                      <span>
                        {story.createdAt
                          ? new Date(story.createdAt).toLocaleDateString()
                          : ""}
                      </span>
                    </div>

                    <button
                        type="button"
                        className="latestStories-readMore"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/read/post/${story._id}`);
                        }}
                    >
                      Read Story →
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="latestStories-noStories">
                  <h2> No stories available</h2>
                  <p>
                      Be the first member of Quillora to publish a story.
                  </p>
              </div>
            )}
          </div>
          {loading && (
              <div className="latestStories-loading">
                  <h2>Loading stories...</h2>
              </div>
          )}
          {hasMore && !loading && stories.length > 0 && (
            <div className="latestStories-loadMore">
              <button type="button" className="latestStories-button" onClick={handleLoadMore}>
                Load More
              </button>
            </div>
          )}
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

