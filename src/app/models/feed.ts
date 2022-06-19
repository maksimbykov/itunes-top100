import { Item } from "./item";

export class Feed {
    author!: {
        name: {
            label: string;
        },
        uri: {
            label: string;
        }
    };
    entry!: Item[]
}