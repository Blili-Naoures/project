export interface Recipe {
    id?: number;
    name: string;
    description: string;
    ingredients: string[];
    instructions: string;
    category: string;
    isFavorite: boolean;
    imageUrl?: string;
}