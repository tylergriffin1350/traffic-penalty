export type APIErrorResponse = {
  message: string;
  error?: string;
  details?: any;
  fieldErrors?: any;
};

export type APISuccessResponse = {
  data: any;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
