import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import InventoryList from './pages/InventoryList';
import StockEntry from './pages/StockEntry';
import ProductMaster from './pages/ProductMaster';
import EmployeeMaster from './pages/EmployeeMaster';
import MasterRegistration from './pages/MasterRegistration';
import TransactionHistory from './pages/TransactionHistory';
import ProductForm from './pages/ProductForm';
import EmployeeForm from './pages/EmployeeForm';

function AppContent() {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'inventory':
        return <InventoryList />;
      case 'stock-entry':
        return <StockEntry />;
      case 'products':
        return <ProductMaster />;
      case 'employees':
        return <EmployeeMaster />;
      case 'master':
        return <MasterRegistration />;
      case 'history':
        return <TransactionHistory />;
      case 'product-form':
        return <ProductForm />;
      case 'employee-form':
        return <EmployeeForm />;
      default:
        return <InventoryList />;
    }
  };

  return <Layout>{renderPage()}</Layout>;
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
