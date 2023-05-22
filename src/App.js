
import { BrowserRouter, Route, Routes, Link, Outlet, useParams } from 'react-router-dom';
import  './App.css'
 
const Main = () => {
  return(
       <>
         <h1 style={{textAlign:"center"}}>Main Page</h1>
         <h2 style={{color:"green",
          backgroundColor:"yellow",
           fontSize:30+'px',
           fontWeight:700,
           textAlign: 'center'}}>Javascript tutorial</h2>
         
       </>
       
    )
   
};
  
const About = () => <h1 style={{textAlign:"center"}}>About Page</h1>;



const Help = ({ articles }) => {
  

  return (
    <>
      <div className='helpContainer'>
        <h2>Help Articles</h2>
        <ul style={{ listStyleType: 'none' }}>
          {articles.map((article, index) => (
            <li key={index}>
              <Link to={`/help/${article.slug}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
       
      </div>
      <Outlet />
      
      
    </>
  );
};

const Article = ({articles}) => {

   const { slug } = useParams();
   
   const article = articles.find((article) => article.slug === slug);

   if(!article) {
    return <h1>Article is not found</h1>;
   }

   const { title, description } = article;

  return (
    <>
    <div className='infoContainer'>
      <h3>{title}</h3>
      <p>{description}</p>
      
      <Link to="/help">Go back to Help</Link>
    </div>
    
    </>
    
  );
};



function App() {

  const articles = [
    {
      title: 'JavaScript Arrays',
      slug: 'arrays',
      description: 'Arrays in JavaScript allow you to store and manipulate collections of data.',
    },
    {
      title: 'JavaScript Objects',
      slug: 'objects',
      description: 'Objects in JavaScript are used to represent structured data and store key-value pairs.',
    },
    {
      title: 'JavaScript Functions',
      slug: 'functions',
      description: 'Functions in JavaScript are reusable blocks of code that perform specific tasks.',
    },
  ];


  return (
    <>
      
    <BrowserRouter>
       <nav>
        <ul style={{listStyleType:'none'}}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/help">Help</Link>
          </li>
        </ul>
       </nav>
    
      <Routes>

        <Route path='/' element={<Main />} />
        <Route path='/about' element={<About />} />
        <Route path='/help/' element={<Help articles={articles}/>}>
          <Route path=":slug" element={<Article articles={articles}/>} />
        </Route>
        <Route path='*' element={<NotFound />} />

      </Routes>
        
    </BrowserRouter>
        
    </>
    

  );
};

const NotFound = () => <h1>404 - Not Found</h1>;

export default App;

