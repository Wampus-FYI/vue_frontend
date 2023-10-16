// Manage property listing related API

import request from '@/utils/request'
import { Property } from './type'

export const reqProperty = () => request.get(import.meta.env.VITE_SERVER + '/get-all-listing')
