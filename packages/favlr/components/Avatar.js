const Avatar = () => {
  const name = "John Doe";
  const picture = `https://ui-avatars.com/api/?name=${name}`;

  return (
    <div className="flex items-center mx-2">
      <img
        className="w-8 h-8 rounded-full border border-slate-200 shadow-md"
        src={picture}
        alt={name}
      />
      <p className="ml-2 text-lg font-medium text-slate-800 dark:text-slate-200">{name}</p>
    </div>
  );
};

export default Avatar;
