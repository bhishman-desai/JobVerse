import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import { Flex, Spinner } from '@chakra-ui/react';

const Layout = ({ children }) => {
    const location = useLocation();
    const showLayout = ['/', '/about', '/faq', '/contact-us'];
    const currentPath = location.pathname;

    return (
        <div className="min-h-screen flex flex-col">
            {showLayout.includes(currentPath) && <Navbar />}
            <main className="flex-grow">
                <Suspense fallback={
                    <Flex align="center" justify="center" w="100" h="100">
                        <Spinner size="xl" />
                    </Flex>
                }>
                    {children}
                </Suspense>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
