import { PasswordGenerator } from "./_components/PasswordGenerator";

export default function StrongPassPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Generator Password Kuat</h1>
          <p className="text-muted-foreground">
            Buat password yang aman dan kuat dengan berbagai opsi kustomisasi
          </p>
        </div>

        <PasswordGenerator />
      </div>
    </div>
  );
}
