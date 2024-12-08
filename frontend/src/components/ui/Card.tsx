import React from "react";

interface Brain {
  link: string;
  type: string;
  title: string;
  description: string;
}

interface CardProps {
  brain: Brain;
}

function Card({ brain }: CardProps) {
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    return url;
  };

  const getTweetId = (url: string) => {
    const match = url.match(/\/status\/(\d+)/);
    return match ? match[1] : null;
  };

  const tweetId = getTweetId(brain.link);

  return (
    <div className=" rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg bg-gray-800">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-3">{brain.title}</h2>
        {brain.description && (
          <p className="text-gray-600 text-sm mb-3">{brain.description}</p>
        )}
        <div className="w-full aspect-video">
          {brain.type === "video" && (
            <iframe
              className="w-full h-full rounded-lg"
              src={getEmbedUrl(brain.link)}
              title={brain.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {brain.type === "tweet" && (
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://platform.twitter.com/embed/Tweet.html?dnt=true&embedId=twitter-widget-0&features=eyJ0ZnciOiIiLCJ0ZnctdXNlcl9pZF9ieV9zY3JlZW5fbmFtZSI6dHJ1ZSwidGZ3X3NraXBfaW5zZXJ0aW9uX25vcm1hbGl6YXRpb24iOnRydWUsInRmd19zaWduYXR1cmVfYnV0dG9uX3RleHQiOiIifQ%3D%3D&frame=false&hideCard=false&hideThread=false&id=${tweetId}&lang=en&origin=https%3A%2F%2Fplatform.twitter.com&theme=light&widgetsVersion=aaf4084d5c%3A1701314790433`}
              title={`Embedded Tweet: ${brain.title}`}
              frameBorder="0"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;