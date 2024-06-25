import { ErrorResponse } from '@commercetools/platform-sdk';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as { message: string }).message === 'string'
  );
}

export function isErrorResponse(error: unknown): error is ErrorResponse {
  return (
    typeof error === 'object' &&
    error != null &&
    typeof (error as ErrorResponse).message === 'string' &&
    typeof (error as ErrorResponse).statusCode === 'number'
  );
}

export const processQueryError = (err: unknown) => {
  if (isErrorResponse(err)) {
    return { error: { status: err.statusCode || 500, data: err.message } };
  } else if (isFetchBaseQueryError(err)) {
    const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);

    return { error: { status: +err.status, data: errMsg } };
  }

  return { error: { status: 500, data: 'An unknown error occurred' } };
};
