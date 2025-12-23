import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookHeart } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center p-4">
      <Card className="mx-auto max-w-sm w-full rounded-2xl shadow-2xl">
        <CardHeader className="text-center">
            <BookHeart className="mx-auto h-12 w-12 text-primary mb-2" />
          <CardTitle className="text-3xl font-headline">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required className="rounded-full h-11" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required className="rounded-full h-11" />
            </div>
            <Button type="submit" className="w-full rounded-full h-11 text-base mt-2">
              Login
            </Button>
            <Button variant="outline" className="w-full rounded-full h-11 text-base">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
