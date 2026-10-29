const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="
        fixed inset-0 z-50 bg-gray-100 backdrop-blur-md
        flex items-center justify-center justify-center flex-col gap-10"
    >
        <div className="
            h-12 w-12 animate-spin rounded-full 
            border-6 border-black/20 border-t-blue-600" />
        <p className="text-sm font-medium tracking-wide drop-shadow-md capitalize">
          {text}
        </p>
      </div>
  );
};

export default Loading;