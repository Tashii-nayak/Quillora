import { useNavigate } from 'react-router-dom';

export default function ArticleCard({ post, label }) {
  const navigate = useNavigate();

  const openPost = () => {
    navigate(`/read/post/${post._id}`);
  };

  return (
    <div
      className="editorsPickCard"
      role="button"
      tabIndex={0}
      onClick={openPost}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openPost();
        }
      }}
    >
      <h2>{post.title}</h2>
      <p>{post.excerpt || post.content?.slice(0, 140)}</p>
      {label ? <span className="editorsPickLabel">{label}</span> : null}
    </div>
  );
}
