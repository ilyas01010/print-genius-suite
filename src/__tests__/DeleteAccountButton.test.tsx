
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeleteAccountButton from "@/components/settings/account/DeleteAccountButton";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase-client";

// Mock the necessary hooks and modules
jest.mock("@/context/UserContext");
jest.mock("@/hooks/use-toast");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("@/lib/supabase-client", () => {
  const mockSupabase = {
    functions: {
      invoke: jest.fn().mockResolvedValue({ error: null }),
    }
  };
  
  return {
    supabase: mockSupabase,
  };
});

describe("DeleteAccountButton Component", () => {
  const mockUser = { id: "user-123" };
  const mockLogout = jest.fn().mockResolvedValue(undefined);
  const mockToast = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    (useUser as jest.Mock).mockReturnValue({
      user: mockUser,
      logout: mockLogout,
    });
    
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("renders the delete button correctly", () => {
    render(<DeleteAccountButton />);
    
    // @ts-ignore - TypeScript doesn't recognize custom matchers
    expect(screen.getByRole("button", { name: /delete account/i })).toBeInTheDocument();
  });

  it("opens confirmation dialog when delete button is clicked", () => {
    render(<DeleteAccountButton />);
    
    const deleteButton = screen.getByRole("button", { name: /delete account/i });
    fireEvent.click(deleteButton);
    
    // @ts-ignore - TypeScript doesn't recognize custom matchers
    expect(screen.getByText("Are you absolutely sure?")).toBeInTheDocument();
    // @ts-ignore - TypeScript doesn't recognize custom matchers
    expect(screen.getByText(/this action cannot be undone/i)).toBeInTheDocument();
    // @ts-ignore - TypeScript doesn't recognize custom matchers
    expect(screen.getByPlaceholderText("DELETE")).toBeInTheDocument();
  });

  it("disables the confirm button until the user types DELETE", () => {
    render(<DeleteAccountButton />);
    
    // Open the dialog
    const deleteButton = screen.getByRole("button", { name: /delete account/i });
    fireEvent.click(deleteButton);
    
    // Check that the confirm button is disabled
    const confirmButton = screen.getByRole("button", { name: /delete account/i });
    // @ts-ignore - TypeScript doesn't recognize custom matchers
    expect(confirmButton).toBeDisabled();
    
    // Type DELETE in the input
    const input = screen.getByPlaceholderText("DELETE");
    fireEvent.change(input, { target: { value: "DELETE" } });
    
    // The button should now be enabled
    // @ts-ignore - TypeScript doesn't recognize custom matchers
    expect(confirmButton).not.toBeDisabled();
  });

  it("handles account deletion when confirmed", async () => {
    // Setup successful deletion
    (supabase.functions.invoke as jest.Mock).mockResolvedValueOnce({ error: null });
    
    render(<DeleteAccountButton />);
    
    // Open the dialog
    const deleteButton = screen.getByRole("button", { name: /delete account/i });
    fireEvent.click(deleteButton);
    
    // Type DELETE and confirm
    const input = screen.getByPlaceholderText("DELETE");
    fireEvent.change(input, { target: { value: "DELETE" } });
    
    const confirmButton = screen.getByRole("button", { name: /delete account/i });
    fireEvent.click(confirmButton);
    
    // Check that the correct functions were called
    await waitFor(() => {
      expect(supabase.functions.invoke).toHaveBeenCalledWith("delete-user", {
        body: { userId: mockUser.id }
      });
      expect(mockLogout).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/");
      expect(mockToast).toHaveBeenCalled();
    });
  });

  it("handles errors during account deletion", async () => {
    // Setup error during deletion
    const mockError = new Error("Deletion failed");
    (supabase.functions.invoke as jest.Mock).mockRejectedValueOnce(mockError);
    
    render(<DeleteAccountButton />);
    
    // Open the dialog
    const deleteButton = screen.getByRole("button", { name: /delete account/i });
    fireEvent.click(deleteButton);
    
    // Type DELETE and confirm
    const input = screen.getByPlaceholderText("DELETE");
    fireEvent.change(input, { target: { value: "DELETE" } });
    
    const confirmButton = screen.getByRole("button", { name: /delete account/i });
    fireEvent.click(confirmButton);
    
    // Check that error handling worked correctly
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Error deleting account",
        description: mockError.message || "There was a problem deleting your account.",
        variant: "destructive",
      });
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
