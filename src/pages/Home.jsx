import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);
  const [orderBy, setOrderBy] = useState('created_at');
  const [search, setSearch] = useState('');

  const fetchPosts = async () => {
    let { data } = await supabase
      .from('posts')
      .select()
      .order(orderBy, { ascending: false });

    if (search) {
      data = data.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));
    }

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, [orderBy, search]);

  return (
    <div className="home-page">
      <h1>MusicHub Feed</h1>

      <div className="controls">
        <select onChange={(e) => setOrderBy(e.target.value)}>
          <option value="created_at">Newest</option>
          <option value="upvotes">Most Upvoted</option>
        </select>
        <input 
          type="text" 
          placeholder="Search by Title..." 
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>

      <div className="posts-list">
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}

export default Home;
