import { BASE_URL } from "../../constants/globalUrl"

export function MakeCompleteUrl(file) {
const url = `${BASE_URL}/uploads/${file}`
    return url
}