export interface ResponseDto<T> {
  status: string;
  message: string;
  data: T;
}
