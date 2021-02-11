export interface IResponseService {
	success: boolean;
	message: string;
	data?: any;
}

export interface IResponseControl {
	loading: boolean,
	error: string,
	title?: string,
	data: {
		id: number,
		nombre: string,
		ingredientes: string,
		precio: number
	}[]
}