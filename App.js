import AppNavigation from './src/navigations/appNavigation';
import { NavigationContainer } from '@react-navigation/native';
// import Routes from './src/navigations/routes';
import { Provider } from 'react-redux';
import PodcastStore from './src/redux/store/PodCastStore';
import { StripeProvider } from '@stripe/stripe-react-native';
export default function App() {
  return (
    <NavigationContainer>
      {/* <Routes/> */}
      <Provider store={PodcastStore}>
        <StripeProvider
          publishableKey="pk_test_51MslBhAeOlKaLrSISkg3FHP8WAkD6kMSK4sthpUs5Bha1H1u4Cs29X7EucKZXjRITKypWk7cY0SpQpvxffR0OiAF00c0q8fYOi"
          urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        >
          <AppNavigation />
        </StripeProvider>
      </Provider>
    </NavigationContainer>
  );
}