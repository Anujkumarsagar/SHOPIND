import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ErrorPageProps {
  searchParams: Promise<{ error?: string }>
}

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const params = await searchParams

  return (
    <div className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Authentication Error</CardTitle>
            </CardHeader>
            <CardContent>
              {params?.error ? (
                <p className="text-sm text-muted-foreground mb-4">Error: {params.error}</p>
              ) : (
                <p className="text-sm text-muted-foreground mb-4">An authentication error occurred.</p>
              )}
              <Button asChild className="w-full">
                <Link href="/auth/login">Back to Login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
