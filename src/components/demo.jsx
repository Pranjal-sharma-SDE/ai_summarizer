import { useState, useEffect } from "react"
import { useLazyGetSummaryQuery } from "../services/article";

function Demo() {

  useEffect(() => {
    const articleFromLocaltorage=JSON.parse(localStorage.getItem('article'));
  
    if(articleFromLocaltorage){
      setArticle(articleFromLocaltorage);
    }
  },[]) 

  const [article, setArticle] = useState({
    url:'',
    summary:''
    });
    const[allArticle,setAllArticle] = useState([]);

    const [getSummary,{error,isFetching}] = useLazyGetSummaryQuery();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const {data}=await getSummary({articleUrl:article.url});

      if(data?.summary){
        const newArticle = {...article, summary:data.summary};
           const updatedNewAricles=[newArticle,...allArticle]
          
        setArticle(newArticle);
        setAllArticle(updatedNewAricles);

        localStorage.setItem('article',JSON.stringify(updatedAllAricles));
        console.log(newArticle);
      }
    }

  return (
    <section className="mt-16 w-full max-w-xl">

        <div className="flex flex-col w-full gap-2">
            <form className="relative flex justify-center items-center" 
            onSubmit={handleSubmit}

            >
              <img src='https://res.cloudinary.com/dqhyudo4x/image/upload/v1693680693/ai/link_wnfwya.svg' alt="" className="absolute left-0 my-2 ml-3 w-5" />
              <input type="url" className="url_input peer" placeholder="Paste the link here" value={article.url} 
              onChange={(e)=>{ setArticle({...article, url:e.target.value})}}
              required
              />
             <button type="submit" className="submit_btn 
             peer-focus:border-gray-700 
             peer-focus:text-gray-700
             ">↵</button>
            </form>

            {/* Browse URL History */}
           <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
            {allArticle.map((article,index)=>(
              <div key={`link-${index}`} onClick={()=>setArticle(article)} className="link_card">
                   <div className="copy_btn">
                    <img 
                    src='https://res.cloudinary.com/dqhyudo4x/image/upload/v1693680692/ai/copy_s2nulg.svg' alt="" className="w-[40%] h-[40%] object-contain" />
                    <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                      {article.url}
                    </p>

                    </div>
                </div>
            ))}
           </div>

        </div>

        <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img src='https://res.cloudinary.com/dqhyudo4x/image/upload/v1693680693/ai/loader_coruoi.svg' alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Well, that wasn't supposed to happen...
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>

    </section>
  )
}

export default Demo
