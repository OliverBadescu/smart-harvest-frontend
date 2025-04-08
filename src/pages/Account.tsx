import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { User, Mail, MapPin, Phone, Edit, CheckCircle } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

interface UserData {
  fullName: string;
  email: string;
  address: string;
  phone: string;
  // Optionally include orderHistory if provided
  orderHistory?: Array<{
    id: string;
    date: string;
    total: number;
    status: string;
  }>;
}

const Account: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  // Use a separate state for edited data
  const [editedData, setEditedData] = useState<UserData | null>(null);

  useEffect(() => {
    // Read the authenticated user's information from localStorage using the new key "user"
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser: UserData = JSON.parse(storedUser);
        setUserData(parsedUser);
        setEditedData(parsedUser);
      } catch (error) {
        localStorage.removeItem('user');
        setUserData(null);
        setEditedData(null);
      }
    }
  }, []);

  const handleEditToggle = () => {
    if (isEditing && editedData) {
      // Here you would usually call an update API endpoint.
      // For now, we just update local state and localStorage.
      setUserData(editedData);
      localStorage.setItem('user', JSON.stringify(editedData));
      toast.success('Profile updated successfully!');
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedData) return;
    const { name, value } = e.target;
    setEditedData(prev => prev ? ({ ...prev, [name]: value }) : null);
  };

  if (!userData) {
    return <div className="container mx-auto py-10 px-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8 text-violet-800 relative inline-block group">
        My Account
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="border-violet-100 hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="text-xl text-violet-800 hover:text-violet-600 transition-colors duration-300 cursor-pointer relative inline-block group">
                      Personal Information
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-violet-50 border-violet-200">
                    <p className="text-sm text-violet-700">View and edit your personal information</p>
                  </HoverCardContent>
                </HoverCard>
                <Button 
                  onClick={handleEditToggle} 
                  variant="ghost" 
                  className="hover:bg-violet-50 text-violet-700"
                >
                  {isEditing ? <CheckCircle className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
                  <span className="ml-2">{isEditing ? 'Save' : 'Edit'}</span>
                </Button>
              </CardTitle>
              <CardDescription>
                Manage your account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative group">
                <div className="flex items-center space-x-2 mb-1">
                  <User className="h-4 w-4 text-violet-600" />
                  <Label htmlFor="fullName" className="font-medium text-violet-800 group-hover:text-violet-600 transition-colors duration-300">
                    Full Name
                  </Label>
                </div>
                {isEditing ? (
                  <Input 
                    id="fullName" 
                    name="fullName" 
                    value={editedData?.fullName || ''} 
                    onChange={handleChange} 
                    className="border-violet-200 focus:border-violet-500"
                  />
                ) : (
                  <p className="text-gray-700 pl-6">{userData.fullName}</p>
                )}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </div>
              
              <div className="relative group">
                <div className="flex items-center space-x-2 mb-1">
                  <Mail className="h-4 w-4 text-violet-600" />
                  <Label htmlFor="email" className="font-medium text-violet-800 group-hover:text-violet-600 transition-colors duration-300">
                    Email Address
                  </Label>
                </div>
                {isEditing ? (
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={editedData?.email || ''} 
                    onChange={handleChange} 
                    className="border-violet-200 focus:border-violet-500"
                  />
                ) : (
                  <p className="text-gray-700 pl-6">{userData.email}</p>
                )}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </div>
              
              <div className="relative group">
                <div className="flex items-center space-x-2 mb-1">
                  <MapPin className="h-4 w-4 text-violet-600" />
                  <Label htmlFor="address" className="font-medium text-violet-800 group-hover:text-violet-600 transition-colors duration-300">
                    Address
                  </Label>
                </div>
                {isEditing ? (
                  <Input 
                    id="address" 
                    name="address" 
                    value={editedData?.address || ''} 
                    onChange={handleChange} 
                    className="border-violet-200 focus:border-violet-500"
                  />
                ) : (
                  <p className="text-gray-700 pl-6">{userData.address}</p>
                )}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </div>
              
              <div className="relative group">
                <div className="flex items-center space-x-2 mb-1">
                  <Phone className="h-4 w-4 text-violet-600" />
                  <Label htmlFor="phone" className="font-medium text-violet-800 group-hover:text-violet-600 transition-colors duration-300">
                    Phone Number
                  </Label>
                </div>
                {isEditing ? (
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={editedData?.phone || ''} 
                    onChange={handleChange} 
                    className="border-violet-200 focus:border-violet-500"
                  />
                ) : (
                  <p className="text-gray-700 pl-6">{userData.phone}</p>
                )}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="border-violet-100 hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <CardTitle className="text-xl text-violet-800 hover:text-violet-600 transition-colors duration-300 cursor-pointer relative inline-block group">
                    Order History
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </CardTitle>
                </HoverCardTrigger>
                <HoverCardContent className="bg-violet-50 border-violet-200">
                  <p className="text-sm text-violet-700">Your recent purchases</p>
                </HoverCardContent>
              </HoverCard>
              <CardDescription>
                Your recent orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.orderHistory && userData.orderHistory.map((order) => (
                  <div 
                    key={order.id} 
                    className="p-4 border border-violet-100 rounded-md hover:bg-violet-50 transition-colors duration-300 relative group"
                  >
                    <h3 className="font-medium text-violet-800">{order.id}</h3>
                    <div className="text-sm text-gray-600">
                      <p>Date: {order.date}</p>
                      <p>Total: ${order.total.toFixed(2)}</p>
                      <p>Status: 
                        <span className={`ml-1 font-medium ${
                          order.status === 'Delivered' ? 'text-green-600' : 
                          order.status === 'Shipped' ? 'text-blue-600' : 'text-orange-600'
                        }`}>
                          {order.status}
                        </span>
                      </p>
                    </div>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full text-violet-700 border-violet-300 hover:bg-violet-50">
                View All Orders
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;
