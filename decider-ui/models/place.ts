export default interface Place {
    place_id: string;
    name: string;
    formatted_address: string;
    rating: number;
    opening_hours: object;
}