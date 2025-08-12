

type Iprops = {};

const LoadingSpinner: React.FC<Iprops> = () => {
  return (
    <div className="loading-container">
      <span className="loader"></span>
    </div>
  );
};

export default LoadingSpinner;
