import { useState, useRef, useEffect } from "react";
import { db } from "./firebaseInit";
import { collection, addDoc,onSnapshot, doc, deleteDoc } from "firebase/firestore"; 

// function reduceBlog(state, action){
//     switch(action.type){
//         case "ADD":
//             return [action.blog,...state];
//             case "REMOVE":
//                 return state.filter((blog,index)=>index!==action.index);
//                 default:
//                     return [];

//     }
// }

export default function Blog(){
// const [title, setTitle]=useState("");
// const [content, setContent]=useState("");
const [formData, setFromData]=useState({title:"", content:""})
const [blogarr, setBlogarr]=useState([]);
//const [blogs, dispatch]=useReducer(reduceBlog, []);
const titleRef=useRef(null);

useEffect(()=>{
    if(blogarr.length){
        document.title=blogarr[0].title;
    }
});
useEffect(()=>{
    // async function fetchData(){
    //     const snapshot=await getDocs(collection(db, "blogs"));
    //    const totalBlogs= snapshot.docs.map((doc)=>{
    //        return{ id:doc.id,
    //         ...doc.data()
    //     }
    //     })
    //   setBlogarr(totalBlogs);
        
    // }
    // fetchData();
    const unsub=onSnapshot(collection(db,"blogs"),(snapshot)=>{
        const totalBlogs= snapshot.docs.map((doc)=>{
                   return{
                     id:doc.id,
                    ...doc.data()
                   }
                })
              setBlogarr(totalBlogs);
            })
},[])

async function handleSubmit(e){
    e.preventDefault();
   // setBlogarr([{title:formData.title, content:formData.content},...blogarr])
   // dispatch({type:"ADD", blog:{title:formData.title, content:formData.content}})
    // Add a new document with a generated id.
   await addDoc(collection(db, "blogs"), {
    title: formData.title,
    content: formData.content,
    createdOn:new Date()
  });
   setFromData({title:"", content:""})
   titleRef.current.focus();
}
async function removeBlog(id){
    // setBlogarr(blogarr.filter((data,index)=>i!==index));
    const docRef=doc(db, 'blogs',id);
    await deleteDoc(docRef);
    
}
    return(<>
    <h1 className="heading">Write a Blog!!</h1>
    <div className="section">
        <form onSubmit={handleSubmit}>
            <div className="title">
<h1>Title</h1>
                <input className="input" placeholder="enter the title here.."
                value={formData.title}
                ref={titleRef}
                required
                onChange={(e)=>setFromData({title:e.target.value, content:formData.content})}
                />

            </div>
            <hr/>
     <div className="content">
     <h1>Content</h1>
     <textarea className="inputcontent" placeholder="Content goes here.."
     value={formData.content}
     required
     onChange={(e)=>setFromData({title:formData.title, content:e.target.value})}
     />
                
      </div>
      
      <button className="btn">Add</button>
        </form>
    </div>
    <hr/>
    <h1 className="blog">Blog's</h1>
    {
        blogarr.map((blogdata,i)=>(
           <div className="datablog" key={i}>
             <h2 className="titlehead">Title:-{blogdata.title}</h2>
             <hr/>
             <p className="para">{blogdata.content}</p>
             <div>
                <button className="delete" onClick={()=>removeBlog(blogdata.id)}>delete</button>
             </div>
           </div>
        ))
    }
    </>)
}