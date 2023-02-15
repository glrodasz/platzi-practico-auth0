const Card = ({ title, description, unsplashId, releaseYear}) => {
  return (
    <div className="font-sans text-slate-300 bg-slate-700 overflow-hidden border-b-4 border-blue-500 w-full mb-10 shadow-xl">
      <img
        src={`api/images/${unsplashId}`}
        alt="People"
        className="w-full object-cover h-32 sm:h-48 md:h-64"
      />
      <div className="p-4 md:p-6">
        <p className="text-slate-400 font-semibold text-xs mb-1 leading-none">
          {releaseYear}
        </p>
        <h3 className="text-slate-100 font-semibold mb-2 text-xl leading-tight sm:leading-normal">
          {title}
        </h3>
        <div className="text-md flex items-center">
          <p className="leading-none">{ description }</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
