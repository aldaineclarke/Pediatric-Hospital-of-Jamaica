export interface News{
    source: {id: string, name: string};
    author: string;
    title: string;
    descrition:string;
    url: string;
    urlToImage: string;
};

export interface NewsApiResponse{
    status: string;
    totalResults: number;
    articles: News[];
}