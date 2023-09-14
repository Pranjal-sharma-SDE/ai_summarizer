

function Hero() {
  return (
    <header className="w-full flex justify-center items-center flex-col">
        <nav className="flex justify-between items-center flex-row w-full p-4 pb-16">
        <img src="https://res.cloudinary.com/dqhyudo4x/image/upload/v1693680692/ai/logo_dhbuex.svg" alt="logo" className="w- object-contain"/>

        <button type="button" onClick={()=> window.open('https://github.com/Pranjal-sharma-SDE')} className="black_btn" >Git Hub</button>
          
        </nav>
        <h1 className="head_text"> Summarize Articles with <br className="max-md:hidden"/> 
        <span className="orange_gradient"> Palm - Text Bison</span>
        </h1>
        <h2 className="desc">
            Simplify your work with <span className="orange_gradient">AI.</span>
        </h2>
         </header>
  )
}

export default Hero
