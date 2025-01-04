import { YTForm } from "./_components/yt-form";

export default function YTPage() {
  return (
    <div className="container mx-auto space-y-8 py-10">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">YouTube Channel ID Finder</h1>
        <p className="text-muted-foreground">
          Masukkan URL video, username, atau channel URL untuk mendapatkan
          Channel ID
        </p>
      </div>
      <YTForm />
    </div>
  );
}
