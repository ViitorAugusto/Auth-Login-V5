import { NavBar } from "./_components/navbar";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col w-full h-screen gap-y-10 items-center justify-center bg-sky-400">
            <NavBar />
            {children}
        </div>
    );
}
