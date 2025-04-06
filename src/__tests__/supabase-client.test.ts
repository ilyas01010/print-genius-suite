
import { supabase, signUpWithEmail, signInWithEmail, signOut, getCurrentUser, getSession } from "@/lib/supabase-client";
import { toast } from "@/hooks/use-toast";

// Mock the dependencies
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    auth: {
      signUp: jest.fn().mockImplementation(() => Promise.resolve({ data: {}, error: null })),
      signInWithPassword: jest.fn().mockImplementation(() => Promise.resolve({ data: {}, error: null })),
      signOut: jest.fn().mockImplementation(() => Promise.resolve({ error: null })),
      getUser: jest.fn().mockImplementation(() => Promise.resolve({ data: {}, error: null })),
      getSession: jest.fn().mockImplementation(() => Promise.resolve({ data: {}, error: null })),
    },
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    functions: {
      invoke: jest.fn().mockImplementation(() => Promise.resolve({ data: {}, error: null })),
    },
    storage: {
      listBuckets: jest.fn().mockImplementation(() => Promise.resolve({ data: [], error: null })),
      createBucket: jest.fn().mockImplementation(() => Promise.resolve({ data: {}, error: null })),
    },
  })),
}));

jest.mock("@/hooks/use-toast", () => ({
  toast: jest.fn(),
}));

describe("Supabase Client", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("signUpWithEmail", () => {
    it("successfully signs up a user", async () => {
      const mockResponse = { data: { user: { id: "123" } }, error: null };
      supabase.auth.signUp = jest.fn().mockResolvedValue(mockResponse);

      const result = await signUpWithEmail("test@example.com", "password");
      
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
      expect(result).toEqual(mockResponse);
    });

    it("handles signup errors", async () => {
      const mockError = new Error("Email already in use");
      supabase.auth.signUp = jest.fn().mockRejectedValue(mockError);

      const result = await signUpWithEmail("test@example.com", "password");
      
      expect(toast).toHaveBeenCalledWith({
        title: "Error signing up",
        description: mockError.message,
        variant: "destructive",
      });
      expect(result).toEqual({ data: null, error: mockError });
    });
  });

  describe("signInWithEmail", () => {
    it("successfully signs in a user", async () => {
      const mockResponse = { data: { user: { id: "123" } }, error: null };
      supabase.auth.signInWithPassword = jest.fn().mockResolvedValue(mockResponse);

      const result = await signInWithEmail("test@example.com", "password");
      
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password",
      });
      expect(result).toEqual(mockResponse);
    });

    it("handles signin errors", async () => {
      const mockError = new Error("Invalid credentials");
      supabase.auth.signInWithPassword = jest.fn().mockRejectedValue(mockError);

      const result = await signInWithEmail("test@example.com", "password");
      
      expect(toast).toHaveBeenCalledWith({
        title: "Error signing in",
        description: mockError.message,
        variant: "destructive",
      });
      expect(result).toEqual({ data: null, error: mockError });
    });
  });

  describe("signOut", () => {
    it("successfully signs out a user", async () => {
      const mockResponse = { error: null };
      supabase.auth.signOut = jest.fn().mockResolvedValue(mockResponse);

      const result = await signOut();
      
      expect(supabase.auth.signOut).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });

    it("handles signout errors", async () => {
      const mockError = new Error("Error signing out");
      supabase.auth.signOut = jest.fn().mockRejectedValue(mockError);

      const result = await signOut();
      
      expect(toast).toHaveBeenCalledWith({
        title: "Error signing out",
        description: mockError.message,
        variant: "destructive",
      });
      expect(result).toEqual({ error: mockError });
    });
  });

  describe("getCurrentUser", () => {
    it("successfully gets current user", async () => {
      const mockResponse = { data: { user: { id: "123" } }, error: null };
      supabase.auth.getUser = jest.fn().mockResolvedValue(mockResponse);

      const result = await getCurrentUser();
      
      expect(supabase.auth.getUser).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });

    it("handles errors", async () => {
      const mockError = new Error("Error getting user");
      supabase.auth.getUser = jest.fn().mockRejectedValue(mockError);

      const result = await getCurrentUser();
      
      expect(result).toEqual({ data: { user: null }, error: mockError });
    });
  });

  describe("getSession", () => {
    it("successfully gets session", async () => {
      const mockResponse = { data: { session: { user: { id: "123" } } }, error: null };
      supabase.auth.getSession = jest.fn().mockResolvedValue(mockResponse);

      const result = await getSession();
      
      expect(supabase.auth.getSession).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });

    it("handles errors", async () => {
      const mockError = new Error("Error getting session");
      supabase.auth.getSession = jest.fn().mockRejectedValue(mockError);

      const result = await getSession();
      
      expect(result).toEqual({ data: { session: null }, error: mockError });
    });
  });
});
