import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchPostById } from '../services/postApi';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPostById(id);
        if (isMounted) {
          setPost(data);
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

  if (loading) {
    return (
      <>
        <Header />
        <div className="editorsPickHeader">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="editorsPickHeader">
          <p>{error}</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <div className="editorsPickHeader">
          <p>Story not found.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="reading-room-hero-section">
        <div className="reading-room-hero-content">
          <h1>{post.title}</h1>
          <p>{post.excerpt || post.content.slice(0, 200)}</p>
        </div>
      </section>
      <section className="editorsPickSection">
        <div className="editorsPickHeader">
          <h1>{post.genre}</h1>
          <p>{post.author?.username}</p>
        </div>
        <div className="editorsPickGrid">
          <div className="editorsPickCard">
            <p>{post.content}</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
