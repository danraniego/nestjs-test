export interface ResponseDto<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export class SuccessResponseDto<T> implements ResponseDto<T> {
  readonly success = true;

  constructor(
    public readonly message: string,
    public readonly data: T,
  ) {}
}

export class ErrorResponseDto<T = null> implements ResponseDto<T> {
  readonly success = false;

  constructor(
    public readonly message: string,
    public readonly data: T | null = null,
  ) {}
}
