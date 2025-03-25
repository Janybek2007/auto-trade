import { loadEnv } from 'vite'

const env = loadEnv("develpoment", "", "")

export const ApiUrl = env.API_URL
