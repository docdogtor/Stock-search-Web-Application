export interface Source {
  "id":any;
  "name":string;
}

export interface NewsData {
  "source":Source;
  "author":string;
  "title":string;
  "description":string;
  "url":string;
  "urlToImage":string;
  "publishedAt":string;
  "content":string;
}
