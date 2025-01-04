import { YTForm } from "./_components/yt-form";

export default function YTPage() {
  return (
    <div className="container mx-auto space-y-8 px-4 py-10">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">
          One URL, Endless Videos — Veecree Extracts It All!
        </h1>
        <p className="text-muted-foreground">
          Paste any video url from your favorite channel to get the full video
          list!
        </p>
      </div>
      <YTForm />
    </div>
  );
}
