import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useMemo } from "react";

const LoginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(6, { message: "Min 6 characters" }),
});

type LoginValues = z.infer<typeof LoginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(LoginSchema), mode: "onSubmit" });

  const canonicalUrl = useMemo(() => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/login`;
    }
    return "/login";
  }, []);

  const onSubmit = async (values: LoginValues) => {
    // Placeholder auth flow. Replace with Supabase auth if needed.
    await new Promise((r) => setTimeout(r, 600));
    toast({ title: "Signed in", description: `Welcome back, ${values.email}` });
    navigate("/");
  };

  return (
    <main className="min-h-screen grid place-items-center bg-background">
      <Helmet>
        <title>Login - Admin Dashboard</title>
        <meta name="description" content="Login to the Admin Dashboard to manage orders, products, and customers." />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <section className="w-full max-w-md px-4">
        <Card className="shadow-sm">
          <CardHeader>
            <h1 className="sr-only">Admin Login</h1>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" {...register("email")} />
                {errors.email && (
                  <p className="text-destructive text-sm" role="alert">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" autoComplete="current-password" {...register("password")} />
                {errors.password && (
                  <p className="text-destructive text-sm" role="alert">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Link to="#" className="text-sm text-primary underline-offset-4 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing in…" : "Sign in"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By continuing, you agree to our <Link to="#" className="underline underline-offset-4">Terms</Link> and <Link to="#" className="underline underline-offset-4">Privacy Policy</Link>.
              </p>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
