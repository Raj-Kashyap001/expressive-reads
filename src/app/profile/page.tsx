import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Edit, LogOut, Package } from 'lucide-react';

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    avatarUrl: 'https://picsum.photos/seed/user/200',
  };

  // Mock order history
  const orders = [
    { id: 'ORD-001', date: '2023-10-26', total: '$45.98', status: 'Delivered', items: 2 },
    { id: 'ORD-002', date: '2023-11-15', total: '$12.99', status: 'Shipped', items: 1 },
    { id: 'ORD-003', date: '2023-12-01', total: '$88.20', status: 'Processing', items: 5 },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-12">My Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="rounded-2xl shadow-lg">
            <CardHeader className="items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl font-headline">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button variant="outline" className="w-full rounded-full"><Edit className="mr-2 h-4 w-4" /> Edit Profile</Button>
              <Button variant="destructive" className="w-full rounded-full"><LogOut className="mr-2 h-4 w-4" /> Logout</Button>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card className="rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Order History</CardTitle>
              <CardDescription>Your past orders are listed here.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order, index) => (
                  <div key={order.id}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="bg-muted p-3 rounded-full">
                          <Package className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date} - {order.items} items</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{order.total}</p>
                        <p className="text-sm font-medium text-primary">{order.status}</p>
                      </div>
                    </div>
                    {index < orders.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
