
import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { UserProvider, useUser } from "@/context/UserContext";
import { supabase, getSession } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";

// Mock dependencies
jest.mock("@/lib/supabase-client", () => {
  const mockSupabase = {
    auth: {
      onAuthStateChange: jest.fn(() => ({
        data: {
          subscription: {
            unsubscribe: jest.fn(),
          },
        },
      })),
      signOut: jest.fn().mockResolvedValue({ error: null }),
    },
  };
  
  return {
    supabase: mockSupabase,
    getSession: jest.fn(),
  };
});

jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(() => ({
    toast: jest.fn(),
  })),
}));

// Test component to access the context
function TestComponent() {
  const { user, isLoading, isAuthenticated, logout } = useUser();
  return (
    <div>
      <div data-testid="loading">{isLoading.toString()}</div>
      <div data-testid="authenticated">{isAuthenticated.toString()}</div>
      <div data-testid="user-email">{user?.email || "no-user"}</div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

describe("UserContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with loading state", async () => {
    (getSession as jest.Mock).mockResolvedValue({
      data: { session: null }
    });

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    // Initially should be loading
    expect(screen.getByTestId("loading").textContent).toBe("true");
    
    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });
    
    // No user should be present
    expect(screen.getByTestId("authenticated").textContent).toBe("false");
    expect(screen.getByTestId("user-email").textContent).toBe("no-user");
  });

  it("sets user when session exists", async () => {
    const mockUser = { id: "123", email: "test@example.com" };
    (getSession as jest.Mock).mockResolvedValue({
      data: { session: { user: mockUser } }
    });

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
      expect(screen.getByTestId("authenticated").textContent).toBe("true");
      expect(screen.getByTestId("user-email").textContent).toBe("test@example.com");
    });
  });

  it("handles logout correctly", async () => {
    const mockUser = { id: "123", email: "test@example.com" };
    (getSession as jest.Mock).mockResolvedValue({
      data: { session: { user: mockUser } }
    });
    
    (supabase.auth.signOut as jest.Mock).mockResolvedValue({ error: null });
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    // Wait for initial render with user
    await waitFor(() => {
      expect(screen.getByTestId("authenticated").textContent).toBe("true");
    });

    // Click logout button
    const logoutButton = screen.getByRole("button", { name: /logout/i });
    await act(async () => {
      logoutButton.click();
    });

    // Verify logout was called and user is set to null
    expect(supabase.auth.signOut).toHaveBeenCalled();
    
    // Toast should have been called for logout
    expect(mockToast).toHaveBeenCalledWith({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  });

  it("handles auth state changes", async () => {
    // Mock initial state with no user
    (getSession as jest.Mock).mockResolvedValue({
      data: { session: null }
    });
    
    // Setup the auth state change listener mock
    let authChangeCallback: (event: string, session: any) => void;
    (supabase.auth.onAuthStateChange as jest.Mock).mockImplementation((callback) => {
      authChangeCallback = callback;
      return {
        data: {
          subscription: {
            unsubscribe: jest.fn(),
          },
        },
      };
    });

    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    // Simulate a sign-in event
    const mockUser = { id: "123", email: "signed-in@example.com" };
    act(() => {
      authChangeCallback("SIGNED_IN", { user: mockUser });
    });

    // User should be updated
    await waitFor(() => {
      expect(screen.getByTestId("authenticated").textContent).toBe("true");
    });
    
    // Toast should have been called for sign in
    expect(mockToast).toHaveBeenCalledWith({
      title: "Signed in successfully",
      description: "Welcome, signed-in@example.com!",
    });

    // Simulate a sign-out event
    act(() => {
      authChangeCallback("SIGNED_OUT", null);
    });

    // User should be null again
    await waitFor(() => {
      expect(screen.getByTestId("authenticated").textContent).toBe("false");
      expect(screen.getByTestId("user-email").textContent).toBe("no-user");
    });
    
    // Toast should have been called for sign out
    expect(mockToast).toHaveBeenCalledWith({
      title: "Signed out",
      description: "You have been signed out.",
    });
  });
});
