export type Post = {
	id: string;
	content: string;
	image?: string;
	like: number;
	author: User;
};

export type User = {
	id: string;
	name: string;
	position: string;
	image?: string;
};
