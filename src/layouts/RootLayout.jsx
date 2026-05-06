import { Outlet } from 'react-router';
import NavBar from '../pages/Shared/NavBar/NavBar';
import Footer from '../pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className="font-sans">
            <NavBar />
            
            <main className="max-w-7xl mx-auto min-h-[calc(100vh-350px)] px-4 lg:px-8">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default RootLayout;
