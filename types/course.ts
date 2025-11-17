export interface Video {
  id: string;
  title: string;
  youtubeVideoId: string;
  description?: string;
}

export interface Section {
  id: string;
  name: string;
  videos: Video[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  sections: Section[];
}

