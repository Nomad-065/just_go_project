import {Link} from "react-router-dom";

const HomePage = () => {
  return (
    <div
      className="flex w-full h-full flex-col items-center justify-center min-h-screen bg-white dark:bg-neutral-500 px-4 gap-3 animate-fadeIn">
      <h1 className="text-4xl md:text-5xl font-bold  text-center mb-4">
        Welcome to our new
      </h1>
      <div className="flex items-center justify-center rounded-full bg-justgo-green p-4">
        <p className="text-2xl md:text-3xl font-semibold text-white text-center">
          Online Product Warehouse
        </p>
      </div>

      <p className="text-center max-w-xl mb-8">
        Discover a wide range of products with seamless browsing and fast checkout.
        Start exploring our warehouse today!
      </p>

      <Link
        to="/products"
        className="px-8 py-3 bg-justgo-purple text-white font-semibold rounded-lg shadow-lg hover:bg-justgo-blue transition-all transform hover:scale-105"
      >
        Get Started
      </Link>
      {/*<PrimaryButton*/}
      {/*  slim*/}
      {/*  className={'w-30'}*/}
      {/*  icon={ArrowRight}>*/}
      {/*  Get Started*/}
      {/*</PrimaryButton>*/}
      {/*<OutlineButton*/}
      {/*  slim*/}
      {/*  className={'w-30'}*/}
      {/*  icon={ArrowRight}>*/}
      {/*  Get Started*/}
      {/*</OutlineButton>*/}
      {/*<GhostButton*/}
      {/*  slim*/}
      {/*  className={'w-30'}*/}
      {/*  icon={ArrowRight}>*/}
      {/*  Get Started*/}
      {/*</GhostButton>*/}
    </div>
  );
};

export default HomePage;
