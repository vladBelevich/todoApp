import { createContext } from 'react';

const AppContext = createContext();
const { Provider: AppProvider, Consumer: AppConsumer } = AppContext;

export { AppContext, AppProvider, AppConsumer };
