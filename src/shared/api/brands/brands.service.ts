import { http } from '..'

class BrandsService {
   static GetBrands() {
		return http.get("")
	}
}
