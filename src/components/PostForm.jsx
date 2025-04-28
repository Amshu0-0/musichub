import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert('Title is required');
    const { error } = await supabase.from('posts').insert([
      { title, content, image_url: imageUrl }
    ]);
    if (error) console.error(error);
    else navigate('/');
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Title" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required 
      />
      <textarea 
        placeholder="Content (optional)" 
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Image URL (optional)" 
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit">Create Post</button>
    </form>
  );
}

export default PostForm;
