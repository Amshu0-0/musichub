import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import CommentSection from '../components/CommentSection';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const fetchPost = async () => {
    const { data } = await supabase.from('posts').select().eq('id', id).single();
    setPost(data);
  };

  const fetchComments = async () => {
    const { data } = await supabase.from('comments').select().eq('post_id', id).order('created_at', { ascending: false });
    setComments(data);
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const handleUpvote = async () => {
    const { error } = await supabase.from('posts').update({ upvotes: post.upvotes + 1 }).eq('id', id);
    if (!error) fetchPost();
  };

  const handleDelete = async () => {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (!error) navigate('/');
  };

  return post ? (
    <div className="post-detail">
      <h1>{post.title}</h1>
      {post.image_url && <img src={post.image_url} alt="Post" />}
      <p>{post.content}</p>
      <button onClick={handleUpvote}>Upvote ({post.upvotes})</button>
      <button onClick={handleDelete}>Delete Post</button>

      <CommentSection postId={id} comments={comments} fetchComments={fetchComments} />
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default PostDetail;
