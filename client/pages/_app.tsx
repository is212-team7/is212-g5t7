import { CssBaseline, GeistProvider } from '@geist-ui/core';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        Storage.prototype.setObject = function (key: string, value: any) {
            this.setItem(key, JSON.stringify(value));
        };

        Storage.prototype.getObject = function (key: string) {
            var value = this.getItem(key);
            return value && JSON.parse(value);
        };
    }, []);

    return (
        <GeistProvider>
            <CssBaseline />
            <Component {...pageProps} />
        </GeistProvider>
    );
};

export default App;
