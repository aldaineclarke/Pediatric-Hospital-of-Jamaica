export interface News{
    source: {id: string, name: string};
    author: string;
    title: string;
    description:string;
    url: string;
    urlToImage: string;
    publishedAt:string;
};

export interface NewsApiResponse{
    status: string;
    totalResults: number;
    articles: News[];
}