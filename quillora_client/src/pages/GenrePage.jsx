import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GenreBanner from '../components/GenreBanner';
import ArticleCard from '../components/ArticleCard';
import { getGenreMeta, normalizeGenreName } from '../constants/genres';
import { fetchPostsByGenre } from '../services/postApi';

function ArticleSection({ title, posts, label }) {
  if (!posts.length) {
    return null;
  }

  return (
    <section className="editorsPickSection">
      <div className="editorsPickHeader">
        <h1>{title}</h1>
      </div>
      <div className="editorsPickGrid">
        {posts.map((post) => (
          <ArticleCard key={post._id} post={post} label={label} />
        ))}
      </div>
    </section>
  );
}

export default function GenrePage() {
  const { genre: genreParam } = useParams();
  const genre = normalizeGenreName(decodeURIComponent(genreParam));
  const genreMeta = getGenreMeta(genre);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPostsByGenre(genre);
        if (isMounted) {
          setPosts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message ||
              'Unable to load stories for this genre. Please try again later.',
          );
          setPosts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, [genre]);

  const editorsPicks = posts.filter((post) => post.isEditorsPick);
  const officialPosts = posts.filter((post) => post.isOfficial);
  const communityStories = posts.filter((post) => !post.isOfficial && !post.isEditorsPick);
  const latestStories = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <>
      <Header />
      <GenreBanner title={genreMeta.title} description={genreMeta.description} />

      {loading ? (
        <section className="editorsPickSection">
          <div className="editorsPickHeader">
            <p>Loading stories...</p>
          </div>
        </section>
      ) : null}

      {error ? (
        <section className="editorsPickSection">
          <div className="editorsPickHeader">
            <p>{error}</p>
          </div>
        </section>
      ) : null}

      {!loading && !error ? (
        <>
          <ArticleSection title="Editor's Picks" posts={editorsPicks} label="Editor's Pick" />
          <ArticleSection title="Official Articles" posts={officialPosts} label="Official" />
          <ArticleSection title="Community Stories" posts={communityStories} />
          <ArticleSection title="Latest Stories" posts={latestStories} />
        </>
      ) : null}

      <Footer />
    </>
  );
}
