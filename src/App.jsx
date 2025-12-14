/**
 * App Component
 * - Serves as the root-level component of the application
 * - Keeps the app structure clean by delegating routing logic
 *   to a dedicated `RoutesComponent`
 * - This approach improves maintainability and scalability
 */

import ScrollToTop from './components/common/ScrollToTop';
import RoutesComponent from './routes/RoutesComponent';

function App() {
  return (
    <>
      <RoutesComponent />
      <ScrollToTop />
    </>
  );
}

export default App;
