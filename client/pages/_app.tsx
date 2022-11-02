import { CssBaseline, GeistProvider } from '@geist-ui/core';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        Storage.prototype.setObject = function (key: string, value: any) {
            this.setItem(key, JSON.stringify(value));
        };

        Storage.prototype.getObject = function (key: string) {
            var value = this.getItem(key);
            return value != null && JSON.parse(value);
        };
    });

    return (
        <GeistProvider>
            <SkeletonTheme baseColor="#ebebeb" highlightColor="#444">
                <CssBaseline />
                <Component {...pageProps} />
            </SkeletonTheme>
        </GeistProvider>
    );
};

export default App;
