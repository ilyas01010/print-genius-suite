
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, MoreVertical, Lock, Trash2, Shield, Calendar, Eye } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock user data - in a real application, this would come from your backend
const mockUsers = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    status: "active",
    lastLogin: "2023-04-06T14:22:34Z",
    createdAt: "2023-01-15T09:12:56Z",
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria@example.com",
    status: "inactive",
    lastLogin: "2023-03-28T10:45:12Z",
    createdAt: "2023-02-03T15:37:22Z",
  },
  {
    id: "3",
    name: "James Smith",
    email: "james@example.com",
    status: "suspended",
    lastLogin: "2023-02-15T19:33:04Z",
    createdAt: "2022-11-22T12:04:18Z",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    status: "active",
    lastLogin: "2023-04-05T08:17:45Z",
    createdAt: "2023-01-30T14:52:11Z",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david@example.com",
    status: "active",
    lastLogin: "2023-04-04T16:49:32Z",
    createdAt: "2022-12-10T09:08:25Z",
  },
];

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userDetailOpen, setUserDetailOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  // Filter users based on search query
  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle user actions
  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setUserDetailOpen(true);
    logAction(`Viewed user details: ${user.email}`);
  };

  const handleResetPassword = (user: any) => {
    toast({
      title: "Password reset initiated",
      description: `A password reset link has been sent to ${user.email}`,
    });
    logAction(`Initiated password reset for user: ${user.email}`);
  };

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (!selectedUser) return;
    
    toast({
      title: "User deleted",
      description: `${selectedUser.email} has been deleted from the system`,
    });
    logAction(`Deleted user: ${selectedUser.email}`);
    setDeleteDialogOpen(false);
    // In a real application, you would call your API to delete the user
  };

  // Log admin actions
  const logAction = (action: string) => {
    console.log(`Admin action: ${action} at ${new Date().toISOString()}`);
    // In a real implementation, this would be sent to your backend
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-[200px] lg:w-[300px]"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Last Login</TableHead>
              <TableHead className="hidden md:table-cell">Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "active"
                        ? "outline"
                        : user.status === "inactive"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{formatDate(user.lastLogin)}</TableCell>
                <TableCell className="hidden md:table-cell">{formatDate(user.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewUser(user)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleResetPassword(user)}>
                        <Lock className="mr-2 h-4 w-4" />
                        Reset Password
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDeleteUser(user)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* User Detail Dialog */}
      <Dialog open={userDetailOpen} onOpenChange={setUserDetailOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed information about this user.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant={
                      selectedUser.status === "active"
                        ? "outline"
                        : selectedUser.status === "inactive"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {selectedUser.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">User ID</p>
                  <p className="font-medium">{selectedUser.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Login</p>
                  <p className="font-medium">{formatDate(selectedUser.lastLogin)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Joined</p>
                  <p className="font-medium">{formatDate(selectedUser.createdAt)}</p>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2">Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleResetPassword(selectedUser)}>
                    <Lock className="mr-2 h-4 w-4" />
                    Reset Password
                  </Button>
                  <Button variant="outline" size="sm">
                    <Shield className="mr-2 h-4 w-4" />
                    Activity Log
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => {
                    setUserDetailOpen(false);
                    handleDeleteUser(selectedUser);
                  }}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete User
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm User Deletion</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The user will be permanently removed from the system.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <p>
                Are you sure you want to delete <span className="font-semibold">{selectedUser.name}</span> ({selectedUser.email})?
              </p>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmDeleteUser}>
                  Delete User
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
