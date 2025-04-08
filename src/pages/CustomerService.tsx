
import React from "react";
import Layout from "@/components/layout/Layout";
import PageLayout from "@/components/layout/PageLayout";
import { useCustomerService } from "@/hooks/use-customer-service";
import InquiriesList from "@/components/customer-service/InquiriesList";
import InquiryDetails from "@/components/customer-service/InquiryDetails";
import QuickStats from "@/components/customer-service/QuickStats";

const CustomerService = () => {
  const { 
    inquiries, 
    activeInquiry, 
    selectedInquiry, 
    handleRefresh, 
    handleSelectInquiry 
  } = useCustomerService();

  return (
    <Layout>
      <PageLayout>
        <div className="space-y-6 animate-fade">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl">Customer Service</h1>
            <p className="text-muted-foreground">
              Manage customer inquiries and support across all your POD platforms
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-4 space-y-4">
              <InquiriesList 
                inquiries={inquiries}
                activeInquiry={activeInquiry}
                onRefresh={handleRefresh}
                onSelectInquiry={handleSelectInquiry}
              />
              <QuickStats inquiries={inquiries} />
            </div>
            
            <div className="md:col-span-8">
              <InquiryDetails selectedInquiry={selectedInquiry} />
            </div>
          </div>
        </div>
      </PageLayout>
    </Layout>
  );
};

export default CustomerService;
