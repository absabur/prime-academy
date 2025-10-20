const ErrorPage = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen w-vw flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold">Something went wrong!</h1>
      <pre style={{ color: "red" }}>{error?.message}</pre>
    </div>
  );
};

export default ErrorPage;
