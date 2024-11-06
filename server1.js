// server.mjs
import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';

const app = express();
const port = 3001;

// read JPEGs   them using fs.promises
async function loadImage(filePath) {
  const data = await fs.readFile(filePath);
  return Buffer.from(data).toString('base64');
}

// imports with async functions
const photo1Base64 = await loadImage('./src/Assets/sample 1.jpeg');
const photo2Base64 = await loadImage('./src/Assets/sample 2.jpeg');
const photo3Base64 = await loadImage('./src/Assets/sample 3.jpeg');
const photo4Base64 = await loadImage('./src/Assets/sample 4.jpeg');
const photo5Base64 = await loadImage('./src/Assets/sample 5.jpeg');
const photo6Base64 = await loadImage('./src/Assets/sample 6.jpeg');
const photo7Base64 = await loadImage('./src/Assets/sample 7.jpeg');
const photo8Base64 = await loadImage('./src/Assets/sample 8.jpeg');
const photo9Base64 = await loadImage('./src/Assets/sample 9.jpeg');

// social media icons
const facebook = await loadImage('./src/Assets/facebook-app-symbol.png');
const instagram = await loadImage('./src/Assets/instagram.png');
const linkedin = await loadImage('./src/Assets/linkedin.png');
const pinterest = await loadImage('./src/Assets/pinterest-logo.png');
const twitter = await loadImage('./src/Assets/twitter.png');
const youtube = await loadImage('./src/Assets/youtube.png');

// other icons
const siteIcon = await loadImage('./src/Assets/woman.png');
const list = await loadImage('./src/Assets/list.png')
const close = await loadImage('./src/Assets/close.png') 

// main data

// social media links
const socialMediaLinks = [
  { id: 1, url: "https://www.facebook.com", name: "Facebook", icon: `data:image/jpeg;base64,${facebook}` },
  { id: 2, url: "https://www.twitter.com", name: "Twitter", icon: `data:image/jpeg;base64,${twitter}` },
  { id: 3, url: "https://www.instagram.com", name: "Instagram", icon: `data:image/jpeg;base64,${instagram}` },
  { id: 4, url: "https://www.linkedin.com", name: "Linkedin", icon: `data:image/jpeg;base64,${linkedin}` },
  { id: 5, url: "https://www.pinterest.com", name: "Pinterest", icon: `data:image/jpeg;base64,${pinterest}` },
  { id: 6, url: "https://www.youtube.com", name: "Youtube", icon: `data:image/jpeg;base64,${youtube}` },
] 

// site icons 
const siteIcons = [
  { id: 1, name: "Site Icon", icon: `data:image/jpeg;base64,${siteIcon}` },
  { id: 2, name: "List", icon: `data:image/jpeg;base64,${list}` },
  { id: 3, name: "Close", icon: `data:image/jpeg;base64,${close}` }

]


// posts
const posts = [
  {
    title: "What is Lorem Ipsum?",
    content: `
      Lorem Ipsum is simply dummy 
      text of the printing and typesetting industry. 
      Lorem Ipsum has been the industry's standard dummy 
      text ever since the 1500s, when an unknown printer 
      took a galley of type and scrambled it to make a type 
      specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the 1960s 
      with the release of Letraset sheets containing Lorem 
      Ipsum passages, and more recently with desktop publishing 
      software like Aldus PageMaker including versions of Lorem 
      Ipsum.
      `,
    image: `data:image/jpeg;base64,${photo1Base64}`,
    viewCount: 20,
    comments: [
      { id: 1, content: "This is a great post!" },
      { id: 2, content: "This is a great post!" },
      { id: 3, content: "This is a great post!" },
      { id: 4, content: "This is a great post!" },
      { id: 5, content: "This is a great post!" },
    ], 
    author: "John Doe",
    date: "2021-10-01",
    category: "Technology",
    tags: ["lorem", "ipsum", "dolor", "sit", "amet"]
  },
  {
    title: "Why do we use it?",
    content: `
      It is a long established fact that a reader will be 
      distracted by the readable content of a page when looking 
      at its layout. The point of using Lorem Ipsum is that it 
      has a more-or-less normal distribution of letters, as 
      opposed to using 'Content here, content here', making it 
      look like readable English. Many desktop publishing packages 
      and web page editors now use Lorem Ipsum as their default model text, 
      and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
      Various versions have evolved over the years, sometimes by accident, sometimes on purpose 
      (injected humour and the like).
      `,
    image: `data:image/jpeg;base64,${photo2Base64}`, 
    viewCount: 30,
    comments: [
      { id: 1, content: "This is a great post!" },
      { id: 2, content: "This is a great post!" },
      { id: 3, content: "This is a great post!" },
      { id: 4, content: "This is a great post!" },
      { id: 5, content: "This is a great post!" },
    ],
    author: "Jane Doe",
    date: "2021-10-02",
    category: "Technology",
    tags: ["lorem", "ipsum", "dolor", "sit", "amet"]
  },
  {
    title: "Where does it come from?",
    content: `
      Contrary to popular belief, Lorem Ipsum is not simply random text. 
      It has roots in a piece of classical Latin literature from 45 BC, making 
      it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney 
      College in Virginia, looked up one of the more obscure Latin words, consectetur, 
      from a Lorem Ipsum passage, and going through the cites of the word in classical 
      literature, discovered the undoubtable source. Lorem Ipsum comes from sections 
      1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) 
      by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very 
      popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
      comes from a line in section 1.10.32.
      `,
    image: `data:image/jpeg;base64,${photo3Base64}`,
    viewCount: 40,
    comments: [
      { id: 1, content: "This is a great post!" },
      { id: 2, content: "This is a great post!" },
      { id: 3, content: "This is a great post!" },
      { id: 4, content: "This is a great post!" },
      { id: 5, content: "This is a great post!" },
    ],
    author: "John Doe",
    date: "2021-10-03",
    category: "Technology",
    tags: ["lorem", "ipsum", "dolor", "sit", "amet"] 
  },
  {
    title: "Where can I get some?",
    content: `
      There are many variations of passages of Lorem Ipsum available, 
      but the majority have suffered alteration in some form, by injected humour, 
      or randomised words which don't look even slightly believable. If you are going 
      to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing 
      hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to 
      repeat predefined chunks as necessary, making this the first true generator on the Internet. 
      It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, 
      to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free 
      from repetition, injected humour, or non-characteristic words etc.
      `,
    image: `data:image/jpeg;base64,${photo4Base64}`, 
    viewCount: 50,
    comments: [
      { id: 1, content: "This is a great post!" },
      { id: 2, content: "This is a great post!" },
      { id: 3, content: "This is a great post!" },
      { id: 4, content: "This is a great post!" },
      { id: 5, content: "This is a great post!" },
    ],
    author: "Jane Doe",
    date: "2021-10-04",
    category: "Technology",
    tags: ["lorem", "ipsum", "dolor", "sit", "amet"] 
  },
  {
    title: "What is Lorem Ipsum?",
    content: `
      Lorem Ipsum is simply dummy 
      text of the printing and typesetting industry. 
      Lorem Ipsum has been the industry's standard dummy 
      text ever since the 1500s, when an unknown printer 
      took a galley of type and scrambled it to make a type 
      specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the 1960s 
      with the release of Letraset sheets containing Lorem 
      Ipsum passages, and more recently with desktop publishing 
      software like Aldus PageMaker including versions of Lorem 
      Ipsum.
      `,
    image: `data:image/jpeg;base64,${photo5Base64}`,
    viewCount: 70,
    comments: [
      { id: 1, content: "This is a great post!" },
      { id: 2, content: "This is a great post!" },
      { id: 3, content: "This is a great post!" },
      { id: 4, content: "This is a great post!" },
      { id: 5, content: "This is a great post!" },
    ],
    author: "John Doe",
    date: "2021-10-05",
    category: "Technology",
    tags: ["lorem", "ipsum", "dolor", "sit", "amet"] 
  },
  {
    title: "Why do we use it?",
    content: `
      It is a long established fact that a reader will be 
      distracted by the readable content of a page when looking 
      at its layout. The point of using Lorem Ipsum is that it 
      has a more-or-less normal distribution of letters, as 
      opposed to using 'Content here, content here', making it 
      look like readable English. Many desktop publishing packages 
      and web page editors now use Lorem Ipsum as their default model text, 
      and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
      Various versions have evolved over the years, sometimes by accident, sometimes on purpose 
      (injected humour and the like).
      `,
    image: `data:image/jpeg;base64,${photo6Base64}`,
    viewCount: 80,
    comments: [
      { id: 1, content: "This is a great post!" },
      { id: 2, content: "This is a great post!" },
      { id: 3, content: "This is a great post!" },
      { id: 4, content: "This is a great post!" },
      { id: 5, content: "This is a great post!" },
    ],
    author: "Jane Doe",
    date: "2021-10-06",
    category: "Technology",
    tags: ["lorem", "ipsum", "dolor", "sit", "amet"] 
  },
  {
    title: "Where does it come from?",
    content: `
      Contrary to popular belief, Lorem Ipsum is not simply random text. 
      It has roots in a piece of classical Latin literature from 45 BC, making 
      it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney 
      College in Virginia, looked up one of the more obscure Latin words, consectetur, 
      from a Lorem Ipsum passage, and going through the cites of the word in classical 
      literature, discovered the undoubtable source. Lorem Ipsum comes from sections 
      1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) 
      by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very
      popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
      comes from a line in section 1.10.32.
      `,
    image:  `data:image/jpeg;base64,${photo7Base64}`,
    viewCount: 90,
    comments: [
      { id: 1, content: "This is a great post!" },
      { id: 2, content: "This is a great post!" },
      { id: 3, content: "This is a great post!" },
      { id: 4, content: "This is a great post!" },
      { id: 5, content: "This is a great post!" },
    ],
    author: "John Doe",
    date: "2021-10-07",
    category: "Technology",
    tags: ["lorem", "ipsum", "dolor", "sit", "amet"]
  },
  {
    title: "Where can I get some?",
    content: `
      There are many variations of passages of Lorem Ipsum available, 
      but the majority have suffered alteration in some form, by injected humour, 
      or randomised words which don't look even slightly believable. If you are going 
      to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing 
      hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to 
      repeat predefined chunks as necessary, making this the first true generator on the Internet. 
      It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, 
      to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free 
      from repetition, injected humour, or non-characteristic words etc.
      `,
    image: `data:image/jpeg;base64,${photo8Base64}`,
    viewCount: 100,
    comments: [
      { id: 1, content: "This is a great post!" },
      { id: 2, content: "This is a great post!" },
      { id: 3, content: "This is a great post!" },
      { id: 4, content: "This is a great post!" },
      { id: 5, content: "This is a great post!"},
    ],
    author: "Jane Doe",
    date: "2021-10-08",
    category: "Technology",
    tags: ["lorem", "ipsum", "dolor", "sit", "amet"]
  },
  {
    title: "What is Lorem Ipsum?",
    content: `
      Lorem Ipsum is simply dummy 
      text of the printing and typesetting industry. 
      Lorem Ipsum has been the industry's standard dummy 
      text ever since the 1500s, when an unknown printer 
      took a galley of type and scrambled it to make a type 
      specimen book. It has survived not only five centuries,
      but also the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the 1960s 
      with the release of Letraset sheets containing Lorem 
      Ipsum passages, and more recently with desktop publishing 
      software like Aldus PageMaker including versions of Lorem 
      Ipsum.
      `,
    image: `data:image/jpeg;base64,${photo9Base64}`,
    viewCount: 120,
    comments: [
      { id: 1, content: "This is a great post!" },
      { id: 2, content: "This is a great post!" },
      { id: 3, content: "This is a great post!" },
      { id: 4, content: "This is a great post!" },
      { id: 5, content: "This is a great post!" },
    ],
    author: "John Doe",
    date: "2021-10-09",
    category: "Technology",
    tags: ["lorem", "ipsum", "dolor", "sit", "amet"]
  }

].sort((a, b) => b.viewCount - a.viewCount);



app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});



app.get('/', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fashion Blog</title>
    <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        font-family: Arial, sans-serif;
      }
      .message {
        text-align: center;
        padding: 20px;
        background-color: #f0f0f0;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="message">
      Welcome to the Backend API!
    </div>
  </body>
  </html>
`;
  res.send(html);
});

// Post routes
app.post('/api/posts', (req, res) => {
  const newPost = {
    ...req.body,
    id: Date.now(),
    views: 0,
    comments: []
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.post('/api/comments/:postId', (req, res) => {
  const postId = parseInt(req.params.postId);
  const newComment = {
    id: Date.now(),
    ...req.body
  };
  
  const postIndex = posts.findIndex(post => post.id === postId);
  if (postIndex !== -1) {
    posts[postIndex].comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});


// Get routes
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

app.get('/api/comments/:postId', (req, res) => {
  const postId = parseInt(req.params.postId);
  const post = posts.find(p => p.id === postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post.comments);
});

// Put routes
app.put('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === postId);
  if (index === -1) return res.status(404).json({ message: 'Post not found' });

  const updatedPost = {
    ...posts[index],
    ...req.body
  };

  posts[index] = updatedPost;
  res.json(updatedPost);
});

// Delete routes
app.delete('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === postId);
  if (index === -1) return res.status(404).json({ message: 'Post not found' });

  posts.splice(index, 1);
  res.status(204).send('Post deleted');
});

app.delete('/api/comments/:postId', (req, res) => {
  const postId = parseInt(req.params.postId);
  const postIndex = posts.findIndex(p => p.id === postId);
  
  if (postIndex !== -1) {
    posts[postIndex].comments = posts[postIndex].comments.filter(c => c.id !== parseInt(req.query.commentId));
    res.status(204).send('Comment deleted');
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});


// Social media links
app.get('/api/social-media-links', (req, res) => {
  res.json(socialMediaLinks);
});

// Site icons
app.get('/api/site-icons', (req, res) => {
  res.json(siteIcons);
});

app.get('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});