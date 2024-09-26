import http from "@/lib/http"

 const platsApiRequest = {
    appIdAccount: (url:string) => http.get(url)
 }

 export default platsApiRequest