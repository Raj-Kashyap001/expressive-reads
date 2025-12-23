import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookHeart } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center p-4">
      <Card className="mx-auto max-w-sm w-full rounded-2xl shadow-2xl">
        <CardHeader className="text-center">
            <BookHeart className="mx-auto h-12 w-12 text-primary mb-2" />
          <CardTitle className="text-3xl font-headline">Create an Account</CardTitle>
          <CardDescription>Join our community of readers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input id="full-name" placeholder="Max Robinson" required className="rounded-full h-11" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required className="rounded-full h-11" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required className="rounded-full h-11" />
            </div>
            <Button type="submit" className="w-full rounded-full h-11 text-base mt-2">
              Create Account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
