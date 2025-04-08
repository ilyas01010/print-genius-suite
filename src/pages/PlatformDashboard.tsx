
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { DateRangeFilter, Platform, Product } from "@/components/platform-manager/types";
import PlatformDashboardOverview from "@/components/platform-manager/PlatformDashboardOverview";
import PlatformsList from "@/components/platform-manager/PlatformsList";
import ProductsList from "@/components/platform-manager/ProductsList";
import AnalyticsSection from "@/components/platform-manager/AnalyticsSection";
import PlatformDashboardHeader from "@/components/platform-manager/PlatformDashboardHeader";
import PlatformDialogs from "@/components/platform-manager/PlatformDialogs";
import { usePlatformData } from "@/hooks/usePlatformData";
import { useAvailablePlatformsData } from "@/components/platform-manager/AvailablePlatformsData";

const PlatformDashboard = () => {
  const { toast } = useToast();
  const { 
    platforms, 
    products,
    handleAddNewPlatform,
    handleConnectPlatform,
    handleDisconnectPlatform,
    handleAddProduct,
    handleDeleteProduct,
    filterData,
    calculateMetrics
  } = usePlatformData();
  
  const { availablePlatforms } = useAvailablePlatformsData();

  const [dateRange, setDateRange] = useState<DateRangeFilter>({
    startDate: null,
    endDate: null,
  });

  const [showAddPlatformDialog, setShowAddPlatformDialog] = useState(false);
  const [showAddProductDialog, setShowAddProductDialog] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);

  const { filteredPlatforms, filteredProducts } = filterData(dateRange);
  const { totalProducts, totalRevenue, connectedPlatforms } = calculateMetrics(filteredPlatforms);

  const handleAddProductSubmit = () => {
    if (!selectedPlatform) return;
    if (!newProductName.trim()) {
      toast({
        title: "Error",
        description: "Product name is required.",
        variant: "destructive"
      });
      return;
    }

    const price = parseFloat(newProductPrice);
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid price.",
        variant: "destructive"
      });
      return;
    }

    handleAddProduct(newProductName, price, selectedPlatform.id);
    setNewProductName('');
    setNewProductPrice('');
    setShowAddProductDialog(false);
    setSelectedPlatform(null);
  };

  const handleViewAnalytics = () => {
    setIsAnalyticsLoading(true);
    setSelectedTab("analytics");

    setTimeout(() => {
      setIsAnalyticsLoading(false);
      toast({
        title: "Analytics Loaded",
        description: "Platform analytics data has been loaded successfully.",
      });
    }, 1500);
  };

  return (
    <div>
      <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4 animate-fade">
        <PlatformDashboardHeader 
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onShowTutorial={() => setShowTutorial(true)}
          onShowAddPlatformDialog={() => setShowAddPlatformDialog(true)}
        />
        
        {/* Tab content wrappers with smooth transitions */}
        <TabsContent value="overview" className="space-y-4 animate-fade-in">
          <PlatformDashboardOverview 
            platforms={filteredPlatforms}
            onViewAllPlatforms={() => setSelectedTab("platforms")}
            onViewAllProducts={() => setSelectedTab("products")}
          />
        </TabsContent>
        
        <TabsContent value="platforms" className="space-y-4 animate-fade-in">
          <div className="space-y-4">
            <PlatformsList 
              platforms={filteredPlatforms}
              availablePlatforms={availablePlatforms}
              onAddPlatform={handleAddNewPlatform}
              onConnectPlatform={handleConnectPlatform}
              onDisconnectPlatform={handleDisconnectPlatform}
              onViewAnalytics={handleViewAnalytics}
              showAddPlatformDialog={showAddPlatformDialog}
              setShowAddPlatformDialog={setShowAddPlatformDialog}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-4 animate-fade-in">
          <ProductsList 
            platforms={filteredPlatforms}
            products={filteredProducts}
            connectedPlatforms={connectedPlatforms}
            totalProducts={totalProducts}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
            showAddProductDialog={showAddProductDialog}
            setShowAddProductDialog={setShowAddProductDialog}
            newProductName={newProductName}
            setNewProductName={setNewProductName}
            newProductPrice={newProductPrice}
            setNewProductPrice={setNewProductPrice}
            productToDelete={productToDelete}
            setProductToDelete={setProductToDelete}
            onAddProduct={handleAddProductSubmit}
            onDeleteProduct={handleDeleteProduct}
            setSelectedTab={setSelectedTab}
          />
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4 animate-fade-in">
          <AnalyticsSection 
            platforms={filteredPlatforms}
            connectedPlatforms={connectedPlatforms}
            isAnalyticsLoading={isAnalyticsLoading}
            setSelectedTab={setSelectedTab}
          />
        </TabsContent>
      </Tabs>

      <PlatformDialogs 
        showTutorial={showTutorial}
        setShowTutorial={setShowTutorial}
        showFeedbackDialog={showFeedbackDialog}
        setShowFeedbackDialog={setShowFeedbackDialog}
        showAddPlatformDialog={showAddPlatformDialog}
        setShowAddPlatformDialog={setShowAddPlatformDialog}
        showAddProductDialog={showAddProductDialog}
        setShowAddProductDialog={setShowAddProductDialog}
        availablePlatforms={availablePlatforms}
        onAddPlatform={handleAddNewPlatform}
        newProductName={newProductName}
        setNewProductName={setNewProductName}
        newProductPrice={newProductPrice}
        setNewProductPrice={setNewProductPrice}
        selectedPlatform={selectedPlatform}
        onAddProduct={handleAddProductSubmit}
        productToDelete={productToDelete}
        setProductToDelete={setProductToDelete}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

export default PlatformDashboard;
