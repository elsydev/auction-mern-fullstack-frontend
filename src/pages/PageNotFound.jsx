const PageNotFound = () => {
    
    return (
      <>
        <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
          <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md sm:w-[600px] sm:h-[450px]">
            <h1
              className={`text-[#d6482b] text-xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl text-center`}
            >
               Page Not Found 404
            </h1>
            <p className="text-center text-stone-500">The page you are looking for is not available</p>

      </div>
      </section>
      </>
      
    )
  }
  
  export default PageNotFound