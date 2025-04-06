
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import IntegrationItem from "@/components/settings/integration/IntegrationItem";
import { useToast } from "@/hooks/use-toast";

// Mock the useToast hook
jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(() => ({
    toast: jest.fn(),
  })),
}));

describe("IntegrationItem Component", () => {
  const mockProps = {
    name: "Test Integration",
    description: "This is a test integration",
    icon: <span data-testid="mock-icon">Icon</span>,
    bgColor: "bg-blue-500",
  };

  it("renders correctly with provided props", () => {
    render(<IntegrationItem {...mockProps} />);
    
    // @ts-ignore - TypeScript doesn't recognize custom matchers
    expect(screen.getByText("Test Integration")).toBeInTheDocument();
    // @ts-ignore - TypeScript doesn't recognize custom matchers
    expect(screen.getByText("This is a test integration")).toBeInTheDocument();
    // @ts-ignore - TypeScript doesn't recognize custom matchers
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    // @ts-ignore - TypeScript doesn't recognize custom matchers
    expect(screen.getByRole("button", { name: "Connect" })).toBeInTheDocument();
  });

  it("displays toast notification when Connect button is clicked", () => {
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    
    render(<IntegrationItem {...mockProps} />);
    
    const connectButton = screen.getByRole("button", { name: "Connect" });
    fireEvent.click(connectButton);
    
    expect(mockToast).toHaveBeenCalledWith({
      title: "Integration Coming Soon",
      description: "Test Integration integration will be available soon.",
    });
  });
});
