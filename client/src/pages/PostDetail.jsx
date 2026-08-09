import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchPostById } from '../services/postApi';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPostById(id);
        if (isMounted) {
          setPost(data);
          setLikeCount(data.likeCount || data.likes?.length || 15);
          setDislikeCount(data.dislikeCount || data.dislikes?.length || 2);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message ||
              'Unable to load this story. Please try again later.',
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPost();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleLike = async () => {
    if (hasLiked) return;

    setLikeCount(prev => prev + 1);
    setHasLiked(true);

    if (hasDisliked) {
      setDislikeCount(prev => Math.max(0, prev - 1));
      setHasDisliked(false);
    }

    if (id && !id.startsWith('default_') && !id.startsWith('local_')) {
      try {
        await axios.post(`http://localhost:3000/api/posts/${id}/like`);
      } catch (err) {
        console.warn('Like backend error:', err.message);
      }
    }
  };

  const handleDislike = async () => {
    if (hasDisliked) return;

    setDislikeCount(prev => prev + 1);
    setHasDisliked(true);

    if (hasLiked) {
      setLikeCount(prev => Math.max(0, prev - 1));
      setHasLiked(false);
    }

    if (id && !id.startsWith('default_') && !id.startsWith('local_')) {
      try {
        await axios.post(`http://localhost:3000/api/posts/${id}/dislike`);
      } catch (err) {
        console.warn('Dislike backend error:', err.message);
      }
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="editorsPickHeader" style={{ paddingTop: '8rem', minHeight: '50vh', color: '#fff' }}>
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Header />
        <div className="editorsPickHeader" style={{ paddingTop: '8rem', minHeight: '50vh', color: '#fff' }}>
          <p>{error || 'Story not found.'}</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="reading-room-hero-section" style={{ paddingTop: '8rem' }}>
        <div className="reading-room-hero-content">
          <h1>{post.title}</h1>
          <p>{post.excerpt || post.content?.slice(0, 200)}</p>
        </div>
      </section>

      <section className="editorsPickSection" style={{ minHeight: '60vh', padding: '3rem 2rem' }}>
        <div className="editorsPickHeader" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ background: '#bee5ea', color: '#111', padding: '0.4rem 1rem', borderRadius: '15px', fontWeight: '700', fontSize: '0.9rem' }}>
            {post.genre || 'Literature'}
          </span>
          <h3 style={{ color: '#aaa', marginTop: '1rem', fontSize: '1.1rem' }}>
            By {typeof post.author === 'object' ? post.author?.username : post.author || 'Anonymous Author'}
          </h3>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', background: '#161616', border: '1px solid #282828', borderRadius: '1.5rem', padding: '2.5rem', color: '#fff' }}>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.85', whiteSpace: 'pre-line', color: '#ddd' }}>
            {post.content}
          </p>

          {/* Interactive Likes & Dislikes Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #2a2a2a' }}>
            <span style={{ color: '#aaa', fontSize: '1rem', fontWeight: '600' }}>Did you enjoy this story?</span>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handleLike}
                style={{
                  background: hasLiked ? '#bee5ea' : '#222',
                  color: hasLiked ? '#111' : '#fff',
                  border: '1px solid #333',
                  padding: '0.7rem 1.4rem',
                  borderRadius: '0.8rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                👍 Like ({likeCount})
              </button>
              <button
                onClick={handleDislike}
                style={{
                  background: hasDisliked ? '#ef4444' : '#222',
                  color: '#fff',
                  border: '1px solid #333',
                  padding: '0.7rem 1.4rem',
                  borderRadius: '0.8rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                👎 Dislike ({dislikeCount})
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
