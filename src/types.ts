export type Post = {
	id: string;
	content: string;
	image?: string;
	likes: number;
	comments: Array<string>;
	author: User;
};

export type User = {
	id: string;
	name: string;
	position: string;
	image?: string;
};
