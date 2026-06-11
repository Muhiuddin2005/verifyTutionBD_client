import { Outlet } from 'react-router';
import { Suspense } from 'react';
import NavBar from '../pages/Shared/NavBar/NavBar';
import Footer from '../pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className="font-sans">
            <NavBar />
            
            <main className="max-w-7xl mx-auto min-h-[calc(100vh-350px)] px-4 lg:px-8">
                <Suspense fallback={
                    <div className="flex justify-center items-center py-20 min-h-[40vh]">
                        <span className="loading loading-spinner text-primary loading-lg"></span>
                    </div>
                }>
                    <Outlet />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
};

export default RootLayout;
