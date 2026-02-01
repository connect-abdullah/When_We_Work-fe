export interface BusinessCreate {
  business_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  description: string;
}

export interface BusinessGetSchema extends BusinessCreate {
  id: number;
}

export interface BusinessListResponseApi {
  success: boolean;
  message: string;
  data: BusinessGetSchema[];
  errors: unknown;
}

export interface BusinessSingleResponseApi {
  success: boolean;
  message: string;
  data: BusinessGetSchema;
  errors: unknown;
}
