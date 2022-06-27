import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import EditPost from './EditPost';
import Missing from './Missing';
import Label from './Label';
import LabelPage from './LabelPage';
import { useState, useEffect }  from 'react';
import { format } from 'date-fns';
import { appendFileSync } from 'fs';
import useAxiosFetch from './hooks/useAxiosFetch';
import api from './api/posts';

export type label = {
  name: string,
  quantity: number
  id: number
}

export type post = {
  id: number,
  title: string,
  date: string,
  body: string,
  labels: label[]
}

function App() {
  const [posts, setPosts] = useState<post[]>([]);
  // const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3501/allData');
  const [allLabels, setAllLabels] = useState<label[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
        const response2 = await api.get('/labels');
        setAllLabels(response2.data)
      }
      catch (err: any) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(err.message);
        }
      }
    }

    fetchPosts();
  }, []);

  // useEffect(() => {
  //   setAllData(data);
  //   setPosts(allData.posts);
  // }, [data]);

  const [searchResults, setSearchResults] = useState<post[]>([]);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editBody, setEditBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newLabelState, setNewLabelState] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState<label[]>([]);


  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const curdatetime = format(new Date(), "MMMM dd yyyy pp");
    const newid = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const newpost: post = {
      id: newid,
      title: title,
      date: curdatetime,
      body: body,
      labels: []
    };
    try {
      const response = await api.post('./posts', newpost);
      const updatedposts = [...posts, response.data];
      setPosts(updatedposts);
      setTitle('');
      setBody('');
      navigate('/');
    }
    catch (err: any) {
      console.log(err.message);
    }
  };
  
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/posts/${id}`);
      const newlist = (posts.filter((post) => post.id !== id));
      setPosts(newlist);
      navigate('/');
    }
    catch (err: any) {
      console.log(err.message);
    };

  };

  const handleEdit = async (id: number) => {
    const curdatetime = format(new Date(), 'MMMM dd yyyy pp');
    const newPost = {
      id,
      title: editTitle,
      date: curdatetime,
      body: editBody,
      labels: []
    };
    try {
      const response = await api.put(`/posts/${id}`, newPost);
      setPosts(posts.map(post => post.id === id ? {...response.data} : post));
      setEditTitle('');
      setEditBody('');
      navigate('/');

    }
    catch (err: any) {
      console.log(err.message);
    }

  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewLabelState(false);
    const newid = allLabels.length ? allLabels[allLabels.length - 1].id + 1 : 1;
    const newLabele: label = {
        name: newLabel,
        quantity: 0,
        id: newid
    };
    try {
      const response = await api.post('./labels', newLabele);
      const updatedLabels = [...allLabels, response.data];
      setAllLabels(updatedLabels)
      setNewLabel('');
    }
    catch (err: any) {
      console.log(err.message);
    }

  };
  useEffect(() => {
    const filteredresults = posts.filter(post => (post.title.toLowerCase()).includes(search.toLowerCase()) || (post.body.toLowerCase()).includes(search.toLowerCase()))
    if(!selectedLabels.length) {
     setSearchResults(filteredresults.reverse()); 
    }
    else {
      const checkLabels = (post1: post) => {
        (post1.labels).forEach(labele => {
          if(selectedLabels.includes(labele)) return true;
        })
        return false;
      }
      const evenmorefilteredresults = filteredresults.filter(post => checkLabels(post))
      setSearchResults(evenmorefilteredresults.reverse());
    }
  }, [posts, search, selectedLabels, allLabels]);

  return (
    <Routes>
      <Route path="/" element={ <Layout search={search} setSearch={setSearch} /> }>
        <Route index element={ <Home
                                  posts={searchResults}
                                  allLabels={allLabels}
                                  newLabel={newLabel}
                                  setNewLabel={setNewLabel}
                                  handleSubmitForm={handleSubmitForm}
                                  newLabelState={newLabelState}
                                  setNewLabelState={setNewLabelState} 
                                  selectedLabels={selectedLabels}
                                  setSelectedLabels={setSelectedLabels} /> } />
        <Route path="post">
          <Route index element={ <NewPost handleSubmit={handleSubmit} title={title} setTitle={setTitle} body={body} setBody={setBody} /> } />
          <Route path=":id" element={ <PostPage handleDelete={handleDelete} posts={posts}/> } />
        </Route>
        <Route path="edit/:id">
          <Route index element={ <EditPost posts={posts} handleEdit={handleEdit} editTitle={editTitle} setEditTitle={setEditTitle} editBody={editBody} setEditBody={setEditBody} allLabels={allLabels} /> } />
          <Route path=":id" element={ <PostPage handleDelete={handleDelete} posts={posts} /> } />
        </Route>
        <Route path="labels">
          <Route index element= { <Label allLabels={allLabels}/> } />
          <Route path=":label" element={ <LabelPage/> } />
        </Route>
        <Route path="about" element={ <About /> } />
        <Route path="*" element={ <Missing /> } />
      </Route>
    </Routes>

  );
}

export default App;
