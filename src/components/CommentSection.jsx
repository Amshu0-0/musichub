import { useState } from 'react';
import { supabase } from '../services/supabaseClient';

function CommentSection({ postId, comments, fetchComments }) {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return;
    const { error } = await supabase.from('comments').insert([
      { content: comment, post_id: postId }
    ]);
    if (!error) {
      setComment('');
      fetchComments();
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Write a comment..." 
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
      {comments.map((c) => (
        <div key={c.id}>
          <p>{c.content}</p>
          <small>{new Date(c.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default CommentSection;
