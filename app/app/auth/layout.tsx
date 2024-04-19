const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    return (
      <div className="h-screen flex items-center justify-center bg-sky-400">
        {children}
      </div>
    );
};


export default AuthLayout