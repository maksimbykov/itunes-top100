import { Album } from "./album";

export class Feed {
    author!: {
        name: {
            label: string;
        },
        uri: {
            label: string;
        }
    };
    entry!: Album[]
}