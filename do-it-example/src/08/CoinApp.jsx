import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';

import AppLayout from './components/AppLayout';
// import CoinOverview from './components/main/CoinOverview';
// import TransactionList from './components/main/TransactionList';
import configureStore from './store/configureStore';
import MainPage from './components/main/MainPage';
import ModalProvider from './ModalProvider';

class CoinApp extends PureComponent {
    store = configureStore();
    render() {
        return (
            <Provider store={this.store}>
                <ModalProvider>
                    <AppLayout>
                        < MainPage />
                    </AppLayout>
                </ModalProvider>
            </Provider>
        );
    }
}

export default CoinApp;